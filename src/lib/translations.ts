
type TranslationKey = 
  | 'home'
  | 'about'
  | 'skills'
  | 'projects'
  | 'contact'
  | 'heroTitle'
  | 'heroSubtitle'
  | 'heroDescription'
  | 'ctaButton'
  | 'aboutTitle'
  | 'aboutDescription'
  | 'skillsTitle'
  | 'skillsDescription'
  | 'projectsTitle'
  | 'projectsDescription'
  | 'contactTitle'
  | 'contactDescription'
  | 'nameLabel'
  | 'emailLabel'
  | 'messageLabel'
  | 'submitButton'
  | 'footerRights'
  | 'footerDesigned';

export const translations: Record<'en' | 'es', Record<TranslationKey, string>> = {
  en: {
    home: 'Home',
    about: 'About',
    skills: 'Skills',
    projects: 'Projects',
    contact: 'Contact',
    heroTitle: 'Hi, I\'m Fernando',
    heroSubtitle: 'Computer Science Engineer',
    heroDescription: 'Specializing in web development and software engineering with a passion for creating elegant, user-friendly solutions.',
    ctaButton: 'Contact Me',
    aboutTitle: 'About Me',
    aboutDescription: 'I\'m a computer science engineer with expertise in modern web technologies and software development practices.',
    skillsTitle: 'My Skills',
    skillsDescription: 'Here are some of the technologies and tools I work with regularly.',
    projectsTitle: 'My Projects',
    projectsDescription: 'Check out some of my recent projects and work.',
    contactTitle: 'Get In Touch',
    contactDescription: 'Interested in working together? Feel free to reach out!',
    nameLabel: 'Name',
    emailLabel: 'Email',
    messageLabel: 'Message',
    submitButton: 'Send Message',
    footerRights: 'All rights reserved.',
    footerDesigned: 'Designed and built with ❤️'
  },
  es: {
    home: 'Inicio',
    about: 'Sobre mí',
    skills: 'Habilidades',
    projects: 'Proyectos',
    contact: 'Contacto',
    heroTitle: 'Hola, soy Fernando',
    heroSubtitle: 'Ingeniero en Ciencias de la Computación',
    heroDescription: 'Especializado en desarrollo web e ingeniería de software con pasión por crear soluciones elegantes y amigables.',
    ctaButton: 'Contáctame',
    aboutTitle: 'Sobre Mí',
    aboutDescription: 'Soy un ingeniero en ciencias de la computación con experiencia en tecnologías web modernas y prácticas de desarrollo de software.',
    skillsTitle: 'Mis Habilidades',
    skillsDescription: 'Aquí hay algunas de las tecnologías y herramientas con las que trabajo regularmente.',
    projectsTitle: 'Mis Proyectos',
    projectsDescription: 'Echa un vistazo a algunos de mis proyectos y trabajos recientes.',
    contactTitle: 'Ponte en Contacto',
    contactDescription: '¿Interesado en trabajar juntos? ¡No dudes en contactarme!',
    nameLabel: 'Nombre',
    emailLabel: 'Correo',
    messageLabel: 'Mensaje',
    submitButton: 'Enviar Mensaje',
    footerRights: 'Todos los derechos reservados.',
    footerDesigned: 'Diseñado y construido con ❤️'
  }
};

export function t(key: TranslationKey, language: 'en' | 'es'): string {
  return translations[language][key];
}
