
'use client';

import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useContent } from '@/context/content-context';
import { Music2 } from 'lucide-react';

export default function PlaylistsPage() {
  const { playlists } = useContent();

  return (
    <div className="container mx-auto">
      <header className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
          Our Soundtrack
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          I've put together some music for you, for every kind of mood. I hope you enjoy it.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {playlists.map((playlist, index) => (
          <Card key={playlist.id} className="flex flex-col justify-between bg-background/80 transform-gpu transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/20 fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            <CardHeader>
                <div className="flex items-start gap-4">
                    <div className="mt-1">
                    <Music2 className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                    <CardTitle className="font-headline text-xl">{playlist.title}</CardTitle>
                    <CardDescription className="mt-1">{playlist.description}</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <div className="p-2 pt-0">
                 <iframe 
                    style={{ borderRadius: '12px' }} 
                    src={playlist.embedSrc}
                    width="100%" 
                    height="152" 
                    frameBorder="0" 
                    allowFullScreen={false}
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                    loading="lazy"
                    title={playlist.title}
                ></iframe>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
