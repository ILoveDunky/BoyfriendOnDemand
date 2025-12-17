
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
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
  const [letters, setLetters] = useState<Letter[]>(initialLetters);
  const [playlists, setPlaylists] = useState<Playlist[]>(initialPlaylists);
  const [images, setImages] = useState<ImagePlaceholder[]>(initialImages);
  const [soundboardCategories, setSoundboardCategories] = useState<SoundboardCategory[]>(initialSoundboardCategories);

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

    