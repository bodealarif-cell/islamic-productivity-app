import React, { useState, useEffect, useRef } from 'react';
import { useUser } from '../context/UserContext';
import FlipClock from '../components/FlipClock';
import Button from '../components/Button';
import { Play, RefreshCw, CheckCircle } from 'lucide-react';

const TimerPage = () => {
  const { tasks, toggleTaskComplete } = useUser();
  const [selectedTaskId, setSelectedTaskId] = useState('');
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [initialDuration, setInitialDuration] = useState(25);
  const intervalRef = useRef(null);

  const incompleteTasks = tasks.filter(t => !t.completed);
  const selectedTask = tasks.find(t => t.id === selectedTaskId);

  useEffect(() => {
    if (selectedTask && !isRunning) {
      setTimerSeconds(selectedTask.duration * 60);
      setInitialDuration(selectedTask.duration);
    }
  }, [selectedTask]);

  useEffect(() => {
    if (isRunning && timerSeconds > 0) {
      intervalRef.current = setInterval(() => {
        setTimerSeconds(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, timerSeconds]);

  const handleStart = () => {
    if (!selectedTaskId) return;
    if (!isRunning && timerSeconds > 0) {
      setIsRunning(true);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    if (selectedTask) {
      setTimerSeconds(selectedTask.duration * 60);
    } else {
      setTimerSeconds(initialDuration * 60);
    }
  };

  const handleAlhamdulillah = () => {
    if (selectedTaskId && !selectedTask?.completed) {
      toggleTaskComplete(selectedTaskId);
      setIsRunning(false);
      // Show feedback or reset
      setTimeout(() => {
        setSelectedTaskId('');
        setTimerSeconds(0);
      }, 500);
    }
  };

  const handleTaskChange = (e) => {
    setIsRunning(false);
    const taskId = parseInt(e.target.value);
    setSelectedTaskId(taskId);
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      setTimerSeconds(task.duration * 60);
      setInitialDuration(task.duration);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-textPrimary">أمسك الشمس - مؤتمر المهام</h2>
      
      {/* Task Selector */}
      <div className="bg-card rounded-xl p-6 border border-white/10">
        <label className="block text-textPrimary mb-3">اختر المهمة التي تريد التركيز عليها</label>
        <select
          value={selectedTaskId}
          onChange={handleTaskChange}
          className="w-full bg-secondary/50 border border-white/10 rounded-xl px-4 py-3 text-textPrimary focus:outline-none focus:border-accent"
        >
          <option value="">-- اختر مهمة --</option>
          {incompleteTasks.map(task => (
            <option key={task.id} value={task.id}>
              {task.title} - {task.duration} دقيقة
            </option>
          ))}
        </select>
        {incompleteTasks.length === 0 && (
          <p className="text-accent mt-3 text-center">🎉 مبارك! كل المهام مكتملة اليوم</p>
        )}
      </div>

      {/* Flip Clock */}
      {selectedTask && (
        <div className="bg-card rounded-xl p-8 border border-white/10">
          <FlipClock timeInSeconds={timerSeconds} />
          
          <div className="flex justify-center gap-4 mt-8">
            <Button onClick={handleStart} disabled={isRunning}>
              <Play className="w-4 h-4 ml-2" />
              ابدأ
            </Button>
            <Button variant="secondary" onClick={handleReset}>
              <RefreshCw className="w-4 h-4 ml-2" />
              إعادة
            </Button>
            <Button variant="primary" onClick={handleAlhamdulillah} disabled={selectedTask?.completed}>
              <CheckCircle className="w-4 h-4 ml-2" />
              الحمد لله
            </Button>
          </div>
          
          {selectedTask?.completed && (
            <p className="text-center text-accent mt-4">✓ تم إنجاز هذه المهمة بنجاح</p>
          )}
        </div>
      )}

      {/* Instructions */}
      <div className="bg-secondary/30 rounded-xl p-5 border border-white/5">
        <h3 className="font-semibold text-textPrimary mb-2">كيفية الاستخدام:</h3>
        <ul className="list-disc list-inside space-y-1 text-textSecondary">
          <li>اختر مهمة غير مكتملة من القائمة</li>
          <li>اضغط "ابدأ" لبدء المؤقت</li>
          <li>ركز على المهمة حتى انتهاء الوقت</li>
          <li>بعد إتمام المهمة، اضغط "الحمد لله" لتسجيل الإنجاز</li>
        </ul>
      </div>
    </div>
  );
};

export default TimerPage;
