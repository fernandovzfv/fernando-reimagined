
import React, { useEffect, useState } from 'react';
import { useLanguage } from './LanguageProvider';
import { supabase } from '@/integrations/supabase/client';

interface PDFViewerProps {
  className?: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ className }) => {
  const { language } = useLanguage();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const filename = language === 'en' 
    ? 'CV-FERNANDO-VAZQUEZ-EN.pdf' 
    : 'CV-FERNANDO-VAZQUEZ-ES.pdf';

  useEffect(() => {
    const fetchPDF = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Get the PDF URL from Supabase Storage
        const { data, error } = await supabase
          .storage
          .from('cv')
          .createSignedUrl(filename, 60 * 60); // 1 hour expiry
        
        if (error) {
          throw error;
        }
        
        setPdfUrl(data?.signedUrl || null);
      } catch (err) {
        console.error('Error fetching PDF:', err);
        setError('Failed to load CV. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPDF();
  }, [language, filename]);
  
  if (isLoading) {
    return (
      <div className={`flex justify-center items-center h-[calc(100vh-200px)] ${className}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className={`flex justify-center items-center h-[calc(100vh-200px)] ${className}`}>
        <div className="text-destructive text-center">
          <p>{error}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`w-full h-[calc(100vh-200px)] ${className}`}>
      {pdfUrl ? (
        <iframe
          src={pdfUrl}
          className="w-full h-full border-0"
          title="Fernando Vázquez - CV"
        />
      ) : (
        <div className="flex justify-center items-center h-full">
          <p>No PDF available</p>
        </div>
      )}
    </div>
  );
};

export default PDFViewer;
