
import React from 'react';
import { useLanguage } from './LanguageProvider';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();
  
  return (
    <button 
      onClick={toggleLanguage}
      className={cn(
        "flex items-center justify-center rounded-full p-2 transition-colors",
        "bg-secondary/80 text-secondary-foreground hover:bg-secondary ml-2"
      )}
      aria-label="Toggle language"
    >
      <Globe size={18} />
      <span className="ml-2 text-xs font-bold">{language.toUpperCase()}</span>
    </button>
  );
};

export default LanguageToggle;
