import React from 'react';
import { useTranslation } from 'react-i18next';
import { BookOpen, Headphones, Star, BookMarked, ExternalLink } from 'lucide-react';

const RestPage = () => {
  const { t } = useTranslation();

  const sheikhs = [
    { name: 'الشيخ سمير مصطفى', url: 'https://www.youtube.com/@samirmoustafa' },
    { name: 'الشيخ أمجد سمير', url: 'https://www.youtube.com/@amgad_samir' },
    { name: 'الشيخ محمد الغليظ', url: 'https://www.youtube.com/@mohelghaleez' },
  ];

  const quranReciters = [
    { name: 'الشيخ المنشاوي', url: 'https://www.youtube.com/@ElMenshawiOfficial' },
    { name: 'الشيخ محمد أيوب', url: 'https://www.youtube.com/@MAYYOUB' },
    { name: 'الشيخ ياسر الدوسري', url: 'https://www.youtube.com/@telawatyasseer1' },
  ];

  const azkar = [
    'سبحان الله وبحمده (100 مرة)',
    'لا إله إلا الله وحده لا شريك له',
    'أستغفر الله وأتوب إليه',
    'اللهم أنت ربي لا إله إلا أنت',
    'حسبي الله لا إله إلا هو عليه توكلت',
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-textPrimary">{t('pages.rest.title')}</h2>
      
      {/* Quran Section */}
      <div className="bg-card rounded-xl p-6 border border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold text-textPrimary">{t('pages.rest.quran')}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quranReciters.map((reciter, idx) => (
            <a
              key={idx}
              href={reciter.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-secondary/30 hover:bg-secondary/50 rounded-lg p-4 border border-white/5 transition-all group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-accent font-medium group-hover:text-accent/80 transition-colors">{reciter.name}</p>
                  <p className="text-textSecondary text-sm mt-1">YouTube</p>
                </div>
                <ExternalLink className="w-5 h-5 text-accent/50 group-hover:text-accent transition-colors" />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Lectures Section */}
      <div className="bg-card rounded-xl p-6 border border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <Headphones className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold text-textPrimary">{t('pages.rest.lectures')}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sheikhs.map((sheikh, idx) => (
            <a
              key={idx}
              href={sheikh.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-secondary/30 hover:bg-secondary/50 rounded-lg p-4 border border-white/5 transition-all group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-accent font-medium group-hover:text-accent/80 transition-colors">{sheikh.name}</p>
                  <p className="text-textSecondary text-sm mt-1">YouTube</p>
                </div>
                <ExternalLink className="w-5 h-5 text-accent/50 group-hover:text-accent transition-colors" />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Azkar Section */}
      <div className="bg-card rounded-xl p-6 border border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold text-textPrimary">{t('pages.rest.azkar')}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {azkar.map((zekr, idx) => (
            <div key={idx} className="bg-secondary/30 rounded-lg p-3 text-center border border-white/5 hover:border-accent/30 transition-colors">
              <p className="text-textPrimary text-sm">{zekr}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Books Section (Placeholder) */}
      <div className="bg-card rounded-xl p-6 border border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <BookMarked className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold text-textPrimary">{t('pages.rest.books')}</h3>
        </div>
        <div className="text-center py-8 text-textSecondary">
          <BookMarked className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>{t('pages.rest.booksComingSoon')}</p>
          <p className="text-sm mt-2">{t('pages.rest.bookLibrary')}</p>
        </div>
      </div>
    </div>
  );
};

export default RestPage;
