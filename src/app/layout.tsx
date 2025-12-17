import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { SoundProvider } from '@/context/sound-context';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Heartstrings Haven',
  description: 'A special place for my favorite person.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Literata:opsz,wght@7..72,400;7..72,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('font-body antialiased')}>
        <SoundProvider>
          {children}
          <Toaster />
        </SoundProvider>
      </body>
    </html>
  );
}
