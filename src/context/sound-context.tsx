
'use client';

import React, { createContext, useContext, useState, useRef, useCallback } from 'react';
import * as Tone from 'tone';

interface SoundContextType {
  playSoundEffect: (url: string) => void;
  isInitialized: boolean;
  initAudio: () => Promise<void>; // Kept for type consistency, but will be simplified.
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

  // This function is now the primary method for ensuring audio is ready.
  const initAudio = useCallback(async () => {
    if (Tone.context.state !== 'running') {
      try {
        await Tone.start();
        console.log('Audio context started successfully on demand.');
        setIsInitialized(true);
      } catch (e) {
        console.error("Could not start audio context:", e);
      }
    } else {
       setIsInitialized(true);
    }
     if (!playerRef.current) {
        playerRef.current = new Tone.Player().toDestination();
        playerRef.current.fadeOut = 0.1;
    }
  }, []);


  const playSoundEffect = useCallback(async (url: string) => {
    if (!url) {
      console.log('No audio URL provided.');
      return;
    }

    try {
      // Direct Initialization Check: As per your suggestion, check and start audio
      // directly within the user interaction event.
      if (Tone.context.state !== 'running') {
        await Tone.start();
        console.log('Audio context started on demand by playSoundEffect.');
        setIsInitialized(true);
      }
      
      if (!playerRef.current) {
        playerRef.current = new Tone.Player().toDestination();
        playerRef.current.fadeOut = 0.1;
      }

      // If the player is already playing something, stop it.
      if (playerRef.current.state === 'started') {
        playerRef.current.stop();
      }
      
      // Load the new audio file and play it.
      await playerRef.current.load(url);
      playerRef.current.start();
      console.log(`Playing: ${url}`);

    } catch (e) {
      console.error('Error in playSoundEffect:', e);
      // We can add a user-facing error here if needed.
    }
  }, []);

  const value = {
    playSoundEffect,
    isInitialized,
    initAudio, // Keep initAudio in the context value for any legacy or future use.
  };
  
  return (
    <SoundContext.Provider value={value}>
      {children}
    </SoundContext.Provider>
  );
};
