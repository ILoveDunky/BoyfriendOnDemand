'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSound } from '@/context/sound-context';

export default function EntryPortal() {
  const [isEntering, setIsEntering] = useState(false);
  const router = useRouter();
  const { initAudio } = useSound();

  const handleEnter = () => {
    if (isEntering) return;

    // We can still call this to optimistically start the context, but the
    // robust check is now inside playSoundEffect itself.
    initAudio();
    
    setIsEntering(true);
    
    setTimeout(() => {
      router.push('/dashboard');
    }, 1500); // Corresponds to animation durations
  };

  return (
    <main
      className={cn(
        'flex min-h-screen w-full flex-col items-center justify-center bg-background transition-colors duration-1000',
        isEntering ? 'bg-primary/10' : ''
      )}
    >
      <div
        className={cn(
          'relative flex flex-col items-center justify-center text-center transition-opacity duration-700',
          isEntering ? 'opacity-0' : 'opacity-100'
        )}
      >
        <button
          onClick={handleEnter}
          disabled={isEntering}
          aria-label="Enter Boyfriend on Demand"
          className="group relative flex h-48 w-48 items-center justify-center rounded-full border-4 border-transparent bg-background text-primary shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-accent/30 focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/50 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        >
          <div className="absolute inset-0 rounded-full bg-accent/20 blur-xl transition-all duration-500 group-hover:bg-accent/30"></div>
          <div className="absolute inset-0 animate-pulse-glow rounded-full"></div>
          
          <Heart
            className="absolute h-24 w-24 text-accent/50 transition-all duration-500 group-hover:scale-110 heart-breathe"
            fill="currentColor"
          />
           <span className="sr-only">Enter</span>
        </button>
        <div className="mt-8">
          <h1 className="font-headline text-2xl tracking-tight text-primary/80">
            For When You Need Me Close
          </h1>
          <p className="mt-2 text-muted-foreground">Click the heart to enter</p>
        </div>
      </div>
      
      {isEntering && (
        <div className="absolute">
          <Heart
            className="animate-[heart-bloom_1.5s_ease-in-out_forwards] text-accent"
            fill="currentColor"
            style={{
              '--start-size': '6rem',
              '--end-size': '100vmax',
            } as React.CSSProperties}
          />
          <style jsx>{`
            @keyframes heart-bloom {
              0% {
                width: var(--start-size);
                height: var(--start-size);
                opacity: 0.8;
              }
              100% {
                width: var(--end-size);
                height: var(--end-size);
                opacity: 0;
              }
            }
          `}</style>
        </div>
      )}
    </main>
  );
}
