
import React from 'react';
import { cn } from '@/lib/utils';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary py-12">
      <div className="container mx-auto container-padding">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="#home" className="text-2xl font-bold">
              <span className="gradient-heading">Fernando</span>
            </a>
            <p className="mt-2 text-foreground/70">Computer Science Engineer</p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <p className="text-foreground/70">
              © {currentYear} Fernando Vázquez. All rights reserved.
            </p>
            <p className="mt-2 text-foreground/70 text-sm">
              Designed and built with ❤️
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border/30">
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            <a href="#home" className="text-foreground/70 hover:text-foreground transition-colors">Home</a>
            <a href="#about" className="text-foreground/70 hover:text-foreground transition-colors">About</a>
            <a href="#skills" className="text-foreground/70 hover:text-foreground transition-colors">Skills</a>
            <a href="#projects" className="text-foreground/70 hover:text-foreground transition-colors">Projects</a>
            <a href="#contact" className="text-foreground/70 hover:text-foreground transition-colors">Contact</a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
