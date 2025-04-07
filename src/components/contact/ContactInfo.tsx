
import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { t } from '@/lib/translations';

const ContactInfo = () => {
  const { language } = useLanguage();
  
  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">{t('contactInfo', language)}</h3>
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <Mail className="h-6 w-6 text-brand-blue mt-1" />
          <div>
            <h4 className="font-semibold">{t('email', language)}</h4>
            <a href="mailto:contact@example.com" className="text-foreground/70 hover:text-brand-blue transition-colors">
              contact@example.com
            </a>
          </div>
        </div>
        
        <div className="flex items-start gap-4">
          <Phone className="h-6 w-6 text-brand-purple mt-1" />
          <div>
            <h4 className="font-semibold">{t('phone', language)}</h4>
            <a href="tel:+1234567890" className="text-foreground/70 hover:text-brand-blue transition-colors">
              +1 (234) 567-890
            </a>
          </div>
        </div>
        
        <div className="flex items-start gap-4">
          <MapPin className="h-6 w-6 text-brand-teal mt-1" />
          <div>
            <h4 className="font-semibold">{t('location', language)}</h4>
            <p className="text-foreground/70">Mexico City, Mexico</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
