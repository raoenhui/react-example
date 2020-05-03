import React, { useEffect, useState, useRef } from 'react';
// import 'yuki-createjs/lib/easeljs-0.8.2.combined.js'
import lottie from 'lottie-web'
import {  toRem } from '../utils/common';
import createjs from 'createjs-npm/lib/preload';
import './index.less';
import SoundIcon from './compontents/SoundIcon';


//https://developer.mozilla.org/en-US/docs/Web/API/Animation/play
//https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio


//https://juejin.im/post/5e15dcd151882577d34dca47
//https://codepen.io/gwx-code/pen/yLyvPBJ?__cf_chl_jschl_tk__=5e07da3ef25fc98cbb9aa1758810d20c3e72d357-1586862791-0-AW8G8GJQEG8uCtEO_UDBqozEZBvehxOZZwJAqPUtO_mJPOPhAx808OLLHx7qE4XYlSmhpNn_nW4WCF-82W0ttfGW74_psl16GTkD-56uIYfZCv3-SOJ_gA1pOL8tbQ4IUwe3GbytM4HWmf67Uss3yuRwpM_N1-MbK1iOca6lLuBJbo2AFejZl4Oa54fvL1oUgdxnp_fyDCqZfrw62xU9Bd8AKGRAv6pvyHodyyJc4LWjh1tuZ9QodkC5xD9FmeBbeRUmsdSBL2g1OESNjNxCCJfUO3V83ZRv9k2exwFZ88lksToLdBS_EL_5gEsUfRGxSVcIsNtZy-PSIRWEgLqzTpNIsUBy1hyGXz9V9CEtWp1p
//https://www.zhangxinxu.com/wordpress/2012/09/css3-3d-transform-perspective-animate-transition/
//https://github.com/Rcong/Carousel/tree/master/js
//https://www.zhangxinxu.com/study/201209/pictures-3d-slide-view.html
//https://www.zhangxinxu.com/wordpress/2012/09/css3-3d-transform-perspective-animate-transition/
//https://www.w3cschool.cn/css3/css3-qs8z2oq9.html
var aryOrigin = ['', `translate(${toRem(125)}rem, ${toRem(-50)}rem)  scale(0.8)`,
  `translate(${toRem(60)}rem, ${toRem(-100)}rem) scale(0.6)`,
  `translate(${toRem(0)}rem, ${toRem(-150)}rem) scale(0.4)`,
  `translate(${toRem(-50)}rem, ${toRem(-100)}rem) scale(0.6)`,
  `translate(${toRem(-125)}rem, ${toRem(-50)}rem) scale(0.8)`];
// var imgAry = [
//   "../assets/mm1.jpg", "../assets/mm8.jpg", "../assets/mm3.jpg", "../assets/mm4.jpg", "../assets/mm6.jpg", "../assets/mm7.jpg"
// ]

//https://assets9.lottiefiles.com/packages/lf20_CFgBAP.json 552*531
var imgAry = [
  "https://assets9.lottiefiles.com/packages/lf20_CFgBAP.json",
  "https://assets5.lottiefiles.com/packages/lf20_EefDDB.json",
  "https://assets5.lottiefiles.com/packages/lf20_JsOd7m.json",
  "https://assets10.lottiefiles.com/packages/lf20_Tn9NbH.json",
  "https://assets10.lottiefiles.com/packages/lf20_nKCnOy.json",
  "https://assets6.lottiefiles.com/private_files/lf30_WdTEui.json",
]
const starAry = ['https://storage.360buyimg.com/enhui-myfile/flickHead_01.mp3?Expires=3733909996&AccessKey=suTYcZ0U6yaSeX1b&Signature=Dra4P1XPKRrSeUoiPMQSD38F3V8%3D', 'https://storage.360buyimg.com/h5-games/svga/CabinBoy.mp3?Expires=3734865233&AccessKey=V65O5WsaA0JVBSC4&Signature=GHacUcMj2ySgGviyis8xNqM89YE%3D'];
const bgAry = ['https://storage.360buyimg.com/enhui-myfile/background.mp3?Expires=3733910686&AccessKey=suTYcZ0U6yaSeX1b&Signature=5jycIe6s4bpRPgkaUW1UTp4vYdM%3D', 'https://storage.360buyimg.com/h5-games/svga/bgMusic.mp3?Expires=3734865279&AccessKey=V65O5WsaA0JVBSC4&Signature=ZDrQXu9x2%2BrDdj%2FggVHuTnwpP4Y%3D',];

var curIndex = 0;
const SoundIconAct = new Array(6).fill(false);
export default function AniLottie() {
  const svgRefs = useRef([]);
  const starRef = useRef([]);
  const bgRef = useRef([]);
  const DataRef = useRef({ lottieAry: [], tabIndex: 0 });//全局数据
  const [transAry, setTransform] = useState({});
  const [starV, setstarV] = useState(starAry[0]); //明星声音
  const [bgV, setbgV] = useState(bgAry[0]); //背景声音
  const [mute, setmute] = useState(false);//是否静音，true为静音
  const [soundIconAry, setsoundIconAry] = useState([]);//是否静音，true为静音

  useEffect(() => {
    document.title = '地图'
    setTransform(aryOrigin)
    imgAry.map((val, i) => {
      initLottie(i)
    })
    preLoad()
    soundFun()
    return () => {
      DataRef.current.lottieAry.map((obj) => {
        obj && obj.destroy();
      })
    }
  }, [soundFun])

  //控制声音方法
  function soundFun() {
    preLoad().then(() => {
      if (!bgRef.current.paused) {
        _removeDot();
      }
      bgRef.current.addEventListener("playing", function () {
        _removeDot();
      });
      starRef.current.addEventListener("playing", function () {
        var tSoundIconAct = new Array(6).fill(false)
        tSoundIconAct[DataRef.current.tabIndex] = true;
        setsoundIconAry(tSoundIconAct)
        console.log('SoundIconAct---playing', tSoundIconAct)
      });
      starRef.current.addEventListener("pause", function () {
        setsoundIconAry(SoundIconAct)
        console.log('SoundIconAct---pause', SoundIconAct)
      });

    })
  }

  //删除点
  function _removeDot() {
    document.getElementById('mapdot') && document.getElementById('mapdot').remove()
  }

  //预加载图片
  function preLoad() {
    return new Promise((res, rej) => {
      try {
        const loader = new createjs.LoadQueue(true);
        // loader.loadManifest(imgAry);
        loader.loadManifest([bgAry[0], ...imgAry]);
        loader.on('complete', function () {
           loader.getResult("sound1");
          res();
        });
        loader.on('fileload', function (e) {
          console.log('fileload---', e.target.progress);
          res();
        })
      } catch (e) {
        console.log(e);
        rej();
      }
    })

  }

  //初始化lottie
  function initLottie(i) {
    DataRef.current.lottieAry[i] = lottie.loadAnimation({
      container: svgRefs.current[i], // the dom element that will contain the animation
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: imgAry[i] // the path to the animation json
    });
  }

  function changeTab(index = 0) {
    DataRef.current.tabIndex = index;
    var ary = JSON.parse(JSON.stringify(aryOrigin));

    ary.unshift(...ary.splice(ary.length - index, index))
    setTransform(JSON.parse(JSON.stringify(ary)))
    changeSound(index)


  }
  function changeSound(i) {
    let tIndex = i % 2;
    setbgV(bgAry[tIndex])
  }

  //播放明星声音
  function _starPlay(i) {
    let tIndex = i % 2;
    setstarV(starAry[tIndex])
    starRef.current.play()
  }

  //点击是否静音键
  function changeMute() {
    // changeSound(DataRef.current.tabIndex)
    // !mute ? bgRef.current.pause() : bgRef.current.play()
    // if (!mute && bgRef.current.play) {
    //   bgRef.current.pause()
    // }

    let tMute = !mute;
    starRef.current.muted = tMute
    bgRef.current.muted = tMute
    if (tMute) {
      starRef.current.pause();
      bgRef.current.pause();
    }
    setmute(tMute)
    _removeDot();
  }

  return (
    <div className='MapPage'>
      <div onClick={changeMute} className="MapPage-icon">
        {/*<div id="mapdot" className={`MapPage-icon-dot`}></div> */}
        <img className={`MapPage-icon-con  ${mute ? 'stop' : ''}`} src="https://img12.360buyimg.com/imagetools/jfs/t1/102740/14/19631/6239/5e9eaf5fE32d7b687/bae3d70a1a34abf8.jpg" alt='1' />

      </div>
      <div id="container" className="container" style={{ transform: '' }}>
        {imgAry.map((val, i) => {
          return <div onClick={changeTab.bind(this, i)} className="map-item" style={{ transform: transAry[i] }} key={i}>
            <div onClick={_starPlay.bind(this, i)} className="map-diaglog">
              <SoundIcon className={`map-diaglog-icon `} active={soundIconAry[i]} />
            </div>
            <div className="piece" ref={el => (svgRefs.current[i] = el)}></div>
          </div>
        })}
      </div>
      <div className='MapBtn' style={{ 'height': '10rem' }} onClick={changeTab}>点击</div>
      <audio ref={starRef} src={starV} preload="auto" controls="controls" />
      <audio ref={bgRef} autoPlay="autoPlay" src={bgV} preload="auto" controls="controls" loop="loop" ></audio>
      {/* <ZeroAudio /> */}

    </div>

  );
}