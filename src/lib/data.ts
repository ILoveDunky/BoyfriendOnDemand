import type { LucideIcon } from 'lucide-react';
import { Heart, Moon, Smile, MessagesSquare, Shield, Sparkles } from 'lucide-react';

export interface AudioClip {
  id: string;
  title: string;
  // In a real app, this would point to an actual audio file URL
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
  // In a real app, this would be a Spotify/Apple Music embed link or URI
  url: string; 
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
      { id: 'safe1', title: 'A quick reminder that you are loved', audioSrc: '/audio/placeholder.mp3' },
      { id: 'safe2', title: 'Breathe with me', audioSrc: '/audio/placeholder.mp3' },
      { id: 'safe3', title: 'Everything is okay', audioSrc: '/audio/placeholder.mp3' },
    ],
  },
  {
    id: 'miss-you',
    name: '💜 When You Miss Me',
    icon: Heart,
    clips: [
      { id: 'miss1', title: 'I miss you too', audioSrc: '/audio/placeholder.mp3' },
      { id: 'miss2', title: 'Thinking about our next date', audioSrc: '/audio/placeholder.mp3' },
      { id: 'miss3', title: 'A random memory of us', audioSrc: '/audio/placeholder.mp3' },
    ],
  },
  {
    id: 'quiet-thoughts',
    name: '🧠 Quieting Your Thoughts',
    icon: MessagesSquare,
    clips: [
      { id: 'quiet1', title: 'Let\'s ground ourselves', audioSrc: '/audio/placeholder.mp3' },
      { id: 'quiet2', title: 'Your thoughts are just thoughts', audioSrc: '/audio/placeholder.mp3' },
      { id: 'quiet3', title: 'A comforting sound', audioSrc: '/audio/placeholder.mp3' },
    ],
  },
  {
    id: 'end-of-day',
    name: '🌙 Ending the Day Gently',
    icon: Moon,
    clips: [
      { id: 'end1', title: 'Goodnight, my love', audioSrc: '/audio/placeholder.mp3' },
      { id: 'end2', title: 'Sweet dreams', audioSrc: '/audio/placeholder.mp3' },
      { id: 'end3', title: 'A soft lullaby I like', audioSrc: '/audio/placeholder.mp3' },
    ],
  },
  {
    id: 'just-because',
    name: '💕 Just Because',
    icon: Sparkles,
    clips: [
      { id: 'because1', title: 'You made me smile today', audioSrc: '/audio/placeholder.mp3' },
      { id: 'because2', title: 'A silly joke', audioSrc: '/audio/placeholder.mp3' },
      { id: 'because3', title: 'I love you', audioSrc: '/audio/placeholder.mp3' },
    ],
  },
  {
    id: 'hard-moments',
    name: '🔐 For Really Hard Moments',
    icon: Smile,
    clips: [
      { id: 'hard1', title: 'My promise to you', audioSrc: '/audio/placeholder.mp3' },
      { id: 'hard2', title: 'We can get through anything', audioSrc: '/audio/placeholder.mp3' },
      { id: 'hard3', title: 'A pep talk from me to you', audioSrc: '/audio/placeholder.mp3' },
    ],
  },
];

export const playlists: Playlist[] = [
  {
    id: 'pl1',
    title: 'Peaceful Piano for Quiet Moments',
    description: 'Soft piano melodies to help you relax and find your center.',
    url: '#',
  },
  {
    id: 'pl2',
    title: 'Cozy Lo-fi Beats',
    description: 'Chill beats for when you just need to feel cozy and safe.',
    url: '#',
  },
  {
    id: 'pl3',
    title: 'Upbeat Songs for a Brighter Day',
    description: 'A playlist to lift your spirits and make you smile.',
    url: '#',
  },
   {
    id: 'pl4',
    title: 'Nostalgic Throwbacks',
    description: 'Songs that remind me of us and all our good times.',
    url: '#',
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
  {
    id: 'letter3',
    title: 'A Silly Note',
    date: 'March 4, 2024',
    content: `Do you remember that time we tried to bake that ridiculously complicated cake and ended up covering the entire kitchen in flour? I was still finding flour in my hair days later. I love our silly moments. I love that we can be complete goofballs together. Thank you for bringing so much laughter into my life.`,
  },
];
