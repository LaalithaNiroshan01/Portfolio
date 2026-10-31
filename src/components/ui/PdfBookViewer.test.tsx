import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import PdfBookViewer from './PdfBookViewer';

jest.mock('framer-motion', () => {
  const React = require('react');
  const renderMotionElement = (props: { children?: import('react').ReactNode }) =>
    React.createElement('div', null, props.children);

  return {
    motion: { div: renderMotionElement },
    AnimatePresence: renderMotionElement
  };
});

jest.mock('pdfjs-dist', () => ({
  GlobalWorkerOptions: { workerSrc: '' },
  getDocument: () => ({
    promise: Promise.resolve({
      numPages: 265,
      getPage: () => Promise.resolve({})
    }),
    destroy: jest.fn()
  })
}));

test('allows page-by-page navigation within the PDF page range', async () => {
  render(
    <PdfBookViewer
      source="/documents/cirs-2026-proceedings.pdf"
      title="CIRS 2026 Proceedings"
      initialPage={133}
    />
  );

  const pageInput = await screen.findByRole('spinbutton', { name: 'PDF page number' });
  await waitFor(() => expect(pageInput).toBeEnabled());
  expect(pageInput).toHaveValue(133);

  fireEvent.click(screen.getByRole('button', { name: 'Next PDF page' }));
  expect(pageInput).toHaveValue(134);

  fireEvent.change(pageInput, { target: { value: '266' } });
  expect(pageInput).toHaveValue(134);
});

test('provides zoom and a full-screen viewer that closes with Escape', async () => {
  render(
    <PdfBookViewer
      source="/documents/cirs-2026-proceedings.pdf"
      title="CIRS 2026 Proceedings"
      initialPage={133}
    />
  );

  await screen.findByRole('spinbutton', { name: 'PDF page number' });
  fireEvent.click(screen.getByRole('button', { name: 'Zoom in PDF' }));
  expect(screen.getByText('125%')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'View PDF full screen' }));
  expect(screen.getByRole('dialog', { name: 'CIRS 2026 Proceedings full-screen PDF viewer' })).toBeInTheDocument();

  fireEvent.keyDown(document, { key: 'Escape' });
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});
