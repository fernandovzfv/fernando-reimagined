
import React from 'react';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from './LanguageProvider';
import { t } from '@/lib/translations';

const HeroSection = () => {
  const { language } = useLanguage();
  
  return (
    <section id="home" className="min-h-screen flex flex-col justify-center relative overflow-hidden pb-16 pt-32">
      <div className="container mx-auto container-padding relative z-10">
        <div className="max-w-3xl">
          <h1 className="animate-fade-in backdrop-blur-sm inline-block text-foreground">
            <span className="relative">
              <span className="inline-block">Hi! I'm  </span>
              <span className="inline-block text-brand-purple transform -rotate-12 font-extrabold">F</span>
              <span className="inline-block">ernando </span>
              <span className="inline-block text-brand-purple transform -rotate-12 font-extrabold">V</span>
              <span className="inline-block">ázquez</span></span>
          </h1>
          
          <p className="text-xl md:text-2xl mt-6 text-foreground/90 animate-fade-in backdrop-blur-sm inline-block" style={{ animationDelay: '0.2s' }}>
            {t('heroDescription', language)}
          </p>
          
          <div className="flex flex-wrap gap-4 mt-10 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button className="bg-brand-blue hover:bg-brand-blue/90">
              <Mail className="mr-2 h-4 w-4" /> {t('ctaButton', language)}
            </Button>
            <Button variant="outline" className="border-brand-blue text-brand-blue hover:bg-brand-blue/10">
              {language === 'en' ? 'Download Resume' : 'Descargar CV'}
            </Button>
          </div>
          
          <div className="flex items-center gap-6 mt-10 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <a href="https://github.com/fernandovzfv" target="_blank" rel="noopener noreferrer" 
               className="text-foreground/70 hover:text-brand-blue transition-colors">
              <Github size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
               className="text-foreground/70 hover:text-brand-blue transition-colors">
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-foreground/50 hover:text-foreground transition-colors">
          <ArrowDown size={24} />
        </a>
      </div>
      
      {/* Background elements - reduced opacity to better show particles */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-brand-purple/10 to-transparent blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-brand-blue/10 to-transparent blur-3xl rounded-full"></div>
    </section>
  );
};

export default HeroSection;
