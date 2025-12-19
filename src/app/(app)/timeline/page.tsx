
'use client';

import { timelineEvents } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Calendar, Pin } from 'lucide-react';
import Image from 'next/image';

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
            className={`relative mb-12 flex w-full items-start ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
          >
            <div className={`w-1/2 px-4 sm:px-8 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
              <Card className="bg-background/80 transition-shadow duration-300 hover:shadow-xl hover:shadow-accent/20 inline-block w-full max-w-md">
                <CardHeader>
                  <CardTitle className="font-headline text-xl sm:text-2xl">{event.title}</CardTitle>
                  {event.date && (
                    <CardDescription className="flex items-center gap-2" style={{ justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start'}}>
                        <Calendar className="h-4 w-4" />
                        <span>{event.date}</span>
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  {event.description && <p className="text-muted-foreground mb-4">{event.description}</p>}
                  {event.imageUrl && (
                     <div className="relative aspect-[9/16] overflow-hidden rounded-lg border">
                        <Image src={event.imageUrl} alt={event.title} fill className="object-contain" />
                     </div>
                  )}
                  {event.imageUrls && (
                    <div className="grid grid-cols-2 gap-2">
                       {event.imageUrls.map((url, i) => (
                         <div key={i} className="relative aspect-[9/16] overflow-hidden rounded-lg border">
                           <Image src={url} alt={`${event.title} ${i+1}`} fill className="object-contain" />
                         </div>
                       ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* The pin on the timeline */}
            <div className="absolute left-1/2 top-8 z-10 h-8 w-8 -translate-x-1/2 rounded-full bg-background flex items-center justify-center border-2 border-accent">
                <Pin className="h-4 w-4 text-accent" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
