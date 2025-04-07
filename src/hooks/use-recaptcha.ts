
import { useEffect, useCallback } from 'react';

// reCAPTCHA site key
const RECAPTCHA_SITE_KEY = '6Lf-HAwrAAAAALyrZq7QUOTaPL8ihhxLd8ZM4yHP';

export const useRecaptcha = () => {
  // Load reCAPTCHA script
  useEffect(() => {
    const loadRecaptchaScript = () => {
      // Only load if not already loaded
      if (!window.document.querySelector(`script[src*="recaptcha/api.js"]`)) {
        const script = document.createElement('script');
        script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
        
        return () => {
          document.head.removeChild(script);
        };
      }
    };
    
    loadRecaptchaScript();
  }, []);
  
  // Execute reCAPTCHA and get token
  const executeRecaptcha = useCallback(async (action: string): Promise<string | null> => {
    if (!(window as any).grecaptcha || !(window as any).grecaptcha.ready) {
      console.error('reCAPTCHA not loaded');
      return null;
    }

    try {
      const token = await (window as any).grecaptcha.execute(RECAPTCHA_SITE_KEY, { action });
      return token;
    } catch (error) {
      console.error('reCAPTCHA execution error:', error);
      return null;
    }
  }, []);
  
  return { executeRecaptcha, RECAPTCHA_SITE_KEY };
};
