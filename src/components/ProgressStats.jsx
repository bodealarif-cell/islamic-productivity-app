import React from 'react';
import { TrendingUp, Award, Target } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ProgressStats = ({ completionPercentage, streakDays, level }) => {
  const { isPremiumTheme } = useTheme();

  const cardBase =
    "rounded-2xl p-5 border transition-all duration-300 hover:-translate-y-1";

  const freeCard = "bg-card border-white/10 hover:shadow-lg hover:shadow-black/20";
  const premiumCard =
    "bg-[#111827] border-yellow-500/20 hover:shadow-[0_0_20px_rgba(198,167,94,0.15)]";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

      {/* 📊 Completion */}
      <div className={`${cardBase} ${isPremiumTheme ? premiumCard : freeCard}`}>
        <div className="flex items-center gap-3 mb-3">
          <Target className={`w-5 h-5 ${isPremiumTheme ? 'text-yellow-500' : 'text-accent'}`} />
          <span className="text-textSecondary">نسبة الإنجاز</span>
        </div>

        <p className="text-3xl font-bold text-textPrimary">
          {Math.round(completionPercentage)}%
        </p>

        <div className="w-full bg-secondary rounded-full h-2 mt-3 overflow-hidden">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${
              isPremiumTheme ? 'bg-yellow-500' : 'bg-accent'
            }`}
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {/* 🔥 Streak */}
      <div className={`${cardBase} ${isPremiumTheme ? premiumCard : freeCard}`}>
        <div className="flex items-center gap-3 mb-3">
          <TrendingUp className={`w-5 h-5 ${isPremiumTheme ? 'text-yellow-500' : 'text-accent'}`} />
          <span className="text-textSecondary">أيام الاستمرار</span>
        </div>

        <p className="text-3xl font-bold text-textPrimary">
          {streakDays}
        </p>

        <p className="text-textSecondary text-sm mt-2">
          يوم من الالتزام المستمر
        </p>
      </div>

      {/* 🏆 Level */}
      <div className={`${cardBase} ${isPremiumTheme ? premiumCard : freeCard}`}>
        <div className="flex items-center gap-3 mb-3">
          <Award className={`w-5 h-5 ${isPremiumTheme ? 'text-yellow-500' : 'text-accent'}`} />
          <span className="text-textSecondary">المستوى</span>
        </div>

        <p className={`text-3xl font-bold ${isPremiumTheme ? 'text-yellow-400' : 'text-accent'}`}>
          {level}
        </p>

        <p className="text-textSecondary text-sm mt-2">
          تقدم مستمر في رحلتك
        </p>
      </div>

    </div>
  );
};

export default ProgressStats;
