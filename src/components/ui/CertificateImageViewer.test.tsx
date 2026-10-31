import React from 'react';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import CertificateImageViewer from './CertificateImageViewer';

test('opens the certificate in a full-screen popup and closes it from the close button', async () => {
  render(
    <CertificateImageViewer
      imageSource="/images/cirs-2026-certificate.png"
      imageAlt="CIRS research certificate"
      title="CIRS Research Certificate"
    />
  );

  fireEvent.click(screen.getByRole('button', { name: 'View CIRS Research Certificate full screen' }));
  const dialog = screen.getByRole('dialog', { name: 'CIRS Research Certificate full-screen viewer' });
  expect(dialog).toBeInTheDocument();
  expect(within(dialog).getByRole('img', { name: 'CIRS research certificate' })).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Close certificate' }));
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
});

test('closes the certificate popup with Escape or a backdrop click', async () => {
  const { container } = render(
    <CertificateImageViewer
      imageSource="/images/cirs-2026-certificate.png"
      imageAlt="CIRS research certificate"
      title="CIRS Research Certificate"
    />
  );

  fireEvent.click(screen.getByRole('button', { name: 'View CIRS Research Certificate full screen' }));
  fireEvent.keyDown(document, { key: 'Escape' });
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());

  fireEvent.click(screen.getByRole('button', { name: 'View CIRS Research Certificate full screen' }));
  const dialog = screen.getByRole('dialog', { name: 'CIRS Research Certificate full-screen viewer' });
  fireEvent.click(dialog);
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  expect(container).toBeInTheDocument();
});
