import React from 'react';
import { BookOpen, Headphones, Star, BookMarked } from 'lucide-react';

const RestPage = () => {
  const sheikhs = [
    { name: 'الشيخ سمير مصطفى', channelId: 'UCxWYdLz3rV_r0R0J0VtQXxg' },
    { name: 'الشيخ أمجد سمير', channelId: 'UUsLm8t3T2Mh_QqY4M7Zp7nA' },
    { name: 'الشيخ محمد الغليظ', channelId: 'UCx4d95B5P-gS7ZzqTkqK6ww' },
  ];

  const quranReciters = [
    { name: 'الشيخ المنشاوي', channelId: 'UCMqJjqZ8n1RlVcR3j2p4zF8' },
    { name: 'الشيخ محمد أيوب', channelId: 'UCMAYYOUB' },
    { name: 'الشيخ ياسر الدوسري', channelId: 'UCtelawatyasseer1' },
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
      <h2 className="text-2xl font-bold text-textPrimary">ارح واسترح</h2>
      
      {/* Quran Section */}
      <div className="bg-card rounded-xl p-6 border border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold text-textPrimary">القرآن الكريم</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quranReciters.map((reciter, idx) => (
            <div key={idx} className="bg-secondary/30 rounded-lg p-3">
              <p className="text-accent font-medium mb-2">{reciter.name}</p>
              <div className="aspect-video bg-secondary rounded-lg overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/videoseries?list=${reciter.channelId}`}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={reciter.name}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lectures Section */}
      <div className="bg-card rounded-xl p-6 border border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <Headphones className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold text-textPrimary">المحاضرات الدينية</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sheikhs.map((sheikh, idx) => (
            <div key={idx} className="bg-secondary/30 rounded-lg p-3">
              <p className="text-accent font-medium mb-2">{sheikh.name}</p>
              <div className="aspect-video bg-secondary rounded-lg overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/videoseries?list=${sheikh.channelId}`}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={sheikh.name}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Azkar Section */}
      <div className="bg-card rounded-xl p-6 border border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold text-textPrimary">الأذكار اليومية</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {azkar.map((zekr, idx) => (
            <div key={idx} className="bg-secondary/30 rounded-lg p-3 text-center">
              <p className="text-textPrimary">{zekr}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Books Section (Placeholder) */}
      <div className="bg-card rounded-xl p-6 border border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <BookMarked className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold text-textPrimary">قائمة الكتب</h3>
        </div>
        <div className="text-center py-8 text-textSecondary">
          <BookMarked className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>سيتم إضافة قائمة الكتب قريباً إن شاء الله</p>
          <p className="text-sm mt-2">مكتبة إسلامية متنوعة تنمو معك</p>
        </div>
      </div>
    </div>
  );
};

export default RestPage;
