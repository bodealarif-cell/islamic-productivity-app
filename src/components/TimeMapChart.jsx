import React from 'react';
import { getTimeMapData } from '../utils/timeCalculator';
import { useTheme } from '../context/ThemeContext';

const TimeMapChart = ({ tasks, fixedBlocks }) => {
  const data = getTimeMapData(tasks, fixedBlocks);
  const totalHours = data.reduce((sum, d) => sum + d.hours, 0);
  const { isPremiumTheme } = useTheme();

  return (
    <div
      className={`rounded-2xl p-6 border transition-all duration-300 ${
        isPremiumTheme
          ? 'bg-[#111827] border-yellow-500/20 shadow-[0_0_20px_rgba(198,167,94,0.08)]'
          : 'bg-card border-white/10'
      }`}
    >
      {/* Header */}
      <h3 className="text-lg font-semibold text-textPrimary mb-6">
        خريطة وقتك اليومي
      </h3>

      {/* Timeline Bar */}
      <div className="flex h-10 rounded-xl overflow-hidden mb-6 shadow-inner">
        {data.map((segment, idx) => {
          const width = (segment.hours / totalHours) * 100;

          return (
            <div
              key={idx}
              className="group relative transition-all duration-300 hover:scale-y-110"
              style={{
                width: `${width}%`,
                backgroundColor: isPremiumTheme ? '#c6a75e' : segment.color,
              }}
              title={`${segment.label}: ${segment.hours.toFixed(1)} ساعة`}
            >
              {/* Hover Tooltip */}
              <div className="absolute opacity-0 group-hover:opacity-100 transition-all duration-300 -top-10 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                {segment.label} • {segment.hours.toFixed(1)}h
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {data.map((segment, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-all"
          >
            {/* Color Dot */}
            <div
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: isPremiumTheme ? '#c6a75e' : segment.color,
              }}
            />

            {/* Label */}
            <span className="text-textSecondary text-sm">
              {segment.label}
            </span>

            {/* Hours */}
            <span className="text-textPrimary text-sm font-mono mr-auto">
              {segment.hours.toFixed(1)} س
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeMapChart;
