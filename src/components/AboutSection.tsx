
import React from 'react';
import { Shield, Lightbulb, Code, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from './LanguageProvider';
import { t } from '@/lib/translations';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const AboutSection = () => {
  const { language } = useLanguage();
  
  const values = [
    {
      icon: <Lightbulb className="h-6 w-6 text-brand-purple" />,
      titleKey: "valuesTitle1",
      descriptionKey: "valuesDesc1"
    },
    {
      icon: <Code className="h-6 w-6 text-brand-teal" />,
      titleKey: "valuesTitle2",
      descriptionKey: "valuesDesc2"
    },
    {
      icon: <Shield className="h-6 w-6 text-brand-blue" />,
      titleKey: "valuesTitle3",
      descriptionKey: "valuesDesc3"
    },
    {
      icon: <BookOpen className="h-6 w-6 text-brand-purple" />,
      titleKey: "valuesTitle4",
      descriptionKey: "valuesDesc4"
    }
  ];

  return (
    <section id="about" className="min-h-screen flex items-center section-padding bg-secondary/80 backdrop-blur-sm">
      <div className="container mx-auto container-padding">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Left column with image */}
          <div className="lg:col-span-2 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 overflow-hidden rounded-full border-4 border-brand-blue/20 shadow-xl">
              <Avatar className="w-full h-full">
                <AvatarImage
                  src="/placeholder.svg"
                  alt="Profile"
                  className="object-cover"
                />
                <AvatarFallback className="bg-brand-blue/10 text-4xl font-bold text-brand-blue">
                  FM
                </AvatarFallback>
              </Avatar>
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
                <Card key={index} className="border border-border/50 shadow-sm hover:shadow-md transition-shadow bg-card/90 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="rounded-full bg-accent/20 p-3 w-fit mb-4">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{t(value.titleKey as any, language)}</h3>
                    <p className="text-foreground/70">{t(value.descriptionKey as any, language)}</p>
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
