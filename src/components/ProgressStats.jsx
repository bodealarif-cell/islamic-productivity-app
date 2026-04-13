import React from 'react';
import { TrendingUp, Award, Target } from 'lucide-react';

const ProgressStats = ({ completionPercentage, streakDays, level }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-card rounded-xl p-5 border border-white/10">
        <div className="flex items-center gap-3 mb-2">
          <Target className="w-5 h-5 text-accent" />
          <span className="text-textSecondary">نسبة الإنجاز</span>
        </div>
        <p className="text-3xl font-bold text-textPrimary">{Math.round(completionPercentage)}%</p>
        <div className="w-full bg-secondary rounded-full h-1.5 mt-3">
          <div className="bg-accent h-1.5 rounded-full transition-all" style={{ width: `${completionPercentage}%` }} />
        </div>
      </div>
      
      <div className="bg-card rounded-xl p-5 border border-white/10">
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp className="w-5 h-5 text-accent" />
          <span className="text-textSecondary">أيام الاستمرار</span>
        </div>
        <p className="text-3xl font-bold text-textPrimary">{streakDays}</p>
        <p className="text-textSecondary text-sm mt-2">يوم من الالتزام</p>
      </div>
      
      <div className="bg-card rounded-xl p-5 border border-white/10">
        <div className="flex items-center gap-3 mb-2">
          <Award className="w-5 h-5 text-accent" />
          <span className="text-textSecondary">المستوى</span>
        </div>
        <p className="text-3xl font-bold text-accent">{level}</p>
        <p className="text-textSecondary text-sm mt-2">تقدم مستمر</p>
      </div>
    </div>
  );
};

export default ProgressStats;
