
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
  
  const sfxPlayer = useRef<Tone.Player | null>(null);

  const initAudio = useCallback(async () => {
    if (isInitialized) return;
    // Tone.start() can only be called once, so we check the state
    if (Tone.context.state !== 'running') {
      try {
        await Tone.start();
        console.log('Audio context started.');
      } catch (e) {
        console.error("Error starting audio context:", e);
        // Don't proceed if Tone.start() fails
        return;
      }
    }
    
    // Ensure Tone is fully loaded before we consider it initialized
    await Tone.loaded();

    if (!sfxPlayer.current) {
        sfxPlayer.current = new Tone.Player().toDestination();
        sfxPlayer.current.fadeOut = 0.1;
    }
    
    setIsInitialized(true);
    console.log('Audio system is initialized.');

  }, [isInitialized]);

  const playSoundEffect = useCallback(async (url: string) => {
    if (!url) return;
    
    // **THE FIX**: If not initialized, initialize audio on first play attempt.
    if (!isInitialized) {
      await initAudio();
    }

    // A small delay to ensure the context is running, especially after a fresh init
    if (Tone.context.state !== 'running') {
      console.warn('Audio context not running. Attempting to start again.');
      await initAudio(); // Try one more time
      if (Tone.context.state !== 'running') {
        console.error('Audio context could not be started. Aborting playback.');
        return;
      }
    }

    if (sfxPlayer.current) {
      try {
        if (sfxPlayer.current.state === 'started') {
          sfxPlayer.current.stop();
        }
        await sfxPlayer.current.load(url);
        sfxPlayer.current.start();
      } catch (e) {
        console.error('Error playing sound effect', e)
      }
    }
  }, [initAudio, isInitialized]);

  const value = {
    playSoundEffect,
    isInitialized,
    initAudio,
    // isMusicPlaying and toggleMusic are removed
  };
  
  return (
    <SoundContext.Provider value={value}>
      {children}
    </SoundContext.Provider>
  );
};
