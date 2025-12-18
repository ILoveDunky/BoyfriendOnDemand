
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
    try {
      await Tone.start();
      
      await Tone.loaded();

      sfxPlayer.current = new Tone.Player().toDestination();
      sfxPlayer.current.fadeOut = 0.1;
      
      setIsInitialized(true);
      console.log('Audio context initialized.');

    } catch (e) {
      console.error("Error initializing audio:", e);
    }
  }, [isInitialized]);

  const playSoundEffect = useCallback(async (url: string) => {
    if (!url) return;
    if (!isInitialized) {
      await initAudio();
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
