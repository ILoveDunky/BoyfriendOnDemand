
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { SoundProvider } from '@/context/sound-context';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Boyfriend on Demand',
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
          <div className="pb-28">
            {children}
          </div>
          <Toaster />
        </SoundProvider>
        <div className="fixed bottom-0 left-0 right-0 z-50 p-2 md:p-4">
            <div className="max-w-md mx-auto">
                 <iframe 
                    style={{ borderRadius: '12px' }} 
                    src="https://open.spotify.com/embed/track/2grjqo0Frpf2okIBiifQKs?utm_source=generator&theme=0"
                    width="100%" 
                    height="80" 
                    frameBorder="0" 
                    allowFullScreen={false}
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                    loading="lazy"
                    title="Our Song"
                ></iframe>
            </div>
        </div>
      </body>
    </html>
  );
}
