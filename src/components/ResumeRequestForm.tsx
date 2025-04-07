
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/components/LanguageProvider';
import { t } from '@/lib/translations';
import { supabase } from '@/integrations/supabase/client';

// reCAPTCHA site key - using the same as in ContactSection for consistency
const RECAPTCHA_SITE_KEY = '6Lf-HAwrAAAAALyrZq7QUOTaPL8ihhxLd8ZM4yHP';

// Form schema
const resumeRequestSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  honeypot: z.string().optional(), // Honeypot field
});

interface ResumeRequestFormProps {
  onSuccess: () => void;
}

const ResumeRequestForm: React.FC<ResumeRequestFormProps> = ({ onSuccess }) => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [submitting, setSubmitting] = React.useState(false);

  const form = useForm<z.infer<typeof resumeRequestSchema>>({
    resolver: zodResolver(resumeRequestSchema),
    defaultValues: {
      email: '',
      honeypot: '',
    },
  });
  
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
  const executeRecaptcha = async (): Promise<string | null> => {
    if (!(window as any).grecaptcha || !(window as any).grecaptcha.ready) {
      console.error('reCAPTCHA not loaded');
      return null;
    }

    try {
      const token = await (window as any).grecaptcha.execute(RECAPTCHA_SITE_KEY, {action: 'resume_request'});
      return token;
    } catch (error) {
      console.error('reCAPTCHA execution error:', error);
      return null;
    }
  };
  
  const onSubmit = async (data: z.infer<typeof resumeRequestSchema>) => {
    try {
      setSubmitting(true);
      
      // Check honeypot field
      if (data.honeypot) {
        // Simulate success but don't submit
        console.log('Honeypot triggered');
        setTimeout(() => {
          onSuccess();
        }, 1000);
        return;
      }
      
      // Get reCAPTCHA token
      const recaptchaToken = await executeRecaptcha();
      if (!recaptchaToken) {
        toast({
          title: t('error', language),
          description: t('recaptchaError', language, "Couldn't verify you're not a robot. Please try again."),
          variant: "destructive"
        });
        return;
      }
      
      // Get client IP
      let clientIp = '';
      try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        clientIp = ipData.ip;
      } catch (error) {
        console.error('Error getting IP:', error);
      }
      
      // Submit form to Supabase edge function
      const response = await fetch('https://djibnjqtxvefslifgvfb.functions.supabase.co/contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Resume Request',
          email: data.email,
          subject: 'Resume Request',
          message: 'Send me your Resume',
          honeypot: data.honeypot,
          recaptchaToken,
          clientIp,
        }),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Error submitting request');
      }
      
      // Handle success
      onSuccess();
      
    } catch (error) {
      console.error('Error submitting resume request:', error);
      toast({
        title: t('error', language),
        description: error instanceof Error ? error.message : t('genericError', language, 'Something went wrong'),
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('email', language)}</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Honeypot field - hidden from users but bots might fill it */}
        <div className="hidden">
          <FormField
            control={form.control}
            name="honeypot"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Do not fill this field</FormLabel>
                <FormControl>
                  <Input autoComplete="off" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        
        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? t('sending', language, 'Sending...') : t('sendRequest', language, 'Send Request')}
        </Button>
      </form>
    </Form>
  );
};

export default ResumeRequestForm;
