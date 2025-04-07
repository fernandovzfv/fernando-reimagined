
import React from 'react';
import { useLanguage } from './LanguageProvider';
import { t } from '@/lib/translations';
import ContactInfo from './contact/ContactInfo';
import SocialLinks from './contact/SocialLinks';
import ContactForm from './contact/ContactForm';

const ContactSection = () => {
  const { language } = useLanguage();

  return (
    <section id="contact" className="section-padding min-h-[80vh] flex items-center">
      <div className="container mx-auto container-padding">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="mb-6">{t('contactTitle', language)}</h2>
          <p className="text-lg text-foreground/80">
            {t('contactDescription', language)}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <ContactInfo />
            <SocialLinks />
          </div>

          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
