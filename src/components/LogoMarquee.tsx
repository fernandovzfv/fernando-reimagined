
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { supabase } from '@/integrations/supabase/client';
import useEmblaCarousel from 'embla-carousel-react';

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
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    dragFree: true,
    containScroll: "keepSnaps",
    align: "start",
  });
  
  const autoplayRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const getImageUrl = (logoName: string) => {
    const { data } = supabase
      .storage
      .from('pictures')
      .getPublicUrl(`${logoName.toLowerCase()}-logo.png`);
    
    return data.publicUrl;
  };
  
  // Set up continuous scrolling
  useEffect(() => {
    if (!emblaApi) return;
    
    const autoplay = () => {
      if (!emblaApi || !document.visibilityState) return;
      if (document.visibilityState !== 'visible') return;
      
      emblaApi.scrollNext();
      
      autoplayRef.current = setTimeout(autoplay, 30); // Adjust the speed as needed (smaller value = faster)
    };
    
    // Start autoplay
    autoplayRef.current = setTimeout(autoplay, 30);
    
    return () => {
      // Clean up autoplay on component unmount
      if (autoplayRef.current) {
        clearTimeout(autoplayRef.current);
      }
    };
  }, [emblaApi]);

  // To create continuous scrolling effect, we duplicate the logos
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <div className={cn('w-full py-8 overflow-hidden', className)}>
      <div className="container mx-auto">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {duplicatedLogos.map((logo, index) => (
              <div key={`${logo.name}-${index}`} className="flex-shrink-0 flex-grow-0 basis-1/3 md:basis-1/5 lg:basis-1/7 px-4">
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoMarquee;
