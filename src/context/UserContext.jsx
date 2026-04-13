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

  const addTask = (task) => {
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

  const value = {
    userName, setUserName,
    startDate, setStartDate,
    tasks, setTasks,
    fixedBlocks, setFixedBlocks,
    addTask, updateTask, deleteTask, toggleTaskComplete,
    updateFixedBlock,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
