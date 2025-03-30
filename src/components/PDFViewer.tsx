
import React, { useEffect, useState } from 'react';
import { useLanguage } from './LanguageProvider';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';

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
        
        // Get public URL directly - this method doesn't return an error object
        const { data } = await supabase
          .storage
          .from('cv')
          .getPublicUrl(filename);
        
        if (!data.publicUrl) {
          setError(`PDF file "${filename}" not found. Please ensure it's uploaded to the Supabase bucket.`);
          return;
        }
        
        console.log('PDF URL retrieved:', data.publicUrl);
        setPdfUrl(data.publicUrl);
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
      <div className={`flex flex-col justify-center items-center h-[calc(100vh-200px)] ${className} p-4`}>
        <Alert variant="destructive" className="max-w-xl mb-4">
          <Info className="h-4 w-4 mr-2" />
          <AlertTitle>PDF File Not Found</AlertTitle>
          <AlertDescription>
            {error}
          </AlertDescription>
        </Alert>
        
        <div className="bg-muted p-4 rounded-md max-w-xl text-sm">
          <h3 className="font-medium mb-2">How to fix this:</h3>
          <ol className="list-decimal pl-4 space-y-2">
            <li>Go to your Supabase dashboard</li>
            <li>Navigate to the Storage section</li>
            <li>Open the "cv" bucket</li>
            <li>Upload these two files:
              <ul className="list-disc pl-6 mt-1">
                <li><code>CV-FERNANDO-VAZQUEZ-EN.pdf</code> - English version</li>
                <li><code>CV-FERNANDO-VAZQUEZ-ES.pdf</code> - Spanish version</li>
              </ul>
            </li>
            <li>Make sure the bucket is set to public</li>
            <li>Once uploaded, come back and refresh this page</li>
          </ol>
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
