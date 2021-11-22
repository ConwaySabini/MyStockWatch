import { useEffect, useState } from 'react';

export const useDarkMode = () => {
  const [theme, setTheme] = useState('dark');
  const [componentMounted, setComponentMounted] = useState(false);

  const setMode = mode => {
    window.localStorage.setItem('theme', mode)
    setTheme(mode)
  };

  const toggleTheme = () => {
    if (theme === 'light') {
      setMode('dark');
    } else {
      setMode('light');
    }
  };

  useEffect(() => {
    // const localTheme = window.localStorage.getItem('theme');
    // if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && localTheme !== 'dark') {
    //   setMode('dark');
    // } else if (localTheme) {
    //   setTheme(localTheme);
    //   setMode('light');
    // }
    setComponentMounted(true);
  }, []);

  return [theme, toggleTheme, componentMounted]
};
