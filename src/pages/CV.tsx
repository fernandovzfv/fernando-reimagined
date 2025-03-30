
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PDFViewer from '@/components/PDFViewer';
import { useLanguage } from '@/components/LanguageProvider';
import { Helmet } from 'react-helmet';

const CV = () => {
  const { language } = useLanguage();
  
  const pageTitle = language === 'en' 
    ? 'Fernando Vázquez - CV' 
    : 'Fernando Vázquez - Currículum';
  
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow container mx-auto pt-24 pb-8 px-4">
        <PDFViewer />
      </main>
      
      <Footer />
    </div>
  );
};

export default CV;
