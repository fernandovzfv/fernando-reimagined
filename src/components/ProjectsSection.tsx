
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github } from 'lucide-react';

const ProjectsSection = () => {
  const projects = [
    {
      title: "Personal Portfolio",
      description: "A responsive personal portfolio website built with React and Tailwind CSS.",
      tags: ["React", "Tailwind CSS", "Responsive Design"],
      github: "https://github.com/yourusername/portfolio",
      demo: "https://yourportfolio.com"
    },
    {
      title: "Task Management App",
      description: "A full-stack application for managing tasks with authentication and real-time updates.",
      tags: ["React", "Node.js", "MongoDB", "Socket.io"],
      github: "https://github.com/yourusername/task-manager",
      demo: "https://yourtaskmanager.com"
    },
    {
      title: "E-commerce Platform",
      description: "An online store with product listings, cart functionality, and payment integration.",
      tags: ["React", "Express", "PostgreSQL", "Stripe"],
      github: "https://github.com/yourusername/ecommerce",
      demo: "https://yourecommerce.com"
    },
    {
      title: "Weather Dashboard",
      description: "A weather application that displays current and forecasted weather data based on location.",
      tags: ["JavaScript", "CSS", "Weather API"],
      github: "https://github.com/yourusername/weather-app",
      demo: "https://yourweatherapp.com"
    }
  ];

  return (
    <section id="projects" className="section-padding bg-secondary/50">
      <div className="container mx-auto container-padding">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="mb-6">My Projects</h2>
          <p className="text-lg text-foreground/80">
            Here are some of the projects I've worked on. Each one represents different challenges and learning experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="border border-border/50 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
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
                  <Github size={16} /> Code
                </a>
                <a 
                  href={project.demo} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-foreground/70 hover:text-brand-blue transition-colors"
                >
                  <ExternalLink size={16} /> Live Demo
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
