import React, { useEffect } from 'react';
import './index.css'
import * as SVGA from 'svgaplayerweb';

function AniSvga(props) {

  useEffect(() => {
    var player = new SVGA.Player('#demoCanvas1');
    var parser = new SVGA.Parser('#demoCanvas1'); // Must Provide same selector eg:#demoCanvas IF support IE6+
    parser.load('./plugin/mengniu.svga', function(videoItem) {
        player.setVideoItem(videoItem);
        player.startAnimation();
        // player.stepToFrame(0, true);
    })
  }, []);



  return (
    <div className="jdyfe-svgaPage">
      <div id="demoCanvas1" ></div>
    </div>
  );
}


export default AniSvga;
