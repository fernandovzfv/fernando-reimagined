
import React from 'react';
import { cn } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { supabaseClient } from '@/integrations/supabase/client';

const logos = [
  { name: 'AutoCAD', alt: 'AutoCAD Logo' },
  { name: 'PVElite', alt: 'PVElite Logo' },
  { name: 'OnShape', alt: 'OnShape Logo' },
  { name: 'Creo', alt: 'Creo Logo' },
  { name: 'ASME', alt: 'ASME Logo' },
  { name: 'API', alt: 'API Logo' },
  { name: 'ASME-PBE', alt: 'ASME-PBE Logo' },
];

const LogoMarquee = ({ className }: { className?: string }) => {
  const getImageUrl = (logoName: string) => {
    const { data } = supabaseClient
      .storage
      .from('pictures')
      .getPublicUrl(`${logoName.toLowerCase()}-logo.png`);
    
    return data.publicUrl;
  };

  return (
    <div className={cn('w-full py-8', className)}>
      <div className="container mx-auto">
        <Carousel
          opts={{
            align: 'start',
            loop: true,
            dragFree: true,
          }}
          className="w-full"
        >
          <CarouselContent className="flex items-center">
            {logos.map((logo) => (
              <CarouselItem key={logo.name} className="flex basis-1/2 md:basis-1/3 lg:basis-1/4 items-center justify-center p-4">
                <div className="relative h-16 w-full opacity-70 hover:opacity-100 transition-opacity">
                  <img
                    src={getImageUrl(logo.name)}
                    alt={logo.alt}
                    className="h-full w-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.svg';
                    }}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default LogoMarquee;
