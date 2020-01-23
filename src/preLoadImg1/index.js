import React, { useEffect, useState } from 'react'

const manifest = [
  { id: 'share', src: 'https://img30.360buyimg.com/pop/jfs/t1/96821/8/7977/113608/5e018694E332d903e/d04f1cb6a1a84310.png' },
  { id: 'title', src: '//img30.360buyimg.com/pop/jfs/t1/100813/34/7941/32580/5e0083a7E19d77d46/a3fe8da1d96ee9ec.png' },
  { id: 'bg-rule', src: '//img30.360buyimg.com/pop/jfs/t1/107874/24/1859/55497/5e01a9a4Eeb5d6451/77971ca5e9ab7339.png' },
  { id: 'btn', src: '//img30.360buyimg.com/pop/jfs/t1/105125/17/7347/46152/5dfb331dE3d72742c/5874ce457cf1c23b.png' }
];

/**
* 加载图片
* @param {String} src - 图片地址
* @param {Number} timeout - 超时时间（单位：毫秒）
* @returns {Promise} 加载图片的promise
*/
export function loadImg(src, timeout = 3000) {
  return new Promise((resolve, reject) => {
    let tTimeout
    const img = new Image()
    img.addEventListener('load', () => {
      clearTimeout(tTimeout)
      resolve()
    })
    img.addEventListener('error', () => {
      clearTimeout(tTimeout)
      reject()
    })
    img.src = src
    if (timeout && isFinite(timeout)) {
      tTimeout = setTimeout(reject, timeout)
    }
  })
}

/**
 * 加载多张图片
 * @param {String[]} srcs - 图片地址组成的数组
 * @param {Number} timeout - 超时时间（单位：毫秒）
 * @returns {Promise} 加载图片的promise
 */
export function loadImgs(srcs, timeout = 3000) {
  return Promise.all(srcs.map(src => loadImg(src, timeout).catch(() => { })))
}

export default () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let len = manifest.length;
    let i = 0;
    manifest.forEach((item) => {
      loadImg(item.src).then(() => {
        i++;
        setProgress(Math.floor(i / len * 100));
      })
    })
  }, []);

  return (
    <div className="preLoadImg">
      {progress}%
      </div>
  );
}

