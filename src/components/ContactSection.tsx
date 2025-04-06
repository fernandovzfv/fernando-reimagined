
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import { t } from '@/lib/translations';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Define schema for form validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(2, { message: "Subject must be at least 2 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  honeypot: z.string().optional(), // Honeypot field
});

const ContactSection = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const [hasSubmittedRecently, setHasSubmittedRecently] = useState(false);
  const recaptchaRef = useRef<any>(null);
  
  // Initialize form with validation schema
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
      honeypot: '', // Initialize honeypot field
    },
  });

  // Load reCAPTCHA script
  useEffect(() => {
    // Load Google reCAPTCHA v3 script
    const loadRecaptchaScript = () => {
      const script = document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js?render=6Lf-HAwrAAAAANfLjh8osAm2QQqKLDpbXMeHkVFR';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    };

    // Get client IP address for rate limiting
    const getIPAddress = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        setIpAddress(data.ip);
      } catch (error) {
        console.error('Failed to get IP address:', error);
      }
    };

    loadRecaptchaScript();
    getIPAddress();

    // Check if user has submitted form recently (in last 5 minutes)
    const lastSubmissionTime = localStorage.getItem('lastContactFormSubmission');
    if (lastSubmissionTime) {
      const elapsed = Date.now() - parseInt(lastSubmissionTime);
      // 5 minutes in milliseconds
      if (elapsed < 5 * 60 * 1000) {
        setHasSubmittedRecently(true);
      }
    }
  }, []);

  // Execute reCAPTCHA before form submission
  const executeRecaptcha = async () => {
    if (!(window as any).grecaptcha) {
      toast({
        title: language === 'en' ? 'Error' : 'Error',
        description: language === 'en' 
          ? 'reCAPTCHA failed to load. Please try again later.' 
          : 'reCAPTCHA no se pudo cargar. Por favor intente más tarde.',
        variant: 'destructive',
      });
      return null;
    }

    try {
      const token = await (window as any).grecaptcha.execute('6Lf-HAwrAAAAANfLjh8osAm2QQqKLDpbXMeHkVFR', {action: 'contact_form'});
      return token;
    } catch (error) {
      console.error('reCAPTCHA execution error:', error);
      return null;
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // If honeypot field is filled, silently "succeed" without submitting
    if (values.honeypot) {
      form.reset();
      toast({
        title: language === 'en' ? 'Message sent!' : '¡Mensaje enviado!',
        description: language === 'en' 
          ? 'Thank you for reaching out. We will get back to you soon.' 
          : 'Gracias por contactarnos. Te responderemos pronto.',
      });
      return;
    }
    
    // Check for recent submissions
    if (hasSubmittedRecently) {
      toast({
        title: language === 'en' ? 'Rate limit reached' : 'Límite de envíos alcanzado',
        description: language === 'en' 
          ? 'Please wait at least 5 minutes before submitting another message.' 
          : 'Por favor espera al menos 5 minutos antes de enviar otro mensaje.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Execute reCAPTCHA
      const token = await executeRecaptcha();
      
      if (!token) {
        throw new Error('reCAPTCHA verification failed');
      }
      
      // Call edge function instead of direct database insertion
      const response = await fetch('https://djibnjqtxvefslifgvfb.functions.supabase.co/contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          subject: values.subject,
          message: values.message,
          honeypot: values.honeypot,
          recaptchaToken: token,
          clientIp: ipAddress
        }),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Error submitting form');
      }
      
      // Save submission time for client-side rate limiting
      localStorage.setItem('lastContactFormSubmission', Date.now().toString());
      setHasSubmittedRecently(true);
      
      toast({
        title: language === 'en' ? 'Message sent!' : '¡Mensaje enviado!',
        description: language === 'en' 
          ? 'Thank you for reaching out. We will get back to you soon.' 
          : 'Gracias por contactarnos. Te responderemos pronto.',
      });
      
      // Reset form after successful submission
      form.reset();
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: language === 'en' ? 'Failed to send message' : 'Error al enviar mensaje',
        description: language === 'en' 
          ? 'There was a problem sending your message. Please try again.' 
          : 'Hubo un problema al enviar tu mensaje. Por favor intenta de nuevo.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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

            <div className="mt-10">
              <h3 className="text-2xl font-bold mb-6">{t('socialMedia', language)}</h3>
              <div className="flex gap-4">
                <a 
                  href="https://github.com/fernandovzfv" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-secondary rounded-full hover:bg-primary/10 transition-colors"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387c.6.113.82-.258.82-.577c0-.285-.01-1.04-.015-2.04c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.73.084-.73c1.205.086 1.838 1.238 1.838 1.238c1.07 1.833 2.81 1.304 3.493.996c.108-.776.417-1.305.76-1.605c-2.665-.3-5.466-1.332-5.466-5.93c0-1.31.465-2.38 1.235-3.22c-.135-.303-.54-1.523.105-3.176c0 0 1.005-.322 3.3 1.23c.96-.267 1.98-.4 3-.405c1.02.005 2.04.138 3 .405c2.28-1.552 3.285-1.23 3.285-1.23c.645 1.653.24 2.873.12 3.176c.765.84 1.23 1.91 1.23 3.22c0 4.61-2.805 5.625-5.475 5.92c.42.36.81 1.096.81 2.22c0 1.605-.015 2.895-.015 3.285c0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-secondary rounded-full hover:bg-primary/10 transition-colors"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-secondary rounded-full hover:bg-primary/10 transition-colors"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {hasSubmittedRecently && (
                  <Alert className="mb-4">
                    <AlertDescription>
                      {language === 'en' 
                        ? 'You have recently submitted a message. Please wait 5 minutes before submitting another.'
                        : 'Has enviado un mensaje recientemente. Por favor espera 5 minutos antes de enviar otro.'}
                    </AlertDescription>
                  </Alert>
                )}
                
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">
                        {t('nameLabel', language)}
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder={language === 'en' ? "Your name" : "Tu nombre"} 
                          {...field}
                          disabled={isSubmitting || hasSubmittedRecently}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">
                        {t('emailLabel', language)}
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder={language === 'en' ? "your.email@example.com" : "tu.correo@ejemplo.com"}
                          {...field}
                          disabled={isSubmitting || hasSubmittedRecently}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">
                        {t('subjectLabel', language)}
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder={language === 'en' ? "How can I help you?" : "¿Cómo puedo ayudarte?"} 
                          {...field}
                          disabled={isSubmitting || hasSubmittedRecently}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">
                        {t('messageLabel', language)}
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder={language === 'en' ? "Your message..." : "Tu mensaje..."}
                          className="min-h-[150px]"
                          {...field}
                          disabled={isSubmitting || hasSubmittedRecently}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Honeypot field - hidden from real users */}
                <FormField
                  control={form.control}
                  name="honeypot"
                  render={({ field }) => (
                    <FormItem style={{ display: 'none' }}>
                      <FormControl>
                        <Input 
                          {...field}
                          tabIndex={-1}
                          autoComplete="off"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                {/* Hidden reCAPTCHA badge */}
                <div style={{ visibility: 'hidden' }} className="recaptcha-badge"></div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-brand-blue hover:bg-brand-blue/90"
                  disabled={isSubmitting || hasSubmittedRecently}
                >
                  <Send className="mr-2 h-4 w-4" /> 
                  {isSubmitting 
                    ? (language === 'en' ? 'Sending...' : 'Enviando...') 
                    : t('submitButton', language)}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
