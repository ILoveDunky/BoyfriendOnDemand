
'use client';

import { timelineEvents } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Calendar, Pin } from 'lucide-react';

export default function TimelinePage() {
  return (
    <div className="container mx-auto">
      <header className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
          Our Journey
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          A timeline of our favorite moments, big and small. A reminder of how far we've come.
        </p>
      </header>

      <div className="relative">
        {/* The vertical line in the middle */}
        <div className="absolute left-1/2 top-0 h-full w-0.5 bg-border -translate-x-1/2"></div>

        {timelineEvents.map((event, index) => (
          <div 
            key={event.id}
            className={`relative mb-12 flex w-full items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
          >
            <div className={`w-1/2 px-8 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
              <Card className="bg-background/80 transition-shadow duration-300 hover:shadow-xl hover:shadow-accent/20">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">{event.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2" style={{ justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start'}}>
                    <Calendar className="h-4 w-4" />
                    <span>{event.date}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{event.description}</p>
                </CardContent>
              </Card>
            </div>
            
            {/* The pin on the timeline */}
            <div className="absolute left-1/2 top-1/2 z-10 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background flex items-center justify-center border-2 border-accent">
                <Pin className="h-4 w-4 text-accent" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
