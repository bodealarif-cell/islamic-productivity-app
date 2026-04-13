import React from 'react';
import { Lightbulb, Sparkles } from 'lucide-react';

const AISuggestion = ({ suggestion }) => {
  if (!suggestion) return null;

  const getIcon = () => {
    switch (suggestion.type) {
      case 'motivation':
        return <Sparkles className="w-5 h-5 text-yellow-400" />;
      case 'reward':
        return <Sparkles className="w-5 h-5 text-accent" />;
      default:
        return <Lightbulb className="w-5 h-5 text-accent" />;
    }
  };

  return (
    <div className="bg-gradient-to-r from-accent/10 to-primary/30 rounded-xl p-4 border border-accent/20">
      <div className="flex items-start gap-3">
        {getIcon()}
        <p className="text-textPrimary flex-1">{suggestion.message}</p>
      </div>
    </div>
  );
};

export default AISuggestion;
