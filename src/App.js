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
        <Link
          className="App-link"
          to="/preLoadImg"
        >
          预加载图片
        </Link>
        <Link
          className="App-link"
          to="/preLoadImg1"
        >
          预加载图片(自己写的)
        </Link>
        <Link
          className="App-link"
          to="/svga"
        >
          svga动画案例
        </Link>
        <Link
          className="App-link"
          to="/lottie"
        >
          lottie动画案例
        </Link>
        <Link
          className="App-link"
          to="/sprite"
        >
          png序列帧动画案例
        </Link>
      </header>
    </div>
  );
}

export default App;