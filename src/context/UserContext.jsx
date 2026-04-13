import React, { createContext, useContext, useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useLocalStorage('userName', '');
  const [startDate, setStartDate] = useLocalStorage('startDate', new Date().toISOString().split('T')[0]);
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [fixedBlocks, setFixedBlocks] = useLocalStorage('fixedBlocks', {
    sleep: 7, // hours
    quran: 0.5,
    meals: 1.5,
    qiyam: 0.33,
  });
  const [subscription, setSubscription] = useLocalStorage('subscription', {
    plan: 'free',
    expiry: null,
  });
  const [currency, setCurrency] = useLocalStorage('currency', 'USD');
  const [region, setRegion] = useLocalStorage('region', 'US');

  const addTask = (task) => {
    if (!isPremium() && tasks.length >= 2) {
      throw new Error('يمكنك إضافة 2 مهام كحد أقصى في الخطة المجانية. اشترك في الخطة المدفوعة لمهام غير محدودة.');
    }
    setTasks([...tasks, { ...task, id: Date.now(), completed: false, createdAt: new Date().toISOString() }]);
  };

  const updateTask = (taskId, updates) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, ...updates } : task));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const toggleTaskComplete = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed, completedAt: !task.completed ? new Date().toISOString() : null } : task
    ));
  };

  const updateFixedBlock = (key, value) => {
    setFixedBlocks({ ...fixedBlocks, [key]: value });
  };

  const isPremium = () => {
    if (subscription.plan === 'premium') {
      if (!subscription.expiry || new Date(subscription.expiry) > new Date()) {
        return true;
      } else {
        // Expired, reset to free
        setSubscription({ plan: 'free', expiry: null });
        return false;
      }
    }
    return false;
  };

  const upgradeToPremium = () => {
    const expiry = new Date();
    expiry.setMonth(expiry.getMonth() + 1); // 1 month trial
    setSubscription({ plan: 'premium', expiry: expiry.toISOString() });
  };

  const cancelSubscription = () => {
    setSubscription({ plan: 'free', expiry: null });
  };

  const value = {
    userName, setUserName,
    startDate, setStartDate,
    tasks, setTasks,
    fixedBlocks, setFixedBlocks,
    subscription, setSubscription,
    currency, setCurrency,
    region, setRegion,
    addTask, updateTask, deleteTask, toggleTaskComplete,
    updateFixedBlock,
    isPremium, upgradeToPremium, cancelSubscription,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
