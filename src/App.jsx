import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider, useUser } from './context/UserContext';
import Layout from './components/Layout';
import StartPage from './pages/StartPage';
import DashboardPage from './pages/DashboardPage';
import TasksPage from './pages/TasksPage';
import RestPage from './pages/RestPage';
import TimerPage from './pages/TimerPage';

const AppRoutes = () => {
  const { userName } = useUser();

  return (
    <Routes>
      <Route path="/" element={!userName ? <StartPage /> : <Navigate to="/dashboard" />} />
      <Route element={<Layout />}>
        <Route path="/dashboard" element={userName ? <DashboardPage /> : <Navigate to="/" />} />
        <Route path="/tasks" element={userName ? <TasksPage /> : <Navigate to="/" />} />
        <Route path="/rest" element={userName ? <RestPage /> : <Navigate to="/" />} />
        <Route path="/timer" element={userName ? <TimerPage /> : <Navigate to="/" />} />
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
