import React, { createContext, useContext, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeColors {
  background: string;
  primary: string;
  text: string;
}

interface ThemeContextType {
  theme: Theme;
  colors: ThemeColors;
  toggleTheme: () => void;
}

const lightTheme: ThemeColors = {
  background: '#FFFFFF',
  primary: '#E50914',
  text: '#000000',
};

const darkTheme: ThemeColors = {
  background: '#121212',
  primary: '#E50914',
  text: '#FFFFFF',
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  colors: darkTheme,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const colors = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}