# 金疙瘩软件著作权代码

### 代码入口  
```javascript
 // main.js 
import Vue from 'vue';
import App from './App';
import router from './router';
import * as filters from './filters';
import FastClick from 'fastclick';
import _ from 'lodash/core';
import store from './store';
import 'flex.css/dist/flex.css';
import './less/base.less';
_.forEach(filters, (fun, key) => {
    Vue.filter(key, fun);
});
window.shareUrl = window.location.href;
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
store.dispatch('getAccountBaofoo');
store.dispatch('getBankInfo');
store.dispatch('getPersonalCenterMsg').then((resp) => {
    if (resp.code == 200) {
        //做过风险评估，调用同步盈米风险评估数据
        if (resp.data.user.investorRiskScore != 0) {
            store.dispatch('getRiskInfo');
        }
    }
});
store.dispatch('getAccountInfo');
store.dispatch('getPaymentInfo');

import {postHive} from './tools/api';

window.onload = () => {
    FastClick.attach(document.body);
    setTimeout(() => {
        postHive();
    }, 5000);
};


```

### 根模板
```html
<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
```
```javascript
  export default {
        name: 'app'
    }
```
### 公共样式
```less

//
// rem.less
// --------------------------------------------------

// Vertical screen

//375屏幕为 20px，以此为基础计算出每一种宽度的字体大小
//375以下不变，375以上等比放大
@charset "UTF-8";
@baseWidth: 375px;
@baseFont: 20px;

html {
    font-size: @baseFont; //默认当做375px宽度的屏幕来处理
}

@bps:320px, 360px, 375px, 400px, 414px, 480px ;

.loop(@i: 1) when (@i <= length(@bps)) { //注意less数组是从1开始的
    @bp: extract(@bps, @i);
    @font: @bp/@baseWidth*@baseFont;
    @media only screen and (min-width: @bp) {
        html {
            font-size: @font !important;
        }
    }
    .loop((@i + 1));
}

;
.loop;

```
```less
// 
//
// Variables.less
// --------------------------------------------------
// Type
// --------------------------------------------------
@charset "UTF-8";
@font-family-default: "Hiragino Sans GB", "Microsoft YaHei", sans-serif;;
@font-weight: 500;

// colors--------------------------------------------------
// 主色
@color-text: #333; //主标题
@color-text-secondary: #666; // 内容
@color-text-gray:#999; // 副标题
@color-split: #d8d8d8; //分割线的颜色
@color-interest:#ff6d00; // 利率 ，理财周期，
@color-progress:#ff6500;//融资进度
@color-active:#1D72C0; //选中状态

// 背景颜色
@bg-body: #f3f3f3; // body背景颜色
@bg-primary:#0F5391; //主背景颜色
@bg-content: #fff; //内容区背景颜色
@bg-hot:#fa3d1f; //热招
@bg-raise:#7ed321;//  募集
@bg-sell-out:#dcdcdc;// 售罄
// --------------------------------------------------
@bg-button: #1D72C0; //btn 背景
@show-button:#61B3FF;

@app-color:#6E3018;
@app-progress:#F6D791;
@app-bg-color: linear-gradient(-1deg, #7C4F2B 0%, #8F6441 24%, #D8BD7E 70%, #EECE83 100%);
@app-border-bottom:linear-gradient(270deg, #FBD8C5, #97461A, #9D4F25, #FBD8C5, #97461A) 0 0 2 0;
@app-context:#EDD7A8;
@app-ticket-context:#FF6A37;
@app-red:#F61C1C;
@app-contact-us:#88ACFF;
@border-default-width: 1px;
@border-default-color: @color-split;
@border-default: @border-default-width solid @border-default-color;
@border-radius: 0.3rem;


//现金券
@bg-cash:#FF6A37;
@bg-rate:#50E3C2;
@bg-disable:#999;


```
```less
// base.less

@charset "UTF-8";
@import "rem";
@import "variables";

* {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    box-sizing: border-box;
    word-break: break-all;
    word-wrap: break-word;
    margin: 0;
    padding: 0;
    -webkit-tap-highlight-color: transparent;
    outline: 0;
    vertical-align: baseline;
}

img {
    border: 0 none;
    vertical-align: top;
    display: inline-block;
    width: 100%;
    height: auto;
}

button {
    outline: none;
    text-decoration: none;
    text-align: center;
    display: block;
    border-radius: .25rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    appearance: none;
    background: none;
    padding: 0 .5rem;
    margin: 0;
    white-space: nowrap;
    position: relative;
    text-overflow: ellipsis;
    font-size: .7rem;
    font-family: inherit;
    cursor: pointer;
    border: none;
}

input, textarea {
    text-rendering: auto;
    color: initial;
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: start;
    outline: none;
    border: none;
    resize: none;
    -webkit-appearance: none;

}

a {
    text-decoration: none;
}

input::-webkit-input-placeholder {
    color: @color-text-gray !important;
}

body {
    font-family: @font-family-default;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: 0 auto;
    min-width: 320px;
    max-width: 640px;
    background: @bg-body;
    color: @color-text-secondary;
    font-size: .7rem;
    text-size-adjust: 100% !important
}

#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-overflow-scrolling: touch;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: auto;
}

.btn-primary {
    background: @bg-button;
    border-radius: 4px;
    color: #fff;
    &:disabled {
        color: #aaa;
    }
}

.btn-default {
    background-color: @bg-body;
    border-radius: 4px;
}

.ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

[v-cloak] {
    display: none;
}

[flex], [flex-box] {
    overflow: hidden;
}

.mint-indicator-wrapper {
    z-index: 10;
}

/*hidden the spm span */
#cnzz_stat_icon_1263441830 {
    visibility: hidden;
}

.mint-msgbox-message {
    font-size: .7rem;
    line-height: 1.4rem !important;
}

.mint-msgbox-confirm {
    font-size: .8rem;
}

.customer-service {
    width: 3rem;
    height: 3rem;
    background-image: url("../images/customer-service.png");
    background-size: 2rem 2rem;
    background-position: center;
    background-repeat: no-repeat;
}


```
### 配置文件
```javascript
// config.js 
/**
 * Created by DELL on 2017/6/5.
 */
let protocol = window.location.protocol;
export const telNumber = '400-640-3606';
export let appUrl = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.zjinv.kingold&fromcase=40002';
let encrypt = false;
/*dev env*/
let apiUrl = 'http://weixin-act.zj-hf.cn:6620';
let baofooUrl = 'https://paytest.baofoo.com/baofoo-custody/custody/';
let baofooCallUrl = `${protocol}//notify-test.zj-hf.cn`;
let apiNode = `${protocol}//market-test.zj-hf.cn`;
let merchant_id = '100000675';
let terminal_id = '100000701';
let logUrl = 'http://39.106.42.180:50000';

/*test env*/
if (process.env.kingold == 'test') {
    apiUrl = `${protocol}//weixin-test.zj-hf.cn`;
    baofooUrl = 'https://paytest.baofoo.com/baofoo-custody/custody/';
    baofooCallUrl = `${protocol}//notify-test.zj-hf.cn`;
    apiNode = `${protocol}//market-test.zj-hf.cn`;
    logUrl = 'https://ul-test.zj-hf.cn';
}
/*test2 env*/
if (process.env.kingold == 'test2') {
    apiUrl = `${protocol}//weixin-test2.zj-hf.cn`;
    baofooUrl = 'https://paytest.baofoo.com/baofoo-custody/custody/';
    baofooCallUrl = `${protocol}//notify-test2.zj-hf.cn`;
    apiNode = `${protocol}//market-test.zj-hf.cn`;
    logUrl = 'https://ul-test.zj-hf.cn';
}
/*stage env*/
if (process.env.kingold == 'stage') {
    apiUrl = `${protocol}//pre-zj-weixin.zj-hf.cn`;
    baofooUrl = 'https://pm.baofoo.com/custody/';
    baofooCallUrl = `${protocol}//pre-callme.zj-hf.cn`;
    apiNode = `${protocol}//market.zj-hf.cn`;
    logUrl = 'https://ul.zj-hf.cn';
    merchant_id = '1172380';
    terminal_id = '34865';
    encrypt = true;
}
/*prod env*/
if (process.env.kingold == 'production') {
    apiUrl = `${protocol}//zj-weixin.zj-hf.cn`;
    baofooUrl = 'https://pm.baofoo.com/custody/';
    baofooCallUrl = `${protocol}//callme.zj-hf.cn`;
    apiNode = `${protocol}//market.zj-hf.cn`;
    logUrl = 'https://ul.zj-hf.cn';
    merchant_id = '1177929';
    terminal_id = '35265';
    encrypt = true;
}
/* 兼容zj-wm.cn*/
let host = window.location.host;
if (host.indexOf('zj-wm.cn') > -1) {
    apiUrl = apiUrl.replace('zj-hf.cn', 'zj-wm.cn');
    window.localStorage.setItem('registerChannelCode', 'H5_market');
}
export default {
    apiUrl,
    baofooUrl,
    baofooCallUrl,
    apiNode,
    logUrl,
    merchant_id,
    terminal_id
}
/*
 * kingold key & IV
 * */
/* key 和 iv 密文*/
export const encryptKey = 'xxx';
export const encryptIV = 'xxx';
export let doEncrypt = encrypt;

```
### 接口工具

```javascript
// api.js
/**
 * Created by hekk on 2017/5/28.
 */
import Promise from 'promise-polyfill';
import axios from 'axios';
import Vue from 'vue';
import {Indicator} from 'mint-ui'


// To add to window
if (!window.Promise) {
    window.Promise = Promise;
}
// aes encrypt
import {encryptFun, decryptFun} from './crypto';
// opreation
import {getDeviceID, getAuthKey} from './operation';
import  {logout, addHive} from './operation';


import 'whatwg-fetch';
import {local, session} from './store';
import $device from './device';
import config, {doEncrypt} from './config';
let serverUrl = config.apiUrl;
let nodeUrl = config.apiNode;
let query = data => {
    let str = [];
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            if (typeof data[key] != 'object') {
                str.push(encodeURIComponent(key) + '=' + encodeURIComponent((data[key])));
            } else {
                str.push(encodeURIComponent(key) + '=' + encodeURIComponent((JSON.stringify(data[key]))));
            }
        }
    }
    return str.join('&');
};
let $query = (data) => {
    let str = [];
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            if (typeof data[key] != 'object') {
                str.push(encryptFun(encodeURIComponent(key)) + '=' + encodeURIComponent(encryptFun(data[key])));
            } else {
                str.push(encryptFun(encodeURIComponent(key)) + '=' + encodeURIComponent(encryptFun(JSON.stringify(data[key]))));
            }
        }
    }
    return str.join('&');
};
let get = (path, data = {}, source = {}) => {
    data.t = new Date().getTime();
    data.deviceID = getDeviceID();
    data.callSystemID = '1003';
    let search = query(data);
    let url = `${path}?${search}`;
    let key = getAuthKey(url); // md5(url+'slat')
    let value = encryptFun(key + 'slat');
    url = `${serverUrl + url}&auth=${value}`;

    return axios({
        url,
        method: 'get',
        cancelToken: source.token || '',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        withCredentials: true
    }).then(response => {
        if (response.status == 200) {
            return response.data;
        }
        if (response.status == 503) {
            return {};
        }
        return {};
    }).then(data => {
        if (doEncrypt) {
            data = JSON.parse(decryptFun(data));
        }
        console.log(url);
        console.log(data);
        return data;

    }).catch(err => {
        console.error('error,--->', err);
        return {};
    });
};
let getNode = (path, data = {}) => {
    data.t = new Date().getTime();
    data.callSystemID = '1003';
    let url = `${nodeUrl + path}`;
    return axios({
        url,
        method: 'get',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: data,
        withCredentials: false
    }).then(response => {
        if (response.status == 200) {
            return response.data;
        }
    }).then(data => {
        return data;
    }).catch(err => {
        console.error('error,--->', err);
    })
};
let post = (path, data = {}, indicator = '') => {
    data.callSystemID = '1003';
    let url = `${serverUrl + path}`;
    Indicator.open(indicator);
    return axios({
        url,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: {
            t: new Date().getTime()
        },
        withCredentials: true,
        data: doEncrypt ? $query(data) : query(data)
    }).then(response => {
        Indicator.close();
        if (response.status == 200) {
            return response.data
        }
        if (response.status == 503) {
            return {};
        }
        return {};
    }).then(data => {
        if (doEncrypt) {
            data = JSON.parse(decryptFun(data));
        }
        if (data.code == 401) {
            logout();
        }
        console.log(url);
        console.log(data);
        return data;
    }).catch(err => {
        Indicator.close();
        console.error('error,--->', err);
    });
};
let postNode = (path, data = {}) => {
    let url = `${nodeUrl + path}`;
    return axios({
        url,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: {
            t: new Date().getTime()
        },
        withCredentials: false,
        data: query(data)
    }).then(response => {
        if (response.status == 200) {
            return response.data
        }
        if (response.status == 503) {
            return {};
        }
        return {};
    }).then(data => {
        return data;
    }).catch(err => {
        console.error('error,--->', err);
    });
};

export let postHive = () => {
    let url = config.logUrl;
    if (session.getItem('hiveSend')) {
        return false;
    }
    let hives = local.getItem('post_hives');
    if (!hives) {
        return false;
    }
    let body = hives.join('|');
    let data = [{
        headers: {
            v_app: '0.0.0',  //app版本
            channel: local.getItem('registerChannelCode') || 'H5_weixin', //渠道
            imei: 'imei', //imei
            d_uuid: getDeviceID(), //app/h5生成的设备编号
            os: window.navigator.platform, //操作系统
            device: $device.os + '-' + $device.osVersion, //设备类型
            reso: window.innerWidth + '*' + window.innerHeight //分辨率
        },
        body: body
    }];
    session.setItem('hiveSend', true);
    local.removeItem('hives');
    return axios({
        url,
        method: 'post',
        headers: {
            'Content-Type': 'text/plain'
        },
        data: JSON.stringify(data)
    })
};
// 收集用户行为，存放在storage里
Vue.prototype.addHive = addHive;
const $api = {
    get,
    post,
    getNode,
    postNode,
    serverUrl
};
export default $api;

```
###加密算法
```javascript
/**
 * Created by DELL on 2017/7/5.
 */
const CryptoJS = require('crypto-js/core');
const AES = require('crypto-js/aes');
const Utf8 = require('crypto-js/enc-utf8');
const Hex = require('crypto-js/enc-hex');
const Base64 = require('crypto-js/enc-base64');
const ZeroPadding = require('crypto-js/pad-zeropadding');
const Latin1 = require('crypto-js/enc-latin1');
import md5 from 'md5';
import {encryptKey, encryptIV} from './config';
/*
 * kingoldKey md5
 * kingoldIV  md5
 * */

/*用于解密key和iv 的key 和iv */
let keyMd5 = md5('kingoldKey');
let IVMd5 = md5('kingoldIV');
IVMd5 = IVMd5.substr(0, 16);
let key = Utf8.parse(keyMd5);
let iv = Utf8.parse(IVMd5);

let decryptKingold = (encrypt) => {
    let encryptedHexStr = Hex.parse(encrypt);
    let base64 = Base64.stringify(encryptedHexStr);
    let decrypt = AES.decrypt(base64, key, {iv: iv, padding: ZeroPadding});
    return decrypt.toString(Latin1);
};
/*解密生成key 和IV*/
export let kinglodKey = decryptKingold(encryptKey);
export let kinglodIV = decryptKingold(encryptIV);

export let decryptFun = (encrypt) => {
    let encryptedHexStr = Hex.parse(encrypt);
    let base64 = Base64.stringify(encryptedHexStr);
    /*取解密生成的key 中间32位*/
    let key = Utf8.parse(kinglodKey.substr(7, 32));

    /*取解密生成的iv 中间16位*/
    let iv = Utf8.parse(kinglodIV.substr(7, 16));
    let decrypt = AES.decrypt(base64, key, {iv: iv, padding: ZeroPadding});
    return decrypt.toString(Latin1);
}
export let encryptFun = (text) => {
    let key = Utf8.parse(kinglodKey.substr(7, 32));
    let iv = Utf8.parse(kinglodIV.substr(7, 16));
    text = text.toString();
    let encrypted = AES.encrypt(text, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: ZeroPadding
    });
    let encryptedStr = encrypted.ciphertext.toString();
    return encryptedStr;
};



```

### 设备信息

```javascript
// device.js

/**
 * Created by hth on 2016/12/4.
 */
const ua = window.navigator.userAgent;
let android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
let ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
let iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
let device = {};
device.mobile = false;
if ('ontouchstart' in window) {
    device.mobile = true;
}
device.ios = device.android = device.iphone = device.ipad = device.androidChrome = device.kingold = false;
device.kingold = /kingold/i.test(ua);
device.kingoldVersion = '0.0.0';
if (device.kingold) {
    device.kingoldVersion = ua.match(/([\d.]+)?$/)[0];
}
// default
device.os = 'PC';
device.osVersion = 'default';
// Android
if (android) {
    device.os = 'android';
    device.osVersion = android[2];
    device.android = true;
    device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
}
if (ipad || iphone || ipod) {
    device.os = 'ios';
    device.ios = true;
}
// iOS
if (iphone && !ipod) {
    device.osVersion = iphone[2].replace(/_/g, '.');
    device.iphone = true;
}
if (ipad) {
    device.osVersion = ipad[2].replace(/_/g, '.');
    device.ipad = true;
}
if (ipod) {
    device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
    device.iphone = true;
}
// iOS 8+ changed UA
if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
    if (device.osVersion.split('.')[0] === '10') {
        device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
    }
}
// Webview
device.webView = (iphone || ipad || ipod) && ua.match(/.*AppleWebKit(?!.*Safari)/i);
/*wechat*/
device.isWeixin = /MicroMessenger/i.test(ua);
const $device = device;
export default $device;

```

### app交互方法

```javascript



//Hybrid基本交互定义
import  $device from './device';
import _ from 'lodash/core';
_.extend = function (obj, source) {
    if (source) {
        for (var prop in source) {
            obj[prop] = source[prop];
        }
    }
    return obj;
};
window.Hybrid = window.Hybrid || {};
Hybrid.ui = {};

var bridgePostMsg = function (url) {
    if ($device.ios) {
        window.location = url;
    } else {
        var iframe = document.createElement('iframe');
        iframe.style.visibility = 'hidden';
        iframe.style.width = '1px';
        iframe.style.height = '1px';
        iframe.setAttribute('src', url);
        document.body.appendChild(iframe);
        setTimeout(function () {
            document.body.removeChild(iframe);
        }, 1000)
    }
};
var _getHybridUrl = function (params) {
    var k, paramStr = '', url = 'kingold://';
    url += params.tagname + '?t=' + new Date().getTime(); //时间戳，防止url不起效
    if (params.callback) {
        url += '&callback=' + params.callback;
        delete params.callback;
    }
    if (params.param) {
        paramStr = JSON.stringify(params.param);
        url += '&param=' + encodeURIComponent(paramStr);
    }
    return url;
};
let requestHybrid = function (params) {
    //生成唯一执行函数，执行后销毁
    var tt = (new Date().getTime());
    var t = 'hybrid_' + tt;
    var tmpFn;

    //处理有回调的情况
    if (params.callback) {
        tmpFn = params.callback;
        params.callback = t;
        window.Hybrid[t] = function (data) {
            tmpFn(data);
            delete window.Hybrid[t];
        }
    }
    bridgePostMsg(_getHybridUrl(params));
};
//获取版本信息，约定APP的navigator.userAgent版本包含版本信息：scheme/xx.xx.xx
var getHybridInfo = function () {
    var platform_version = {};
    var na = navigator.userAgent;
    var info = na.match(/scheme\/\d\.\d\.\d/);

    if (info && info[0]) {
        info = info[0].split('/');
        if (info && info.length == 2) {
            platform_version.platform = info[0];
            platform_version.version = info[1];
        }
    }
    return platform_version;
};

var registerHybridCallback = function (ns, name, callback) {
    if (!window.Hybrid[ns]) window.Hybrid[ns] = {};
    window.Hybrid[ns][name] = callback;
};

var unRegisterHybridCallback = function (ns) {
    if (!window.Hybrid[ns]) return;
    delete window.Hybrid[ns];
};


var HybridHeader = function () {
    this.left = [];
    this.right = [];
    this.title = {};
    this.view = null;
    this.hybridEventFlag = 'Header_Event';
};

HybridHeader.prototype = {
    //全部更新
    set: function (opts) {
        if (!opts) return;

        var left = [];
        var right = [];
        var title = {};
        var tmp = {};

        //语法糖适配
        if (opts.back) {
            tmp = {tagname: 'back'};
            if (typeof opts.back == 'string') tmp.value = opts.back;
            else if (typeof opts.back == 'function') tmp.callback = opts.back;
            else if (typeof opts.back == 'object') _.extend(tmp, opts.back);
            left.push(tmp);
        } else {
            if (opts.left) left = opts.left;
        }

        //右边按钮必须保持数据一致性
        if (typeof opts.right == 'object' && opts.right.length) right = opts.right

        if (typeof opts.title == 'string') {
            title.title = opts.title;
        } else if (_.isArray(opts.title) && opts.title.length > 1) {
            title.title = opts.title[0];
            title.subtitle = opts.title[1];
        } else if (typeof opts.title == 'object') {
            _.extend(title, opts.title);
        }

        this.left = left;
        this.right = right;
        this.title = title;
        this.view = opts.view;

        this.registerEvents();

        requestHybrid({
            tagname: 'updateheader',
            param: {
                left: this.left,
                right: this.right,
                title: this.title
            }
        });

    },

    //注册事件，将事件存于本地
    registerEvents: function () {
        unRegisterHybridCallback(this.hybridEventFlag);
        this._addEvent(this.left);
        this._addEvent(this.right);
        this._addEvent(this.title);
    },
    _addEvent: function (data) {
        if (!_.isArray(data)) data = [data];
        var i, len, tmp, fn, tagname;
        var t = 'header_' + (new Date().getTime());

        for (i = 0, len = data.length; i < len; i++) {
            tmp = data[i];
            tagname = tmp.tagname || '';
            if (tmp.callback) {
                fn = ()=>{};
                tmp.callback = t + '_' + tagname;
                registerHybridCallback(this.hybridEventFlag, t + '_' + tagname, fn);
            }
        }
    },
    //只更新title，不重置事件，不对header其它地方造成变化，仅仅最简单的header能如此操作
    update: function (title) {
        requestHybrid({
            tagname: 'updateheadertitle',
            param: {
                title: title
            }
        });
    }
};

//释放出来的header组件
Hybrid.ui.header = new HybridHeader();
export  default requestHybrid


```
### 数据模型
```javascript
// state.js
/**
 * Created by hekk on 2017/5/23.
 */
'use strict'
const state = {
    userVerifyStatus: 0, //认证状态
    userVerifyStatusDesc:'',
    userUuid:'',// uid
    userId:'',
    investorRiskScore:0,
    investorGender:'', //gender
    investorIdCardNo:'',// ID card
    investorMobile:'',// mobile
    investorRealName:'',// realname,
    isEligibleInvestor:0,
    isSetPayPassword:0,
    investorRiskType:0,
    isMinRiskLevel:0,//是否为最低标准型
    investorRiskProductDesc:'',
    investorRiskTypeDesc:'',
    investorRiskLevel:0, //
    investorRiskLevelDesc:'',
    investorType:'',
    investorTypeDesc:'',
    investorGenderDesc:'',

    accountTotalAssets:0.00, //总资产
    accountTotalInterests:0.00,//收益总额，
    accountCashAmount:0.00,// 可提现金额


    reservationCount:0, //预约数量
    investmentAmount:0.00,//投资总额
    rewardSum:0.00,//奖励数额
    relationCount:0,//好友数量


    bankUserCardNo:'',//银行卡
    bankUserPhone:'',//绑卡手机
    bankCode:'',
    bankName:'',
    bankFullName:'',
    bankNo:'',
    perdayLimit:'',
    singleLimit:'',
    singleLimitValue:'',

    experienceProfit:'',//已收益
    notExpireProfit:'',//待收益
    notRecieveExperience:'',//未领取体验金
    totalExperience:'',

    cashCouponCount:'0',//现金券数量
    experienceAmount:'0',//体验金数额
    interestCouponCount:'0',// jiaxi quan

    accountStatus: 0,//是否录入适当性管理信息，1：已基金开户，2：已基金交易密码，3：完成
    paymentNo: '',
    name: '',
    maxRapidPayAmountPerTxn: 0,
    maxRapidPayAmountPerDay: 0,
    investorRiskVersion:''//风险测评版本 2:新版


};
export default state;

```
###  操作数据模型 -> actions
```javascript
/**
 * Created by hekk on 2017/5/23.
 */

'use strict';
const actions = {};
import $api from '../tools/api';
import requestHybrid from '../tools/hybrid';
import $device from '../tools/device';

//资产信息
let getAccountBaofoo = () => {
    return $api.get('/getAccountBaofoo');
};
actions.getAccountBaofoo = ({commit}) => {
    return getAccountBaofoo()
        .then(data => {
            if (data.code == 200) {
                commit('setAccountBaofoo', data.data);
            } else {
                commit('setAccountBaofoo', {});
            }
            return data;

        });
};

//  银行卡信息
let getBankInfo = () => {
    return $api.get('/getUserBankCardInfo');
};
actions.getBankInfo = ({commit}) => {
    getBankInfo()
        .then(data => {
            if (data.code == 200) {
                let {bankUserCardNo} = data.data;
                commit('setBankUser', data.data);
                if (!bankUserCardNo) {
                    return false;
                }
                return $api.get('/getBankInfo', {bankNo: bankUserCardNo})
                    .then(data => {
                        if (data.code == 200) {
                            commit('setBankInfo', data.data);
                        }
                    });
            }
        });
};

// 个人信息
let getUserInfo = () => {
    return $api.get('/getUserInfo');
};
actions.getUserInfo = ({commit}) => {
    return getUserInfo()
        .then(data => {
            if (data.code == 200) {
                commit('setUserInfo', data.data)
            }
            return data;
        });
};
actions.setEligibleInvestor = ({commit}, data) => {
    commit('setEligibleInvestor', data);
};


//获取体验金总资产收益等

let getExperienceSum = () => {
    return $api.get('/experience/sum');
}
actions.getExperienceSum = ({commit}) => {
    return getExperienceSum()
        .then(data => {
            if (data.code == 200) {
                commit('setExperienceSum', data.data);
            }
            return data;
        });
};

let getPersonalCenterMsg = () => {
    return $api.get('/personalCenter');
}
actions.getPersonalCenterMsg = ({commit}) => {
    return getPersonalCenterMsg()
        .then(data => {
            if (data.code == 200) {
                commit('setPersonalCenterMsg', data.data);
                commit('setUserInfo', data.data.user);
                // 存放uuid 用户行为统计
                window.localStorage.setItem('userUuid', data.data.user.userId);
            }
            return data;
        });
};

//  获取基金账户信息
let getAccountInfo = () => {
    return $api.get('/fund/account/info');
};
actions.getAccountInfo = ({commit}) => {
    return getAccountInfo()
        .then(data => {
            if (data.code == 200) {
                commit('setAccountInfo', data.data);
            }
            return data;
        });
};

//  获取绑定盈米支付信息
let getPaymentInfo = () => {
    return $api.get('/fund/account/payment');
};
actions.getPaymentInfo = ({commit}) => {
    return getPaymentInfo()
        .then(data => {
            if (data.code == 200) {
                commit('setPaymentInfo', data.data);
            }
            return data;
        });
};

//  获取风险评估结果
let getRiskInfo = () => {
    let terminalInfo = $device.os + '-' + $device.osVersion;
    return $api.get('/fund/account/risk', {terminalInfo});
};
actions.getRiskInfo = ({commit}) => {
    return getRiskInfo()
        .then(data => {
            if (data.code == 200) {
                commit('setRiskInfo', data.data);
            }
            return data;
        });
};
export default actions;

```
### 登录
* 模板

```html
<template>
    <div class="login">
        <div class="header" flex="box:mean">
            <p class="p" @click.stop="checkType('pass')" :class="{'active':!isCodeType}">密码登录</p>
            <p class="p" @click.stop="checkType('code')" :class="{'active':isCodeType}">验证码登录</p>
        </div>
        <div class="body">
            <div class="form">
                <label for="username">
                    <div class="input-warp" flex="cross:center">
                        <img flex-box="0" class="phone" src="../images/login/phone_icon1@2x.png"/>
                        <input type="tel" flex-box="1"
                               v-model.trim="username"
                               placeholder="请输入手机号码"
                               class="input" id="username" @keyup="change"/>
                        <div flex="main:right cross:center">
                            <img class="input-img" src="../images/login/pwd-show@2x.png"/>
                        </div>
                    </div>
                </label>
                <label for="password" v-if="!isCodeType">
                    <div class="input-warp" flex="cross:center">
                        <img flex-box="0" class="phone" src="../images/login/key_icon@2x.png"/>
                        <input v-if="showPassword" type="text" class="input" flex-box="1" id="password"
                               placeholder="请输入密码"
                               v-model.trim="password"/>
                        <input v-else type="password" class="input"
                               placeholder="请输入密码"
                               flex-box="1" id="password1" v-model.trim="password"/>
                        <div class="pass" flex="main:right cross:center" @click.stop="showPassword=!showPassword">
                            <img class="show-hide" v-if="showPassword" src="../images/login/pwd-show@2x.png"/>
                            <img class="show-hide" src="../images/login/pwd-hide@2x.png" v-else/>
                        </div>
                    </div>
                </label>
                <label for="verifycode" v-else flex>
                    <div class="input-warp" flex="cross:center" flex-box="1">
                        <img flex-box="0" class="phone" src="../images/login/key_icon@2x.png"/>
                        <input type="tel" class="input"
                               placeholder="请输入验证码" id="verifycode"
                               flex-box="1" v-model.trim="verifyCode"/>

                    </div>
                    <button flex-box="0" @click.stop="getVerify"
                            v-if="verifyTimeLeft<=0" class="btn-code">{{verifyText}}
                    </button>
                    <button flex-box="0" class="btn-code disable" v-else>{{verifyTimeLeft}}</button>
                </label>
                <label for="image-code" class="label-warp" flex v-if="imageCode">
                    <div class="code-warp" flex-box="1" flex="cross:center">
                        <input id="image-code" class="input"
                               v-model.trim="inputCode"
                               placeholder="请输入图形校验码"/>
                    </div>
                    <div class="image-warp" flex-box="0">
                        {{imageCode}}
                    </div>
                </label>
            </div>
            <div flex="box:justify" class="oper-box">
                <p @click.stop="pathTo('/register')">注册新用户</p>
                <p></p>
                <p @click.stop="pathTo('/find-password')">忘记密码？</p>
            </div>
        </div>
        <div class="bottom">
            <p class="btn" @click.stop="login" v-if="!isCodeType">登录</p>
            <p class="btn" @click.stop="smsLogin" v-if="isCodeType">登录</p>
        </div>
    </div>
</template>

```

* js逻辑


```javascript

     import {Toast} from 'mint-ui';
    import $api from '../tools/api';
    import '../less/login.less';
    export default {
        name: 'login',
        data(){
            return {
                username: '',
                password: '',
                showPassword: false,
                imageCode: '',
                inputCode: '',
                isCodeType: false,
                verifyCode: '',
                verifyTimeLeft: '',
                verifyText: '获取验证码'

            }
        },
        created(){
            this.addHive(1,'login',1023);
            console.log(this.$route.query.type);
            this.isCodeType = !!Number(this.$route.query.type);
        },
        computed: {},
        methods: {
            change(){
                if (this.username.length < 6) {
                    console.log(this.username.length)
                    this.username = this.username.replace(/(^(\d{3})(\d+))/, ($1, $2, $3, $4) => {
                        return $3 + ' ' + $4;
                    });
                } else {
                    console.log('sss')
                    this.username = this.username.replace(/(^(\d{3})\s(\d{4})(\d+))/, ($1, $2, $3, $4, $5) => {
                        return $3 + ' ' + $4 + ' ' + $5;
                    });
                }


                /*  newNum = newNum.replace(/\s+/g, "");//去除空格方法
                 document.getElementById("cellphoneNumber1").value = newNum;*/
                /*this.username = this.username.replace(/\D/g, '').replace(/...(?!$)/g, '$& ');
                 console.log(this.username)*/
            },
            checkType(str){
                this.isCodeType = str == 'code';
                this.imageCode = '';
                this.inputCode = '';
            },
            getVerify(){
                 this.addHive(0,'login_btn_verify',102301);
                if (!this.checkPhone()) {
                    return false
                }
                if (this.imageCode && !this.inputCode) {
                    Toast('请输入图形验证码');
                    return false;
                }
                let imageCode = this.inputCode;
                let bussType = 4;
                /*bussType 4  短信登录*/
                this.verifyTimeLeft = 59;
                this.timeCount();
                this.verifyText = '重新发送';
                let investorMobile = this.username.replace(/\D/g, '');
                $api.post('/sendVerifyCode', {
                    investorMobile,
                    imageCode,
                    bussType
                })
                    .then(data => {
                        if (data.code == 200) {
                            this.imageCode = '';
                            this.inputCode = '';
                            return false;
                        }
                        else {
                            this.clearTimeCount();
                        }
                        if (data.code == 1001) {
                            Toast('验证码错发送失败!');
                            return false;
                        }
                        if (data.code == 1004) {
                            if (this.inputCode) {
                                Toast('图片验证码错误!');
                            } else {
                                Toast('请输入图片验证码!');
                            }

                            this.imageCode = data.data.imageCode;
                            return false;
                        }

                        Toast(data.msg);
                    })

            },
            timeCount(){
                this.timer = setTimeout(() => {
                    this.verifyTimeLeft = this.verifyTimeLeft - 1;
                    if (this.verifyTimeLeft >= 1) {
                        this.timeCount();
                    }
                }, 1000);
            },
            clearTimeCount(){
                this.verifyTimeLeft = 0;
                if (this.timer) {
                    clearTimeout(this.timer);
                }
            },
            checkPhone(){
                if (!this.username) {
                    Toast('请输入手机号码');
                    return false;
                }
                let reg = /^1[3|4|5|7|8]\d{9}$/;
                if (!reg.test(this.username.replace(/\D/g, ''))) {
                    Toast('请输入正确的手机号码');
                    return false;
                }
                return true;
            },
            checkPassword(){
                let regStr = /^[a-zA-Z0-9]{6,20}$/;
                if (!this.password) {
                    Toast('请输入密码');
                    return false;
                }
                if (!regStr.test(this.password)) {
                    Toast('请输入正确的登录密码（6~20位数字和字母）');
                    return false;
                }
                let regD = /^\d*$/;
                if (regD.test(this.password)) {
                    Toast('请输入正确的登录密码（6~20位数字和字母）');
                    return false;
                }
                let regW = /^[a-zA-Z]*$/;
                if (regW.test(this.password)) {
                    Toast('请输入正确的登录密码（6~20位数字和字母）');
                    return false;
                }
                return true;
            },
            login(){
                this.addHive(0, 'login_btn_login',102302);
                if (this.checkPhone() && this.checkPassword()) {
                    if (this.imageCode && !this.inputCode) {
                        Toast('请输入图形验证码');
                        return false;
                    }
                    let investorMobile = this.username.replace(/\D/g, '');
                    let userLoginPassword = this.password;
                    let imageCode = this.inputCode;
                    $api.post('/login', {
                        investorMobile,
                        userLoginPassword,
                        imageCode
                    }).then(data => {
                        if (data.code == 1109) {
                            Toast('该手机号已被禁用，如有疑问请联系客服。');
                            return false;
                        }
                        if (data.code == 1103) {
                            Toast('该手机号未注册，快去注册吧！');
                            return false;
                        }
                        if (data.code == 1004) {
                            Toast(data.msg);
                            this.imageCode = data.data.imageCode;
                            return false;
                        }
                        if (data.code == 200) {
                            this.loginSucc();
                            return false;
                        } else {
                            Toast(data.msg);
                        }

                    });
                }

            },
            smsLogin(){
                if (!this.checkPhone()) {
                    return false;
                }
                if (!this.verifyCode) {
                    Toast('请输入短信验证码');
                    return false;
                }
                let investorMobile = this.username.replace(/\D/g, '');
                $api.post('/smsLogin', {
                    investorMobile,
                    smsCode: this.verifyCode
                })
                    .then(data => {
                        if (data.code == 200) {
                            this.loginSucc();
                            return false;
                        }
                        if (data.code == 1002) {
                            Toast('验证码错误或失效');
                            return false;
                        }
                        if (data.code == 1101) {
                            Toast('注册人手机号已经存在,请直接登录');
                            return false;
                        }
                        if (data.code == 1102) {
                            Toast('邀请人手机号不存在');
                            return false;
                        }
                        Toast(data.msg);
                    });
            },
            pathTo(path){
                if (path == '/register') {
                    let event = ['_trackEvent', '注册', 'SHOW', '从登录页进入注册页', '从登录页进入注册页'];
                    window._hmt.push(event);
                    this.addHive(0, 'login_link_register',102303);
                }
                this.$router.replace(path)
            },
            loginSucc(){
                let logoutUrl = window.sessionStorage.getItem('logoutUrl');
                window.sessionStorage.removeItem('logoutUrl');
                window.sessionStorage.removeItem('logoutIndex');
                logoutUrl = decodeURIComponent(logoutUrl);
                if (logoutUrl && /http/.test(logoutUrl)) {
                    window.location.replace(logoutUrl);
                } else {

                    this.$store.dispatch('getAccountBaofoo');
                    this.$store.dispatch('getBankInfo');
                    this.$store.dispatch('getPersonalCenterMsg').then((resp) => {
                        if (resp.code == 200) {
                            //做过风险评估，调用查询风险评估数据
                            if (resp.data.user.investorRiskScore != 0) {
                                this.$store.dispatch('getRiskInfo');
                            }
                        }
                    });
                    this.$store.dispatch('getAccountInfo');
                    this.$store.dispatch('getPaymentInfo');
                    this.$router.replace('/personal-center');

                }
            }

        }
    }
    
    
```
### 注册
* 模板

``` html
    <div class="register" ref="register">
        <div class="form">
            <div class="form-item" flex>
                <label class="label" for="phone" flex-box="0">手机号</label>
                <input class="input" type="tel" name="phone" id="phone" flex-box="1"
                       v-model.trim="investorMobile"
                       maxlength="11"
                       autocomplete="off" placeholder="请输入手机号">
            </div>
            <div class="form-item" flex v-if="imageCode">
                <label class="label" for="imageCode" flex-box="0">校验码</label>
                <input class="input" type="text" name="imageCode" id="imageCode" flex-box="1"
                       v-model="inputCode"
                       autocomplete="off" placeholder="请输入校验码">
                <button flex-box="0" class="btn-default btn-code">{{imageCode}}</button>
            </div>
            <div class="form-item" flex>
                <label class="label" for="yzm" flex-box="0">验证码</label>
                <input class="input" type="tel" name="yzm" id="yzm" flex-box="1"
                       v-model.trim="verifyCode"
                       autocomplete="off" placeholder="请输入验证码">
                <button flex-box="0" class="btn-primary btn-code" @click.stop="getVerify"
                        v-if="verifyTimeLeft<=0">{{verifyText}}
                </button>
                <button flex-box="0" class="btn-default btn-text" v-else>{{verifyTimeLeft}}</button>
            </div>


            <div class="form-item" flex>
                <label class="label" for="password" flex-box="0">设置密码</label>
                <input class="input" type="password" name="password" id="password" flex-box="1"
                       v-model.trim="userLoginPassword"
                       autocomplete="off" placeholder="请设置6-20位密码,需包含数字和字母">
            </div>

            <div class="form-item" flex>
                <label class="label" for="invitation" flex-box="0">邀请人</label>
                <input class="input" type="tel" name="invitation" id="invitation" flex-box="1"
                       v-model.trim="inviterPhone"
                       autocomplete="off" placeholder="请输入邀请人手机号（非必填）">
            </div>
        </div>
        <div class="agreement">
            <!--  <span class="box" :class="{'active':ischecked}" @click.stop="ischecked=!ischecked"></span>-->
            <p class="info">我已阅读并同意
                <span class="link" @click.prevent="link('/registration-service-agreement.html')">
                    《注册服务协议》
                </span>和
                <span class="link" @click.prevent="link('/privacy-agreement.html')">
                《隐私协议》
                </span>
            </p>

        </div>

        <div class="btn-group">
            <button class="btn-primary btn-register" @click.stop="register">注册</button>

            <button class="btn-default btn-login" @click.stop="login">已有账号请登录</button>
        </div>
    </div>

```
* js逻辑


```javascript


   import {Toast} from 'mint-ui';
    import $api from '../tools/api';
    import $device from '../tools/device';
    import '../less/register.less';
    export default{
        name: 'register',
        data(){
            return {
                investorMobile: '',
                verifyCode: '',
                userLoginPassword: '',
                inviterPhone: '',
                inputCode: '',
                imageCode: '',
                verifyText: '获取验证码',
                verifyTimeLeft: 0,
                ischecked: true,
                timer: null
            }
        },
        created(){
            this.addHive(1, 'register',1032);
            let event = ['_trackEvent', '注册', 'SHOW', '进入注册页面', '进入注册页面'];
            window._hmt.push(event);

        },
        methods: {
            checkPhone(){
                if (!this.investorMobile) {
                    Toast('手机号不能为空');
                    return false;
                }
                let reg = /^1[3|4|5|7|8]\d{9}$/;
                if (!reg.test(this.investorMobile)) {
                    Toast('请输入正确的手机号码');
                    return false;
                }
                return true;
            },
            checkInviter(){
                let reg = /^1[3|4|5|7|8]\d{9}$/;
                if (!reg.test(this.inviterPhone)) {
                    Toast('请输入正确的邀请人手机号');
                    return false;
                }
                return true;
            },
            checkPassword(){
                let regStr = /^[a-zA-Z0-9]{6,20}$/;
                if (!this.userLoginPassword) {
                    Toast('请输入密码');
                    return false;
                }
                if (!regStr.test(this.userLoginPassword)) {
                    Toast('请输入正确的密码（6~20位数字和字母）');
                    return false;
                }
                let regD = /^\d*$/;
                if (regD.test(this.userLoginPassword)) {
                    Toast('请输入正确的密码（6~20位数字和字母）');
                    return false;
                }
                let regW = /^[a-zA-Z]*$/;
                if (regW.test(this.userLoginPassword)) {
                    Toast('请输入正确的密码（6~20位数字和字母）');
                    return false;
                }
                return true;
            },
            getVerify(){
                this.addHive(0, 'register_btn_getVerify',103201);
                let event = ['_trackEvent', '注册', 'CLICK', '注册页面获取验证码', '注册-获取验证码'];
                window._hmt.push(event);
                if (!this.checkPhone()) {
                    return false
                }
                if (this.imageCode && !this.inputCode) {
                    Toast('请输入图形验证码');
                    return false;
                }
                let {investorMobile} = this;
                let imageCode = this.inputCode;
                let bussType = 0;
                this.verifyTimeLeft = 59;
                this.timeCount();
                this.verifyText = '重新发送';
                $api.post('/sendVerifyCode', {investorMobile, imageCode, bussType})
                    .then(data => {
                        if (data.code == 200) {
                            this.imageCode ='';
                            this.inputCode='';
                            return false;
                        }
                        else {
                            this.clearTimeCount();
                        }
                        if (data.code == 1001) {
                            Toast('验证码错发送失败!');
                            return false;
                        }
                        if (data.code == 1004) {
                            if (this.inputCode) {
                                Toast('图片验证码错误!');
                            } else {
                                Toast('请输入图片验证码!');
                            }

                            this.imageCode = data.data.imageCode;
                            return false;
                        }
                        if (data.code == 1113) {
                            Toast('该手机号已注册，可直接登录!');
                            return false;
                        }
                        Toast(data.msg);
                    })

            },
            timeCount(){
                this.timer = setTimeout(() => {
                    this.verifyTimeLeft = this.verifyTimeLeft - 1;
                    if (this.verifyTimeLeft >= 1) {
                        this.timeCount();
                    }
                }, 1000);
            },
            clearTimeCount(){
                this.verifyTimeLeft = 0;
                if (this.timer) {
                    clearTimeout(this.timer);
                }
            },
            login(){
                this.addHive(0, 'register_btn_login',103202);
                this.addHive(2, 'register_to_login',1032);
                let event = ['_trackEvent', '注册', 'CLICK', '注册页面点击登录', '注册页面点击登录'];
                window._hmt.push(event);
                this.$router.replace('/login');
            },
            register(){
                this.addHive(0, 'register_btn_register',103203);
                let event = ['_trackEvent', '注册', 'CLICK', '在注册页面点击注册按钮', '注册-点击注册'];
                window._hmt.push(event);
                if (!this.checkPhone()) {
                    return false;
                }
                if (!this.verifyCode) {
                    Toast('请输入短信验证码');
                    return false;
                }
                if (!this.checkPassword()) {
                    return false;
                }
                if (this.inviterPhone && !this.checkInviter()) {
                    return false;
                }
                let {investorMobile, verifyCode, userLoginPassword} = this;
                let params = {investorMobile, verifyCode, userLoginPassword};
                if (this.inviterPhone) {
                    params.inviterPhone = this.inviterPhone;
                }
                params.registerSharePageType = window.localStorage.getItem('registerSharePageType') || '';
                params.registerActivityBatch = window.localStorage.getItem('registerActivityBatch') || '';
                params.registerChannelCode = window.localStorage.getItem('registerChannelCode') || 'H5_weixin';
                params.registerDeviceOs = $device.os + '-' + $device.osVersion;

                $api.post('/regist', params)
                    .then(data => {
                        if (data.code == 200) {
                            let logoutUrl = window.sessionStorage.getItem('logoutUrl');
                            window.sessionStorage.removeItem('logoutUrl');
                            logoutUrl = decodeURIComponent(logoutUrl);
                            let event = ['_trackEvent', '注册', 'SHOW', '在注册页面注册成功', '注册-注册成功'];
                            window._hmt.push(event);
                            if (logoutUrl && /http/.test(logoutUrl)) {
                                window.location.replace(logoutUrl);
                            } else {
                                this.addHive(2, 'register_to_personalCenter',1032);
                                this.$router.replace('/personal-center');
                                this.$store.dispatch('getAccountBaofoo');
                                this.$store.dispatch('getPersonalCenterMsg');
                                this.$store.dispatch('getBankInfo');
                            }
                            return false;
                        }
                        if (data.code == 1002) {
                            Toast('验证码错误或失效');
                            return false;
                        }
                        if (data.code == 1101) {
                            Toast('注册人手机号已经存在,请直接登录');
                            return false;
                        }
                        if (data.code == 1102) {
                            Toast('邀请人手机号不存在');
                            return false;
                        }
                        Toast(data.msg);
                    });
            },
            link(src){
                this.addHive(0, 'register_link_deal',103204);
                this.addHive(2, 'register_to_deal',1032);
                let event = ['_trackEvent', '注册', 'CLICK', '在注册页面点击协议', '注册-点击协议'];
                window._hmt.push(event);
                window.location.href = src;
            }

        },
        mounted(){
            let heigth = window.innerHeight;
            this.$refs.register.style.height = heigth + 'px';
        },
        destroyed(){
            this.clearTimeCount();
        }
    }
    
```
### 个人中心

* 模板

```html
  <div class="personal-center" flex="dir:top">
        <div class="wrap" flex-box="1" style="overflow: auto">
            <div class="top">
                <div flex-box="0" class="switch-mode" @click.stop="switchMode">
                    <img src="../images/login/pwd-show@2x.png" alt="show" v-show="mode">
                    <img src="../images/login/pwd-hide@2x.png" alt="show" v-show="!mode">
                </div>
                <div class="msg" @click.stop="getPath('/message-center')" :class="{redTip:articleUnreadMessage}">
                    <img src="../images/personal-center/msg.png" alt="" class="img"/>
                </div>
                <div class="user-head">
                    <img v-if="!investorMobile" src="../images/personal-center/user-head.png"/>
                    <img src="../images/personal-center/user-default.png" v-else/>
                </div>
                <div class="user-mobile">
                    <span v-if="investorMobile">{{investorMobile | mobileFormat}}</span>
                    <span v-else @click.stop="login"> 请登录</span>
                </div>
                <div class="fund-center" flex @click.stop="getPath('/my-assets')">
                    <div flex-box="1">
                        <p class="info-text" v-if="mode">{{accountTotalAssets | currencyFormat}}元</p>
                        <p class="info-text" v-else="mode">****元</p>
                        <p class="title">总资产</p>
                    </div>
                    <div flex-box="1">
                        <p class="info-text" v-if="mode">{{accountCashAmount | currencyFormat}}元</p>
                        <p class="info-text" v-else="mode">****元</p>
                        <p class="title">可用余额</p>
                    </div>
                    <div flex-box="1">
                        <p class="info-text" v-if="mode">{{accountTotalInterests | currencyFormat}}元</p>
                        <p class="info-text" v-else="mode">****元</p>
                        <p class="title">累计收益</p>
                    </div>
                </div>
                <div class="ticket-center">
                    <div flex>
                        <div flex-box="1" flex="main:center">
                            <div class="btn-border">
                                <p class="btn" @click.stop="getPath('/recharge')">
                                    充值
                                </p>
                            </div>
                        </div>
                        <div flex-box="1" flex="main:center">
                            <div class="btn-border">
                                <p class="btn" @click.stop="getPath('/withdraw')">
                                    提现
                                </p>
                            </div>
                        </div>
                    </div>
                    <div flex="box:mean" class="ticket-detail">
                        <div flex-box="1" class="rl" @click.stop="getPath('/ticket-list?code=1')">
                            <p class="title" :class="{redTip:couponUnreadMessage}">现金券</p>
                            <p class="info-text">{{cashCouponCount}}个</p>
                        </div>
                        <div flex-box="1" class="rl" @click.stop="getPath('/ticket-list?code=2')">
                            <p class="title" :class="{redTip:interestCouponUnreadMessage}">加息券</p>
                            <p class="info-text">{{interestCouponCount}}个</p>
                        </div>
                        <div flex-box="1" @click.stop="getPath('/experience-funds')">
                            <p class="title">体验金</p>
                            <p class="info-text">{{experienceAmount}}元</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="body">
                <div class="section seperate" flex="cross:center" @click.stop="getPath('/risk-assessment/wechat')"
                     v-if="!investorRiskScore">
                    <p class="assessment" flex-box="1">
                        您未进行风险承受能力评估，为不影响投资请立即评估
                    </p>
                    <div flex-box="0">
                        <img class="arrow" src="../images/arrow-right.png" alt="arrow">
                    </div>
                </div>
                <div class="section seperate" flex="dir:top">
                    <div class="item bl" flex-box="1" flex="cross:center"
                         @click.stop="getPath('/land-share.html',true)">
                        <div flex-box="0">
                            <img class="logo" src="../images/personal-center/share.png" alt="share">
                        </div>
                        <span flex-box="0">一起赚</span>
                        <div flex-box="1">
                            <div class="slide-warp">
                                    <div class="silde-up">
                                        分享即得加息券
                                    </div>

                            </div>

                        </div>
                        <div flex-box="0">
                            <img class="arrow" src="../images/arrow-right.png" alt="arrow">
                        </div>
                    </div>
                    <div class="item" flex-box="1" flex="cross:center" @click.stop="getPath('/land-financial-master.html',true)">
                        <div flex-box="0">
                            <img class="logo" src="../images/personal-center/master-icon.png" alt="master">
                        </div>
                        <span flex-box="0">达人特权</span>
                        <div flex-box="1">
                            <div class="slide-warp">
                                <transition name="slide-fade">
                                    <div class="silde-up" v-for="(text ,index) in masterList" v-if="index==currentIndex"
                                         :key="index">
                                        {{text}}
                                    </div>
                                </transition>
                            </div>

                        </div>
                        <div flex-box="0">
                            <img class="arrow" src="../images/arrow-right.png" alt="arrow">
                        </div>
                    </div>
                </div>
                <div class="section seperate" flex="dir:top">
                    <div class="item bl" flex-box="1" flex="cross:center" @click.stop="getPath('/invest-list')">
                        <div flex-box="0">
                            <img class="logo" src="../images/personal-center/financial-fixi.png" alt="financial">
                        </div>
                        <span flex-box="1">定期理财</span>
                        <span flex-box="0">{{investmentAmount | currencyFormat}}</span>
                        <div flex-box="0">
                            <img class="arrow" src="../images/arrow-right.png" alt="arrow">
                        </div>
                    </div>
                    <div class="item bl" flex-box="1" flex="cross:center" @click.stop="getPath('/reserve-list')">
                        <div flex-box="0">
                            <img class="logo" src="../images/personal-center/financial-prif.png" alt="financial">
                        </div>
                        <span flex-box="1">高端理财</span>
                        <span flex-box="0">{{reservationCount}}个</span>
                        <div flex-box="0">
                            <img class="arrow" src="../images/arrow-right.png" alt="arrow">
                        </div>
                    </div>
                    <div class="item" flex-box="1" flex="cross:center" @click.stop="getPath('/funds/my-fund')">
                        <div flex-box="0">
                            <img class="logo" src="../images/personal-center/fund.png" alt="my-fund">
                        </div>
                        <span flex-box="1">我的基金</span>
                        <div flex-box="0">
                            <img class="arrow" src="../images/arrow-right.png" alt="arrow">
                        </div>
                    </div>
                </div>


                <div class="section seperate" flex="dir:top">
                    <div class="item" flex-box="1" flex="cross:center"
                         @click.stop="getPath('/land-about-us.html',true)">
                        <div flex-box="0">
                            <img class="logo" src="../images/personal-center/about-us.png" alt="financial">
                        </div>
                        <span flex-box="1">关于我们</span>
                        <div flex-box="0">
                            <img class="arrow" src="../images/arrow-right.png" alt="arrow">
                        </div>
                    </div>
                </div>
            </div>
            <div class="cantact-us">
                <a :href="'tel:'+telNumber">
                    联系我们：{{telNumber}}
                </a>
            </div>
            <div class="btn logout" @click.stop="logout()">
                退出登录
            </div>
        </div>
        <div class="nav" flex-box="0" flex="box:mean">
            <div @click.stop="getPath('/financial')">
                <img src="../images/nav/financial.png" alt="financial">
                <p>理财</p>
            </div>
            <div @click.stop="getPath('/relation')">
                <img src="../images/nav/relation.png" alt="relation">
                <p>好友</p>
            </div>
            <div @click.stop="getPath(appUrl,true)">
                <img src="../images/nav/download.png" alt="download">
                <p>下载app</p>
            </div>
        </div>
        <modal v-show="showModal" @callBack="callBack"></modal>
    </div>
```

* js逻辑

```javascript
  let times = 0;
    import {appUrl} from '../tools/config';
    import {mapState} from 'vuex';
    import Modal from '../components/Modal';
    import {Toast, Indicator, MessageBox} from 'mint-ui';
    import {telNumber} from '../tools/config';
    import $api from '../tools/api';
    import wx from '../tools/wx';
    import $device from '../tools/device';
    import '../less/personal-center.less';
    import {submitAuthorization} from '../tools/operation';
    let timer = null;
    export default {
        name: 'personal-center',
        data(){
            return {
                telNumber,
                mode: true,
                showModal: false,
                orderBillCode: '',
                appUrl,
                couponUnreadMessage: 0,
                interestCouponUnreadMessage: 0,
                articleUnreadMessage: 0,
                relationInvest: 0,//投资好友人数,
                currentIndex: 0 //达人当前展示文案
            }
        },
        created(){
            this.addHive(1,'personal-center',1070);
            this.mode = window.localStorage.getItem('mode') == 'true' ? true : false;
            if ($device.isWeixin) {
                this.getShare();
            }
            timer = setInterval(() => {
                let len = this.masterList.length;
                this.currentIndex = (this.currentIndex + 1) % len;
            }, 4000);
            // 获取未读
            this.getUnread();
            // 获取投资好友人数
            this.getMaster();
            let event = ['_trackEvent', '个人中心', 'SHOW', '进入个人中心页面且已登录', '进入已登录个人中心'];
            window._hmt.push(event);
            // 是否是充值回来
            let rechargeOrderBillCode = window.sessionStorage.getItem('rechargeOrderBillCode');
            if (rechargeOrderBillCode) {
                this.orderBillCode = rechargeOrderBillCode;
                window.sessionStorage.removeItem('rechargeOrderBillCode');
                this.getTradeRecharge();
            }

        },
        computed: {
            ...mapState([
                'investorMobile',
                'accountCashAmount',
                'accountTotalInterests',
                'accountTotalAssets',
                'experienceAmount',
                'cashCouponCount',
                'investorRiskScore',
                'userVerifyStatus',
                'reservationCount',
                'investmentAmount',
                'rewardSum',
                'relationCount',
                'interestCouponCount',
            ]),
            masterList(){
                // 投资好友大于10人
                if (this.relationInvest >= 5) {
                    return ['理财达人，长期奖励', '额外奖励   收益加速']
                }
                return ['理财达人，长期奖励', `还需${5 - this.relationInvest}个投资好友`, '额外奖励   收益加速']
            }
        },
        methods: {
            getMaster(){
                return $api.get('/user/achievement')
                    .then(res => {
                        if (res.code == 200) {
                            //
                            this.relationInvest = res.data.relationInvestCount;
                        }
                    })
            },
            getUnread(){
                $api.get('/user/unread')
                    .then(resp => {
                        if (resp.code == 200) {
                            this.couponUnreadMessage = resp.data.couponUnreadMessage;
                            this.interestCouponUnreadMessage = resp.data.interestCouponUnreadMessage;
                            this.articleUnreadMessage = resp.data.articleUnreadMessage;
                        }
                    })
            },
            getBaofoo(){
                this.$store.dispatch('getAccountBaofoo');
            },
            // 开户流程
            goStep(){
                let {userVerifyStatus} = this;
                this.addHive(0,'personal-center',107001);
                switch (userVerifyStatus) {
                    case 0:
                        this.$router.push('/authentication');
                        break;
                    case 1:
                        submitAuthorization(this.$store.state.userId);
                        break;
                    case 2:
                        this.$router.push('/bind-bank-card');
                        break;
                    case 3:
                        this.$router.push('/set-pay-password');
                        break;
                    default:
                }
            },
            callBack(result){
                this.showModal = false;
                if (result) {
                    this.goStep();
                }
            },
            switchMode(){
                this.addHive(0,'personal-center',107015);
                this.mode = !this.mode
                window.localStorage.setItem('mode', this.mode);
            },
            login(){
                this.$router.replace('/login');
            },
            logout(){
                this.addHive(0,'personal-center',107002);
                let event = ['_trackEvent', '个人中心', 'CLICK', '个人中心-退出登录-点击', '在个人中心点击退出登录'];
                window._hmt.push(event);
                $api.post('/logout')
                    .then(data => {
                        if (data.code == 200) {
                            window.location.replace('/login');
                        } else {
                            Toast('退出登录失败');
                        }

                    })
            },
            getPath(path, boolean){
                let lable = '个人中心-我的资产-点击';
                let value = '在个人中心点击我的资产';
                if (path == '/reward') {
                    this.addHive(0,'personal-center',107003);
                    lable = '个人中心-我的奖励-点击';
                    value = '在个人中心点击我的奖励';
                }
                if (path == '/relation') {
                    this.addHive(0,'personal-center',107004);
                    lable = '个人中心-我的好友-点击';
                    value = '在个人中心点击我的好友';
                }
                if (path == '/reserve-list') {
                    lable = '个人中心-预约管理-点击';
                    value = '在个人中心点击预约管理';
                    this.addHive(0,'personal-center',107007);
                }
                if (path == '/invest-list') {
                    this.addHive(0,'personal-center',107005);
                    lable = '个人中心-我的投资-点击';
                    value = '在个人中心点击我的投资';
                }
                if (path == '/land-about-us.html') {
                    this.addHive(0,'personal-center',107006);
                    lable = '个人中心-关于我们-点击';
                    value = '在个人中心点击关于我们';
                }
                if (path == '/funds/my-fund') {
                    lable = '个人中心-我的基金-点击';
                    value = '在个人中心点击我的基金';
                    this.addHive(0,'personal-center',107008);
                }
                if (path == '/land-share.html') {
                    lable = '个人中心-一起赚-点击';
                    value = '在个人中心点击一起赚';
                    this.addHive(0,'personal-center',107009);
                }

                if (path == '/financial?tab=FIXI' || path == '/financial') {
                    lable = '个人中心-定期理财-点击';
                    value = '在个人中心点击定期理财';
                    this.addHive(0,'personal-center',107010);
                }
                if (path == '/financial?tab=PRIF') {
                    lable = '个人中心-高端理财-点击';
                    value = '在个人中心点击高端理财';
                }
                if (path == appUrl) {
                    lable = '从个人中心进入app下载页';
                    value = '从个人中心进入app下载页';
                    this.addHive(0,'personal-center',107011);
                }
                let event = ['_trackEvent', '个人中心', 'CLICK', lable, value];
                window._hmt.push(event);
                if (boolean) {
                    window.location.href = path;
                    return false
                }
                if (path == '/recharge' || path == '/withdraw') {
                    if(path == '/recharge'){
                        this.addHive(0,'personal-center',107012);
                    }
                    else {
                        this.addHive(0,'personal-center',107013);
                    }

                    if (this.userVerifyStatus != 9) {
                        this.showModal = true;
                        this.addHive(5,'personal-center',1070);
                        let event = ['_trackEvent', '个人中心', 'SHOW', '弹出开户弹窗', '弹出开户弹窗'];
                        window._hmt.push(event);
                        return false;
                    }
                    window.sessionStorage.setItem('backUrl', encodeURIComponent(window.location.href));
                }
                this.$router.push(path);

            },
            getShare(){
                wx.getShare({
                    title: '金疙瘩——个人中心'
                });
            },
            getTradeRecharge(){
                if (!this.orderBillCode) {
                    return false;
                }
                Indicator.open('正在等待银行返回结果...');
                let rechargeBillCode = this.orderBillCode;
                $api.get('/getTradeRecharge', {rechargeBillCode})
                    .then(res => {
                        if (res.code == 200) {
                            let {data} = res;
                            if (data.rechargeStatus === 0) {
                                let timer = setTimeout(() => {
                                    times++;
                                    if (times <= 5) {
                                        this.getTradeRecharge();
                                    } else {
                                        clearTimeout(timer);
                                        Indicator.close();
                                        MessageBox.alert(`银行充值返回较慢，请耐心等待，如有问题，请联系客服！`, '提示');
                                    }
                                }, 2000);
                            }
                            if (data.rechargeStatus === 1) {
                                this.getBaofoo();
                                Indicator.close();
                            }
                            if (data.rechargeStatus === 2) {
                                this.getBaofoo();
                                Indicator.close();
                                Toast('充值失败')
                            }
                        }

                    });
            }
        },
        components: {
            Modal
        },
        destroyed(){
            this.addHive(2,'personal-center',1070);
            clearInterval(timer)
        }
    }
```

### 产品列表

* 模板

```html
  <div v-cloak class="financail" flex-box="1" flex="dir:top">
        <div flex="dir:top" flex-box="1">
            <div class="tabs" flex flex-box="0">
                <div flex-box="1" class="tab" @click.stop="changeTab(2)" :class="{'active':tab==2}">
                    <div class="tab-item">定期理财</div>
                </div>
                <div flex-box="1" class="tab" @click.stop="changeTab(1)" :class="{'active':tab==1}">
                    <div class="tab-item">高端理财</div>
                </div>
                <div flex-box="1" class="tab" @click.stop="changeTab(0)" :class="{'active':tab==0}">
                    <div class="tab-item">基金</div>
                </div>
            </div>
            <div class="item-list" flex-box="1" v-if="tab==1">
                <mt-loadmore :bottom-method="loadBottom" ref="loadmore" :auto-fill="autoFill"
                             :bottomPullText="bottomLoadingText" :bottomLoadingText="bottomLoadingText"
                             :bottomAllLoaded="!(loading &&hasMore)">
                    <div class="infinite-scroll"
                         v-infinite-scroll="loadMore"
                         infinite-scroll-disabled="disLoad"
                         infinite-scroll-distance="70">
                        <div class="item" v-for="(item,index) in lists" :key="index"
                             @click.stop="getDetail(item,'/goods-detail-prif')">
                            <div>
                                <div class="fund-name ellipsis">{{item.productName}}</div>
                                <div flex="dir:left" class="fund-middle">
                                    <div class="rate" flex-box="1">
                                        <div>{{item.annualInterestRate}}</div>
                                        <div class="sub-text">业绩比较基准</div>
                                    </div>
                                    <div class="cycle" flex-box="1">
                                        <div flex="main:center">{{item.productPeriod}}</div>
                                        <div class="sub-text" flex="main:center">期限</div>
                                    </div>
                                    <div class="progress" flex-box="0">
                                        <cicle-progress :width-size="50"
                                                        :progress="item.productProgress"></cicle-progress>
                                    </div>
                                </div>
                                <div class="status-code"
                                     :class="{'hot':item.productStatusCode==1,
                    'raise':item.productStatusCode==2,
                    'sell-out':(item.productStatusCode!=1&&item.productStatusCode!=2)}">
                                    {{item.productStatus}}
                                </div>
                            </div>
                        </div>
                        <p v-if="loading" class="loading" style="text-align: center;padding: .5rem 0 4rem 0;">
                            没有更多...</p>
                    </div>
                </mt-loadmore>
            </div>
            <!--固收-->
            <div class="item-list" flex-box="1" v-if="tab==2">
                <mt-loadmore :bottom-method="loadBottom" ref="loadmore" :auto-fill="autoFill"
                             :bottomPullText="bottomLoadingText" :bottomLoadingText="bottomLoadingText"
                             :bottomAllLoaded="!(loading &&hasMore)">
                    <div class="infinite-scroll"
                         v-infinite-scroll="loadMore"
                         infinite-scroll-disabled="disLoad"
                         infinite-scroll-distance="70">

                        <div class="item" v-for="(item,index) in lists"
                             @click.stop="getDetail(item,'/fixi-goods-detail')"
                             :class="{'stat': item.productStatus =='已告罄','novice-label':item.isNoviceLabelProduct  }">
                            <!--新手标-->
                            <div v-if="item.isNoviceLabelProduct">
                                <div flex="cross:center" class="title-part">
                                    <div class="fund-name ellipsis" flex-box="1">{{item.productName}}</div>
                                    <div class="ticket-wrap" v-if="item.productLabel" flex flex-box="0">
                                        <div class="ticket-item" style="margin:0 0 0 .4rem"
                                             v-if="index==0"
                                             :class="{'disable':(item.productStatusCode!=1&&item.productStatusCode!=2)}"
                                             v-for="(ticketItem,index) in item.productLabel">{{ticketItem}}
                                        </div>
                                    </div>
                                </div>
                                <div class="rate-part">
                                    <p class="rate">{{item.annualInterestRate}}</p>
                                    <p>{{item.productPeriod}}限期</p>
                                    <div class="progress-part">
                                        <div class="progress-line">
                                            <div class="done" :style="'width:' + item. productProgress+ '%'"
                                                 :class="{'sell-out':(item.productStatusCode!=1&&item.productStatusCode!=2)}"></div>
                                            <div class="round" :style="'left:' +( item. productProgress-1) + '%'"
                                                 :class="{'sell-out':(item.productStatusCode!=1&&item.productStatusCode!=2)}">
                                                <div
                                                    :class="{'sell-out':(item.productStatusCode!=1&&item.productStatusCode!=2)}"></div>
                                            </div>
                                        </div>
                                        <div class="progress-num" style="font-size:.7rem">{{item.productProgress}}%
                                        </div>
                                    </div>
                                </div>

                                <div class="m-part" flex>
                                    <p flex-box="1">{{item.productMinInvestment}}</p>
                                    <p flex-box="0" v-if="item.productMaxInvestment">
                                        每人限投{{item.productMaxInvestment}}</p>
                                </div>

                            </div>
                            <div v-else><!--非新手标-->
                                <div class="fund-name ellipsis">{{item.productName}}</div>
                                <div class="ticket-wrap" v-if="item.productLabel" flex>
                                    <div class="ticket-item"
                                         :class="{'disable':(item.productStatusCode!=1&&item.productStatusCode!=2)}"
                                         v-for="(ticketItem,index) in item.productLabel">{{ticketItem}}
                                    </div>
                                </div>
                                <div flex="dir:left" class="fund-middle-fix"
                                     :class="{'sell-out':(item.productStatusCode!=1&&item.productStatusCode!=2),'padding-top':item.couponMaxProfit}"
                                >
                                    <div class="rate" flex-box="1"
                                         :class="{'sell-out':(item.productStatusCode!=1&&item.productStatusCode!=2)}">
                                        <div flex>
                                            <span>
                                                {{item.annualInterestRate}}
                                            </span>
                                            <span v-if="item.couponMaxProfit" class="max-profit">
                                                +{{item.couponMaxProfit}}
                                            </span>
                                        </div>
                                        <div class="sub-text">预计年化收益率</div>
                                        <div class="float-tip" v-if="item.couponMaxProfit">
                                            现金劵最大加息
                                            <img src="../images/tri.png" alt="" class="tri">
                                        </div>
                                    </div>
                                    <div class="cycle" flex-box="3"
                                         :class="{'sell-out':(item.productStatusCode!=1&&item.productStatusCode!=2)}">
                                        <div flex="main:center">{{item.productPeriod}}</div>
                                        <div class="sub-text" flex="main:center">期限</div>
                                    </div>
                                    <div class="status" flex-box="0" flex="cross:center"
                                         :class="{'sell-out':(item.productStatusCode!=1&&item.productStatusCode!=2)}">
                            <span :class="{'hot':item.productStatusCode==1,
                    'raise':item.productStatusCode==2,
                    'sell-out':(item.productStatusCode!=1&&item.productStatusCode!=2)}"
                            >{{item.productStatus}}</span>
                                    </div>
                                </div>
                                <div class="progress-part">
                                    <div class="progress-line">
                                        <div class="done" :style="'width:' + item. productProgress+ '%'"
                                             :class="{'sell-out':(item.productStatusCode!=1&&item.productStatusCode!=2)}"></div>
                                        <div class="round" :style="'left:' +( item. productProgress-1) + '%'"
                                             :class="{'sell-out':(item.productStatusCode!=1&&item.productStatusCode!=2)}">
                                            <div
                                                :class="{'sell-out':(item.productStatusCode!=1&&item.productStatusCode!=2)}"></div>
                                        </div>
                                    </div>
                                    <div class="progress-num">{{item.productProgress}}%</div>
                                </div>
                                <div class="buttom" flex="main:justify">
                                    <span>{{item.productMinInvestment}}</span>
                                    <span v-if="item.talentAwardMaxRate">达人奖励系数{{item.talentAwardMaxRate}}</span>
                                </div>
                            </div>

                        </div>
                        <p v-if="loading" class="loading" style="text-align: center;padding: .5rem 0 4rem 0;">
                            没有更多...</p>
                    </div>
                </mt-loadmore>
            </div>
            <div class="item-list" flex-box="1" v-if="tab==0">
                <lists></lists>
            </div>
            <!--遮罩层-->
            <div class="mask" v-show="show">
                <div class="content">
                    <h2 style="color:black;">合格投资者登记</h2>
                    <div class="main">
                        根据《私募投资基金监督管理暂行办法》第四章第十四条规定："私募基金管理人、私募基金销售机构不得向合格投资者之外的单位和个人募集资金，不得通过报刊、电台、电视、互联网等公众传播媒体或者讲座、报告会、分析会和布告、传单、手机短信、微信、博客和电子邮件等方式，向不特定对象宣传推介。"<br>
                        本平台谨遵《私募投资基金监督管理暂行办法》之规定，只向特定的合格投资者宣传推介相关私募投资基金产品。<br>
                        阁下如有意进行私募投资基金投资且满足《私募投资基金监督管理暂行办法》关于"合规投资者"标准之规定，即具备相应风险识别能力和风险承担能力，投资于单只私募基金的金额不低于100 万元，且个人金融类资产不低于300万元或者最近三年个人年均收入不低于50万元人民币。请阁下详细阅读本提示，方可获得私募投资基金产品宣传推介服务。
                    </div>
                    <p class="confirm" @click.stop="check=!check"><i :class="{'active':check==true}"></i>本人承诺符合上述合格投资者条件并完成调查问卷。
                    </p>
                    <button class="btn" :disabled="!check" @click.stop="updateUserInfo">确认</button>
                </div>
            </div>
        </div>
    </div>
```
* js逻辑

```javascript
  import Vue from 'vue';
    import {mapState} from 'vuex';
    import {Loadmore, InfiniteScroll} from 'mint-ui';
    import {logout} from '../tools/operation';
    Vue.component(Loadmore.name, Loadmore);
    Vue.use(InfiniteScroll);
    import wx from '../tools/wx';
    import $device from '../tools/device';
    import '../less/financial.less';
    import CicleProgress from '../components/CicleProgress/CicleProgress';
    import $api from '../tools/api';
    import lists from '../funds/Lists.vue'
    export default {
        name: 'financial',
        components: {
            CicleProgress, lists
        },
        data(){
            return {
                check: false,
                loading: true,
                hasMore: false,
                tab: 2,
                startRow: 0,
                pageSize: 10,
                lists: [],
                autoFill: false,
                bottomLoadingText: '加载中...',
                bottomPullText: '上拉加载更多',
                scrollTop: 0,
                settings: {}

            };
        },
        created(){
            this.addHive(1, 'financial', 1010);
            this.tab = this.$route.query.tab || 2;

            let goodsDetail = window.sessionStorage.getItem('goodsDetail');
            if (goodsDetail) {
                let {tab, lists, scrollTop, startRow, pageSize, hasMore} = JSON.parse(goodsDetail);
                this.tab = tab;
                this.lists = lists;
                this.scrollTop = scrollTop;
                this.startRow = startRow;
                this.pageSize = pageSize;
                this.hasMore = hasMore;
                this.loading = false;
                this.$nextTick(() => {
                    let dom = document.querySelector('.item-list');
                    dom.scrollTop = this.scrollTop;
                });


                window.sessionStorage.removeItem('goodsDetail');
                return false;
            }
            /*基金详情*/
            if (window.sessionStorage.getItem('fund-detail')) {
                this.tab = 0;
                window.sessionStorage.removeItem('fund-detail');
            }
            // 私募
            if (this.$route.query.tab == 'PRIF') {

                let event = ['_trackEvent', '产品列表', 'SHOW', '进入高端理财列表页', '进入高端理财列表页'];
                window._hmt.push(event);
                this.tab = 1;
                this.settings.title = '优质稀缺大类资产，就在金疙瘩。';
                this.getListWithLogin();

            } else if (this.$route.query.tab !== '0') {
                let event = ['_trackEvent', '产品列表', 'SHOW', '进入定期理财列表页', '进入定期理财列表页'];
                window._hmt.push(event);
                this.settings.title = '金疙瘩系列定期产品——闲散资金定制理财';
                this.getGoodsList()
            }
            if ($device.isWeixin) {
                this.getShare();
            }
        },
        computed: {
            ...mapState([
                'isEligibleInvestor',
                'userId'
            ]),
            disLoad(){
                return this.loading || (!this.hasMore);
            },
            show(){
                return (this.isEligibleInvestor == 0) && (this.tab == 1) && this.userId;
            }
        },
        methods: {
            loadBottom(){
                if (!(this.loading && this.hasMore)) {
                    this.allLoaded = true;
                }// 若数据已全部获取完毕
                this.$refs.loadmore.onBottomLoaded();
            },
            changeTab(tab){
                let type = tab == 1 ? 'prif' : (tab == 2 ? 'fixi' : 'fund');
                let code = 101001;
                if (tab == 2) {
                    code = 101002;
                }
                if (code == 3) {
                    code = 101003;
                }
                this.addHive(0, 'financial_tab_' + type, code);
                this.tab = tab;
                this.$router.replace('/financial?tab=' + this.tab);
                this.startRow = 0;
                this.$nextTick(() => {
                    let dom = document.querySelector('.item-list');
                    dom.scrollTop = 0;
                });

                if (this.tab == 1) {
                    let event = ['_trackEvent', '产品列表', 'CLICK', '定期理财列表页点击高端理财tab', '定期理财列表页-点击高端理财tab'];
                    window._hmt.push(event);
                    this.getListWithLogin();
                } else if (this.tab == 2) {
                    let event = ['_trackEvent', '产品列表', 'CLICK', '高端理财列表页点击定期理财tab', '高端理财列表页-点击定期理财tab'];
                    window._hmt.push(event);
                    this.getGoodsList('refresh');
                }
            },
            getListWithLogin(){
                if (this.userId) {
                    this.getGoodsList('refresh');
                } else {
                    this.$store.dispatch('getAccountBaofoo')
                        .then(data => {
                            if (data.code == '401') {
                                logout();
                            } else {
                                this.getGoodsList('refresh');
                            }
                        })
                }
            },
            loadMore(){
                this.addHive(0, 'financial_scroll_loading',101004);
                this.loading = true;
                this.startRow = this.lists.length;
                this.getGoodsList();
            },
            getGoodsList(flag){
                let params = {
                    pageSize: this.pageSize,
                    startRow: this.startRow
                };
                if (this.tab == 1) {
                    params.productType = "PRIF"
                }
                else if (this.tab == 2) {
                    params.productType = "FIXI"
                }
                $api.get('/product/getList', params).then(msg => {
                    console.log(msg);
                    if (msg.code == 200) {
                        let {productList} = msg.data;
                        if (productList.length >= this.pageSize) {
                            this.loading = false;
                            this.hasMore = true;
                        }
                        else {
                            this.loading = true;
                            this.hasMore = false;
                        }
                        if (flag == 'refresh') {
                            this.lists = msg.data.productList;
                        } else {
                            this.lists = this.lists.concat(msg.data.productList);
                        }
                    }


                });
            },
            updateUserInfo(){
                $api.post('/updateUserInfo', {isEligibleInvestor: 1})
                    .then(() => {
                        this.$store.dispatch('setEligibleInvestor', 1);
                    });

            },
            getDetail(item, url){

                let dom = document.querySelector('.item-list');
                this.scrollTop = dom.scrollTop;
                if (url.indexOf('fixi') > -1) {
                    this.addHive(0, 'financial_list_fixi',101005);
                    let event = ['_trackEvent', '产品列表', 'CLICK', '在定期理财列表页点击查看详情', '定期理财列表页-点击详情'];
                    window._hmt.push(event);
                } else {
                    this.addHive(0, 'financial_list_prif',101006);
                    let event = ['_trackEvent', '产品列表', 'CLICK', '在高端理财列表页点击查看详情', '高端理财列表页-点击详情'];
                    window._hmt.push(event);
                }
                window.sessionStorage.setItem('goodsDetail', JSON.stringify(this.$data));
                this.$router.push({
                    path: url,
                    query: {
                        productUuid: item.productUuid
                    }
                })
            },
            getShare(){
                wx.getShare(this.settings);
            },
            pathTo(path, boolean){
                this.addHive(0, 'financial_link' + path.replace('/', ''),101007);
                this.addHive(2, 'financial',1010);
                if (boolean) {
                    window.location.href = path;
                    return false;
                }
                this.$router.push(path);
            }
        },
        mounted(){

        }
    }
```

### 产品详情
* 模板

```html
  <div class="fixi-goods-detail">
        <div class="warp">
            <div class="master-hint" flex="cross:center main:justify" v-if="production.talentAwardMaxRate">
                <span>达人奖励系数{{production.talentAwardMaxRate}}</span>
                <span class="how" @click.stop="getMasterPage">如何获得达人奖励</span>
            </div>
            <div class="top">
                <div class="main-title ellipsis">{{production.productAbbrName}}</div>
                <div class="sub-title">预计年化收益率</div>
                <div class="rate">{{production.annualInterestRate}}</div>
                <div class="items" flex="main:jusitfy">
                    <div class="item" flex-box="1">
                        <div class="item-text">产品期限(天)</div>
                        <div class="item-number">{{productPeriod}}</div>
                    </div>
                    <div class="item" flex-box="1">
                        <div class="item-text">剩余额度(元)</div>
                        <div class="item-number">{{production.productRemainAmountValue}}</div>
                    </div>
                </div>
                <div class="progress-warp" flex="cross:center">
                    <span flex-box="0">进度:</span>
                    <div flex-box="1" class="progress">
                        <div class="active" :style="{'width':production.productProgress+'%'}"></div>
                    </div>
                    <span flex-box="0">{{production.productProgress}}%</span>
                </div>
            </div>
            <div class="ticket-wrap" v-if="production.productLabel" flex>
                <div class="ticket-item" v-for="(item,index) in production.productLabel">{{item}}</div>
            </div>
            <div class="date-warp" flex>
                <div class="date-item" flex-box="1">
                    <div class="date-info">发布日</div>
                    <div class="round-warp">
                        <div class="round active" flex="main:center cross:center">
                            <div class="inner-round"></div>
                        </div>
                        <div class="line-right" :class="{'red':step>=1}"></div>

                    </div>
                    <div class="date">{{production.productPublishDate}}</div>
                </div>
                <div class="date-item" flex-box="1">
                    <div class="date-info">起息日</div>
                    <div class="round-warp">
                        <div class="round" :class="{'active':step>=1}" flex="main:center cross:center">
                            <div class="inner-round"></div>
                        </div>
                        <div class="line-left" :class="{'red':step>=1}"></div>
                        <div class="line-right" :class="{'red':step>=2}"></div>

                    </div>
                    <div class="date">{{production.productInterestDate}}</div>
                </div>
                <div class="date-item" flex-box="1">
                    <div class="date-info">到期日</div>
                    <div class="round-warp">
                        <div class="round" :class="{'active':step>=2}" flex="main:center cross:center">
                            <div class="inner-round"></div>
                        </div>
                        <div class="line-left" :class="{'red':step>=2}"></div>
                        <div class="line-right" :class="{'red':step>=3}"></div>

                    </div>
                    <div class="date">{{production.productExpiringDate}}</div>
                </div>
                <div class="date-item" flex-box="1">
                    <div class="date-info">预期收款日</div>
                    <div class="round-warp">
                        <div class="round" :class="{'active':step>=3}" flex="main:center cross:center">
                            <div class="inner-round"></div>
                        </div>
                        <div class="line-left" :class="{'red':step>=3}"></div>
                    </div>
                    <div class="date">{{production.productPaymentDate}}</div>
                </div>
            </div>

            <div class="basic">
                <div class="basic-title">基本要素</div>
                <div class="content">
                    <div class="item" flex="box:mean" v-if="production.productName">
                        <span>产品全称</span>
                        <span class="ellipsis">{{production.productName}}</span>
                    </div>
                    <div class="item" flex="box:mean" v-if="production.productCode">
                        <span>项目编号</span>
                        <span class="ellipsis">{{production.productCode}}</span>
                    </div>
                    <div class="item" flex="box:mean" v-if="production.productScale">
                        <span>产品规模</span>
                        <span class="ellipsis">{{production.productScale}}</span>
                    </div>

                    <div class="item" flex="box:mean" v-if="production.productMaxInvestment">
                        <span>投资上限</span>
                        <span class="ellipsis">{{production.productMaxInvestment}}</span>
                    </div>

                    <div class="item" flex="box:mean" v-if="production.productInterestType">
                        <span>收益分配方式</span>
                        <span class="ellipsis">{{production.productInterestType}}</span>
                    </div>

                    <div class="item" flex="box:mean">
                        <span>是否可转</span>
                        <span class="ellipsis">{{production.isTransferFlag ? '可转' : '不可转'}}</span>
                    </div>

                    <div class="item" flex="box:mean" v-if="production.investorQualification">
                        <span>投资人条件</span>
                        <span class="ellipsis">{{production.investorQualification}}</span>
                    </div>
                </div>
            </div>
            <!--项目概况-->
            <div class="basic"
                 v-if="production.productIntroduction">
                <div class="basic-title">项目概况</div>
                <div class="basic-content outset" v-html="productIntroduction"></div>
            </div>
            <div style="height: .5rem"></div>
            <!--投资方向-->
            <div class="basic product-information" v-for="(item,index) in productInformation" :key="index">
                <div class="basic-title" @click.stop="setExpend(index)">
                    {{item.inforKey}}
                    <div class="arrow" :class="{'up':item.expend}"></div>
                </div>
                <div class="basic-content" :class="{'outset':item.expend}"
                     v-html="item.inforValue"></div>

            </div>

            <!--附件-->
            <div class="basic product-information" v-if="productAttachment">
                <div class="basic-title" @click.stop="expendAttachment()">
                    产品附件
                    <div class="arrow" :class="{'up':attachmentUp}"></div>
                </div>

                <div class="basic-content" :class="{'outset':attachmentUp}">
                    <div class="product-attachment" @click.stop="openPDF(productAttachment)"
                         v-for="(productAttachment,index) in production.productAttachment">
                        {{productAttachment.attachmentName}}
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div v-if="production.canBuy" flex="box:mean">
                <button class="min-invest" @click.stop="preInvest">{{production.productMinInvestmentValue}}元起投</button>
                <button class="do-invest" @click.stop="preInvest">立即投资</button>
            </div>
            <div v-else="production.canBuy">
                <div v-if="production.productStatusCode==1" class="can-not-buy" style="background: #1D72C0"
                     @click.stop="hot">
                    {{production.productStatus}}
                </div>
                <div v-else class="can-not-buy">{{production.productStatus}}</div>
            </div>
        </div>

        <modal v-show="showModal" @callBack="modalBack"></modal>
        <invest-input v-show="showInvest" title="输入投资金额" @close="showInvest=false"
                      :cash-amount="accountCashAmount"
                      :min-invest="production.productMinInvestmentValue"
                      :remain-amount="production.productRemainAmountValue"
                      :step-value="production.investmentIntervalValue"
                      :uid="productUuid"
                      :rate="production.expcRate"
                      :period="production.productPeriod"
                      @callBack="inputBack"></invest-input>
    </div>
```
* js逻辑

```javascript

  import {mapState} from 'vuex';
    import {Toast, MessageBox} from 'mint-ui';
    import $api from '../tools/api';
    import {submitAuthorization} from '../tools/operation';
    import {textToHtml, numAdd} from '../filters';
    import {logout} from '../tools/operation';
    import wx from '../tools/wx';
    import $device from '../tools/device';
    import InvestInput from '../components/InvestInput';
    import Modal from '../components/Modal'
    import '../less/fixi-goods-detail.less';
    const logo = require('../images/share-icon.png');
    export default {
        name: 'fixi-goods-detail',
        data(){
            return {
                productUuid: '',
                attachmentUp: false,
                showModal: false,
                showInvest: false,
                production: {}
            }
        },
        created(){
            this.addHive(1, 'fixi-goods-detail',1013);
            this.$store.dispatch('getAccountBaofoo');
            this.productUuid = this.$route.query.productUuid;
            this.getGoodsDetail();
            if ($device.isWeixin) {
                this.getShare();
            }
            let event = ['_trackEvent', '定期理财详情', 'SHOW', '进入定期理财详情页', '进入定期理财详情页'];
            window._hmt.push(event);
        },
        components: {
            InvestInput,
            Modal
        },
        computed: {
            ...mapState([
                'isEligibleInvestor',
                'userVerifyStatus',
                'accountTotalAssets',
                'accountTotalInterests',
                'accountCashAmount',
                'userId',
                'investorRiskScore'
            ]),
            productPeriod(){
                if (this.production.productPeriod) {
                    return parseInt(this.production.productPeriod)
                }
                return '';
            },
            step(){
                let {
                    serverTime,
                    productInterestDate, productExpiringDate,
                    productPaymentDate
                } = this.production;
                if (!serverTime) {
                    return 0;
                }
                if (serverTime > productPaymentDate) {
                    return 3;
                }
                if (serverTime > productExpiringDate) {
                    return 2;
                }
                if (serverTime > productInterestDate) {
                    return 1;
                }

                return 0;
            },
            productIntroduction(){
                return textToHtml(this.production.productIntroduction);
            },
            productInformation(){
                return this.production.productInformation;

            },
            productAttachment(){
                return this.production.productAttachment && this.production.productAttachment.length > 0;
            }
        },
        methods: {
            setExpend(index){
                this.addHive(0, 'fixiGoodsDetail_item_expend',101301);
                this.production.productInformation[index].expend = !this.production.productInformation[index].expend;
                let oper = '收起';
                if (this.production.productInformation[index].expend) {
                    oper = '打开';
                }
                let item = '';
                switch (index) {
                    case 0 :
                        item = '资金投向';
                        break;
                    case 1 :
                        item = '还款来源';
                        break;
                    case 2 :
                        item = '风险保障';
                        break;
                    case 3 :
                        item = '风险提示';
                        break;
                }
                let event = ['_trackEvent', '定期理财详情', 'CLICK', '在定期理财详情页' + oper + item + '', '定期理财详情页-' + oper + item + ''];
                window._hmt.push(event);
            },
            expendAttachment(){
                this.attachmentUp = !this.attachmentUp;
                let oper = '收起';
                if (this.attachmentUp) {
                    oper = '打开';
                }
                this.addHive(0, 'fixiGoodsDetail_item_file',101302);
                let event = ['_trackEvent', '定期理财详情', 'CLICK', '在定期理财详情页' + oper + '产品附件', '定期理财详情页-' + oper + '产品附件'];
                window._hmt.push(event);
            },
            openPDF(item){
                this.addHive(0, 'fixiGoodsDetail_link_pdf',101303);
                if (item.attachmentLink) {
                    let pdfUrl = item.attachmentLink;
                    let pdfName = item.attachmentName
                    pdfUrl = pdfUrl.replace(/^http\.*:/, 'https:');
                    let event = ['_trackEvent', '定期理财详情', 'CLICK', '在定期理财详情页点击产品附件', '定期理财详情页-点击产品附件'];
                    window._hmt.push(event);
                    window.location.href = '/pdf/web/viewer.html?src='
                        + encodeURIComponent(pdfUrl) + '&name=' + encodeURIComponent(pdfName);
                }
            },
            getGoodsDetail(){
                let params = {
                    productType: 'FIXI',
                    productUuid: this.productUuid
                };
                $api.get('/product/getDetail', params)
                    .then(data => {
                        if (data.code == 200) {
                            data.data.productInformation = data.data.productInformation || [];
                            data.data.productInformation.map(el => {
                                el.inforValue = textToHtml(el.inforValue);
                                el.expend = false;
                            })
                            this.production = data.data;
                            this.production.expcRate = data.data.annualInterestRateValue;
                            if (data.data.increaseInterestRateValue) {
                                this.production.expcRate = numAdd(data.data.annualInterestRateValue, data.data.increaseInterestRateValue);
                            }
                            console.log(this.production);
                        } else {
                            Toast(data.msg);
                        }
                    })
            },
            preInvest(){
                if (this.userId) {
                    this.doInvest();
                } else {
                    this.$store.dispatch('getUserInfo')
                        .then(data => {
                            if (data.code == 401) {
                                logout();
                            }
                            if (data.code == 200) {
                                this.doInvest();
                            }
                        });
                }

            },
            doInvest(){
                let {userVerifyStatus} = this;
                if (userVerifyStatus != 9) {
                    this.showModal = true;
                    let event = ['_trackEvent', '定期理财详情', 'SHOW', '弹出开户弹窗', '弹出开户弹窗'];
                    window._hmt.push(event);
                    this.addHive(5, 'fixiGoodsDetail_modal_auth');
                } else {
                    this.checkRiskAssess();
                }
                let event = ['_trackEvent', '定期理财详情', 'CLICK', '在定期理财详情页点击立即投资', '定期理财详情页-点击立即投资'];
                window._hmt.push(event);
            },
            goStep(){
                window.sessionStorage.setItem('detail', 1)
                let {userVerifyStatus} = this;
                switch (userVerifyStatus) {
                    case 0:
                        //  window.location.href = '/realnameBased.html';
                        this.$router.push('/authentication');
                        break;
                    case 1:
                        // window.location.href = '/baoFoo.html?uid=' + this.$store.state.userId;
                        submitAuthorization(this.$store.state.userId);
                        break;
                    case 2:
                        // window.location.href = '/bindBankCard.html';
                        this.$router.push('/bind-bank-card');
                        break;
                    case 3:
                        //  window.location.href = '/setPayPassword.html';
                        this.$router.push('/set-pay-password');
                        break;
                    default:
                }
            },
            modalBack(result){
                this.showModal = false;
                if (result) {
                    this.goStep();
                }
            },
            inputBack(result){
                console.log(result);
            },
            getShare(){
                let params = {
                    url: window.location.href
                }
                /*if ($device.ios) {
                 params.url = window.shareUrl;
                 }*/
                $api.get('/wechat/shareInfo', params)
                    .then(data => {
                        if (data.code == 200) {
                            this.setShare(data.data.shareInfo);
                        }
                    });
            },
            setShare(config){
                wx.config(config);
                let content = {
                    title: '金疙瘩——中高端理财产品聚集地',
                    link: window.location.href,
                    imgUrl: logo,
                    desc: '汇聚中冀独家优质资产，专业理财师团队贴心服务，智能化的定制理财解决方案。'
                }
                wx.wx.ready(() => {
                    wx.onMenuShareTimeline(content);
                    wx.onMenuShareAppMessage(content);
                });
            },
            checkRiskAssess(){
                if (!this.investorRiskScore) {
                    MessageBox({
                        title: '提示',
                        message: '根据《投资者适当性管理实施指引》，为保障您购买合适的产品，请花十秒进行投资风险承受能力测评。',
                        confirmButtonText: '去测评',
                        showCancelButton: true
                    }).then(action => {
                        if (action == 'confirm') {
                            this.$router.push('/risk-assessment/wechat');
                        }
                    });
                } else {
                    this.showInvest = true;
                }
            },
            hot(){
                Toast('产品在预热中，请稍后再进行购买');
            },
            getMasterPage(){
                this.addHive(0, 'fixiDoodsDetail_link_financialMaster',101304);
                window.location.href = '/land-financial-master.html';
            }


        },
        destroyed()
        {
            this.addHive(2, 'fixi-goods-detail',1013);
        }
    }
```
### 实名认证
* 模板

```html
  <div class="authentication" flex-box="1" @click.stop="showCard=false">
        <div class="authentication-lint">为保障您账号安全，请进行实名认证</div>
        <div class="steps" flex="box:mean">
            <div class="item" flex="main:center">
                <span class="round active" :class="{'app':isApp}">1</span>
                <div class="line-right active" :class="{'app':isApp}"></div>
            </div>
            <div class="item" flex="main:center">
                <span class="round">2</span>
                <div class="line-left"></div>
                <div class="line-right"></div>
            </div>
            <div class="item" flex="main:center">
                <span class="round">3</span>
                <div class="line-left"></div>
            </div>

        </div>
        <dl class="authentication-input">
            <dd flex>
                <span class="span-left">真实姓名</span>
                <div class="span-right" flex="cross:center">
                    <input type="text" placeholder="请输入您的真实姓名" v-model="userName">
                </div>
            </dd>
            <dd flex @click.stop="showCard=true">
                <span class="span-left">身份证号</span>
                <div class="span-right" flex="cross:center">
                    <input type="text" placeholder="请输入您的身份证号码" v-model="userIdCardNumber" readonly>
                </div>
            </dd>
        </dl>
        <div class="authentication-bottom">
            <div class="authentication-btn">
                <button @click.stop="btnAction" :class="{'app':isApp}">下一步</button>
            </div>
            <div class="auth-text">个人信息由公安部认证</div>
        </div>
        <div class="authentication-win" v-show="popup">
            <div class="win-box" flex="dir:top">
                <div class="win-content" flex-box="1">
                    <p class="hint1">请输入验证码进行验证</p>
                    <p class="hint2"><span>已发送验证码到注册手机</span></p>
                    <dl flex="main:justify">
                        <dt>
                            <input type="text" placeholder="请输入验证码" v-model="smsCode" maxlength="6">
                        </dt>
                        <dd>
                            <button :class="{'active':btnActive,'app':isApp}" @click.stop="transmit">{{btnText}}
                            </button>
                        </dd>
                    </dl>
                    <div class="close" flex="main:center cross:center" @click.stop="curse">×</div>
                </div>
                <div class="win-btn" flex-box="0" flex>
                    <button flex-box="1" class="sure" :class="{'app':isApp}" @click.stop="sure" :disabled="loading">确定
                    </button>
                </div>

            </div>
        </div>
        <card-input v-show="showCard"
                    title="请输入身份证号码"
                    @close="showCard=false"
                    @callBack="getCardText"></card-input>
        <div flex="dir:right">
            <div class="customer-service" @click.stop="callService"></div>
        </div>

    </div>
```
* js逻辑

```javascript
 import '../less/authentication.less';
    import $api from '../tools/api';
    import $device from '../tools/device';
    import {mapState} from 'vuex';
    import $fun from '../tools/fun';
    import {Toast} from 'mint-ui';
    import CardInput from '../components/CardInput';
    import {telNumber} from '../tools/config';
    import requestHybrid from '../tools/hybrid';
    export default {
        name: 'authentication',
        data(){
            return {
                userName: '',
                userIdCardNumber: '',
                popup: false,
                btnActive: true,
                loading: false,
                smsCode: '',
                btnText: '获取验证码',
                nextClick: true,
                flag: true,
                showCard: false
            };
        },
        components: {
            CardInput
        },
        created(){
            let event = ['_trackEvent', '实名认证', 'SHOW', '进入实名认证页面', '进入实名认证页面'];
            window._hmt.push(event);
            this.addHive(1, 'authentication',1005);
        },
        computed: {
            ...mapState([
                    'investorMobile',
                    'userId'
                ]
            ),
            isApp(){
                return true;
            }
        },
        methods: {
            //下一步
            btnAction(){
                this.addHive(0, 'authentication_btn_next',100501);
                if (!this.nextClick) {
                    return
                }
                this.nextClick = false;
                setTimeout(() => {
                    this.nextClick = true;
                }, 2000);

                let {userName, userIdCardNumber} = this;
                if (!$fun.valiRealName(userName)) {
                    Toast({
                        message: '请输入真实姓名',
                        duration: 5000
                    });
                    return
                }
                if (!$fun.valiIdCard(userIdCardNumber)) {
                    Toast({
                        message: '请输入正确身份证号',
                        duration: 5000
                    });
                    return
                }
                let event = ['_trackEvent', '实名认证', 'CLICK', '实名认证页面-点击下一步', '实名认证页面-点击下一步'];
                window._hmt.push(event);
                this.getAccount();
            },
            //提交数据
            getAccount(){
                this.addHive(0, 'authentication_btn_submit',100502);
                let {userName, userIdCardNumber, smsCode} = this;
                let data = {
                    userName: userName, userIdCardNumber: userIdCardNumber
                }
                if (this.popup) {
                    data = {
                        userName: userName, userIdCardNumber: userIdCardNumber, smsCode: smsCode
                    }
                }
                $api.post('/openAccount', data).then(msg => {

                    if (msg.code == 200) {
                        Toast({
                            message: '身份认证成功！',
                            duration: 5000
                        });
                        this.popup = false;

                        setTimeout(() => {

                            this.$store.dispatch('getUserInfo');
                            this.$router.replace('/bind-bank-card');
                        }, 1000);
                    } else if (msg.code == 8003) {
                        //弹窗
                        this.popup = true;
                        this.smsCode = '';
                        this.btnText = '获取验证码';
                        this.btnActive = true;
                        let event = ['_trackEvent', '实名认证', 'SHOW', '实名认证监测到已在其他商户开户', '实名认证监测到已在其他商户开户'];
                        window._hmt.push(event);
                        this.transmit();
                    } else {
                        Toast({
                            message: msg.msg,
                            duration: 5000
                        });
                    }
                });
            },
            //下发按钮
            transmit(){
                this.addHive(0, 'authentication_btn_sms',100503);
                if (this.btnActive) {
                    $api.get('/sendBaofooAuthSMS', {type: 2}).then(msg => {
                        if (msg.code != 200) {
                            Toast({
                                message: msg.msg,
                                duration: 5000
                            });
                            this.btnText = '获取验证码';
                            this.btnActive = true;
                            this.flag = false;
                        }
                    });
                    //下发验证码
                    this.send(120);
                }
            },
            //确定
            sure(){
                this.addHive(0, 'authentication_ensure',100504);
                if (this.smsCode.length >= 4) {
                    this.getAccount();
                } else {
                    Toast({
                        message: '请输入正确验证码！',
                        duration: 5000
                    });
                }
            },
            //取消
            curse(){
                this.popup = false;
                this.nextClick = true;
                //this.flag = false;
            },
            //下发验证码
            send(time){
                this.flag = true;
                this.btnActive = false;
                let timer;
                let recursion = () => {
                    if (this.flag) {
                        if (time <= 1) {
                            this.btnText = '重新获取';
                            this.btnActive = true;
                        } else {
                            time--;
                            this.btnText = '(' + time + 's)';
                            timer = setTimeout(recursion, 1000);
                        }
                    } else {
                        clearTimeout(timer);
                    }
                };
                recursion();
            },
            // 获取数字键盘的身份证号
            getCardText(text){
                this.userIdCardNumber = text;
            },
            callService(){
                this.addHive(0, 'authentication_btn_call',100505);
                if ($device.kingold) {
                    requestHybrid({
                        tagname: 'tel',
                        param: {
                            callService: telNumber
                        }
                    })
                    return false
                }
                if ($device.mobile) {
                    window.open('tel:' + telNumber.replace(/-/g, ''));
                }
            }
        }
    }
```
*...
*...
*...
### 我的账户
* 模板

```html

    <div flex="dir:top" flex-box="1" class="my-assets">
        <div class="assets-body" flex-box="1">
            <div class="assets">
                <div class="title">总资产(元）</div>
                <div class="number">{{accountTotalAssets | currencyFormat}}</div>
                <div class="profit-withdraw" flex>
                    <div class="profit" flex-box="0">
                        <div class="title">累计收益(元) </div>
                        <div class="number" v-if="accountTotalInterests>=0">
                            +{{accountTotalInterests | currencyFormat}}
                        </div>
                        <div class="number" v-if="accountTotalInterests<0">-{{accountTotalInterests | currencyFormat}}
                        </div>
                    </div>
                    <div class="profit" flex-box="0">
                        <div class="title">可提现金额(元)</div>
                        <div class="number">{{accountCashAmount | currencyFormat}}</div>
                    </div>

                </div>
            </div>
            <div class="item" flex>
                <div class="item-left" flex-box="1">我的银行卡</div>
                <div class="item-right" flex-box="0" v-if="userVerifyStatus<3" @click.stop="addBankCard">
                    添加银行卡
                </div>
                <div class="item-right" flex-box="0" v-else @click.stop="getBank">
                    已绑定
                </div>
            </div>
            <div class="item" @click.stop="billList" flex>
                <div flex-box="1" class="item-left">
                    我的账户明细
                </div>
            </div>
            <div class="item" flex v-if="userVerifyStatus!=9" @click.stop="createUser">
                <div class="item-left" flex-box="1">完成开户可随时随地投资</div>
                <div class="item-right" flex-box="0"></div>
            </div>
            <div class="tel-info">
                若更换绑定银行卡请联系：<span class="span">{{telNumber}}</span>
            </div>
        </div>
        <div class="assets-footer" flex-box="0" flex>
            <button class="btn-recharge" flex-box="1" @click.stop="recharge">充值</button>
            <button class="btn-withdraw" flex-box="1" @click.stop="withdraw">提现</button>
        </div>
        <modal v-show="showModal" @callBack="callBack"></modal>
    </div>

```
* js逻辑

```javascript

  import $api from '../tools/api';
     import {mapState} from 'vuex';
     import {Toast, Indicator, MessageBox} from 'mint-ui';
     import {telNumber} from '../tools/config';
     import {submitAuthorization} from '../tools/operation';
     import Modal from '../components/Modal';
     import  '../less/my-assets.less';
     import wx from '../tools/wx';
     import $device from '../tools/device';
     let times = 0;
     export default {
         name: 'my-assets',
         data(){
             return {
                 telNumber,
                 timer: null,
                 times: 0,
                 showModal: false,
                 orderBillCode: ''
             }
         },
         components: {
             Modal
         },
         created(){
             this.addHive(1, 'my-assets',1027);
             if ($device.isWeixin) {
                 this.getShare();
             }
             this.getBaofoo();
             let rechargeOrderBillCode = window.sessionStorage.getItem('rechargeOrderBillCode');
             if (rechargeOrderBillCode) {
                 this.orderBillCode = rechargeOrderBillCode;
                 window.sessionStorage.removeItem('rechargeOrderBillCode');
                 this.getTradeRecharge();
             }
             let event = ['_trackEvent', '我的资产', 'SHOW', '进入我的资产页面', '进入我的资产页面'];
             window._hmt.push(event);
         },
         computed: mapState([
             'userVerifyStatus',
             'accountTotalAssets',
             'accountTotalInterests',
             'accountCashAmount']),
         methods: {
             getBaofoo(){
                 this.$store.dispatch('getAccountBaofoo');
             },
             /* 查询订单状态*/
             getTradeRecharge(){
 
                 let rechargeBillCode = this.orderBillCode;
                 if (!rechargeBillCode) {
                     return false;
                 }
                 Indicator.open('正在等待银行返回结果...');
                 $api.get('/getTradeRecharge', {rechargeBillCode})
                     .then(res => {
                         if (res.code == 200) {
                             let {data} = res;
                             if (data.rechargeStatus === 0) {
                                 let timer = setTimeout(() => {
                                     times++;
                                     if (times <= 5) {
                                         this.getTradeRecharge();
                                     } else {
                                         clearTimeout(timer);
                                         Indicator.close();
                                         MessageBox.alert(`银行充值返回较慢，请耐心等待，如有问题，请联系客服！`, '提示');
                                     }
                                 }, 2000);
                             }
                             if (data.rechargeStatus === 1) {
                                 this.getBaofoo();
                                 Indicator.close();
                             }
                             if (data.rechargeStatus === 2) {
                                 this.getBaofoo();
                                 Indicator.close();
                                 Toast('充值失败')
                             }
                         } else {
                             Indicator.close();
                         }
 
                     });
             },
             goStep(){
                 this.addHive(1, 'myAssets_btn_auth',102701);
                 let {userVerifyStatus} = this;
                 switch (userVerifyStatus) {
                     case 0:
                         //  window.location.href = '/realnameBased.html';
                         this.$router.push('/authentication');
                         break;
                     case 1:
                         // window.location.href = '/baoFoo.html?uid=' + this.$store.state.userId;
                         submitAuthorization(this.$store.state.userId);
                         break;
                     case 2:
                         // window.location.href = '/bindBankCard.html';
                         this.$router.push('/bind-bank-card');
                         break;
                     case 3:
                         //  window.location.href = '/setPayPassword.html';
                         this.$router.push('/set-pay-password');
                         break;
                     default:
                 }
             },
             addBankCard(){
                 this.showModal = true;
                 this.addHive(0,'myAssets_btn_addBank',102702);
                 let event = ['_trackEvent', '我的资产', 'CLICK', '我的资产页面-绑定银行卡', '在我的资产页面点击绑定银行卡'];
                 window._hmt.push(event);
                 event = ['_trackEvent', '我的资产', 'SHOW', '弹出开户弹窗', '弹出开户弹窗'];
                 window._hmt.push(event);
             },
             getBank(){
                 let event = ['_trackEvent', '我的资产', 'CLICK', '我的资产页面-查看银行卡', '在我的资产页面点击查看银行卡'];
                 window._hmt.push(event);
                 this.$router.push('/my-count')
             },
             recharge(){
                 this.addHive(0,'myAssets_btn_recharge',102703);
                 let {userVerifyStatus} = this;
                 if (userVerifyStatus != 9) {
                     this.showModal = true;
                     let event = ['_trackEvent', '我的资产', 'SHOW', '弹出开户弹窗', '弹出开户弹窗'];
                     window._hmt.push(event);
                     return false;
                 }
                 let event = ['_trackEvent', '我的资产', 'CLICK', '在我的资产页面点击充值按钮', '我的资产页面-点击充值按钮'];
                 window._hmt.push(event);
                 window.sessionStorage.setItem('backUrl', encodeURIComponent(window.location.href));
                 this.$router.push('/recharge');
 
             },
             withdraw(){
                 this.addHive(0,'myAssets_btn_withdraw',102704);
                 let {userVerifyStatus} = this;
                 if (userVerifyStatus != 9) {
                     this.showModal = true;
                     let event = ['_trackEvent', '我的资产', 'SHOW', '弹出开户弹窗', '弹出开户弹窗'];
                     window._hmt.push(event);
                     return false;
                 }
                 let event = ['_trackEvent', '我的资产', 'CLICK', '在我的资产页面点击提现按钮', '我的资产页面-点击提现按钮'];
                 window._hmt.push(event);
                 this.$router.push('/withdraw');
             },
             createUser(){
                 this.addHive(0,'myAssets_btn_openAccount',102705);
                 this.goStep();
                 /*直接去开户，而不需要弹框提示*/
                 let event = ['_trackEvent', '我的资产', 'SHOW', '弹出开户弹窗', '弹出开户弹窗'];
                 window._hmt.push(event);
             },
             callBack(result){
                 this.showModal = false;
                 console.log(result);
                 if (result) {
                     this.goStep();
                 }
             },
             getShare(){
                 wx.getShare({
                     title: '金疙瘩——我的资产'
                 });
             },
             billList(){
                 this.addHive(0,'myAssets_link_detail',102706)
                 let event = ['_trackEvent', '我的资产', 'CLICK', '在我的资产页面点击账单', '我的资产页面-点击账单'];
                 window._hmt.push(event);
                 this.$router.push('/account-detail');
             }
         },
         destroyed(){
             clearInterval(this.timer);
             this.addHive(2,'my-assets',1027);
         }
     }
```

### 账户明细

* 模板

```html
  <div flex="dir:top" flex-box="1" class="my-count">
        <div class="count-body">
            <p class="title">实名信息</p>
            <div class="info">
                <div class="item1" flex>
                    <div class="item-left" flex-box="1">真实姓名</div>
                    <div class="item-right" flex-box="0">
                        {{investorRealName.replace(/.(?=.)/g, '*')}}
                    </div>
                </div>
                <div class="item2" flex>
                    <div class="item-left" flex-box="1">证件号码</div>
                    <div class="item-right" flex-box="0">
                        {{investorIdCardNo | idCardFormat}}
                    </div>
                </div>
            </div>
            <p>银行卡信息</p>
            <div class="bank">
                <div class="bank-name">
                    <img :src="bankImg" class="bank-logo"/>
                    <span class="name">{{bankName}}</span>
                    <div class="bank-info">{{bankUserCardNo | bankCardNoFormat}}</div>
                </div>
            </div>
            <div class="tel-info">
                如需换卡，请联系客服：<span class="span">{{telNumber}}</span>
            </div>
        </div>
    </div>
```
* js逻辑

```javascript

 import {mapState} from 'vuex';
    import $api from '../tools/api';
    import {telNumber} from '../tools/config';
    import  '../less/my-count.less';
    import * as imgUrls from '../tools/bank';
    export default {
        name: 'my-count',
        data(){
            return {
                telNumber
            }
        },
        computed: {
            ...mapState([
                'bankUserCardNo',
                'bankCode',
                'bankName',
                'investorRealName',
                'investorIdCardNo',
                'bankUserPhone']),
            bankImg(){
                return imgUrls[this.bankCode];
            }
        },
        created(){
            let event = ['_trackEvent', '我的银行卡', 'SHOW', '进入我的银行卡页面', '进入我的银行卡页面'];
            window._hmt.push(event);
            this.addHive(1, 'my-count',1028);
        }
    }
```

### 加息券列表
* 模板

```html
    <div class="ticket-list" flex="dir:top" style="height: 100%">
        <div class="header" flex-box="0">
            <div flex-box="1" class="tab bl" flex>
                <ul flex>
                    <li :class="{'left':true,'active':isActive}" flex-box="1" @click="ticketTab('cash')">
                        现金券
                    </li>
                    <li :class="{'right':true,'active':!isActive}" flex-box="1" @click="ticketTab('rate')">
                        加息券
                    </li>
                </ul>
            </div>
        </div>
        <div class="body" flex-box="1" style="overflow-y: auto">
            <div class="nothing" v-if="!lists.length">暂无内容</div>
            <ul v-show="lists.length"
                ref="infiniteScroll"
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="stop"
                infinite-scroll-distance="70">
                <li class="item" flex v-for="(item,index) in lists">
                    <div class="item-l" :class="{'rate':!isActive,'disabled':item.couponStatus!=1}" flex flex-box="0">
                        <div flex-box="1" flex="dir:top cross:center">
                            <div flex-box="1" class="title" flex="cross:center">
                                <p>{{item.couponType == 1 ? '现金券' : '加息券'}}</p>
                            </div>
                            <p flex-box="1" class="info" v-if="item.couponType ==1">￥{{item.couponFaceValue}}</p>
                            <p flex-box="1" class="info" v-else>{{item.couponInterestYieldRate}}</p>
                        </div>
                    </div>
                    <div class="item-r" flex-box="1">
                        <p v-if="item.ccRemark1">{{item.ccRemark1}}</p>
                        <p v-if="item.ccRemark2">{{item.ccRemark2}}</p>
                        <p v-if="item.ccRemark3">{{item.ccRemark3}}</p>
                        <div flex class="expired-time">
                            <p flex-box="1" v-if="item.couponStatus==1">{{item.expiredDate}}</p>
                            <p flex-box="1" v-else></p>
                            <p flex-box="0" class="btn" v-if="item.couponStatus==1"
                               @click.stop="useTicket(item.ccCode)">{{item.couponStatusText}}</p>
                            <img src="../images/experience-fund/used.png" alt="used" v-if="item.couponStatus==2"
                                 class="img">
                            <img src="../images/experience-fund/expired.png" alt="expired" v-if="item.couponStatus==3"
                                 class="img">
                        </div>
                    </div>
                </li>
            </ul>

        </div>
    </div>

```
* js逻辑

```javascript

  import Vue from 'vue';
    import '../less/ticket-list.less';
    import $api from '../tools/api';
    import {InfiniteScroll} from 'mint-ui';
    import {Toast, Indicator} from 'mint-ui';
    Vue.use(InfiniteScroll);
    import axios from 'axios';

    export default {
        name: 'ticket-list',
        data(){
            return {
                hasUnread: 1,
                couponType: 1,
                lists: [],
                currentPage: 0,
                pageSize: 10,
                stop: true,
                source: {},
                msgCode: 1 //default jiaxijuan
            }
        },
        created(){
            this.addHive(1, 'ticketList',1045);
            let event = ['_trackEvent', '我的优惠券', 'SHOW', '进入我的优惠券页面', '进入我的优惠券页面'];
            window._hmt.push(event);
            this.msgCode = this.$route.query.code || 1;
            if (this.msgCode == 2) {
                this.couponType = 2;
            }
            this.loadData();
        },
        computed: {
            isActive(){
                return this.msgCode == 1;
            }
        },
        methods: {
            ticketTab(string){
                this.addHive(0, 'ticketList_tab_checkTab',104501);
                let event = ['_trackEvent', '我的优惠券', 'CLICK', '我的优惠券-点击tab', '我的优惠券-点击tab'];
                window._hmt.push(event);
                this.couponType = 'cash' == string ? 1 : 2;
                this.msgCode = this.couponType;
                this.currentPage = 0;
                this.lists = [];
                this.source.cancel();
                this.loadData();
            },
            loadMore(){
                this.stop = true;
                this.currentPage++;
                this.loadData();
            },
            loadData(){
                Indicator.open();
                let CancelToken = axios.CancelToken;
                this.source = CancelToken.source();
                return $api.get('/cashCoupon/list', {
                    couponType: this.couponType,
                    startRow: this.currentPage * this.pageSize,
                    pageSize: this.pageSize
                }, this.source).then(resp => {
                    if (resp.code == 200) {
                        if (this.hasUnread) {
                            this.delUnread();
                        }
                        resp.data.couponList.map(item => {
                            switch (item.couponStatus) {
                                case 1:
                                    item.couponStatusText = '去使用';
                                    break;
                                case 2:
                                    item.couponStatusText = '已使用';
                                    break;
                                case 3:
                                    item.couponStatusText = '已过期';
                                    break;
                                case 4:
                                    item.couponStatusText = '已作废';
                                    break;
                            }
                            item.expiredDate = this.remainTime(item.validEndTime, item.serverTime);
                        })
                        this.lists = this.lists.concat(resp.data.couponList);

                        this.$nextTick(() => {
                            if (this.lists.length < resp.data.couponCount && resp.data.couponList.length) {
                                this.stop = false;
                            } else {
                                this.stop = true;
                            }
                        })

                    }
                    Indicator.close();
                    return resp
                })
            },
            delUnread(){
                let {msgCode} = this;
                $api.post('/user/destroy/unread', {msgCode})
                    .then(resp => {
                        if (resp.code == 200) {
                            this.hasUnread = 0;
                        }
                    })
            },
            remainTime(end, now){
                let remainTime = (end - now) / 1000;
                if (isNaN(remainTime)) {
                    return ''
                }
                if (remainTime < 0) {
                    return '还有1分钟过期'
                }
                let day = Math.floor(remainTime / 3600 / 24);
                if (day > 0) {
                    return '还有' + day + '天过期'
                }
                let hours = Math.floor(remainTime / 60 / 60);
                if (hours > 0) {
                    return '还有' + hours + '小时过期'
                }
                let minutes = Math.floor(remainTime / 60);
                if ((remainTime / 60) < 1) {
                    return '还有1分钟过期'
                }
                if (minutes > 0) {
                    return '还有' + minutes + '分钟过期'
                }
                return ''
            },
            useTicket(ccCode){
                this.addHive(0, 'ticketList_item_useTicket',104502);
                let event = ['_trackEvent', '我的优惠券', 'CLICK', '我的优惠券-点击使用', '我的优惠券-点击使用'];
                window._hmt.push(event);
                /*有可用产品时跳转。只需取1条即可知是否跳转*/
                $api.get('/adaptProduct/list', {
                    ccCode,
                    startRow: 0,
                    pageSize: 1
                })
                    .then(resp => {
                        if (resp.code == 200) {
                            if (resp.data.list && resp.data.list.length) {
                                this.addHive(2, 'ticketList_item_usableFinancial',1045);
                                this.$router.push({
                                    path: '/usable-financial',
                                    query: {
                                        ccCode
                                    }
                                })
                                return false;
                            }
                            let text = '加息券';
                            if (this.msgCode == 1) {
                                text = '现金券';
                            }
                            Toast(text + '可用产品已售罄，请选择其他' + text);
                        } else {
                            Toast(resp.msg);
                        }
                    })
            }

        },
        destroyed(){
            this.addHive(2, 'ticketList',1045);
            Indicator.close();
        }
    }
```

### 充值
* 模板


```html
    <div class="recharge" flex="dir:top">
        <div class="body">
            <div class="bank">
                <img class="bank-logo" :src="bankImg"/>
                <span class="bank-name">{{bankName}}（{{bankUserCardNo.substr(-4)}}）</span>
            </div>
            <div class="bank-info" flex v-if="singleLimit">
                <div flex-box="1" class="time-limit">限额：单笔{{singleLimit}}元</div>
                <div flex-box="1" class="day-limit">单日{{perdayLimit}}元</div>
            </div>

        </div>
        <div class="body" style="margin-top: .5rem">
            <div class="form">
                <div class="form-title">充值金额(元)</div>
                <div class="form-input" flex>
                    <img flex-box="0" class="money-chart" src="../images/money-chart.png"/>
                    <div flex-box="1" class="money-filter">
                        <input @keyup="myKeyup" type="number" class="money-show" v-model.trim="rechargeMoney"/>
                    </div>

                    <div flex-box="0" class="form-close" @click.stop="clearInput">
                        <img class="close" src="../images/close.png"/>
                    </div>

                </div>
            </div>
        </div>
        <div class="sub-info">
            充值中若遇到问题，请联系客服<br/>
            <a class="span" style="" :href="'tel:'+telNumber">{{telNumber}}</a>（服务时间：工作日9:00—18:00）
        </div>
        <div class="recharge-ensure">
            <button class="btn-primary btn-recharge" :disabled="disabled"
                    @click.stop="postRecharge">确认充值
            </button>
        </div>

    </div>

```
* js逻辑

```javascript

 import {mapState} from 'vuex';
    import {Toast} from 'mint-ui';
    import $api from '../tools/api';
    import {submitRecharge, currencyInputValidate} from '../tools/operation';
    import {telNumber} from '../tools/config';
    import '../less/recharge.less';
    import * as bank from '../tools/bank';

    let timer = null;
    export default {
        name: 'recharge',
        data(){
            return {
                rechargeMoney: '',
                disabled: true,
                telNumber
            }
        },
        created(){
            let event = ['_trackEvent', '充值', 'SHOW', '进入充值页面', '进入充值页面'];
            window._hmt.push(event);
            this.addHive(1, 'recharge',1031);
        },
        computed: {
            ...mapState([
                'bankUserCardNo',
                'bankCode',
                'bankName',
                'perdayLimit',
                'singleLimit',
                'singleLimitValue',
                'bankUserPhone']),
            bankImg(){
                return bank[this.bankCode]||'';
            }
        },
        methods: {
            clearInput(){
                this.rechargeMoney = '';
            },
            myKeyup(){
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(() => {
                    this.rechargeMoney = currencyInputValidate(this.rechargeMoney);
                    if (this.rechargeMoney) {
                        this.disabled = false;
                    }
                    if (parseFloat(this.rechargeMoney) < 5) {
                        Toast('充值金额不能小于5元，请重新输入');
                        this.disabled = true;
                    }
                    if (this.singleLimit&&parseFloat(this.rechargeMoney) > this.singleLimitValue) {
                        Toast('充值金额不能大于单笔限额，请重新输入');
                        this.disabled = true;
                    }
                }, 500);
            },
            postRecharge(){
                if (!this.rechargeMoney) {
                    Toast('正在等待银行返回结果...');
                    return false;
                }
                this.addHive(0, 'recharge_btn_recharge',103101);
                let event = ['_trackEvent', '充值', 'CLICK', '充值页面点击确认充值', '充值页面点击确认充值'];
                window._hmt.push(event);
                let param = {
                    amount: this.rechargeMoney
                }
                $api.post('/trade/recharge', param)
                    .then(data => {
                        if (data.code == 200) {
                            console.log(data);
                            let params = data.data || {};
                            params.amount = this.rechargeMoney;
                            params.userId = this.$store.state.userId;
                            window.sessionStorage.setItem('rechargeOrderBillCode', params.orderBillCode);
                            submitRecharge(params)
                        } else {
                            Toast(data.msg);
                        }
                    });
            }
        }

    }
```

### 提现
* 模板

```html
    <div class="withdraw" flex="dir:top">
        <div class="body">
            <div class="bank" flex>
                <div flex-box="1">提现至银行卡</div>
                <div flex-box="1" class="right">
                    <img class="bank-logo" :src="bankImg"/>
                    <span class="bank-name">{{bankName}}({{bankUserCardNo.substr(-4)}})</span>
                </div>
            </div>
        </div>
        <div class="body">

            <div class="withdraw-count" flex>
                <span flex-box="1" class="left">可提现金额(元)</span>
                <span flex-box="1" class="right">{{accountCashAmount | currencyFormat}}</span>
            </div>
            <div class="withdraw-form" flex>
                <div flex-box="1" class="left">提现(元)</div>
                <div class="right" flex-box="0" flex>
                    <img flex-box="0" class="money-chart" src="../images/money-chart.png"/>
                    <input type="number" v-model.trim="withdrawMount" class="input" flex-box="1" @keyup="myKeyup"
                           placeholder="请输入提现金额"/>
                </div>
            </div>
            <div class="withdraw-count last-item" flex>
                <span flex-box="1" class="left">单笔可提现金额:50万</span>
                <span flex-box="1" class="withdraw-all right" @click.stop="withdrawAll">全部提现</span>
            </div>

        </div>

        <div class="bottom">
            <div v-if="overHint" class="over-hint">提现金额不能大于可提现金额，请重新输入</div>
            <div class="withdraw-ensure">
                <button class="btn-primary btn-withdraw"
                        @click.stop="getWithdraw"
                        :disabled="btnDisabled">立即提现
                </button>
            </div>
            <div class="hint">
                <div class="title">温馨提示</div>
                <div class="subtitle">
                    1.提现当月前三次免费，之后2元/笔。<br>
                    <br>
                    2.客户提交提现申请后的T+1个工作日内到账（周末、节假日顺延）
                    <br>
                    <br>
                    提现过程中有疑问，请联系客服<a href="tel:400-640-3606" style="text-decoration: none">400-640-3606</a>（工作时间：工作日 9:00—18:00）
                </div>
            </div>
        </div>


        <password-input v-show="inputPassword" title="提现" @close="inputPassword=false"
                        @callBack="callBack"></password-input>
    </div>

```
* js逻辑

```javascript

  import {mapState} from 'vuex';
    import EventBus from  '../tools/event-bus';
    import $api from '../tools/api';
    import {telNumber} from '../tools/config';
    import {currencyInputValidate} from '../tools/operation';
    import {Toast, MessageBox, Indicator} from 'mint-ui';
    import PasswordInput from '../components/PasswordInput';
    import '../less/withdraw.less';
    import * as bank from '../tools/bank';
    let timer = null;
    export default {
        name: 'withdraw',
        data(){
            return {
                withdrawMount: '',
                telNumber,
                btnDisabled: true,
                overHint: false,
                inputPassword: false,
                singleLimitValue: 500000,
            }
        },
        components: {
            PasswordInput
        },
        created(){
            this.addHive(1, 'withdraw',1047);
            let event = ['_trackEvent', '提现', 'SHOW', '进入提现页面', '进入提现页面'];
            window._hmt.push(event);
        },
        computed: {
            ...mapState([
                'bankUserCardNo',
                'bankCode',
                'bankName',
                'accountCashAmount',
                'bankUserPhone']),
            bankImg(){
                return bank[this.bankCode]||'';
            }
        },
        methods: {
            myKeyup(){
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(() => {
                    this.withdrawMount = currencyInputValidate(this.withdrawMount);
                    if (this.withdrawMount && this.withdrawMount > this.singleLimitValue) {
                        Toast({
                            position: 'top',
                            message: '提现金额超出单笔限制，请重新输入'
                        });
                        return false;
                    }
                    if (this.withdrawMount && this.withdrawMount > this.accountCashAmount) {
                        this.btnDisabled = true;
                        this.overHint = true;
                        return false;
                    } else {
                        this.overHint = false;
                    }
                    if (this.withdrawMount && this.withdrawMount <= this.accountCashAmount) {
                        this.btnDisabled = false;
                        return false;
                    } else {
                        this.btnDisabled = true;
                    }
                }, 200);
            },
            // 手续费
            getTradeFeeType(){

                let amount = this.withdrawMount;
                return $api.get('/tradeFeeType', {amount});

            },
            // 提现
            getWithdraw(){
                this.addHive(0, 'withdraw_btn_withdraw',104701);
                let event = ['_trackEvent', '提现', 'CLICK', '提现页面点击立即提现', '提现页面点击立即提现'];
                window._hmt.push(event);
                this.getTradeFeeType()
                    .then(data => {
                        if (data.code == 200) {
                            console.log(data);
                            let {amount, feeType} = data.data;
                            if (feeType == 2) {
                                let amountAll = parseFloat(amount) + parseFloat(this.withdrawMount);
                                if (this.accountCashAmount < amountAll) {
                                    Toast('您当前的账户余额不足支付手续费，无法提现');
                                } else {
                                    let vm = this;
                                    MessageBox.confirm(`本次提现需收取${amount}元手续费，请确认是否继续？`, '提示').then(action => {
                                        vm.confirmFun(action);
                                    });
                                }
                                return false;
                            }
                            this.inputPassword = true;

                        } else {
                            Toast(data.msg)
                        }
                    })
            },
            // 全部提取
            withdrawAll(){
                this.addHive(0, 'withdraw_link_withdrawAll',104702);
                this.withdrawMount = this.accountCashAmount;
                this.myKeyup();
                let event = ['_trackEvent', '提现', 'CLICK', '提现页面点击全部提现', '提现页面点击全部提现'];
                window._hmt.push(event);
            },
            confirmFun(result){
                if (result) {
                    this.inputPassword = true;
                    this.addHive(5, 'withdraw_modal_inputPass',104791);
                    let event = ['_trackEvent', '提现', 'SHOW', '提现页面-输入交易密码弹窗', '提现页面-输入交易密码弹窗'];
                    window._hmt.push(event);
                }
            },
            callBack(password){
                this.tradeWithdraw(password);
            },
            tradeWithdraw(password){
                let rechargeAmount = this.withdrawMount;
                let userPayPassword = password;
                $api.post('/trade/withdraw', {rechargeAmount, userPayPassword})
                    .then(data => {
                        Indicator.close();
                        if (data.code == 200) {
                            Toast('提现申请成功');
                            this.addHive(2, 'withdraw_to_lastPage',1047);
                            history.back();
                            this.$store.dispatch('getAccountBaofoo');
                        } else {
                            Toast(data.msg);
                            if (data.code == 1108) {
                                EventBus.$emit('clearInput');
                            }
                        }
                        this.inputPassword=false
                        EventBus.$emit('clearInput');
                    });
                Indicator.open('提交中...');
            }
        },
        destroyed(){
            Indicator.close();
            MessageBox.close();
        }
    }
```
### 风险测评

* 模板

```html
    <div class="risk-assessment">
        <div class="content">
            <div class="qu-order" :class="{'app':isApp}">
              <span>
                    {{quIndex + 1}}/{{quLen}}
              </span>
            </div>
            <div class="title">{{title}}</div>

            <div class="qu-title">{{quIndex + 1}}、{{question}}</div>
            <div class="qu-item" :class="{'active':index==currentIndex,'app':isApp}"
                 @click.stop="selectItem(item,index)"
                 v-for="(item,index) in answers" :key="index">
                {{item.title}}
            </div>
            <div class="last-item" :class="{'app':isApp}" v-if="quIndex" @click.stop="getLast()">上一题</div>
        </div>
        <div class="submit" v-if="showSubmit">
            <button class="btn-primary btn-submit" :class="{'app':isApp}"
                    @click.stop="updateUserInfo"
                    :disabled="disabled">提交
            </button>
        </div>
    </div>

```
* js逻辑

```javascript

  import questions from '../tools/questions';
    import {Toast} from 'mint-ui';
    import $api from '../tools/api';
    import $device from '../tools/device';
    import wx from '../tools/wx';
    import requestHybrid from '../tools/hybrid';
    import _ from 'lodash/core';
    import '../less/risk-assessment.less';
    let timer = null;
    let quLen = questions.length;
    export default {
        name: 'risk-assessment',
        data(){
            return {
                title: '',
                question: '',
                quIndex: 0,
                quLen: questions.length,
                currentIndex: 99,
                isApp: false,
                answers: [],
                scores: [],
                options:[]
            }
        },
        created(){
            this.addHive(1, 'riskAssessment',1043);
            let event = ['_trackEvent', '风险测评', 'SHOW', '进入风险测评页面', '进入风险测评页面'];
            window._hmt.push(event);
            if ($device.isWeixin) {
                this.getShare();
            }
            this.setIndex(0);
            console.log(this.$route.name);
            if ($device.kingold) {
                this.isApp = true;
            }
            if (this.$route.path.indexOf('app') > -1) {
                this.isApp = true;
            }
        },
        computed: {
            showSubmit(){
                return (this.scores.length >= quLen - 1);
            },
            disabled(){
                return this.currentIndex == 99
            }
        },
        methods: {
            getShare(){
                wx.getShare({
                    title:'金疙瘩——风险测评'
                });
            },
            setIndex(){
                let qu = questions[this.quIndex];
                this.title = qu.title;
                this.question = qu.question;
                this.answers = qu.answers;
            },
            getLast(){
                this.addHive(0, 'riskAssessment_btn_lastItem',104301);
                let event = ['_trackEvent', '风险测评', 'CLICK', '风险测评页面-上一题', '风险测评页面-上一题'];
                window._hmt.push(event);
                if (quLen == this.scores.length) {
                    this.scores.pop();
                    this.options.pop();
                }
                this.quIndex--;
                this.setIndex();
                this.scores.pop();
                this.options.pop();
                this.currentIndex = 99;
            },
            selectItem(item, index){
                let event = ['_trackEvent', '风险测评', 'CLICK', '风险测评页面-选择答案', '风险测评页面-选择答案'];
                window._hmt.push(event);
                this.currentIndex = index;
                if (quLen == this.scores.length) {
                    this.scores.pop();
                    this.options.pop();
                    this.scores.push(item.score);
                    this.options.push(index+1);
                    return false;
                }
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(() => {
                    this.scores.push(item.score);
                    this.options.push(index+1);
                    if (quLen > this.scores.length) {
                        this.currentIndex = 99;
                    }
                    if (quLen == this.scores.length) {
                        return false;
                    }
                    this.quIndex++;
                    this.setIndex();
                }, 500)
            },
            updateUserInfo(){
                this.addHive(0, 'riskAssessment_btn_submitResult',104302);
                let event = ['_trackEvent', '风险测评', 'CLICK', '风险测评页面-提交结果', '风险测评页面-提交结果'];
                window._hmt.push(event);
                let investorRiskScore = 0;
                this.scores.map(score => {
                    investorRiskScore += score;
                })
                let investorRiskVersion = 2;/*风险测评第二版（10道题）*/
                let investorRiskAnswer = this.options.join('$$');


                $api.post('/updateUserInfo', {
                    investorRiskScore,
                    investorRiskVersion,
                    investorRiskAnswer
                }).then(data => {
                    if (data.code == 200) {
                        console.log(12);
                        this.$store.dispatch('getUserInfo');
                        this.$store.dispatch('getRiskInfo');
                        // return;
                        if (this.isApp) {
                            this.$router.replace({
                                path: '/assessment-result',
                                query: {
                                    from: 'app'
                                }
                            })
                        } else {
                            this.addHive(2, 'riskAssessment_to_assessmentResult',1043);
                            this.$router.replace('/assessment-result');
                        }

                    } else {
                        Toast('提交失败,稍后再试');
                    }
                });
            }
        },
        mounted(){
            requestHybrid({
                tagname: 'title',
                param: {
                    backtype: 2,// "0 : 后退 1 : 直接关闭 2: 弹对话框",
                    backAndRefresh: 1,
                    title: '风险测评',
                    backstr: '本次风险测评还未完成，退出后将不保存当前进度，确定退出？',
                    keyboard_mode: 0//0 adjustresize 1 adjustpan
                }
            });
        },
        destroyed(){

        }
    }
```
