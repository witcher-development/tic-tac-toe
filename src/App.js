import React from 'react';
import './App.scss';
import Logo from './assets/witcher-logo.jpg';

import Board from './components/Board';
import Menu from './components/Menu';

const App = () => (
  <div className="app">
    <header className="app__header">
      <img className="app__header-logo" src={Logo} alt="logo" />
    </header>

    <Board />
    <Menu />

    <footer className="app__footer">
      <p className="app__footer-text">© 2019 Witcher Development All Rights Reserved</p>
    </footer>
  </div>
);

export default App;
