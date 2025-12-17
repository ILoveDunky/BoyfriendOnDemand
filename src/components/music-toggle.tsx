'use client';

import { Volume2, VolumeX } from 'lucide-react';
import { useSound } from '@/context/sound-context';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

export default function MusicToggle() {
  const { isMusicPlaying, toggleMusic, isInitialized } = useSound();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMusic}
            aria-label={isMusicPlaying ? 'Mute music' : 'Unmute music'}
            disabled={!isInitialized}
            className="text-muted-foreground hover:text-accent-foreground"
          >
            {isMusicPlaying ? (
              <Volume2 className="h-5 w-5" />
            ) : (
              <VolumeX className="h-5 w-5" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isMusicPlaying ? 'Mute background music' : 'Play background music'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
