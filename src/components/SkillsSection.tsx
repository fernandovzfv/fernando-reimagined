
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2 } from 'lucide-react';

const SkillsSection = () => {
  const technicalSkills = [
    { name: "JavaScript", level: 90 },
    { name: "React.js", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "TypeScript", level: 75 },
    { name: "HTML & CSS", level: 95 },
    { name: "SQL", level: 70 },
  ];

  const otherSkills = [
    "Problem Solving",
    "Team Collaboration",
    "Project Management",
    "UX/UI Design Principles",
    "Agile Methodologies",
    "Technical Documentation"
  ];

  return (
    <section id="skills" className="section-padding">
      <div className="container mx-auto container-padding">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="mb-6">My Skills</h2>
          <p className="text-lg text-foreground/80">
            I've developed a diverse skill set throughout my career. Here's an overview of my technical expertise
            and other professional capabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">Technical Skills</h3>
            <div className="space-y-6">
              {technicalSkills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-foreground/70">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6">Other Skills & Abilities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {otherSkills.map((skill, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle2 className="text-brand-teal h-5 w-5 flex-shrink-0" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>

            <Separator className="my-8" />

            <h3 className="text-2xl font-bold mb-6">Languages</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">English</span>
                  <span className="text-foreground/70">Fluent</span>
                </div>
                <Progress value={95} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Spanish</span>
                  <span className="text-foreground/70">Native</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
