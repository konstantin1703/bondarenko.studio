import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '@/styles/foundations/globals.scss';
import '@/styles/stage11a-calibration.scss';
import '@/styles/stage11a-safety.scss';

export const metadata: Metadata = {
  title: 'BND.STUDIO — Local Foundation',
  description: 'Локальный foundation-прототип интерфейса BND.STUDIO.',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ru" data-fixture-version="stage-4">
      <body>{children}</body>
    </html>
  );
}
