import React from 'react';
import { CheckCircle, Circle, Clock, Trash2 } from 'lucide-react';
import { TASK_CATEGORIES } from '../utils/constants';

const TaskCard = ({ task, onToggle, onDelete }) => {
  const category = TASK_CATEGORIES.find(c => c.value === task.category) || TASK_CATEGORIES[3];

  return (
    <div className="bg-secondary/30 rounded-xl p-4 border border-white/5 hover:border-accent/30 transition-all">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <button onClick={() => onToggle(task.id)} className="mt-1">
            {task.completed ? (
              <CheckCircle className="w-5 h-5 text-accent" />
            ) : (
              <Circle className="w-5 h-5 text-textSecondary" />
            )}
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className={`font-medium ${task.completed ? 'line-through text-textSecondary' : 'text-textPrimary'}`}>
                {task.title}
              </h4>
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: `${category.color}20`, color: category.color }}>
                {category.icon} {category.label}
              </span>
            </div>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1 text-textSecondary text-sm">
                <Clock className="w-3 h-3" />
                <span>{task.duration} ساعة</span>
              </div>
              {task.completedAt && (
                <span className="text-xs text-accent">✓ تم الإنجاز</span>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => onDelete(task.id)}
          className="p-1 hover:bg-red-500/20 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4 text-red-400" />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
