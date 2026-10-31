import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import GraduationImageViewer from './GraduationImageViewer';

test('opens the supplied confirmation image in a zoomable full-screen popup', async () => {
  const { container } = render(<GraduationImageViewer />);

  expect(container.querySelector('img')).toHaveAttribute(
    'src',
    '/images/graduation-confirmation.png'
  );
  expect(screen.queryByRole('link', { name: /download/i })).not.toBeInTheDocument();
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'View confirmation letter full screen' }));
  expect(screen.getByRole('dialog', { name: 'Graduation confirmation full-screen viewer' })).toBeInTheDocument();
  expect(screen.getByRole('img', { name: /confirmation of graduation letter/i })).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Zoom in confirmation letter' }));
  expect(screen.getByText('125%')).toBeInTheDocument();

  fireEvent.keyDown(document, { key: 'Escape' });
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
});
