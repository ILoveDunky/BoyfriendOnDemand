
'use client';

import React, { createContext, useContext, useState, useRef, useCallback } from 'react';
import * as Tone from 'tone';

interface SoundContextType {
  playSoundEffect: (url: string) => void;
  isInitialized: boolean;
  initAudio: () => Promise<void>;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const useSound = () => {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};

export const SoundProvider = ({ children }: { children: React.ReactNode }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const playerRef = useRef<Tone.Player | null>(null);

  const initAudio = useCallback(async () => {
    // Prevent re-initialization
    if (isInitialized) {
      return;
    }
    // Tone.start() can only be called once, so we check the state
    if (Tone.context.state !== 'running') {
      try {
        await Tone.start();
        console.log('Audio context started successfully.');
      } catch (e) {
        console.error("Could not start audio context:", e);
        return; // Don't proceed if Tone.start() fails
      }
    }
    
    // Ensure Tone is fully loaded before we consider it initialized
    await Tone.loaded();

    if (!playerRef.current) {
        playerRef.current = new Tone.Player().toDestination();
        playerRef.current.fadeOut = 0.1;
    }
    
    setIsInitialized(true);
    console.log('Audio system has been initialized.');
  }, [isInitialized]);

  const playSoundEffect = useCallback(async (url: string) => {
    if (!url) {
        console.log('No audio URL provided.');
        return;
    }

    try {
        // Force initialization if it hasn't happened. This is the crucial fallback.
        if (Tone.context.state !== 'running') {
            console.warn('Audio context not running. Forcing start...');
            await initAudio();
        }

        // If it's still not running, we can't play.
        if (Tone.context.state !== 'running') {
            console.error('Audio context failed to start. Cannot play sound.');
            return;
        }

        if (playerRef.current) {
            // If the player is already playing something, stop it first.
            if (playerRef.current.state === 'started') {
                playerRef.current.stop();
            }
            // Load the new audio file and play it.
            await playerRef.current.load(url);
            playerRef.current.start();
            console.log(`Playing: ${url}`);
        } else {
            console.error('Player not initialized.');
        }

    } catch (e) {
      console.error('Error in playSoundEffect:', e);
    }
  }, [initAudio]);

  const value = {
    playSoundEffect,
    isInitialized,
    initAudio,
  };
  
  return (
    <SoundContext.Provider value={value}>
      {children}
    </SoundContext.Provider>
  );
};
