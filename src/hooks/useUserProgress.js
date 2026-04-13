import { useMemo } from 'react';
import { useUser } from '../context/UserContext';

const useUserProgress = () => {
  const { tasks, startDate } = useUser();

  const completionPercentage = useMemo(() => {
    if (tasks.length === 0) return 0;
    const completed = tasks.filter(t => t.completed).length;
    return (completed / tasks.length) * 100;
  }, [tasks]);

  const userTitle = useMemo(() => {
    if (completionPercentage >= 80) return 'البطل 🏆';
    if (completionPercentage >= 50) return 'المجاهد 💪';
    if (completionPercentage >= 20) return 'المجتهد 📖';
    return 'المنطلق 🌱';
  }, [completionPercentage]);

  const streakDays = useMemo(() => {
    const start = new Date(startDate);
    const today = new Date();
    const diffTime = Math.abs(today - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }, [startDate]);

  const level = useMemo(() => {
    if (streakDays >= 30) return 'ذهبي';
    if (streakDays >= 15) return 'فضي';
    return 'برونزي';
  }, [streakDays]);

  return { completionPercentage, userTitle, streakDays, level };
};

export default useUserProgress;
