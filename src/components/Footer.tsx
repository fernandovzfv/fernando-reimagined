
import React from 'react';
import { cn } from '@/lib/utils';
import { useLanguage } from './LanguageProvider';
import { t } from '@/lib/translations';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { language } = useLanguage();
  
  return (
    <footer className="bg-secondary py-12">
      <div className="container mx-auto container-padding">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="#home" className="text-2xl font-bold">
              <span className="gradient-heading">Fernando</span>
            </a>
            <p className="mt-2 text-foreground/70">
              {language === 'en' ? 'Computer Science Engineer' : 'Ingeniero en Ciencias de la Computación'}
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <p className="text-foreground/70">
              © {currentYear} Fernando Vázquez. {t('footerRights', language)}
            </p>
            <p className="mt-2 text-foreground/70 text-sm">
              {t('footerDesigned', language)}
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border/30">
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            <a href="#home" className="text-foreground/70 hover:text-foreground transition-colors">{t('home', language)}</a>
            <a href="#about" className="text-foreground/70 hover:text-foreground transition-colors">{t('about', language)}</a>
            <a href="#skills" className="text-foreground/70 hover:text-foreground transition-colors">{t('skills', language)}</a>
            <a href="#projects" className="text-foreground/70 hover:text-foreground transition-colors">{t('projects', language)}</a>
            <a href="#contact" className="text-foreground/70 hover:text-foreground transition-colors">{t('contact', language)}</a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
