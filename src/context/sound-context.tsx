
'use client';

import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';
import * as Tone from 'tone';

interface SoundContextType {
  isMusicPlaying: boolean;
  toggleMusic: () => void;
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
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const musicPlayer = useRef<Tone.Player | null>(null);
  const sfxPlayer = useRef<Tone.Player | null>(null);
  const volume = useRef<Tone.Volume | null>(null);

  const initAudio = useCallback(async () => {
    if (isInitialized) return;
    try {
      await Tone.start();
      
      volume.current = new Tone.Volume(-18).toDestination(); // Lowered volume slightly
      musicPlayer.current = new Tone.Player({
        url: "https://cdn.pixabay.com/audio/2022/10/11/audio_19194e43b6.mp3", // A calm piano track
        loop: true,
        fadeOut: 1,
        fadeIn: 1,
      }).connect(volume.current);

      await Tone.loaded();

      sfxPlayer.current = new Tone.Player().toDestination();
      sfxPlayer.current.fadeOut = 0.1;
      
      setIsInitialized(true);
      console.log('Audio context initialized.');

      // Autoplay music after initialization
      if (musicPlayer.current?.state !== 'started') {
        musicPlayer.current?.start();
        setIsMusicPlaying(true);
      }
    } catch (e) {
      console.error("Error initializing audio:", e);
    }
  }, [isInitialized]);

  const toggleMusic = useCallback(async () => {
    if (!isInitialized) {
      await initAudio();
      return; // initAudio now handles autoplay
    }
    
    if (musicPlayer.current?.state === 'started') {
      musicPlayer.current.stop();
      setIsMusicPlaying(false);
    } else {
      if(musicPlayer.current?.loaded) {
        musicPlayer.current.start();
        setIsMusicPlaying(true);
      }
    }
  }, [initAudio, isInitialized]);

  const playSoundEffect = useCallback(async (url: string) => {
    if (!url) return; // Don't play if the URL is empty
    if (!isInitialized) {
      await initAudio();
    }

    if (sfxPlayer.current) {
        try {
            if (sfxPlayer.current.state === 'started') {
              sfxPlayer.current.stop();
            }
            // The load method can throw an error if the URL is invalid or inaccessible
            await sfxPlayer.current.load(url);

            if (musicPlayer.current && musicPlayer.current.state === 'started' && volume.current) {
                // Duck the music
                volume.current.volume.rampTo(-24, 0.3);
            }
            sfxPlayer.current?.start();

            // Use onstop to know when the sound effect finishes
            sfxPlayer.current.onstop = () => {
                 if (musicPlayer.current && musicPlayer.current.state === 'started' && volume.current) {
                    // Restore music volume
                    volume.current.volume.rampTo(-18, 0.5);
                }
            }

        } catch (e) {
            console.error('Error playing sound effect', e)
        }
    }

  }, [initAudio, isInitialized]);
  
  return (
    <SoundContext.Provider value={{ isMusicPlaying, toggleMusic, playSoundEffect, isInitialized, initAudio }}>
      {children}
    </SoundContext.Provider>
  );
};
