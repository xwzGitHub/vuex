/**
 * 抽取Api请求
 * 作用：1.添加公共参数 2.动态修改域名
 * window.location.host 域名
 * navigator.userAgent 型号
 */


//动态判断请求域名
const domain = /localhost/ig.test(window.location.host) ? 'https://baojia.chelun.com' : 'https://xxxx.chelun.com';

//填充请求参数
function sendRequest(url) {
    let ua = navigator.userAgent,
        os = '';
    if ((/iPhone|iPad/ig.test(ua))) {
        os = 'ios'
    } else {
        os = 'android'
    }
    // url += `?os=${os}&_=${+new Date()}`;
    url += `&_=${+new Date()}`;
    return fetch(domain + url);
}

//获取6个类型图片总的图片
export const getImgAll = (key) => {
    return sendRequest('/v2-car-getImageList.html?SerialID=' + key)
}


export const imgList = (key, idimg, page) => {
    console.log(key)
    return sendRequest('/v2-car-getCategoryImageList.html?SerialID=' + key + '&ImageID=' + idimg + '&Page=' + page + '&PageSize=30')
}