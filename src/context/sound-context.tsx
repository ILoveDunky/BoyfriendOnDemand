'use client';

import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';
import * as Tone from 'tone';

interface SoundContextType {
  isMusicPlaying: boolean;
  toggleMusic: () => void;
  playSoundEffect: (url: string) => void;
  isInitialized: boolean;
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
    
    await Tone.start();
    
    volume.current = new Tone.Volume(-16).toDestination(); // Start with low volume
    musicPlayer.current = new Tone.Player({
      // In a real app, provide a high-quality, seamless loop
      url: "https://cdn.pixabay.com/audio/2023/10/10/audio_242fceb849.mp3",
      loop: true,
      fadeOut: 1,
      fadeIn: 1,
    }).connect(volume.current);

    sfxPlayer.current = new Tone.Player().toDestination();
    sfxPlayer.current.fadeOut = 0.1;
    
    setIsInitialized(true);
    console.log('Audio context initialized.');
  }, [isInitialized]);

  const toggleMusic = useCallback(async () => {
    if (!isInitialized) {
      await initAudio();
    }
    
    if (musicPlayer.current?.state === 'started') {
      musicPlayer.current.stop();
      setIsMusicPlaying(false);
    } else {
      if(musicPlayer.current?.loaded) {
        musicPlayer.current.start();
        setIsMusicPlaying(true);
      } else {
        // Handle case where music is not loaded yet
        Tone.loaded().then(() => {
          musicPlayer.current?.start();
          setIsMusicPlaying(true);
        });
      }
    }
  }, [initAudio, isInitialized]);

  const playSoundEffect = useCallback(async (url: string) => {
    if (!isInitialized) {
      await initAudio();
    }

    if (sfxPlayer.current) {
        sfxPlayer.current.load(url).then(() => {
          if (musicPlayer.current && musicPlayer.current.state === 'started' && volume.current) {
            // Duck the music
            volume.current.volume.rampTo(-24, 0.5);
          }
          sfxPlayer.current?.start();
        });

        sfxPlayer.current.onstop = () => {
            if (musicPlayer.current && musicPlayer.current.state === 'started' && volume.current) {
                // Restore music volume
                volume.current.volume.rampTo(-16, 0.5);
            }
        }
    }

  }, [initAudio, isInitialized]);
  
  // This effect ensures that the audio context is started by a user gesture.
  // We attach it to the first click anywhere on the document.
  useEffect(() => {
    const handleFirstClick = async () => {
      if (!isInitialized) {
        await initAudio();
      }
      window.removeEventListener('click', handleFirstClick);
    };
    
    window.addEventListener('click', handleFirstClick);
    
    return () => {
      window.removeEventListener('click', handleFirstClick);
    };
  }, [initAudio, isInitialized]);


  return (
    <SoundContext.Provider value={{ isMusicPlaying, toggleMusic, playSoundEffect, isInitialized }}>
      {children}
    </SoundContext.Provider>
  );
};
