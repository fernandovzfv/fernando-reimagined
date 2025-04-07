
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/components/LanguageProvider';
import { t } from '@/lib/translations';
import { useRecaptcha } from '@/hooks/use-recaptcha';
import { getIpAddress } from '@/utils/ipAddress';

// Define schema for form validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(2, { message: "Subject must be at least 2 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  honeypot: z.string().optional(), // Honeypot field
});

const ContactForm = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const { executeRecaptcha } = useRecaptcha();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ipAddress, setIpAddress] = useState('');
  const [hasSubmittedRecently, setHasSubmittedRecently] = useState(false);
  
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

  useEffect(() => {
    // Get client IP address for rate limiting
    const fetchIpAddress = async () => {
      const ip = await getIpAddress();
      setIpAddress(ip);
    };

    fetchIpAddress();

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
      const token = await executeRecaptcha('contact_form');
      
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
  );
};

export default ContactForm;
