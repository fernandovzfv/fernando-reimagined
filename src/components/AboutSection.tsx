
import React from 'react';
import { Shield, Lightbulb, Code, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const AboutSection = () => {
  const values = [
    {
      icon: <Lightbulb className="h-6 w-6 text-brand-purple" />,
      title: "Continuous Learning",
      description: "Always eager to expand my knowledge and skills in technology."
    },
    {
      icon: <Code className="h-6 w-6 text-brand-teal" />,
      title: "Quality Code",
      description: "Committed to writing clean, maintainable, and efficient code."
    },
    {
      icon: <Shield className="h-6 w-6 text-brand-blue" />,
      title: "Problem Solver",
      description: "I enjoy tackling complex challenges and finding elegant solutions."
    },
    {
      icon: <BookOpen className="h-6 w-6 text-brand-purple" />,
      title: "Detail Oriented",
      description: "I believe that the small details make a big difference."
    }
  ];

  return (
    <section id="about" className="section-padding bg-secondary/50">
      <div className="container mx-auto container-padding">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="mb-6">About Me</h2>
          <p className="text-lg text-foreground/80">
            I'm a passionate Computer Science Engineer based in Mexico, specializing in web development and software engineering. 
            With a strong foundation in both frontend and backend technologies, I create solutions that are not only functional 
            but also intuitive and user-friendly.
          </p>
          <p className="text-lg text-foreground/80 mt-4">
            When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, 
            or enjoying outdoor activities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <Card key={index} className="border border-border/50 shadow-sm hover:shadow-md transition-shadow bg-card">
              <CardContent className="p-6">
                <div className="rounded-full bg-accent/20 p-3 w-fit mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-foreground/70">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
