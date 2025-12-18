
'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { PlayCircle, Volume2 } from 'lucide-react';
import { useSound } from '@/context/sound-context';
import { useState } from 'react';
import { soundboardCategories, easterEggCategory } from '@/lib/data';

export default function SoundboardPage() {
  const { playSoundEffect } = useSound();
  const [nowPlaying, setNowPlaying] = useState<string | null>(null);

  const playClip = (clip: { id: string; audioSrc: string }) => {
    setNowPlaying(clip.id);
    playSoundEffect(clip.audioSrc);
    setTimeout(() => setNowPlaying(null), 2000); // UI feedback duration
  };

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
          <CardDescription>
            Click on a category to see the messages.
          </CardDescription>
        </CardHeader>
        <div className="p-2 sm:p-6">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue={soundboardCategories[0]?.id}
          >
            {soundboardCategories.map((category) =>
              category.id === 'open-when' ? (
                <AlertDialog key={category.id}>
                  <AccordionItem value={category.id}>
                    <AlertDialogTrigger asChild>
                      <AccordionTrigger className="text-lg font-headline hover:no-underline rounded-lg px-4 hover:bg-secondary">
                        <div className="flex items-center gap-4">
                          <category.icon className="h-6 w-6 text-primary" />
                          {category.name}
                        </div>
                      </AccordionTrigger>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This section is for when things are really tough.
                          It's okay to be here. I'm here with you.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Maybe later</AlertDialogCancel>
                        <AccordionContent asChild>
                          <AlertDialogAction>I'm ready</AlertDialogAction>
                        </AccordionContent>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                    <AccordionContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 px-2">
                        {category.clips.map((clip) => (
                          <Button
                            key={clip.id}
                            variant="outline"
                            size="lg"
                            className="h-auto justify-start py-4 rounded-xl text-left flex items-center gap-4"
                            onClick={() => playClip(clip)}
                          >
                            {nowPlaying === clip.id ? (
                              <Volume2 className="h-6 w-6 text-accent animate-pulse" />
                            ) : (
                              <PlayCircle className="h-6 w-6 text-primary" />
                            )}
                            <span className="flex-1 whitespace-normal">
                              {clip.title}
                            </span>
                          </Button>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </AlertDialog>
              ) : (
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
                          onClick={() => playClip(clip)}
                          disabled={!clip.audioSrc}
                        >
                          {nowPlaying === clip.id ? (
                            <Volume2 className="h-6 w-6 text-accent animate-pulse" />
                          ) : (
                            <PlayCircle className="h-6 w-6 text-primary" />
                          )}
                          <span className="flex-1 whitespace-normal">
                            {clip.title}
                          </span>
                        </Button>
                      ))}
                    </div>
                    {category.footer && (
                        <p className="px-4 pt-4 text-sm text-muted-foreground italic">{category.footer}</p>
                    )}
                  </AccordionContent>
                </AccordionItem>
              )
            )}
          </Accordion>
        </div>
      </Card>
      
      <div className="mt-12 text-center">
        <Accordion type="single" collapsible className="w-full max-w-md mx-auto">
            <AccordionItem value={easterEggCategory.id}>
                <AccordionTrigger className="text-sm font-headline hover:no-underline rounded-lg px-4 text-muted-foreground hover:text-accent-foreground">
                    <div className="flex items-center gap-2">
                        <easterEggCategory.icon className="h-4 w-4" />
                        {easterEggCategory.name}
                    </div>
                </AccordionTrigger>
                 <AccordionContent>
                    <div className="grid grid-cols-1 gap-2 pt-2 px-1">
                        {easterEggCategory.clips.map((clip) => (
                        <Button
                            key={clip.id}
                            variant="ghost"
                            size="sm"
                            className="h-auto justify-start py-2 rounded-lg text-left flex items-center gap-3"
                             onClick={() => playClip(clip)}
                             disabled={!clip.audioSrc}
                        >
                            {nowPlaying === clip.id ? (
                                <Volume2 className="h-5 w-5 text-accent animate-pulse" />
                            ) : (
                                <PlayCircle className="h-5 w-5 text-primary" />
                            )}
                            <span className="flex-1 whitespace-normal">{clip.title}</span>
                        </Button>
                        ))}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>

    </div>
  );
}
