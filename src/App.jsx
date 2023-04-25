import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';
import './App.css';

export default function App() {
  const [theme, setTheme] = useState('Darkmode');
  document.body.className = theme;
  const LigthMode = () => {
    setTheme((curr) => (curr === 'Darkmode' ? 'LigthMode'
      : 'Darkmode'));
    document.getElementsByTagName('form')[0].className = theme
     === 'Darkmode' ? 'LigthMode'
      : 'Darkmode';
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
        className={ theme === 'Darkmode' ? 'LigthMode-btn button-sun'
          : 'Darkmode-btn button-sun' }
        onClick={ LigthMode }
      />
    </div>
  );
}
