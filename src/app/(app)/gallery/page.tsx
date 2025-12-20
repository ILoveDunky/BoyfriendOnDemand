
'use client';

import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages as images } from '@/lib/placeholder-images';

export default function GalleryPage() {
  return (
    <div className="container mx-auto">
      <header className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
          For Your Eyes Only
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          A collection of moments, smiles, and silly faces, just for you.
        </p>
      </header>
      
      <div className="flex justify-center">
        <Carousel className="w-full max-w-sm md:max-w-md lg:max-w-lg" opts={{ loop: true }}>
          <CarouselContent>
            {images.map((image) => (
              <CarouselItem key={image.id}>
                <div className="p-1">
                  <Card className="overflow-hidden rounded-2xl">
                    <CardContent className="relative flex aspect-[2/3] items-center justify-center p-0">
                      <Image
                        src={image.imageUrl}
                        alt={image.description}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                        data-ai-hint={image.imageHint}
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-left">
                        <p className="text-lg font-semibold text-white">{image.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-4 sm:ml-16" />
          <CarouselNext className="mr-4 sm:mr-16" />
        </Carousel>
      </div>

    </div>
  );
}
