import React from 'react';
import { useUser } from '../context/UserContext';
import useUserProgress from '../hooks/useUserProgress';
import { Menu, Moon } from 'lucide-react';

const Navbar = ({ onMenuClick }) => {
  const { userName } = useUser();
  const { userTitle } = useUserProgress();

  return (
    <nav className="bg-card/50 backdrop-blur-sm border-b border-white/10 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <Menu className="w-5 h-5 text-textSecondary" />
          </button>
          <div className="flex items-center gap-2">
            <Moon className="w-5 h-5 text-accent" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-accent to-cyan-400 bg-clip-text text-transparent">
              نور حياتك
            </h1>
          </div>
        </div>
        
        <div className="flex items-center gap-3 bg-secondary/50 rounded-full px-4 py-1.5">
          <span className="text-textPrimary font-medium">{userName || 'زائر'}</span>
          <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full">
            {userTitle}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
