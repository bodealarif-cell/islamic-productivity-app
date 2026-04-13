import React from 'react';
import usePrayerTimes from '../hooks/usePrayerTimes';
import { Clock, Loader2 } from 'lucide-react';

const PrayerTimes = () => {
  const { prayerTimes, loading, error } = usePrayerTimes();

  if (loading) {
    return (
      <div className="bg-card rounded-xl p-6 border border-white/10">
        <div className="flex items-center justify-center gap-2 text-textSecondary">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>جاري تحميل أوقات الصلاة...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-card rounded-xl p-6 border border-white/10">
        <p className="text-red-400 text-center">{error}</p>
      </div>
    );
  }

  const prayerNames = {
    Fajr: 'الفجر',
    Dhuhr: 'الظهر',
    Asr: 'العصر',
    Maghrib: 'المغرب',
    Isha: 'العشاء',
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-white/10">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-accent" />
        <h3 className="text-lg font-semibold text-textPrimary">أوقات الصلاة</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {prayerTimes && Object.entries(prayerTimes).map(([key, time]) => (
          <div key={key} className="text-center p-3 bg-secondary/30 rounded-lg">
            <p className="text-accent font-medium">{prayerNames[key]}</p>
            <p className="text-textPrimary text-lg font-mono mt-1">{time}</p>
            <p className="text-textSecondary text-xs mt-1">20 دقيقة</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrayerTimes;
