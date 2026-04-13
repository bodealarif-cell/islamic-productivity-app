import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import Footer from './Footer';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isPremium } = useUser();

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      
      {/* Navbar */}
      <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* Main Content */}
      <main className="flex-1 w-full px-4 py-6 pb-24 md:pb-6">
        <div className="w-full max-w-screen-xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Bottom Navigation (mobile) */}
      <div className="md:hidden">
        <BottomNav />
      </div>

      {/* Footer (desktop only) */}
      <div className="hidden md:block">
        <Footer />
      </div>

    </div>
  );
};

export default Layout;
