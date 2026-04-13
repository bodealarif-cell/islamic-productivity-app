import React, { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const { isPremium } = useUser();
  const [theme, setTheme] = useState("free");

  useEffect(() => {
    if (isPremium()) {
      setTheme("premium");
    } else {
      setTheme("free");
    }
  }, [isPremium]);

  const themes = {
    free: {
      name: "free",
    },
    premium: {
      name: "premium",
    },
  };

  return (
    <ThemeContext.Provider value={{ theme, styles: themes[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
