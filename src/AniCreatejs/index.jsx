import React, { useEffect, useState } from 'react';
import './index.less'
import createjs from 'createjs-npm';
//https://github.com/CodeAndWeb/easeljs-sprite-sheets-and-animations.git 
export default function AniSprite(props) {
  var assets = [];//预加载的元素
  var betty;//动的小人名字
  var stage;//舞台
  var spriteSheet;
  var circle;//右上角圆
  var soundObj;//声音对象
  const [mute, setmute] = useState(false);//是否静音，true为静音
  useEffect(() => {
    init()
  }, [init]);

  function init() {
    //preload
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
    //easejs
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
    _initCircle()
    _initSound()

    // Add Betty to the stage, and add her as a listener to Ticker to get updates each frame.全局心跳
    createjs.Ticker.on("tick", tick);

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", stage);

  
  }
  function tick(e) {
    betty.x = (betty.x + e.delta * 0.5) % stage.canvas.width;
  }

  //Tween
  function _initCircle() {
    circle = new createjs.Shape();
    var fillCmd = circle.graphics.beginFill("#FF0000").command;
    circle.graphics.drawCircle(0, 0, 40);
    circle.x = 810;
    circle.y = 40;
    stage.addChild(circle);

    //添加颜色插件ColorPlugin
    //https://www.createjs.com/docs/tweenjs/classes/ColorPlugin.html
    createjs.ColorPlugin.install();//可以渐变过渡动画色值
    // set up a tween that tweens the color of the fill:
    createjs.Tween.get(fillCmd, {loop:-1, bounce:true})
    .to({style:"#FF0000"}, 1000) // supports 6 digit hex colors
    .to({style:"#FF0"}, 1000) // 3 digit hex colors
    .to({style:"rgb(100%,80%,10%)"}, 1000) // rgb and rgba colors

    createjs.Tween.get(circle, { loop: true }).wait(500).to({ marignTop:200,scaleX: 0.8, scaleY: 0.8 }).wait(500).to({ scaleX: 1, scaleY: 1 }, 1000, createjs.Ease.bounceInOut)

  }

  //Sound
  function _initSound() {
    createjs.Sound.alternateExtensions = ["wav"];
    createjs.Sound.on("fileload", (event) => {
      // 这会引发针对每个已注册的声音。
      soundObj = createjs.Sound.play(event.src);  // 发挥使用ID。也可以使用完整的源路径或event.src。
      soundObj.on("complete", () => {
        console.log('complete')
      }, this);
      soundObj.volume = 0.9;
    }, this);
    createjs.Sound.registerSound("https://storage.360buyimg.com/xingdianzhang/bg_qingyang.wav", 'soundId', { loop: 8 });
  }

  function _changeMute() {
    if(mute){
      createjs.Sound.play('soundId')
    }else{
      createjs.Sound.stop()
    }
    setmute(!mute)
  }
  return (
    <div>
      <div onClick={_changeMute} className={`MapPage-icon ${mute ? 'mute' : ''}`}></div>
      <canvas id="testCanvas" width="960" height="540"></canvas>
    </div>

  );
}


