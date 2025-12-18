
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PenSquare, Sparkles } from 'lucide-react';

export default function DeveloperPage() {
  return (
    <div>
      <header className="mb-8">
        <h1 className="font-headline text-4xl font-bold tracking-tight">Developer Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Manage all the content for Boyfriend on Demand from here.
        </p>
      </header>
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <PenSquare />
              Content Management
            </CardTitle>
            <CardDescription>
              Add, edit, or remove audio clips, photos, letters, and playlists. Changes are saved automatically.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              This is where you'll upload new selfies, record sweet messages, write new letters, and update the playlists. Keep the haven fresh and full of love.
            </p>
            <Button asChild>
              <Link href="/developer/content">Manage Content</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
