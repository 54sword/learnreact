// 是否是微信浏览器
let Weixin = {}

Weixin.in = (function (){
  var ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i)=="micromessenger") {
    return true;
  } else {
    return false;
  }
}())

export default Weixin
