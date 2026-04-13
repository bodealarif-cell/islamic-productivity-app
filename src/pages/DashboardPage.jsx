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
    if (!userName) navigate('/');
  }, [userName, navigate]);

  const currentHour = new Date().getHours();
  const suggestion = getAISuggestion(completionPercentage, currentHour, tasks);

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 space-y-6">

      {/* 🟢 Welcome Section */}
      <div className="rounded-2xl p-6 bg-gradient-to-r from-card to-secondary/40 border border-white/10">
        <h2 className="text-2xl md:text-3xl font-bold text-textPrimary">
          مرحباً {userName} 👋
        </h2>

        <p className="text-textSecondary mt-1">
          لقبك اليوم:{" "}
          <span className="text-accent font-semibold">
            {userTitle}
          </span>
        </p>
      </div>

      {/* 🧠 AI Suggestion */}
      <AISuggestion suggestion={suggestion} />

      {/* 📊 GRID DASHBOARD */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT SIDE (MAIN) */}
        <div className="lg:col-span-2 space-y-6">

          {/* Progress */}
          <div className="bg-card rounded-2xl p-4 border border-white/10">
            <ProgressStats
              completionPercentage={completionPercentage}
              streakDays={streakDays}
              level={level}
            />
          </div>

          {/* Time Map */}
          <div className="bg-card rounded-2xl p-4 border border-white/10">
            <TimeMapChart tasks={tasks} fixedBlocks={fixedBlocks} />
          </div>

        </div>

        {/* RIGHT SIDE (SIDEBAR WIDGETS) */}
        <div className="space-y-6">

          {/* Prayer Times */}
          <div className="bg-card rounded-2xl p-4 border border-white/10">
            <PrayerTimes />
          </div>

        </div>

      </div>

    </div>
  );
};

export default DashboardPage;
