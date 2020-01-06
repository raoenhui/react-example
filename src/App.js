import React from 'react';
import './App.css';
import {
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-dome">dome</div>
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