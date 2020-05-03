import React from 'react';
import './index.less';


export default function SoundIcon(props) {

  return (
    <div className={`SoundIcon ${props.className} ${props.active?'active':''}`}>
        <div className="wifi-symbol">
            <div className="wifi-circle first"></div>
            <div className="wifi-circle second"></div>
            <div className="wifi-circle third"></div>
        </div>
    </div>
  );
}