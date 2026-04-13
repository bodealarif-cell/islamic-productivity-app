import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Moon, Sparkles, ArrowRight } from 'lucide-react';

const StartPage = () => {
  const [name, setName] = useState('');
  const { setUserName, setStartDate } = useUser();
  const navigate = useNavigate();

  const handleStart = () => {
    if (name.trim()) {
      setUserName(name.trim());
      setStartDate(new Date().toISOString().split('T')[0]);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-accent/10 rounded-2xl mb-4">
            <Moon className="w-12 h-12 text-accent" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-accent to-cyan-400 bg-clip-text text-transparent">
            نور حياتك
          </h1>
          <p className="text-textSecondary mt-2">منظم العبادات والمهام اليومية</p>
        </div>

        <div className="bg-card rounded-2xl p-8 border border-white/10">
          <div className="space-y-6">
            <div>
              <label className="block text-textPrimary mb-2">ما هو اسمك؟</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleStart()}
                placeholder="أدخل اسمك..."
                className="w-full bg-secondary/50 border border-white/10 rounded-xl px-4 py-3 text-textPrimary placeholder:text-textSecondary focus:outline-none focus:border-accent transition-colors"
                autoFocus
              />
            </div>
            
            <button
              onClick={handleStart}
              disabled={!name.trim()}
              className="w-full bg-accent hover:bg-accent/80 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <span>ابدأ رحلتك</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="flex items-center justify-center gap-2 text-textSecondary text-sm">
              <Sparkles className="w-4 h-4 text-accent" />
              <span>نظم وقتك، ازدد إيماناً وإنتاجية</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
