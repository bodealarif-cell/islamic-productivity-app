import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useUser } from '../context/UserContext';
import useUserProgress from '../hooks/useUserProgress';
import { Menu, Moon, Home, CheckSquare, Headphones, Clock, Crown } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = ({ onMenuClick }) => {
  const { t } = useTranslation();
  const { userName, isPremium } = useUser();
  const { userTitle } = useUserProgress();
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: Home, label: t('nav.home') },
    { path: '/tasks', icon: CheckSquare, label: t('nav.tasks') },
    { path: '/rest', icon: Headphones, label: t('nav.rest') },
    { path: '/timer', icon: Clock, label: t('nav.timer') },
    { path: '/subscription', icon: Crown, label: t('nav.subscription') },
  ];

  return (
    <nav className="bg-card/50 backdrop-blur-sm border-b border-white/10 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button
              onClick={onMenuClick}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Menu className="w-5 h-5 text-textSecondary" />
            </button>
            <div className="flex items-center gap-2">
              <Moon className="w-5 h-5 text-accent" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-accent to-cyan-400 bg-clip-text text-transparent flex items-center gap-2">
                {t('app.title')}
                {isPremium() && <Crown className="w-4 h-4 text-yellow-500" />}
              </h1>
            </div>
          </div>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === path
                    ? 'text-accent bg-accent/10'
                    : 'text-textSecondary hover:text-textPrimary hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{label}</span>
              </Link>
            ))}
          </div>
          
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <div className="flex items-center gap-3 bg-secondary/50 rounded-full px-4 py-1.5">
              <span className="text-textPrimary font-medium">{userName || t('common.guest')}</span>
              <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full flex items-center gap-1">
                {isPremium() && <Crown className="w-3 h-3" />}
                {userTitle}
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
