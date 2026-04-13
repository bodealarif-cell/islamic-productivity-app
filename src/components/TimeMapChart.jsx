import React from 'react';
import { getTimeMapData } from '../utils/timeCalculator';

const TimeMapChart = ({ tasks, fixedBlocks }) => {
  const data = getTimeMapData(tasks, fixedBlocks);
  const totalHours = data.reduce((sum, d) => sum + d.hours, 0);

  return (
    <div className="bg-card rounded-xl p-6 border border-white/10">
      <h3 className="text-lg font-semibold text-textPrimary mb-4">خريطة وقتك اليومي</h3>
      <div className="flex h-8 rounded-lg overflow-hidden mb-4">
        {data.map((segment, idx) => (
          <div
            key={idx}
            className="transition-all duration-500"
            style={{
              width: `${(segment.hours / totalHours) * 100}%`,
              backgroundColor: segment.color,
            }}
            title={`${segment.label}: ${segment.hours.toFixed(1)} ساعة`}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {data.map((segment, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: segment.color }} />
            <span className="text-textSecondary text-sm">{segment.label}</span>
            <span className="text-textPrimary text-sm font-mono mr-auto">{segment.hours.toFixed(1)} س</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeMapChart;
