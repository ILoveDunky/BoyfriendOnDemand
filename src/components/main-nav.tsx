
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, Image as ImageIcon, Music, BookHeart, LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils';
import MusicToggle from './music-toggle';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/soundboard', label: 'Soundboard', icon: Music },
  { href: '/gallery', label: 'Gallery', icon: ImageIcon },
  { href: '/letters', label: 'Letters', icon: BookHeart },
  { href: '/playlists', label: 'Playlists', icon: Heart },
];

export default function MainNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-headline text-xl font-bold text-primary">
          <Heart className="h-6 w-6 text-accent" />
          Boyfriend on Demand
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-accent/50 hover:text-accent-foreground',
                pathname === item.href ? 'bg-accent/80 text-accent-foreground' : 'text-muted-foreground'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
            <MusicToggle />
        </div>
      </div>
    </header>
  );
}
