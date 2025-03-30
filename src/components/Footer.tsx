
import React from 'react';
import { cn } from '@/lib/utils';
import { useLanguage } from './LanguageProvider';
import { t } from '@/lib/translations';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { language } = useLanguage();
  
  return (
    <footer className="bg-secondary py-6">
      <div className="container mx-auto container-padding">
        <div className="flex flex-col items-center text-center">
          <a href="#home" className="text-2xl font-bold">
            <span className="gradient-heading">Fernando</span>
          </a>
          
          <p className="mt-2 text-foreground/70">
            {language === 'en' ? 'Computer Science Engineer' : 'Ingeniero en Ciencias de la Computación'}
          </p>
          
          <Separator className="my-4 w-24 bg-border/50" />
          
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4">
            <a href="#home" className="text-foreground/70 hover:text-foreground transition-colors text-sm">{t('home', language)}</a>
            <a href="#about" className="text-foreground/70 hover:text-foreground transition-colors text-sm">{t('about', language)}</a>
            <a href="#skills" className="text-foreground/70 hover:text-foreground transition-colors text-sm">{t('skills', language)}</a>
            <a href="#projects" className="text-foreground/70 hover:text-foreground transition-colors text-sm">{t('projects', language)}</a>
            <a href="#contact" className="text-foreground/70 hover:text-foreground transition-colors text-sm">{t('contact', language)}</a>
          </nav>
          
          <div className="text-center">
            <p className="text-foreground/70 text-sm">
              © {currentYear} Fernando Vázquez. {t('footerRights', language)}
            </p>
            <p className="mt-1 text-foreground/70 text-xs">
              {t('footerDesigned', language)}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
