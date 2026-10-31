import React from 'react';
import { render, screen } from '@testing-library/react';
import EducationSection from './components/sections/EducationSection';
import ResearchSection from './components/sections/ResearchSection';

jest.mock('framer-motion', () => {
  const React = require('react');
  const mockMotionComponents = new Map<string, (mockProps: Record<string, unknown>) => React.ReactElement>();
  const mockMotion = new Proxy({}, {
    get: (_target, mockElementName: string) => {
      if (!mockMotionComponents.has(mockElementName)) {
        mockMotionComponents.set(mockElementName, (mockProps: Record<string, unknown>) => {
          const {
            initial,
            animate,
            exit,
            transition,
            variants,
            whileInView,
            viewport,
            whileHover,
            whileTap,
            layout,
            ...elementProps
          } = mockProps;
          return React.createElement(mockElementName, elementProps, mockProps.children);
        });
      }

      return mockMotionComponents.get(mockElementName);
    }
  });
  const renderMotionElement = (props: { children?: import('react').ReactNode }) => props.children;

  return {
    motion: mockMotion,
    AnimatePresence: renderMotionElement
  };
});

jest.mock('./components/ui/GraduationImageViewer', () => {
  const React = require('react');
  return () => React.createElement('div', { 'data-testid': 'graduation-image-viewer' });
});

jest.mock('./components/ui/PdfBookViewer', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: (props: { source: string; title: string; initialPage?: number }) =>
      React.createElement('div', {
        'data-testid': 'pdf-viewer',
        'data-source': props.source,
        'data-initial-page': props.initialPage || 1
      }, props.title)
  };
});

test('shows the graduation confirmation image viewer', () => {
  render(<EducationSection />);

  expect(screen.getByTestId('graduation-image-viewer')).toBeInTheDocument();
});

test('opens the CIRS proceedings at page 133 in the custom viewer', () => {
  render(<ResearchSection />);

  const viewer = screen.getByTestId('pdf-viewer');
  expect(viewer).toHaveAttribute('data-source', '/documents/cirs-2026-proceedings.pdf');
  expect(viewer).toHaveAttribute('data-initial-page', '133');
  expect(screen.getByRole('heading', { name: /emotion-adaptive focus mode browser extension/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'CIRS Research Certificate' })).toBeInTheDocument();
  const certificateImage = screen.getByRole('img', { name: /cirs 2026 certificate/i });
  expect(certificateImage).toHaveAttribute('src', '/images/cirs-2026-certificate.png');
  expect(certificateImage.closest('[aria-label="CIRS Research Certificate"]')).not.toBeNull();
  expect(screen.getByRole('link', { name: /get it on chrome/i }).closest(
    '[aria-label="CIRS Research Certificate"]'
  )).toBeNull();
});

test('links directly to the Chrome Web Store listing', () => {
  render(<ResearchSection />);

  expect(screen.getByRole('link', { name: /get it on chrome/i })).toHaveAttribute(
    'href',
    'https://chromewebstore.google.com/detail/aiclnkgbodafngkkjnjgkcnjmkfnhcaa?utm_source=item-share-cb'
  );
});
