
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import { t } from '@/lib/translations';

const SkillsSection = () => {
  const { language } = useLanguage();
  
  const technicalSkills = [
    { name: "EPC Projects", level: 90 },
    { name: "Pressure Vessels", level: 95 },
    { name: "Shell & Tube Heat Exchangers", level: 95 },
    { name: "Package Equipment", level: 80 },
    { name: "Mechanical Completion", level: 75 },
    { name: "Piping", level: 60 },
  ];

  const otherSkills = [
    "Problem Solving",
    "Team Collaboration",
    "Project Management",
    "CAD Design",
    "Agile Methodologies",
    "Technical Documentation"
  ];

  const otherSkillsTranslated = language === 'es' ? [
    "Resolución de Problemas",
    "Colaboración en Equipo",
    "Gestión de Proyectos",
    "Manejo de CAD",
    "Metodologías Ágiles",
    "Documentación Técnica"
  ] : otherSkills;

  return (
    <section id="skills" className="section-padding">
      <div className="container mx-auto container-padding">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="mb-6">{t('skillsTitle', language)}</h2>
          <p className="text-lg text-foreground/80">
            {t('skillsDescription', language)}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">{t('technicalSkills', language)}</h3>
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
            <h3 className="text-2xl font-bold mb-6">{t('otherSkills', language)}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {otherSkillsTranslated.map((skill, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle2 className="text-brand-teal h-5 w-5 flex-shrink-0" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>

            <Separator className="my-8" />

            <h3 className="text-2xl font-bold mb-6">{t('languages', language)}</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{t('english', language)}</span>
                  <span className="text-foreground/70">{t('fluent', language)}</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{t('spanish', language)}</span>
                  <span className="text-foreground/70">{t('native', language)}</span>
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
