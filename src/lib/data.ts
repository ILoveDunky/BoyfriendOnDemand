
import type { LucideIcon } from 'lucide-react';
import { Heart, Moon, Smile, Sparkles, Coffee, Briefcase, HeartHandshake, Feather, CloudRain, Wind, Box, Package, BookOpen, Mic2 } from 'lucide-react';

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

// Order: Everyday, Soft, Hard
export const soundboardCategories: SoundboardCategory[] = [
  // Everyday
  {
    id: 'everyday-morning',
    name: '🌤️ Morning, Baby',
    icon: Sparkles,
    clips: [
      { id: 'morning1', title: 'Good Morning', audioSrc: 'https://files.catbox.moe/mtlwey.mp3' }
    ],
  },
  {
    id: 'everyday-before-work',
    name: '💼 Before Work',
    icon: Briefcase,
    clips: [],
  },
  {
    id: 'everyday-cant-talk',
    name: '🤫 When We Can’t Talk Yet',
    icon: Moon,
    clips: [],
  },
  {
    id: 'everyday-just-because',
    name: '💕 Just Because',
    icon: Heart,
    clips: [],
  },
  // Soft Moments
  {
    id: 'soft-near',
    name: '🌸 When You Just Want Me Near',
    icon: HeartHandshake,
    clips: [],
  },
  {
    id: 'soft-affection',
    name: '🥰 Affection',
    icon: Smile,
    clips: [],
  },
  {
    id: 'soft-extra',
    name: '🧸 Extra Soft',
    icon: Feather,
    clips: [],
  },
  {
    id: 'soft-before-nap',
    name: '😴 Before Your Nap',
    icon: Moon,
    clips: [],
  },
  {
    id: 'soft-sit-with-me',
    name: '🪑 Come Sit With Me',
    icon: Coffee,
    clips: [],
  },
  // Hard Moments
  {
    id: 'hard-overthinking',
    name: '🧠 Overthinking',
    icon: Wind,
    clips: [],
  },
  {
    id: 'hard-heavy',
    name: '☁️ Everything Feels Too Heavy',
    icon: CloudRain,
    clips: [],
  },
  {
    id: 'hard-too-much',
    name: '🌊 When You Feel Too Much',
    icon: CloudRain,
    clips: [],
  },
  {
    id: 'hard-small',
    name: '🤏 When You Feel Small',
    icon: Feather,
    clips: [],
  },
  {
    id: 'open-when',
    name: '🫂 Open When You Need It Most',
    icon: Package,
    clips: [],
  },
];

export const easterEggCategory: SoundboardCategory = {
    id: 'easter-egg',
    name: '🤫 Psst...',
    icon: Heart,
    clips: [
        { id: 'kiss1', title: 'Kisses only', audioSrc: '' },
        { id: 'come1', title: 'Come Here', audioSrc: '' },
        { id: 'calm1', title: 'One Minute of Calm', audioSrc: '' },
    ]
};


export const storyCategories: SoundboardCategory[] = [
    {
        id: 'stories-bedtime',
        name: '🌙 Bedtime Stories',
        icon: Moon,
        clips: [],
    },
    {
        id: 'stories-memories',
        name: '💭 Gentle Memories',
        icon: BookOpen,
        clips: [],
    },
    {
        id: 'stories-imagined',
        name: '🫶 Imagined Moments',
        icon: Mic2,
        clips: [],
    }
];

export const playlists: Playlist[] = [
  {
    id: 'pl1',
    title: '21st Afternoon of September',
    description: 'A custom playlist for my love.',
    embedSrc: 'https://open.spotify.com/embed/playlist/2UBykJYuj5b9UiGqh7V3og?utm_source=generator&theme=0',
  },
  {
    id: 'pl2',
    title: 'I Belong With You',
    description: 'Songs that make me think of you.',
    embedSrc: 'https://open.spotify.com/embed/playlist/36ZdGEwWmc0DS4jb0POfX6?utm_source=generator&theme=0',
  },
  {
    id: 'pl3',
    title: 'For You',
    description: 'Just for you.',
    embedSrc: 'https://open.spotify.com/embed/playlist/3fgU9EMBrkR0gGoDz6ad91?utm_source=generator&theme=0',
  },
  {
    id: 'pl4',
    title: 'How You Make Me Feel',
    description: 'A feeling I can\'t describe.',
    embedSrc: 'https://open.spotify.com/embed/playlist/6GQ2bXnvmmKjiqeTenHYFm?utm_source=generator&theme=0',
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
