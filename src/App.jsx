import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';
import './App.css';

export default async function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'Darkmode');

  useEffect(() => {
    const domSelect = document.getElementsByTagName('form');
    document.body.className = theme;
    if (domSelect.length !== 0) domSelect[0].className = theme;
  }, [theme]);

  const LigthMode = () => {
    const newTheme = theme === 'Darkmode' ? 'LigthMode' : 'Darkmode';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/game" component={ Game } />
        <Route path="/settings" component={ Settings } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/ranking" component={ Ranking } />
      </Switch>
      <FontAwesomeIcon
        id=""
        icon={ faSun }
        className={ theme === 'Darkmode' ? 'button-sun LigthMode-btn'
          : 'button-sun Darkmode-btn' }
        onClick={ LigthMode }
      />
    </div>
  );
}
