
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { reasonsForJar } from '@/lib/data';
import { Package, Gift } from 'lucide-react';

export default function JarPage() {
  const [currentReason, setCurrentReason] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [revealedReasons, setRevealedReasons] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Preload a reason on mount
    drawNewReason(true);
  }, []);

  const drawNewReason = (initial = false) => {
    if (reasonsForJar.length === 0) return;

    let availableReasons = reasonsForJar.filter(r => !revealedReasons.includes(r));
    if (availableReasons.length === 0) {
      // All reasons have been seen, reset the list
      setRevealedReasons([]);
      availableReasons = reasonsForJar;
    }
    
    if (isClient) {
        const randomIndex = Math.floor(Math.random() * availableReasons.length);
        const newReason = availableReasons[randomIndex];

        if (!initial) {
            setIsShaking(true);
            setTimeout(() => {
                setCurrentReason(newReason);
                setRevealedReasons(prev => [...prev, newReason]);
                setIsShaking(false);
            }, 800);
        } else {
            setCurrentReason(newReason);
            setRevealedReasons(prev => [...prev, newReason]);
        }
    }
  };
  

  return (
    <div className="container mx-auto flex flex-col items-center justify-center text-center">
      <header className="mb-8">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
          A Jar Full of Love
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Whenever you need a reminder of why you mean so much to me, just draw one from the jar.
        </p>
      </header>

      <div className="relative w-full max-w-md">
        <div className={`relative transition-transform duration-500 ${isShaking ? 'animate-shake' : ''}`}>
           <Package className="w-48 h-48 sm:w-64 sm:h-64 mx-auto text-primary/30" strokeWidth={0.5} />
        </div>
        
        <Card className="min-h-[150px] mt-[-50px] relative bg-background/80 border-2 border-dashed border-accent p-6 flex items-center justify-center text-center shadow-lg transition-all duration-300">
          <CardContent className="p-0">
            {currentReason ? (
                <p className="text-xl font-medium text-foreground fade-in">{currentReason}</p>
            ) : (
                <p className="text-muted-foreground">Click the button to draw a reason...</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Button onClick={() => drawNewReason(false)} size="lg" className="mt-8 rounded-full shadow-lg hover:shadow-accent/40 transition-shadow">
        <Gift className="mr-2 h-5 w-5" />
        Draw a New Reason
      </Button>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px) rotate(-2deg); }
          20%, 40%, 60%, 80% { transform: translateX(5px) rotate(2deg); }
        }
        .animate-shake {
          animation: shake 0.8s ease-in-out;
        }
      `}</style>
    </div>
  );
}
