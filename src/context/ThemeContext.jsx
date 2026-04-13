import React, { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const { isPremium } = useUser();
  const [theme, setTheme] = useState("free");

  // 🎯 تشغيل الثيم مباشرة عند تغيير حالة المستخدم
  useEffect(() => {
    const premium = isPremium();

    if (premium) {
      setTheme("premium");
      document.body.classList.add("premium");   // 👑 تفعيل الذهب
    } else {
      setTheme("free");
      document.body.classList.remove("premium"); // 🔄 الرجوع للوضع العادي
    }
  }, [isPremium]);

  const value = {
    theme,
    isPremiumTheme: theme === "premium",
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
