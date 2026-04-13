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
    const timeoutId = setTimeout(() => {
      // Fallback after 5 seconds if geolocation doesn't respond
      fetchPrayerTimes(30.0444, 31.2357);
    }, 5000);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          clearTimeout(timeoutId);
          fetchPrayerTimes(position.coords.latitude, position.coords.longitude);
        },
        () => {
          clearTimeout(timeoutId);
          // Fallback to Cairo coordinates
          fetchPrayerTimes(30.0444, 31.2357);
        }
      );
    } else {
      clearTimeout(timeoutId);
      fetchPrayerTimes(30.0444, 31.2357);
    }
  }, []);

  return { prayerTimes, loading, error };
};

export default usePrayerTimes;
