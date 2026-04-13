import React from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from '../context/UserContext';
import useUserProgress from '../hooks/useUserProgress';
import { X, User, Calendar, Trophy, Settings, Target, Heart, Crown } from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const { t, i18n } = useTranslation();
  const { userName, startDate, isPremium } = useUser();
  const { completionPercentage, userTitle, streakDays, level } = useUserProgress();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed right-0 top-0 h-full 
          w-full sm:w-96 md:w-80
          bg-card border-l border-white/10 z-50 
          transform transition-transform duration-300
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="p-5 h-full overflow-y-auto">
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute left-4 top-4 p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5 text-textSecondary" />
          </button>

          {/* Profile */}
          <div className="mt-8 text-center">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-accent/20 to-primary rounded-full flex items-center justify-center mb-4">
              <User className="w-12 h-12 text-accent" />
            </div>

            <h3 className="text-xl font-bold text-textPrimary flex items-center justify-center gap-2">
              {userName}
              {isPremium() && <Crown className="w-5 h-5 text-yellow-500" />}
            </h3>

            <p className="text-accent text-sm mt-1">{userTitle}</p>
          </div>

          {/* Stats */}
          <div className="mt-8 space-y-4">

            <div className="bg-secondary/30 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <Target className="w-5 h-5 text-accent" />
                <span className="text-textPrimary font-medium">{t('pages.dashboard.completionProgress')}</span>
              </div>

              <div className="w-full bg-secondary rounded-full h-2">
                <div
                  className="bg-accent h-2 rounded-full transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>

              <p className="text-textSecondary text-sm mt-2">
                {Math.round(completionPercentage)}% {t('pages.dashboard.completed')}
              </p>
            </div>

            <div className="bg-secondary/30 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-5 h-5 text-accent" />
                <span className="text-textPrimary font-medium">{t('common.streak')}</span>
              </div>
              <p className="text-2xl font-bold text-textPrimary">
                {streakDays} {t('common.day')}
              </p>
            </div>

            <div className="bg-secondary/30 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <Trophy className="w-5 h-5 text-accent" />
                <span className="text-textPrimary font-medium">{t('common.level')}</span>
              </div>
              <p className="text-lg font-semibold text-accent">{level}</p>
            </div>

            <div className="bg-secondary/30 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <Settings className="w-5 h-5 text-accent" />
                <span className="text-textPrimary font-medium">{t('common.joinDate')}</span>
              </div>
              <p className="text-textSecondary">
                {new Date(startDate).toLocaleDateString(
                  i18n.language === 'ar' ? 'ar-EG' : 'en-US'
                )}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <div className="text-xs text-textSecondary mb-2">
              ✨ {i18n.language === 'ar'
                ? 'صُممَ بقلم أبو العارف'
                : 'Crafted by Abu Al-Aref'}
              ✨
            </div>

            <p className="text-xs text-textSecondary flex items-center justify-center gap-1">
              Made with <Heart className="w-3 h-3 text-red-400 fill-red-400" /> for Islamic Productivity
            </p>
          </div>

        </div>
      </div>
    </>
  );
};

export default Sidebar;
