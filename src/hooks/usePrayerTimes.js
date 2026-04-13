import { useState, useEffect } from 'react';
import axios from 'axios';

const usePrayerTimes = () => {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPrayerTimes = async (latitude, longitude) => {
    try {
      const response = await axios.get(`https://api.aladhan.com/v1/timings/${Math.floor(Date.now() / 1000)}?latitude=${latitude}&longitude=${longitude}&method=8`);
      const timings = response.data.data.timings;
      setPrayerTimes({
        Fajr: timings.Fajr,
        Dhuhr: timings.Dhuhr,
        Asr: timings.Asr,
        Maghrib: timings.Maghrib,
        Isha: timings.Isha,
      });
      setLoading(false);
    } catch (err) {
      setError('فشل في تحميل أوقات الصلاة');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchPrayerTimes(position.coords.latitude, position.coords.longitude);
        },
        () => {
          // Fallback to Cairo coordinates
          fetchPrayerTimes(30.0444, 31.2357);
        }
      );
    } else {
      fetchPrayerTimes(30.0444, 31.2357);
    }
  }, []);

  return { prayerTimes, loading, error };
};

export default usePrayerTimes;
