import React from 'react';

const Button = ({ children, variant = 'primary', onClick, className = '', disabled = false, ...props }) => {
  const variants = {
    primary: 'bg-accent hover:bg-accent/80 text-white',
    secondary: 'bg-secondary hover:bg-secondary/80 text-textPrimary border border-white/10',
    danger: 'bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
