import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heart } from 'lucide-react';

const Footer = () => {
  const { i18n } = useTranslation();

  return (
    <footer className="bg-secondary/30 border-t border-white/10 py-6 px-4 mt-12">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-textSecondary text-sm">
              {i18n.language === 'ar' 
                ? '© صُممَ وطُوِّرَ بقلم أبو العارف - جزاه الله خيراً'
                : '© Designed & Developed by Abu Al-Aref - May Allah reward him'
              }
            </p>
          </div>
          <div className="flex items-center gap-1 text-accent">
            <span className="text-sm">Made with</span>
            <Heart className="w-4 h-4 fill-current" />
            <span className="text-sm">for Islamic Productivity</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
