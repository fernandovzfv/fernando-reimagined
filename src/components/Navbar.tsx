
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from './LanguageProvider';
import { t } from '@/lib/translations';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { name: t('home', language), href: '#home', isAnchor: true },
    { name: t('about', language), href: '#about', isAnchor: true },
    { name: t('skills', language), href: '#skills', isAnchor: true },
    { name: t('projects', language), href: '#projects', isAnchor: true },
    { name: t('contact', language), href: '#contact', isAnchor: true },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 py-4",
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex justify-between items-center container-padding">
        <Link to="/" className="text-2xl font-bold text-foreground">
          <span className="relative">
            <span className="inline-block text-brand-blue transform -rotate-12 font-extrabold">F</span>
            <span className="inline-block">ernando </span>
            <span className="inline-block text-brand-blue transform -rotate-12 font-extrabold">V</span>
            <span className="inline-block">ázquez</span></span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            link.isAnchor ? (
              <a
                key={link.name}
                href={link.href}
                className="text-foreground/80 hover:text-foreground transition-colors font-medium"
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.href}
                className="text-foreground/80 hover:text-foreground transition-colors font-medium"
              >
                {link.name}
              </Link>
            )
          ))}
          
          {/* Theme & Language Toggles */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center space-x-4 md:hidden">
          <ThemeToggle />
          <LanguageToggle />
          <button
            onClick={toggleMenu}
            className="text-foreground p-2 rounded-md"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-background z-40 flex flex-col pt-24 px-8 md:hidden transition-transform duration-300 ease-in-out",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {navLinks.map((link) => (
          link.isAnchor ? (
            <a
              key={link.name}
              href={link.href}
              className="py-4 text-lg font-medium border-b border-border/50"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </a>
          ) : (
            <Link
              key={link.name}
              to={link.href}
              className="py-4 text-lg font-medium border-b border-border/50"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          )
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
