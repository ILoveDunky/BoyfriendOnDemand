'use client';

import { soundboardCategories } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { PlayCircle, Volume2 } from 'lucide-react';
import { useSound } from '@/context/sound-context';
import { useState } from 'react';

export default function SoundboardPage() {
    const { playSoundEffect } = useSound();
    const [nowPlaying, setNowPlaying] = useState<string | null>(null);
    
  return (
    <div className="container mx-auto">
      <header className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
          A Message from Me
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Whenever you need to hear my voice, just pick a message. I'm right here with you.
        </p>
      </header>

      <Card className="bg-background/80">
        <CardHeader>
            <CardTitle>Soundboard</CardTitle>
            <CardDescription>Click on a category to see the messages.</CardDescription>
        </CardHeader>
        <div className="p-2 sm:p-6">
            <Accordion type="single" collapsible className="w-full">
                {soundboardCategories.map((category) => (
                    <AccordionItem value={category.id} key={category.id}>
                        <AccordionTrigger className="text-lg font-headline hover:no-underline rounded-lg px-4 hover:bg-secondary">
                            <div className="flex items-center gap-4">
                                <category.icon className="h-6 w-6 text-primary" />
                                {category.name}
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 px-2">
                             {category.clips.map((clip) => (
                               <Button 
                                 key={clip.id} 
                                 variant="outline" 
                                 size="lg"
                                 className="h-auto justify-start py-4 rounded-xl text-left flex items-center gap-4"
                                 onClick={() => {
                                   setNowPlaying(clip.id);
                                   playSoundEffect(clip.audioSrc);
                                   setTimeout(() => setNowPlaying(null), 2000); // UI feedback duration
                                 }}
                               >
                                {nowPlaying === clip.id ? (
                                    <Volume2 className="h-6 w-6 text-accent animate-pulse" />
                                ) : (
                                    <PlayCircle className="h-6 w-6 text-primary" />
                                )}
                                 <span className="flex-1 whitespace-normal">{clip.title}</span>
                               </Button>
                             ))}
                           </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
      </Card>
    </div>
  );
}
