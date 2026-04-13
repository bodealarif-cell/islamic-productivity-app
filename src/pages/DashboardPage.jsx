import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import useUserProgress from '../hooks/useUserProgress';
import PrayerTimes from '../components/PrayerTimes';
import TimeMapChart from '../components/TimeMapChart';
import ProgressStats from '../components/ProgressStats';
import AISuggestion from '../components/AISuggestion';
import { getAISuggestion } from '../utils/aiSuggestions';

const DashboardPage = () => {
  const { userName, tasks, fixedBlocks } = useUser();
  const { completionPercentage, streakDays, level, userTitle } = useUserProgress();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userName) {
      navigate('/');
    }
  }, [userName, navigate]);

  const currentHour = new Date().getHours();
  const suggestion = getAISuggestion(completionPercentage, currentHour, tasks);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-card to-secondary/50 rounded-xl p-6 border border-white/10">
        <h2 className="text-2xl font-bold text-textPrimary">
          مرحباً {userName} 👋
        </h2>
        <p className="text-textSecondary mt-1">لقبك اليوم: <span className="text-accent font-semibold">{userTitle}</span></p>
      </div>

      {/* AI Suggestion */}
      <AISuggestion suggestion={suggestion} />

      {/* Progress Stats */}
      <ProgressStats
        completionPercentage={completionPercentage}
        streakDays={streakDays}
        level={level}
      />

      {/* Prayer Times */}
      <PrayerTimes />

      {/* Time Map */}
      <TimeMapChart tasks={tasks} fixedBlocks={fixedBlocks} />
    </div>
  );
};

export default DashboardPage;
