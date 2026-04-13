import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import TaskCard from '../components/TaskCard';
import Button from '../components/Button';
import TimeMapChart from '../components/TimeMapChart';
import { Plus, Settings } from 'lucide-react';
import { TASK_CATEGORIES, FIXED_BLOCKS_LABELS } from '../utils/constants';
import { calculateRemainingTime } from '../utils/timeCalculator';

const TasksPage = () => {
  const { tasks, addTask, toggleTaskComplete, deleteTask, fixedBlocks, updateFixedBlock } = useUser();
  const [showAddForm, setShowAddForm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', duration: 30, category: 'personal' });
  const remainingTime = calculateRemainingTime(tasks, fixedBlocks);

  const handleAddTask = () => {
    if (newTask.title.trim()) {
      addTask({ ...newTask, title: newTask.title.trim() });
      setNewTask({ title: '', duration: 30, category: 'personal' });
      setShowAddForm(false);
    }
  };

  const handleFixedBlockChange = (key, value) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0) {
      updateFixedBlock(key, numValue);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-textPrimary">مهامي اليومية</h2>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => setShowSettings(!showSettings)}>
            <Settings className="w-4 h-4 ml-2" />
            الإعدادات
          </Button>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="w-4 h-4 ml-2" />
            مهمة جديدة
          </Button>
        </div>
      </div>

      {/* Fixed Blocks Settings */}
      {showSettings && (
        <div className="bg-card rounded-xl p-5 border border-white/10">
          <h3 className="text-lg font-semibold text-textPrimary mb-4">تعديل الأوقات الثابتة</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(FIXED_BLOCKS_LABELS).map(([key, label]) => (
              <div key={key}>
                <label className="block text-textSecondary text-sm mb-1">{label}</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.5"
                    value={fixedBlocks[key]}
                    onChange={(e) => handleFixedBlockChange(key, e.target.value)}
                    className="bg-secondary/50 border border-white/10 rounded-lg px-3 py-2 text-textPrimary w-24"
                  />
                  <span className="text-textSecondary">ساعات</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-textSecondary text-sm mt-4">
            ملاحظة: أوقات الصلاة (100 دقيقة) ثابتة ولا يمكن تغييرها
          </p>
        </div>
      )}

      {/* Add Task Form */}
      {showAddForm && (
        <div className="bg-card rounded-xl p-5 border border-white/10">
          <h3 className="text-lg font-semibold text-textPrimary mb-4">إضافة مهمة جديدة</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="عنوان المهمة"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="w-full bg-secondary/50 border border-white/10 rounded-lg px-4 py-2 text-textPrimary"
            />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-textSecondary text-sm mb-1">المدة (دقائق)</label>
                <input
                  type="number"
                  value={newTask.duration}
                  onChange={(e) => setNewTask({ ...newTask, duration: parseInt(e.target.value) || 0 })}
                  className="w-full bg-secondary/50 border border-white/10 rounded-lg px-4 py-2 text-textPrimary"
                />
              </div>
              <div>
                <label className="block text-textSecondary text-sm mb-1">التصنيف</label>
                <select
                  value={newTask.category}
                  onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                  className="w-full bg-secondary/50 border border-white/10 rounded-lg px-4 py-2 text-textPrimary"
                >
                  {TASK_CATEGORIES.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.icon} {cat.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={handleAddTask}>إضافة</Button>
              <Button variant="secondary" onClick={() => setShowAddForm(false)}>إلغاء</Button>
            </div>
          </div>
        </div>
      )}

      {/* Remaining Time Info */}
      <div className="bg-accent/10 rounded-xl p-4 border border-accent/20">
        <p className="text-textPrimary">
          الوقت المتبقي اليوم بعد خصم العبادات والثوابت: 
          <span className="text-accent font-bold text-xl mr-2">{remainingTime.toFixed(1)}</span>
          ساعة
        </p>
      </div>

      {/* Time Map */}
      <TimeMapChart tasks={tasks} fixedBlocks={fixedBlocks} />

      {/* Tasks List */}
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="text-center py-12 text-textSecondary">
            لا توجد مهام بعد. أضف مهمتك الأولى!
          </div>
        ) : (
          tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={toggleTaskComplete}
              onDelete={deleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TasksPage;
