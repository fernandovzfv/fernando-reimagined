
import React, { useEffect, useState } from 'react';
import { Shield, Lightbulb, Code, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from './LanguageProvider';
import { t } from '@/lib/translations';
import { supabase } from '@/integrations/supabase/client';

const AboutSection = () => {
  const { language } = useLanguage();
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});
  
  const values = [
    {
      icon: <Lightbulb className="h-6 w-6 text-brand-purple" />,
      titleKey: "valuesTitle1",
      descriptionKey: "valuesDesc1",
      imageName: "chemical-plants.jpg"
    },
    {
      icon: <Code className="h-6 w-6 text-brand-teal" />,
      titleKey: "valuesTitle2",
      descriptionKey: "valuesDesc2",
      imageName: "pressure-vessels.jpg"
    },
    {
      icon: <Shield className="h-6 w-6 text-brand-blue" />,
      titleKey: "valuesTitle3",
      descriptionKey: "valuesDesc3",
      imageName: "shell-&-tube-heat-exchangers.jpg"
    },
    {
      icon: <BookOpen className="h-6 w-6 text-brand-purple" />,
      titleKey: "valuesTitle4",
      descriptionKey: "valuesDesc4",
      imageName: "package-equipment.jpg"
    }
  ];

  useEffect(() => {
    // Fetch public URLs for images from Supabase
    const loadImages = async () => {
      try {
        const urls: Record<string, string> = {};
        
        for (const value of values) {
          const { data } = await supabase
            .storage
            .from('pictures')
            .getPublicUrl(value.imageName);
            
          if (data?.publicUrl) {
            urls[value.imageName] = data.publicUrl;
          }
        }
        
        setImageUrls(urls);
      } catch (error) {
        console.error('Error loading images from Supabase:', error);
      }
    };
    
    loadImages();
  }, []);

  return (
    <section id="about" className="min-h-screen flex items-center section-padding bg-secondary/80 backdrop-blur-sm">
      <div className="container mx-auto container-padding">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Left column with image */}
          <div className="lg:col-span-2 flex justify-center">
            <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden rounded-md border-4 border-brand-blue/20 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                alt="Developer profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Right column with content */}
          <div className="lg:col-span-3">
            <h2 className="mb-6">{t('aboutMe', language)}</h2>
            <p className="text-lg text-foreground/80 mb-4">
              {t('aboutBody1', language)}
            </p>
            <p className="text-lg text-foreground/80 mb-8">
              {t('aboutBody2', language)}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <Card 
                  key={index} 
                  className="relative border border-border/50 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  <div 
                    className="absolute inset-0 z-0 bg-cover bg-center opacity-40 dark:opacity-30"
                    style={{
                      backgroundImage: imageUrls[value.imageName] ? `url(${imageUrls[value.imageName]})` : 'none'
                    }}
                  />
                  <div className="absolute inset-0 bg-card/60 dark:bg-card/80 backdrop-blur-[2px] z-10" />
                  <CardContent className="p-6 relative z-20">
                    <div className="rounded-full bg-accent/20 p-3 w-fit mb-4">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">{t(value.titleKey as any, language)}</h3>
                    <p className="text-foreground/90">{t(value.descriptionKey as any, language)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
