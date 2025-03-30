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
  | 'aboutMe'
  | 'aboutBody1'
  | 'aboutBody2'
  | 'valuesTitle1'
  | 'valuesDesc1'
  | 'valuesTitle2'
  | 'valuesDesc2'
  | 'valuesTitle3'
  | 'valuesDesc3'
  | 'valuesTitle4'
  | 'valuesDesc4'
  | 'skillsTitle'
  | 'skillsDescription'
  | 'technicalSkills'
  | 'otherSkills'
  | 'languages'
  | 'english'
  | 'spanish'
  | 'fluent'
  | 'native'
  | 'projectsTitle'
  | 'projectsDescription'
  | 'project1Title'
  | 'project1Desc'
  | 'project2Title'
  | 'project2Desc'
  | 'project3Title'
  | 'project3Desc'
  | 'project4Title'
  | 'project4Desc'
  | 'code'
  | 'liveDemo'
  | 'contactTitle'
  | 'contactDescription'
  | 'contactInfo'
  | 'email'
  | 'phone'
  | 'location'
  | 'socialMedia'
  | 'nameLabel'
  | 'emailLabel'
  | 'subjectLabel'
  | 'messageLabel'
  | 'submitButton'
  | 'footerRights'
  | 'footerDesigned'
  | 'cv';

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
    aboutMe: 'About Me',
    aboutDescription: 'I\'m a computer science engineer with expertise in modern web technologies and software development practices.',
    aboutBody1: 'I\'m a passionate Computer Science Engineer based in Mexico, specializing in web development and software engineering. With a strong foundation in both frontend and backend technologies, I create solutions that are not only functional but also intuitive and user-friendly.',
    aboutBody2: 'When I\'m not coding, you can find me exploring new technologies, contributing to open-source projects, or enjoying outdoor activities.',
    valuesTitle1: 'Continuous Learning',
    valuesDesc1: 'Always eager to expand my knowledge and skills in technology.',
    valuesTitle2: 'Quality Code',
    valuesDesc2: 'Committed to writing clean, maintainable, and efficient code.',
    valuesTitle3: 'Problem Solver',
    valuesDesc3: 'I enjoy tackling complex challenges and finding elegant solutions.',
    valuesTitle4: 'Detail Oriented',
    valuesDesc4: 'I believe that the small details make a big difference.',
    skillsTitle: 'My Skills',
    skillsDescription: 'I\'ve developed a diverse skill set throughout my career. Here\'s an overview of my technical expertise and other professional capabilities.',
    technicalSkills: 'Technical Skills',
    otherSkills: 'Other Skills & Abilities',
    languages: 'Languages',
    english: 'English',
    spanish: 'Spanish',
    fluent: 'Fluent',
    native: 'Native',
    projectsTitle: 'My Projects',
    projectsDescription: 'Here are some of the projects I\'ve worked on. Each one represents different challenges and learning experiences.',
    project1Title: 'Personal Portfolio',
    project1Desc: 'A responsive personal portfolio website built with React and Tailwind CSS.',
    project2Title: 'Task Management App',
    project2Desc: 'A full-stack application for managing tasks with authentication and real-time updates.',
    project3Title: 'E-commerce Platform',
    project3Desc: 'An online store with product listings, cart functionality, and payment integration.',
    project4Title: 'Weather Dashboard',
    project4Desc: 'A weather application that displays current and forecasted weather data based on location.',
    code: 'Code',
    liveDemo: 'Live Demo',
    contactTitle: 'Get In Touch',
    contactDescription: 'Have a question or want to work together? Feel free to reach out to me using the form below or through my contact information.',
    contactInfo: 'Contact Information',
    email: 'Email',
    phone: 'Phone',
    location: 'Location',
    socialMedia: 'Social Media',
    nameLabel: 'Name',
    emailLabel: 'Email',
    subjectLabel: 'Subject',
    messageLabel: 'Message',
    submitButton: 'Send Message',
    footerRights: 'All rights reserved.',
    footerDesigned: 'Designed and built with ❤️',
    cv: 'CV'
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
    aboutMe: 'Sobre Mí',
    aboutDescription: 'Soy un ingeniero en ciencias de la computación con experiencia en tecnologías web modernas y prácticas de desarrollo de software.',
    aboutBody1: 'Soy un apasionado Ingeniero en Ciencias de la Computación basado en México, especializado en desarrollo web e ingeniería de software. Con una sólida base en tecnologías tanto de frontend como de backend, creo soluciones que no solo son funcionales sino también intuitivas y fáciles de usar.',
    aboutBody2: 'Cuando no estoy programando, puedes encontrarme explorando nuevas tecnologías, contribuyendo a proyectos de código abierto o disfrutando de actividades al aire libre.',
    valuesTitle1: 'Aprendizaje Continuo',
    valuesDesc1: 'Siempre ansioso por expandir mis conocimientos y habilidades en tecnología.',
    valuesTitle2: 'Código de Calidad',
    valuesDesc2: 'Comprometido a escribir código limpio, mantenible y eficiente.',
    valuesTitle3: 'Solucionador de Problemas',
    valuesDesc3: 'Disfruto enfrentando desafíos complejos y encontrando soluciones elegantes.',
    valuesTitle4: 'Orientado al Detalle',
    valuesDesc4: 'Creo que los pequeños detalles marcan una gran diferencia.',
    skillsTitle: 'Mis Habilidades',
    skillsDescription: 'He desarrollado un conjunto diverso de habilidades a lo largo de mi carrera. Aquí hay una visión general de mi experiencia técnica y otras capacidades profesionales.',
    technicalSkills: 'Habilidades Técnicas',
    otherSkills: 'Otras Habilidades y Capacidades',
    languages: 'Idiomas',
    english: 'Inglés',
    spanish: 'Español',
    fluent: 'Fluido',
    native: 'Nativo',
    projectsTitle: 'Mis Proyectos',
    projectsDescription: 'Estos son algunos de los proyectos en los que he trabajado. Cada uno representa diferentes desafíos y experiencias de aprendizaje.',
    project1Title: 'Portfolio Personal',
    project1Desc: 'Un sitio web de portfolio personal responsive construido con React y Tailwind CSS.',
    project2Title: 'Aplicación de Gestión de Tareas',
    project2Desc: 'Una aplicación full-stack para gestionar tareas con autenticación y actualizaciones en tiempo real.',
    project3Title: 'Plataforma de Comercio Electrónico',
    project3Desc: 'Una tienda en línea con listados de productos, funcionalidad de carrito e integración de pagos.',
    project4Title: 'Panel de Control del Clima',
    project4Desc: 'Una aplicación meteorológica que muestra datos climáticos actuales y pronósticos basados en la ubicación.',
    code: 'Código',
    liveDemo: 'Demo en Vivo',
    contactTitle: 'Ponte en Contacto',
    contactDescription: '¿Tienes alguna pregunta o quieres trabajar juntos? No dudes en contactarme usando el formulario de abajo o a través de mi información de contacto.',
    contactInfo: 'Información de Contacto',
    email: 'Correo',
    phone: 'Teléfono',
    location: 'Ubicación',
    socialMedia: 'Redes Sociales',
    nameLabel: 'Nombre',
    emailLabel: 'Correo',
    subjectLabel: 'Asunto',
    messageLabel: 'Mensaje',
    submitButton: 'Enviar Mensaje',
    footerRights: 'Todos los derechos reservados.',
    footerDesigned: 'Diseñado y construido con ❤️',
    cv: 'Currículum'
  }
};

export function t(key: TranslationKey, language: 'en' | 'es'): string {
  return translations[language][key];
}
