
import React from 'react';
import { Shield, Lightbulb, Code, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from './LanguageProvider';
import { t } from '@/lib/translations';

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
    <section id="about" className="section-padding bg-secondary/80 backdrop-blur-sm">
      <div className="container mx-auto container-padding">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="mb-6">{t('aboutMe', language)}</h2>
          <p className="text-lg text-foreground/80">
            {t('aboutBody1', language)}
          </p>
          <p className="text-lg text-foreground/80 mt-4">
            {t('aboutBody2', language)}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
    </section>
  );
};

export default AboutSection;
