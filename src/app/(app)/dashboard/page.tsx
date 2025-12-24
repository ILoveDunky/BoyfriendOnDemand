
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Heart, Music, BookHeart, CalendarClock, Package, Album } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
  {
    title: 'Soundboard',
    description: 'Listen to my voice whenever you need to.',
    href: '/soundboard',
    icon: Music,
    color: 'text-primary',
  },
  {
    title: 'Stories',
    description: 'When you need to hear my voice for longer.',
    href: '/stories',
    icon: Album,
    color: 'text-orange-400',
  },
  {
    title: 'Love Letters',
    description: 'Words from my heart to yours.',
    href: '/letters',
    icon: BookHeart,
    color: 'text-red-400',
  },
  {
    title: 'Playlists',
    description: 'Music for every mood we share.',
    href: '/playlists',
    icon: Heart,
    color: 'text-rose-400',
    animated: true,
  },
  {
    title: 'The Jar',
    description: 'A little reminder of why I love you.',
    href: '/jar',
    icon: Package,
    color: 'text-purple-400',
  },
    {
    title: 'Our Timeline',
    description: 'A journey through our favorite moments.',
    href: '/timeline',
    icon: CalendarClock,
    color: 'text-teal-400',
  },
];

export default function DashboardPage() {
  return (
    <div className="container mx-auto">
      <header className="mb-12 text-center">
        <h1 className="font-headline text-3xl font-bold tracking-tight md:text-5xl">
          Welcome, My Love
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          This is your safe space. A little haven I built just for you, filled with pieces of me to keep you company.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <Link href={feature.href} key={feature.title}>
            <Card
              className="group h-full transform-gpu overflow-hidden bg-background/80 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/20"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="p-6">
                <div className="mb-4">
                  <feature.icon className={cn(
                      'h-12 w-12 transition-transform duration-300 group-hover:scale-110',
                      feature.color,
                      { 'heart-breathe': feature.animated }
                    )} 
                    strokeWidth={1.5} 
                  />
                </div>
                <CardTitle className="font-headline text-2xl">{feature.title}</CardTitle>
                <CardDescription className="mt-2">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
