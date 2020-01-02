import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Link
          className="App-link"
          to="/pullPage"
        >
          pullPage(下拉监听，生成图片)
        </Link>
      </header>
    </div>
  );
}

export default App;