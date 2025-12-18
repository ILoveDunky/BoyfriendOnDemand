
import type { LucideIcon } from 'lucide-react';
import { Heart, Moon, Smile, MessagesSquare, Shield, Sparkles } from 'lucide-react';

export interface AudioClip {
  id: string;
  title: string;
  audioSrc: string; 
}

export interface SoundboardCategory {
  id: string;
  name: string;
  icon: LucideIcon;
  clips: AudioClip[];
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  embedSrc: string; 
}

export interface Letter {
  id: string;
  title: string;
  date: string;
  content: string;
}

export const soundboardCategories: SoundboardCategory[] = [
  {
    id: 'safe',
    name: '🫂 You’re Safe With Me',
    icon: Shield,
    clips: [
      { id: 'safe1', title: 'A quick reminder that you are loved', audioSrc: 'https://cdn.pixabay.com/audio/2022/10/18/audio_db2522a722.mp3' },
      { id: 'safe2', title: 'Breathe with me', audioSrc: 'https://cdn.pixabay.com/audio/2024/05/13/audio_17291a13a8.mp3' },
      { id: 'safe3', title: 'Everything is okay', audioSrc: 'https://cdn.pixabay.com/audio/2022/10/18/audio_2809e5e3d7.mp3' },
    ],
  },
  {
    id: 'miss-you',
    name: '💜 When You Miss Me',
    icon: Heart,
    clips: [
      { id: 'miss1', title: 'I miss you too', audioSrc: '' },
      { id: 'miss2', title: 'Thinking about our next date', audioSrc: '' },
    ],
  },
  {
    id: 'just-because',
    name: '💕 Just Because',
    icon: Sparkles,
    clips: [
      { id: 'because1', title: 'You made me smile today', audioSrc: '' },
      { id: 'because2', title: 'A silly joke', audioSrc: '' },
      { id: 'because3', title: 'I love you', audioSrc: '' },
    ],
  },
];

export const playlists: Playlist[] = [
  {
    id: 'pl1',
    title: 'Peaceful Piano for Quiet Moments',
    description: 'Soft piano melodies to help you relax and find your center.',
    embedSrc: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX4sWSpwq3LiO?utm_source=generator',
  },
  {
    id: 'pl2',
    title: 'Cozy Lo-fi Beats',
    description: 'Chill beats for when you just need to feel cozy and safe.',
    embedSrc: 'https://open.spotify.com/embed/playlist/37i9dQZF1DWWQRwui02Gu5?utm_source=generator',
  },
];

export const letters: Letter[] = [
  {
    id: 'letter1',
    title: 'The Day I Realized',
    date: 'October 26, 2023',
    content: `I remember the exact moment I knew you were the one. We were just sitting in the park, not saying anything, and the world just felt... right. It was like all the noise in my head went quiet and all that was left was this peaceful, warm feeling. Being with you feels like coming home. Every day I find a new reason to fall even more in love with you.`,
  },
  {
    id: 'letter2',
    title: 'For When You Doubt Yourself',
    date: 'January 15, 2024',
    content: `Sometimes I see you get that little crease between your eyebrows when you're worried, and I wish you could see yourself the way I see you. You are the strongest, kindest, and most brilliant person I have ever met. You handle every challenge with so much grace. Please never doubt the incredible person you are. You are more than enough. You are everything.`,
  },
];
