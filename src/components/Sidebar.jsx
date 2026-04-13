import React from 'react';
import { useUser } from '../context/UserContext';
import useUserProgress from '../hooks/useUserProgress';
import { X, User, Calendar, Trophy, Settings, Target } from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const { userName, startDate } = useUser();
  const { completionPercentage, userTitle, streakDays, level } = useUserProgress();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-80 bg-card border-l border-white/10 z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-5">
          <button
            onClick={onClose}
            className="absolute left-4 top-4 p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5 text-textSecondary" />
          </button>
          
          <div className="mt-8 text-center">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-accent/20 to-primary rounded-full flex items-center justify-center mb-4">
              <User className="w-12 h-12 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-textPrimary">{userName}</h3>
            <p className="text-accent text-sm mt-1">{userTitle}</p>
          </div>
          
          <div className="mt-8 space-y-4">
            <div className="bg-secondary/30 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <Target className="w-5 h-5 text-accent" />
                <span className="text-textPrimary font-medium">التقدم اليومي</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div
                  className="bg-accent h-2 rounded-full transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
              <p className="text-textSecondary text-sm mt-2">{Math.round(completionPercentage)}% مكتمل</p>
            </div>
            
            <div className="bg-secondary/30 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-5 h-5 text-accent" />
                <span className="text-textPrimary font-medium">الأيام الملتزمة</span>
              </div>
              <p className="text-2xl font-bold text-textPrimary">{streakDays} يوم</p>
            </div>
            
            <div className="bg-secondary/30 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <Trophy className="w-5 h-5 text-accent" />
                <span className="text-textPrimary font-medium">المستوى</span>
              </div>
              <p className="text-lg font-semibold text-accent">{level}</p>
            </div>
            
            <div className="bg-secondary/30 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <Settings className="w-5 h-5 text-accent" />
                <span className="text-textPrimary font-medium">تاريخ الانضمام</span>
              </div>
              <p className="text-textSecondary">{new Date(startDate).toLocaleDateString('ar-EG')}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
