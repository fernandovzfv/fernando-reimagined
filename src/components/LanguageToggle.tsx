
import React from 'react';
import { useLanguage } from './LanguageProvider';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="secondary" 
          size="sm"
          className="flex items-center gap-1.5 px-2.5 h-9 rounded-full ml-2"
          aria-label="Select language"
        >
          <Globe size={16} className="text-foreground/80" />
          <span className="text-xs font-medium">EN / ES</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          className={cn("cursor-pointer", language === 'en' && "font-bold")}
          onClick={() => setLanguage('en')}
        >
          <span className="mr-2">🇺🇸</span> English
          {language === 'en' && <span className="ml-2 text-xs">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem 
          className={cn("cursor-pointer", language === 'es' && "font-bold")}
          onClick={() => setLanguage('es')}
        >
          <span className="mr-2">🇪🇸</span> Español
          {language === 'es' && <span className="ml-2 text-xs">✓</span>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageToggle;
