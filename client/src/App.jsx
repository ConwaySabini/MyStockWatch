import { BrowserRouter as Router, Route } from 'react-router-dom';
import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './components/Theme/theme';
import { GlobalStyles } from './components/Theme/globalStyles';
import { useDarkMode } from './components/Theme/useDarkMode';
import Dashboard from './components/Dashboard/Dashboard';
import Home from './components/Home/Home';
import News from './components/News/News.jsx';

function App() {
  // theme toggle state
  const [theme, toggleTheme, componentMounted] = useDarkMode();
  // theme state
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  // user authentication from auth0
  const { user, isAuthenticated } = useAuth0();

  //Router for the application
  if (isAuthenticated) {
    if (!componentMounted) {
      return <></>;
    } else {
      return (
        <ThemeProvider theme={themeMode}>
          <div className="app">
            <GlobalStyles />
            <Router>
              <Route path="/" exact children={<Home />} />
              <Route path="/dashboard" exact children={<Dashboard user={user} toggleTheme={toggleTheme} theme={theme} />} />
              <Route path="/home" exact children={<Home />} />
              <Route path="/news" exact children={<News toggleTheme={toggleTheme} theme={theme} />} />
            </Router>
          </div >
        </ThemeProvider>
      );
    }
  } else {
    if (!componentMounted) {
      return <></>;
    }
    else {
      return (
        <ThemeProvider theme={themeMode}>
          <div className="app">
            <GlobalStyles />
            <Router>
              <Route path="/" exact children={<Home />} />
            </Router>
          </div>
        </ThemeProvider>
      );
    }

  }
}

export default App;
