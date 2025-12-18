
import type { LucideIcon } from 'lucide-react';
import { Heart, Moon, Smile, Sparkles, Coffee, Briefcase, HeartHandshake, Feather, CloudRain, Wind, Package, BookOpen, Mic2 } from 'lucide-react';

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
  footer?: string;
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
      { id: 'morning1', title: 'Good Morning', audioSrc: 'https://files.catbox.moe/mtlwey.mp3' },
      { id: 'morning2', title: 'Every Morning With You', audioSrc: 'https://files.catbox.moe/mtlwey.mp3' },
      { id: 'morning3', title: 'Love Of My Life', audioSrc: 'https://files.catbox.moe/7g3jn0.mp3' },
      { id: 'morning4', title: 'Water', audioSrc: 'https://files.catbox.moe/oppbfh.mp3' },
      { id: 'morning5', title: 'Good Morning... I Love Youuu', audioSrc: 'https://files.catbox.moe/57cs5f.mp3' },
      { id: 'morning6', title: 'Thank You', audioSrc: 'https://files.catbox.moe/4n27b1.mp3' },
    ],
  },
  {
    id: 'everyday-before-work',
    name: '💼 Before Work',
    icon: Briefcase,
    clips: [
      { id: 'work1', title: 'Have A Good Day At Work', audioSrc: 'https://files.catbox.moe/gkiuzl.mp3' },
      { id: 'work2', title: 'I\'m Proud Of You Already', audioSrc: 'https://files.catbox.moe/zbvfpa.mp3' },
      { id: 'work3', title: 'Be Gentle With Yourself', audioSrc: 'https://files.catbox.moe/4o23cr.mp3' },
      { id: 'work4', title: 'If Anybody\'s Mean', audioSrc: 'https://files.catbox.moe/qhlz2r.mp3' },
      { id: 'work5', title: 'You\'ve Got This', audioSrc: 'https://files.catbox.moe/sdcz2j.mp3' },
    ],
  },
  {
    id: 'everyday-cant-talk',
    name: '🤫 When We Can’t Talk Yet',
    icon: Moon,
    clips: [
        { id: 'cant-talk1', title: 'I Know Waiting Is Hard', audioSrc: 'https://files.catbox.moe/5nrz7w.mp3' },
        { id: 'cant-talk2', title: 'Not Being Able To Talk Much', audioSrc: 'https://files.catbox.moe/ulo6so.mp3' },
        { id: 'cant-talk3', title: 'Still On My Mind', audioSrc: 'https://files.catbox.moe/8ed7yy.mp3' },
        { id: 'cant-talk4', title: 'Nothing Has Changed', audioSrc: 'https://files.catbox.moe/bxrnf0.mp3' },
    ],
  },
  {
    id: 'everyday-just-because',
    name: '💕 Just Because',
    icon: Heart,
    clips: [
        { id: 'just-because1', title: 'Hiii', audioSrc: 'https://files.catbox.moe/xzbmpw.mp3' },
        { id: 'just-because2', title: 'I Love Youuuu', audioSrc: 'https://files.catbox.moe/uej4di.mp3' },
        { id: 'just-because3', title: 'If Nothing Lasts Forever...', audioSrc: 'https://files.catbox.moe/q9357e.mp3' },
        { id: 'just-because4', title: 'Soooo Lucky', audioSrc: 'https://files.catbox.moe/76kkt3.mp3' },
        { id: 'just-because5', title: 'Only Play This One Alone', audioSrc: 'https://files.catbox.moe/1ao0w7.mp3' },
        { id: 'just-because6', title: 'All The Time', audioSrc: 'https://files.catbox.moe/ynsemf.mp3' },
        { id: 'just-because7', title: 'Favorite Distraction', audioSrc: 'https://files.catbox.moe/wi8nic.mp3' },
    ],
  },
  // Soft Moments
  {
    id: 'soft-near',
    name: '🌸 When You Just Want Me Near',
    icon: HeartHandshake,
    clips: [
        { id: 'near1', title: 'I Wish I Was There Too', audioSrc: 'https://files.catbox.moe/fqhtrd.mp3' },
        { id: 'near2', title: 'Even From So Far Away', audioSrc: 'https://files.catbox.moe/6roeil.mp3' },
        { id: 'near3', title: 'Hug You Properly', audioSrc: 'https://files.catbox.moe/wnuo6w.mp3' },
        { id: 'near4', title: 'Even If We Can\'t Touch', audioSrc: 'https://files.catbox.moe/0ot38r.mp3' },
    ],
    footer: "Sorry there aren't more of these... I tear up a little when I record them."
  },
  {
    id: 'soft-affection',
    name: '🥰 Affection',
    icon: Smile,
    clips: [
        { id: 'affection1', title: 'Come Closer', audioSrc: 'https://files.catbox.moe/95xtqu.mp3' },
        { id: 'affection2', title: 'Come Here A Second', audioSrc: 'https://files.catbox.moe/j9gxv1.mp3' },
        { id: 'affection3', title: 'Mwahhhh', audioSrc: 'https://files.catbox.moe/juyok3.mp3' },
        { id: 'affection4', title: 'Kiss You All Over', audioSrc: 'https://files.catbox.moe/wg7721.mp3' },
        { id: 'affection5', title: 'You Look Really Pretty', audioSrc: 'https://files.catbox.moe/deo1v4.mp3' },
        { id: 'affection6', title: 'A Million Kisses', audioSrc: 'https://files.catbox.moe/vjbwh8.mp3' },
        { id: 'affection7', title: 'For When You Miss Me', audioSrc: 'https://files.catbox.moe/lf6blh.mp3' },
        { id: 'affection8', title: 'I Love You Just For Being You', audioSrc: 'https://files.catbox.moe/hqcpxb.mp3' },
        { id: 'affection9', title: 'I Love You I Love You I Love You...', audioSrc: 'https://files.catbox.moe/b6mmr8.mp3' },
    ],
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
