import React, { useEffect } from 'react';
import './index.css'
import createjs from 'createjs-npm';
//https://github.com/CodeAndWeb/easeljs-sprite-sheets-and-animations.git 
export default function AniSprite(props) {
  var assets = [];
  var betty;
  var stage;
  var spriteSheet;
  useEffect(() => {
    init()
  }, [init]);

  function init() {
    var manifest = [
      { src: "./asset/sheet.json", id: "sheet1", type: "spritesheet" }
    ];

    var loader = new createjs.LoadQueue(true, "./");
    loader.on("fileload", handleFileLoad);
    loader.on("complete", handleComplete);
    loader.loadManifest(manifest);
  }

  function handleFileLoad(event) {
    assets.push(event);
  }

  function handleComplete() {
    for (var i = 0; i < assets.length; i++) {
      var event = assets[i];
      var result = event.result;

      switch (event.item.id) {
        case 'sheet1':
          spriteSheet = result;
          break;
      }
    }

    initScene();
  }

  function initScene() {
    stage = new createjs.Stage(document.getElementById("testCanvas"));

    for (var i = 0; i < 5; i++) {
      var floor = new createjs.Sprite(spriteSheet, "Floor");
      floor.x = i * 256;
      floor.y = 400;
      stage.addChild(floor);
    }

    betty = new createjs.Sprite(spriteSheet, "RunRight");
    betty.x = stage.canvas.width / 2;
    betty.y = 400;
    stage.addChild(betty);

    // Add Betty to the stage, and add her as a listener to Ticker to get updates each frame.全局心跳
    createjs.Ticker.on("tick", tick);

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", stage);
  }

  function tick(e) {
    betty.x = (betty.x + e.delta * 0.5) % stage.canvas.width;
  }

  return (
    <canvas id="testCanvas" width="960" height="540"></canvas>
  );
}


