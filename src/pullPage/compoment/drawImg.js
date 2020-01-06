import React from 'react';
import { useEffect, useRef } from 'react';
import drawBg from '../img/drawImg/drawBg.jpg';
import dialogBg from '../img/drawImg/dialogBg.png';
import { apiForUploadImg, fillText, loadImg } from './upload'
import './drawImg.css';

function DrawImg() {
    const drawImgEl = useRef(null);
    useEffect(() => {
        var c = document.getElementById("drawImg");
        var ctx = c.getContext("2d");
        ctx.scale(.5, .5);

        (async () => {
            await drawImgFun(ctx, drawBg, 0, 0) //画背景图
            await drawImgFun(ctx, dialogBg, 30, 20, 690, 170); //画对话框背景图
            drawTextFun(ctx) //画对话框中文字
            drawImgFun(ctx, '//img30.360buyimg.com/pop/jfs/t1/100946/1/7364/13874/5dfa26d3E30f06149/05b3ac6ac018664c.png', 278, 817) //画二维码
        })()

        // var img = document.getElementById("drawBg");
        // img.onload = function () {
        //     ctx.drawImage(img, 0, 0,750,1208);
        //     var img1 = document.getElementById("dialogBg");
        //     ctx.drawImage(img1, 30, 20, 690, 170);
        // }



    }, []);

    //canvas,img,x,y,width,height
    function drawImgFun(ctx, src, x = 0, y = 0, width, height) {
        return loadImg(src).then((img) => {
            width ? ctx.drawImage(img, x, y, width, height) : ctx.drawImage(img, x, y)
        })
    }

    function drawTextFun(ctx) {
        ctx.font = '26px JDZhengHei'
        ctx.fillStyle = '#fff'
        ctx.textBaseLine = 'bottom'
        let a = fillText(60, 92, 610, ctx)
        a.fillText('2019您的购买力超过了')
        ctx.save()
        ctx.font = '40px JDZhengHei'
        ctx.fillStyle = '#ffd866'
        ctx.textBaseLine = 'bottom'
        a.fillText('99%')
        ctx.restore()
        a.fillText('的用户，PLUS帮您省下的钱够买500了。')
    }


    //分享按钮点击事件 上传长图==》后端生成连接==》给分享组件
    function shareBtn() {
        apiForUploadImg(drawImgEl.current.toDataURL('image/jpeg')).then((_img) => {
            console.log('_img', _img)
        });
    }

    return (
        <div>
            <canvas ref={drawImgEl} id="drawImg" className="drawImg" width='375' height='604' />
            <img id="drawBg" style={{ display: 'none' }} src={drawBg} alt="1" />
            <img id="dialogBg" style={{ display: 'none' }} src={dialogBg} alt="1" />
            <div onClick={shareBtn} className="shareBtn">分享长图</div>
        </div>

    );
}

export default DrawImg;