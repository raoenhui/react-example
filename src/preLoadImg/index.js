import React,{ useEffect ,useState } from 'react'
import createjs from 'createjs-npm';
const  manifest = [
    {id: 'share', src: 'https://img30.360buyimg.com/pop/jfs/t1/96821/8/7977/113608/5e018694E332d903e/d04f1cb6a1a84310.png'},
    {id: 'title', src: '//img30.360buyimg.com/pop/jfs/t1/100813/34/7941/32580/5e0083a7E19d77d46/a3fe8da1d96ee9ec.png'},
    {id: 'bg-rule', src: '//img30.360buyimg.com/pop/jfs/t1/107874/24/1859/55497/5e01a9a4Eeb5d6451/77971ca5e9ab7339.png'},
    {id: 'btn', src: '//img30.360buyimg.com/pop/jfs/t1/105125/17/7347/46152/5dfb331dE3d72742c/5874ce457cf1c23b.png'}
    // ,
    // {id: 'dialog0', src: '//img30.360buyimg.com/pop/jfs/t1/96218/16/7465/44148/5dfb56b2E704c7993/ef424c646af36b23.png'},
    // {id: 'dialog1', src: '//img30.360buyimg.com/pop/jfs/t1/100947/14/7322/126212/5dfb3344E16dd689a/aa0610f3abdc7d35.png'},
    // {id: 'dialog2', src: '//img30.360buyimg.com/pop/jfs/t1/95357/12/7450/66327/5dfb3333E61c8bdd6/282fae7125c39756.png'},
    // {id: 'dialog3', src: '//img30.360buyimg.com/pop/jfs/t1/90730/40/7352/138266/5dfb3340Ec3e89fb7/7864aa47c2d2a6ca.png'},
    // {id: 'dialog4', src: '//img30.360buyimg.com/pop/jfs/t1/98778/31/7410/134388/5dfb332fEe23e1e8d/7592dbd34d0d8c53.png'},
    // {id: 'dialog5', src: '//img30.360buyimg.com/pop/jfs/t1/110136/19/1178/66211/5dfb332bE4a8754d5/4e0c7d53aa690f2c.png'},
    // {id: 'dialog6', src: '//img30.360buyimg.com/pop/jfs/t1/101411/23/7294/113569/5dfb39cbE50b280d6/c9fb855d1dad62e0.png'}
  ]
 const PreLoadImg=( )=> {
    const [progress, setProgress] = useState(0);
    useEffect(()=>{
        //eslint编译限制一定要加window
        let queue = new createjs.LoadQueue(true);
        queue.on('progress', ev => setProgress(Math.floor(ev.progress*100)))
        queue.on("complete", (val)=>{
            console.log('complete',val)
        }, this);
        queue.loadManifest(manifest);
      }, []);
      
    return (
      <div className="preLoadImg">
        {progress}%
      </div>
    );
  }
  
  export default PreLoadImg;