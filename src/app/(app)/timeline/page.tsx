
'use client';

import { timelineEvents } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
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
        <div className="absolute left-6 sm:left-1/2 top-0 h-full w-0.5 bg-border -translate-x-1/2"></div>

        {timelineEvents.map((event, index) => (
          <div 
            key={event.id}
            className={`relative mb-12 flex w-full items-start justify-start sm:justify-center`}
          >
             <div className="sm:hidden absolute left-6 top-8 z-10 h-8 w-8 -translate-x-1/2 rounded-full bg-background flex items-center justify-center border-2 border-accent">
                <Pin className="h-4 w-4 text-accent" />
            </div>

            <div className={`w-full sm:w-1/2 px-4 sm:px-8 ml-10 sm:ml-0 ${index % 2 === 0 ? 'sm:text-right sm:pr-8' : 'sm:text-left sm:pl-8 sm:translate-x-full'}`}>
              <Card className="bg-background/80 transition-shadow duration-300 hover:shadow-xl hover:shadow-accent/20 inline-block w-full max-w-md">
                <CardHeader className={index % 2 === 0 ? 'sm:text-right' : 'sm:text-left'}>
                  <CardTitle className="font-headline text-xl sm:text-2xl">{event.title}</CardTitle>
                  {event.date && (
                    <CardDescription className="flex items-center gap-2" style={{ justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start'}}>
                        <Calendar className="h-4 w-4" />
                        <span>{event.date}</span>
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="text-left">
                  {event.description && <p className="text-muted-foreground mb-4">{event.description}</p>}
                  
                  {event.imageUrl && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="relative aspect-video overflow-hidden rounded-lg border bg-muted/30 cursor-pointer transition-transform duration-300 hover:scale-105">
                          <Image src={event.imageUrl} alt={event.title} fill className="object-contain" />
                        </div>
                      </DialogTrigger>
                      <DialogContent className="p-0 border-0 max-w-screen-lg bg-transparent shadow-none">
                        <Image src={event.imageUrl} alt={event.title} width={1920} height={1080} className="w-full h-auto rounded-lg" />
                      </DialogContent>
                    </Dialog>
                  )}

                  {event.imageUrls && (
                    <div className="grid grid-cols-2 gap-2">
                       {event.imageUrls.map((url, i) => (
                          <Dialog key={i}>
                            <DialogTrigger asChild>
                              <div className="relative aspect-square overflow-hidden rounded-lg border bg-muted/30 cursor-pointer transition-transform duration-300 hover:scale-105">
                                <Image src={url} alt={`${event.title} ${i+1}`} fill className="object-contain" />
                              </div>
                            </DialogTrigger>
                             <DialogContent className="p-0 border-0 max-w-screen-lg bg-transparent shadow-none">
                                <Image src={url} alt={`${event.title} ${i+1}`} width={1080} height={1080} className="w-full h-auto rounded-lg" />
                             </DialogContent>
                          </Dialog>
                       ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* The pin on the timeline */}
            <div className="hidden sm:flex absolute left-1/2 top-8 z-10 h-8 w-8 -translate-x-1/2 rounded-full bg-background items-center justify-center border-2 border-accent">
                <Pin className="h-4 w-4 text-accent" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
