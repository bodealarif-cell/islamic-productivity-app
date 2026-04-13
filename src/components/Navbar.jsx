import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useUser } from '../context/UserContext';
import useUserProgress from '../hooks/useUserProgress';
import { Menu, Moon, Home, CheckSquare, Headphones, Clock, Crown } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { useTheme } from '../context/ThemeContext';

const Navbar = ({ onMenuClick }) => {
  const { t } = useTranslation();
  const { userName, isPremium } = useUser();
  const { userTitle } = useUserProgress();
  const { isPremiumTheme } = useTheme();
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: Home, label: t('nav.home') },
    { path: '/tasks', icon: CheckSquare, label: t('nav.tasks') },
    { path: '/rest', icon: Headphones, label: t('nav.rest') },
    { path: '/timer', icon: Clock, label: t('nav.timer') },
    { path: '/subscription', icon: Crown, label: t('nav.subscription') },
  ];

  return (
    <nav
      className={`sticky top-0 z-40 backdrop-blur-sm border-b transition-all duration-300
        ${isPremiumTheme
          ? 'bg-[#0b0f19]/80 border-yellow-500/20 shadow-[0_0_20px_rgba(198,167,94,0.08)]'
          : 'bg-card/50 border-white/10'
        }
      `}
    >
      <div className="w-full max-w-screen-xl mx-auto px-4 py-3">

        <div className="flex justify-between items-center">

          {/* LEFT SIDE */}
          <div className="flex items-center gap-3">
            <button
              onClick={onMenuClick}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Menu className="w-5 h-5 text-textSecondary" />
            </button>

            <div className="flex items-center gap-2">
              <Moon className="w-5 h-5 text-accent" />

              <h1 className="text-xl font-bold flex items-center gap-2">
                <span
                  className={
                    isPremiumTheme
                      ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent'
                      : 'bg-gradient-to-r from-accent to-cyan-400 bg-clip-text text-transparent'
                  }
                >
                  {t('app.title')}
                </span>

                {isPremium() && (
                  <Crown className="w-4 h-4 text-yellow-500" />
                )}
              </h1>
            </div>
          </div>

          {/* NAV LINKS */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                  location.pathname === path
                    ? isPremiumTheme
                      ? 'text-yellow-400 bg-yellow-500/10'
                      : 'text-accent bg-accent/10'
                    : 'text-textSecondary hover:text-textPrimary hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{label}</span>
              </Link>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">

            <LanguageSwitcher />

            <div
              className={`flex items-center gap-3 rounded-full px-4 py-1.5 transition-all ${
                isPremiumTheme
                  ? 'bg-yellow-500/10 border border-yellow-500/20'
                  : 'bg-secondary/50'
              }`}
            >
              <span className="text-textPrimary font-medium">
                {userName || t('common.guest')}
              </span>

              <span
                className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${
                  isPremiumTheme
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : 'bg-accent/20 text-accent'
                }`}
              >
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
