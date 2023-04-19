import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';

import logo from './trivia.png';
import './App.css';

import Configuracoes from './components/Configuracoes';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>SUA VEZ</p>
      </header>
      <main>
        <Switch>
          <Route exact path="/" component={ Login } />

          <Route exact path="/config" component={ Configuracoes } />
        </Switch>
      </main>
    </div>
  );
}
