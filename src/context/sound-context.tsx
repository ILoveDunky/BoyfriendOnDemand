
'use client';

import React, { createContext, useContext, useRef, useCallback } from 'react';

interface SoundContextType {
  playSoundEffect: (url: string) => void;
  // These are no longer actively used but kept to prevent breaking other components
  // that might still reference them before we can remove them.
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
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSoundEffect = useCallback((url: string) => {
    if (!url) {
      console.log('No audio URL provided.');
      return;
    }

    try {
      // If there's an existing audio element playing, stop it first.
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      // Create a new Audio object for the new sound.
      // This is the most direct way to play sound and is highly compatible.
      const newAudio = new Audio(url);
      audioRef.current = newAudio;

      // The .play() method returns a Promise, which we can use to catch errors.
      const playPromise = newAudio.play();

      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Audio playback error:", error);
          // This error can happen if the browser still blocks autoplay.
          // At this point, it's a browser-level restriction we can't bypass.
        });
      }
    } catch (e) {
      console.error('Error in playSoundEffect:', e);
    }
  }, []);

  const value = {
    playSoundEffect,
    // Provide dummy values for the legacy context properties.
    isInitialized: true,
    initAudio: async () => {},
  };

  return (
    <SoundContext.Provider value={value}>
      {children}
    </SoundContext.Provider>
  );
};
