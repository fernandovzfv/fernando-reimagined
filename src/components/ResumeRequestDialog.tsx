
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useLanguage } from '@/components/LanguageProvider';
import ResumeRequestForm from './ResumeRequestForm';
import { t } from '@/lib/translations';

interface ResumeRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ResumeRequestDialog: React.FC<ResumeRequestDialogProps> = ({ open, onOpenChange }) => {
  const { language } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmitSuccess = () => {
    setSubmitted(true);
  };
  
  // Reset submitted state when dialog opens
  useEffect(() => {
    if (open) {
      setSubmitted(false);
    }
  }, [open]);
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {submitted 
              ? t('resumeRequestThankYou', language)
              : t('resumeRequest', language, 'Request Resume')}
          </DialogTitle>
          <DialogDescription>
            {submitted 
              ? t('resumeRequestSuccessMessage', language, "Thanks! I'll send my resume to your email shortly.")
              : t('resumeRequestDescription', language, 'Enter your email to receive my resume.')}
          </DialogDescription>
        </DialogHeader>
        
        {!submitted && <ResumeRequestForm onSuccess={handleSubmitSuccess} />}
      </DialogContent>
    </Dialog>
  );
};

export default ResumeRequestDialog;
