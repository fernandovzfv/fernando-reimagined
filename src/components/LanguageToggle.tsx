
import React from 'react';
import { useLanguage } from './LanguageProvider';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();
  
  return (
    <div className="flex items-center gap-1 ml-2">
      <Button 
        variant="ghost" 
        size="sm"
        className={cn(
          "px-2 h-9 rounded-full", 
          language === 'en' ? "font-bold" : "font-normal text-muted-foreground"
        )}
        onClick={() => setLanguage('en')}
        aria-label="Switch to English"
      >
        <span className="text-xs">EN</span>
      </Button>
      
      <span className="text-muted-foreground">/</span>
      
      <Button 
        variant="ghost" 
        size="sm"
        className={cn(
          "px-2 h-9 rounded-full", 
          language === 'es' ? "font-bold" : "font-normal text-muted-foreground"
        )}
        onClick={() => setLanguage('es')}
        aria-label="Switch to Spanish"
      >
        <span className="text-xs">ES</span>
      </Button>
      
      <Globe size={16} className="text-foreground/80 ml-1" />
    </div>
  );
};

export default LanguageToggle;
