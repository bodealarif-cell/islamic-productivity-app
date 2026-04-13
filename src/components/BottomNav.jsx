import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, CheckSquare, Headphones, Clock } from 'lucide-react';

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'الرئيسية' },
    { path: '/tasks', icon: CheckSquare, label: 'المهام' },
    { path: '/rest', icon: Headphones, label: 'الراحة' },
    { path: '/timer', icon: Clock, label: 'المؤقت' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-sm border-t border-white/10 z-40 md:hidden">
      <div className="flex justify-around items-center py-2">
        {navItems.map(({ path, icon: Icon, label }) => (
          <Link
            key={path}
            to={path}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              location.pathname === path
                ? 'text-accent bg-accent/10'
                : 'text-textSecondary hover:text-textPrimary'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-xs mt-1">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;