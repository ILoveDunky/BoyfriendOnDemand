
'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BookHeart } from 'lucide-react';
import { useContent } from '@/context/content-context';

export default function LettersPage() {
  const { letters } = useContent();

  return (
    <div className="container mx-auto">
      <header className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
          From My Heart to Yours
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          A collection of thoughts, memories, and promises I've written down for you.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {letters.map((letter, index) => (
          <Card key={letter.id} className="flex flex-col bg-background/80 transform-gpu transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/20 fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-headline text-2xl">{letter.title}</CardTitle>
                <BookHeart className="h-6 w-6 text-accent" />
              </div>
              <CardDescription>{letter.date}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground whitespace-pre-line leading-relaxed">{letter.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

    