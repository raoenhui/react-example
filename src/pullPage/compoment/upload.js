import axios from 'axios'
import qs from 'qs';

const uploadpic = (img) => axios({
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    url: 'https://api.m.jd.com/client.action?appid=jd_mp_h5&functionId=imageUploadCdn',
    data: qs.stringify({
        body: JSON.stringify({ imgs: [img] })
    })
})

export async function apiForUploadImg(img) {
    try {
        let res = await uploadpic(img)
        const { status, data } = res
        if (status === 200 && data && data.code === '0' && data.results && data.results[0] && data.results[0].success) {
            let _img = 'https://img30.360buyimg.com/pop/' + data.results[0].imgUrl
            return _img
        } else {
            console.log('出错了')
        }
    } catch (ex) {
        console.log('报错了', ex)
    }
}

//绘制文本
export function fillText(x, y, maxWidth, ctx) {
    let position = { x, y }
    let lineMaxH = 55
    let curWidth = 0

    function nextLine() {
        curWidth = 0
        position.y += lineMaxH
        position.x = x
        // lineMaxH = 0
    }

    return {
        fillText(str) {
            str = String(str)
            let len = str.length,
                i = 0,
                _curWidth = 0

            while (i <= len) {
                let text = ctx.measureText(str.slice(0, i))

                // if (text.height > lineMaxH) lineMaxH = 12

                if (text.width + curWidth <= maxWidth) {
                    _curWidth = text.width
                    i++
                } else {
                    break
                }
            }

            if (i < len) {
                _curWidth = 0
                ctx.fillText(str.slice(0, i), position.x + curWidth, position.y)

                nextLine()
                this.fillText(str.slice(i))
            } else {
                ctx.fillText(str, position.x + curWidth, position.y)
                curWidth += _curWidth
            }

        }
    }
}

//加载图片
export function loadImg(src) {
    return new Promise((res, rej) => {
        let img = new Image()
        img.setAttribute('crossOrigin', 'anonymous');


        img.onload = function () {
            res(img)
        }

        img.onerror = function (ex) {
            rej(ex)
        }

        img.src = src

        if (img.readyState === "complete" || img.readyState === "loaded" || img.complete) {
            res(img)
        }

    })
}
