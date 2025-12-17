
'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Music2 } from 'lucide-react';
import { useContent } from '@/context/content-context';

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
          <Card key={playlist.id} className="flex flex-col justify-between bg-background/80 transform-gpu transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/20 fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <Music2 className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <CardTitle className="font-headline text-2xl">{playlist.title}</CardTitle>
                  <CardDescription className="mt-2">{playlist.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={playlist.url} target="_blank" rel="noopener noreferrer">
                  Listen Now
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

    