
import React from 'react';
import { useTheme } from './ThemeProvider';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button 
      onClick={toggleTheme}
      className={cn(
        "flex items-center justify-center rounded-full p-2 transition-colors",
        theme === 'dark' 
          ? "bg-secondary/80 text-secondary-foreground hover:bg-secondary" 
          : "bg-muted text-muted-foreground hover:bg-muted/80"
      )}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun size={18} className="text-yellow-400" />
      ) : (
        <Moon size={18} />
      )}
    </button>
  );
};

export default ThemeToggle;
