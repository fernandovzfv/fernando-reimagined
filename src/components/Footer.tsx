
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
      <div className="container mx-auto container-padding min-h-[10vh] flex flex-col">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex flex-col items-center md:items-start">
            <a href="#home" className="text-2xl font-bold">
              <span className="relative">
                <span className="inline-block text-brand-blue transform -rotate-12 font-extrabold">F</span>
                <span className="inline-block">ernando </span>
                <span className="inline-block text-brand-blue transform -rotate-12 font-extrabold">V</span>
                <span className="inline-block">ázquez</span>
              </span>
            </a>
            
            <p className="mt-1 text-foreground/70 text-sm">
              {language === 'en' ? 'Computer Science Engineer' : 'Ingeniero en Ciencias de la Computación'}
            </p>
          </div>
          
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            <a href="#home" className="text-foreground/70 hover:text-foreground transition-colors text-sm">{t('home', language)}</a>
            <a href="#about" className="text-foreground/70 hover:text-foreground transition-colors text-sm">{t('about', language)}</a>
            <a href="#skills" className="text-foreground/70 hover:text-foreground transition-colors text-sm">{t('skills', language)}</a>
            <a href="#projects" className="text-foreground/70 hover:text-foreground transition-colors text-sm">{t('projects', language)}</a>
            <a href="#contact" className="text-foreground/70 hover:text-foreground transition-colors text-sm">{t('contact', language)}</a>
          </nav>
          
          <div className="flex flex-col items-center md:items-end">
            <p className="text-foreground/70 text-sm">
              © {currentYear} Fernando Vázquez
            </p>
            <p className="text-foreground/70 text-xs">
              {t('footerDesigned', language)}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
