import { PRAYER_DURATION, PRAYER_COUNT, TOTAL_DAILY_HOURS } from './constants';

export const calculateFixedTimeUsed = (fixedBlocks) => {
  const prayerTotal = (PRAYER_DURATION * PRAYER_COUNT) / 60;
  return prayerTotal + fixedBlocks.sleep + fixedBlocks.quran + fixedBlocks.meals + fixedBlocks.qiyam;
};

export const calculateRemainingTime = (tasks, fixedBlocks) => {
  const fixedUsed = calculateFixedTimeUsed(fixedBlocks);
  const tasksTotal = tasks.reduce((sum, task) => sum + (task.completed ? 0 : task.duration), 0);
  const remaining = TOTAL_DAILY_HOURS - fixedUsed - tasksTotal;
  return Math.max(0, remaining);
};

export const getTimeMapData = (tasks, fixedBlocks) => {
  const fixedUsed = calculateFixedTimeUsed(fixedBlocks);
  const tasksTotal = tasks.reduce((sum, task) => sum + (task.completed ? 0 : task.duration), 0);
  const freeTime = Math.max(0, TOTAL_DAILY_HOURS - fixedUsed - tasksTotal);
  
  return [
    { label: 'عبادات وثوابت', hours: fixedUsed, color: '#14B8A6' },
    { label: 'المهام المتبقية', hours: tasksTotal, color: '#F59E0B' },
    { label: 'وقت مرن', hours: freeTime, color: '#3B82F6' },
  ];
};
