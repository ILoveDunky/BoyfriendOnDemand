
'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { 
    letters as initialLetters,
    playlists as initialPlaylists,
    soundboardCategories as initialSoundboardCategories,
    Letter,
    Playlist,
    SoundboardCategory
} from '@/lib/data';
import { 
    PlaceHolderImages as initialImages,
    ImagePlaceholder
} from '@/lib/placeholder-images';

interface ContentContextType {
  letters: Letter[];
  setLetters: React.Dispatch<React.SetStateAction<Letter[]>>;
  playlists: Playlist[];
  setPlaylists: React.Dispatch<React.SetStateAction<Playlist[]>>;
  images: ImagePlaceholder[];
  setImages: React.Dispatch<React.SetStateAction<ImagePlaceholder[]>>;
  soundboardCategories: SoundboardCategory[];
  setSoundboardCategories: React.Dispatch<React.SetStateAction<SoundboardCategory[]>>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [letters, setLetters] = useLocalStorage<Letter[]>('content-letters', initialLetters);
  const [playlists, setPlaylists] = useLocalStorage<Playlist[]>('content-playlists', initialPlaylists);
  const [images, setImages] = useLocalStorage<ImagePlaceholder[]>('content-images', initialImages);
  const [soundboardCategories, setSoundboardCategories] = useLocalStorage<SoundboardCategory[]>('content-soundboard', initialSoundboardCategories);

  const value = {
    letters, setLetters,
    playlists, setPlaylists,
    images, setImages,
    soundboardCategories, setSoundboardCategories
  };

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
};
