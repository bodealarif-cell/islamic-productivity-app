import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { UserProvider, useUser } from './context/UserContext';
import Layout from './components/Layout';
import StartPage from './pages/StartPage';
import DashboardPage from './pages/DashboardPage';
import TasksPage from './pages/TasksPage';
import RestPage from './pages/RestPage';
import TimerPage from './pages/TimerPage';
import SubscriptionPage from './pages/SubscriptionPage';

const AppRoutes = () => {
  const { userName, isPremium } = useUser();

  return (
    <Routes>
      <Route path="/" element={!userName ? <StartPage /> : <Navigate to="/dashboard" />} />
      <Route element={<Layout />}>
        <Route path="/dashboard" element={userName ? <DashboardPage /> : <Navigate to="/" />} />
        <Route path="/tasks" element={userName ? <TasksPage /> : <Navigate to="/" />} />
        <Route path="/rest" element={userName && isPremium() ? <RestPage /> : <Navigate to="/subscription" />} />
        <Route path="/timer" element={userName && isPremium() ? <TimerPage /> : <Navigate to="/subscription" />} />
        <Route path="/subscription" element={userName ? <SubscriptionPage /> : <Navigate to="/" />} />
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <UserProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </UserProvider>
    </I18nextProvider>
  );
}

export default App;
