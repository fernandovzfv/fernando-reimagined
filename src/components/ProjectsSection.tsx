
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import { t } from '@/lib/translations';

const ProjectsSection = () => {
  const { language } = useLanguage();
  
  const projects = [
    {
      titleKey: "project1Title",
      descriptionKey: "project1Desc",
      tags: ["React", "Tailwind CSS", "Responsive Design"],
      github: "https://github.com/yourusername/portfolio",
      demo: "https://yourportfolio.com"
    },
    {
      titleKey: "project2Title",
      descriptionKey: "project2Desc",
      tags: ["React", "Node.js", "MongoDB", "Socket.io"],
      github: "https://github.com/yourusername/task-manager",
      demo: "https://yourtaskmanager.com"
    },
    {
      titleKey: "project3Title",
      descriptionKey: "project3Desc",
      tags: ["React", "Express", "PostgreSQL", "Stripe"],
      github: "https://github.com/yourusername/ecommerce",
      demo: "https://yourecommerce.com"
    },
    {
      titleKey: "project4Title",
      descriptionKey: "project4Desc",
      tags: ["JavaScript", "CSS", "Weather API"],
      github: "https://github.com/yourusername/weather-app",
      demo: "https://yourweatherapp.com"
    }
  ];

  // Translate tags if language is Spanish
  const getTranslatedTags = (tags: string[]) => {
    if (language === 'en') return tags;
    
    const translations: Record<string, string> = {
      "Responsive Design": "Diseño Responsivo",
      "Weather API": "API del Clima"
    };
    
    return tags.map(tag => translations[tag] || tag);
  };

  return (
    <section id="projects" className="section-padding bg-secondary/50">
      <div className="container mx-auto container-padding">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="mb-6">{t('projectsTitle', language)}</h2>
          <p className="text-lg text-foreground/80">
            {t('projectsDescription', language)}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="border border-border/50 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <CardHeader>
                <CardTitle>{t(project.titleKey as any, language)}</CardTitle>
                <CardDescription>{t(project.descriptionKey as any, language)}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {getTranslatedTags(project.tags).map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-foreground/70 hover:text-brand-blue transition-colors"
                >
                  <Github size={16} /> {t('code', language)}
                </a>
                <a 
                  href={project.demo} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-foreground/70 hover:text-brand-blue transition-colors"
                >
                  <ExternalLink size={16} /> {t('liveDemo', language)}
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
