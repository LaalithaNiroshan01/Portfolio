import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import {
  FiArrowLeft,
  FiArrowRight,
  FiEye,
  FiMaximize2,
  FiMinus,
  FiPlus,
  FiX
} from 'react-icons/fi';
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist';
import type { PDFDocumentProxy, RenderTask } from 'pdfjs-dist';
import { Icon } from '../../utils/IconWrapper';

GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.min.mjs`;

interface PdfBookViewerProps {
  source: string;
  title: string;
  initialPage?: number;
}

interface ViewportSize {
  width: number;
  height: number;
}

const minimumZoom = 0.5;
const maximumZoom = 3;

const PdfBookViewer: React.FC<PdfBookViewerProps> = ({ source, title, initialPage = 1 }) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pdfDocument, setPdfDocument] = useState<PDFDocumentProxy | null>(null);
  const [pageNumber, setPageNumber] = useState(initialPage);
  const [pageCount, setPageCount] = useState(0);
  const [viewportSize, setViewportSize] = useState<ViewportSize>({ width: 0, height: 0 });
  const [turnDirection, setTurnDirection] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isFullscreen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsFullscreen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullscreen]);

  useEffect(() => {
    let isCancelled = false;
    const loadingTask = getDocument({ url: source });

    setPdfDocument(null);
    setPageCount(0);
    setPageNumber(initialPage);
    setErrorMessage(null);
    setIsLoading(true);

    loadingTask.promise
      .then((document) => {
        if (isCancelled) return;

        setPdfDocument(document);
        setPageCount(document.numPages);
        setPageNumber(Math.min(initialPage, document.numPages));
      })
      .catch((error: unknown) => {
        if (isCancelled) return;

        setErrorMessage(error instanceof Error ? error.message : 'The document could not be loaded.');
        setIsLoading(false);
      });

    return () => {
      isCancelled = true;
      void loadingTask.destroy();
    };
  }, [initialPage, source]);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    const updateSize = () => {
      const width = viewer.clientWidth;
      const height = viewer.clientHeight;
      setViewportSize((currentSize) =>
        currentSize.width === width && currentSize.height === height
          ? currentSize
          : { width, height }
      );
    };

    updateSize();

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', updateSize);
      return () => window.removeEventListener('resize', updateSize);
    }

    const observer = new ResizeObserver(updateSize);
    observer.observe(viewer);

    return () => observer.disconnect();
  }, [isFullscreen]);

  useEffect(() => {
    if (!pdfDocument || !canvasRef.current || viewportSize.width === 0 || viewportSize.height === 0) return;

    let isCancelled = false;
    let renderTask: RenderTask | null = null;
    setIsLoading(true);
    setErrorMessage(null);

    const renderPage = async () => {
      try {
        const page = await pdfDocument.getPage(pageNumber);
        if (isCancelled || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (!context) {
          throw new Error('This browser does not support the PDF viewer canvas.');
        }

        const pageViewport = page.getViewport({ scale: 1 });
        const fitScale = Math.min(
          (viewportSize.width - 32) / pageViewport.width,
          (viewportSize.height - 32) / pageViewport.height
        );
        const viewport = page.getViewport({ scale: fitScale * zoom });
        const outputScale = Math.min(window.devicePixelRatio || 1, 2);

        canvas.width = Math.floor(viewport.width * outputScale);
        canvas.height = Math.floor(viewport.height * outputScale);
        canvas.style.width = `${viewport.width}px`;
        canvas.style.height = `${viewport.height}px`;

        renderTask = page.render({
          canvasContext: context,
          viewport,
          transform: outputScale === 1 ? undefined : [outputScale, 0, 0, outputScale, 0, 0]
        });

        await renderTask.promise;
        if (!isCancelled) setIsLoading(false);
      } catch (error) {
        if (isCancelled || (error instanceof Error && error.name === 'RenderingCancelledException')) return;

        console.error('PDF page rendering failed.', error);
        setErrorMessage(error instanceof Error ? error.message : 'The document page could not be rendered.');
        setIsLoading(false);
      }
    };

    void renderPage();

    return () => {
      isCancelled = true;
      renderTask?.cancel();
    };
  }, [isFullscreen, pageNumber, pdfDocument, viewportSize, zoom]);

  const turnPage = (nextPage: number) => {
    if (!Number.isInteger(nextPage) || nextPage < 1 || nextPage > pageCount || nextPage === pageNumber) return;

    setTurnDirection(nextPage > pageNumber ? 1 : -1);
    setPageNumber(nextPage);
  };

  const changeZoom = (change: number) => {
    setZoom((currentZoom) => Math.min(maximumZoom, Math.max(minimumZoom, currentZoom + change)));
  };

  const viewer = (
    <div className={isFullscreen
      ? 'fixed inset-0 z-[100] flex items-center justify-center bg-black p-3 md:p-8'
      : 'rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-darkBg shadow-xl'
    } role={isFullscreen ? 'dialog' : undefined} aria-modal={isFullscreen || undefined} aria-label={isFullscreen ? `${title} full-screen PDF viewer` : undefined}>
      <div className={isFullscreen
        ? 'flex h-full w-full max-w-7xl flex-col overflow-hidden rounded-2xl border border-gray-800 bg-white dark:bg-darkBg'
        : ''
      }>
        <div className="flex flex-col gap-3 px-4 py-4 border-b border-gray-200 dark:border-gray-800 sm:flex-row sm:items-center sm:justify-between md:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <span className="w-10 h-10 shrink-0 rounded-xl bg-primary bg-opacity-10 flex items-center justify-center text-primary">
              <Icon icon={FiEye} />
            </span>
            <div className="min-w-0">
              <p className="truncate font-semibold text-secondary dark:text-white">{title}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">View only</p>
            </div>
          </div>
          <div className="flex w-full items-center justify-end gap-1.5 sm:w-auto sm:gap-2">
            <button
              type="button"
              onClick={() => changeZoom(-0.25)}
              disabled={zoom <= minimumZoom}
              aria-label="Zoom out PDF"
              className="viewer-control-button shrink-0"
            >
              <Icon icon={FiMinus} />
            </button>
            <span className="min-w-10 shrink-0 text-center text-xs text-gray-600 dark:text-gray-300 sm:min-w-12" aria-live="polite">
              {Math.round(zoom * 100)}%
            </span>
            <button
              type="button"
              onClick={() => changeZoom(0.25)}
              disabled={zoom >= maximumZoom}
              aria-label="Zoom in PDF"
              className="viewer-control-button shrink-0"
            >
              <Icon icon={FiPlus} />
            </button>
            <button
              type="button"
              onClick={() => setIsFullscreen((current) => !current)}
              aria-label={isFullscreen ? 'Close full-screen PDF viewer' : 'View PDF full screen'}
              className="viewer-control-button shrink-0"
            >
              <Icon icon={isFullscreen ? FiX : FiMaximize2} />
            </button>
          </div>
        </div>

        <div
          ref={viewerRef}
          className={`pdf-book-stage relative flex ${isFullscreen ? 'min-h-0 flex-1' : 'h-[68vh] min-h-[420px] max-h-[900px]'} ${
            zoom > 1 ? 'items-start justify-start overflow-auto' : 'items-center justify-center overflow-auto'
          } bg-gray-100 p-4 dark:bg-gray-950`}
          onContextMenu={(event) => event.preventDefault()}
          aria-label={`${title} page viewer`}
        >
          {errorMessage ? (
            <p role="alert" className="max-w-md text-center text-red-600 dark:text-red-400">
              Unable to display this PDF: {errorMessage}
            </p>
          ) : (
            <>
              <motion.div
                key={pageNumber}
                className="document-book-page flex items-center justify-center"
                initial={{ opacity: 0, rotateY: turnDirection * -12, x: turnDirection * 16 }}
                animate={{ opacity: 1, rotateY: 0, x: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <canvas
                  ref={canvasRef}
                  role="img"
                  aria-label={`Page ${pageNumber} of ${pageCount || 'PDF'}: ${title}`}
                  className="bg-white shadow-2xl"
                />
              </motion.div>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-80 dark:bg-gray-950 dark:bg-opacity-80">
                  <span className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin" aria-label="Loading PDF" />
                </div>
              )}
            </>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 px-4 md:px-6 py-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => turnPage(pageNumber - 1)}
              disabled={pageNumber <= 1 || pageCount === 0}
              aria-label="Previous PDF page"
              className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center text-secondary dark:text-white hover:text-primary hover:border-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <Icon icon={FiArrowLeft} />
            </button>
            <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              Page
              <input
                type="number"
                min="1"
                max={pageCount || undefined}
                step="1"
                value={pageNumber}
                onChange={(event) => turnPage(Number(event.target.value))}
                aria-label="PDF page number"
                disabled={pageCount === 0}
                className="w-20 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-pureBlack px-3 py-2 text-center text-secondary dark:text-white disabled:opacity-60"
              />
              <span>of {pageCount || '…'}</span>
            </label>
            <button
              type="button"
              onClick={() => turnPage(pageNumber + 1)}
              disabled={pageNumber >= pageCount || pageCount === 0}
              aria-label="Next PDF page"
              className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center text-secondary dark:text-white hover:text-primary hover:border-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <Icon icon={FiArrowRight} />
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Full page fit · {pageNumber} / {pageCount || '…'}</p>
        </div>
      </div>
    </div>
  );

  return isFullscreen ? createPortal(viewer, document.body) : viewer;
};

export default PdfBookViewer;
