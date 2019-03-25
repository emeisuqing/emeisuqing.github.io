// ==UserScript==
// @name        wsmud_details_sq
// @namespace   details
// @version     0.1.0
// @author      suqing
// @match       http://game.wsmud.com/*
// @homepage    https://greasyfork.org/zh-CN/scripts/------
// @description Show More Info
// @run-at      document-start
// @require     https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// @grant       unsafeWindow
// @grant       GM_addStyle
// @grant       GM_setValue
// @grant       GM_deleteValue
// @grant       GM_getValue
// @grant       GM_setClipboard
// ==/UserScript==

(function() {
    'use strict';
    if (!WebSocket) {
        console.log("(Error) 无法获取 window.WebSocket！");
    }
    var suqing = {
        name: GM_info.script.name,
        version: GM_info.script.version,
        webSocket: null,
        data: {

        },
        onmessage_fn: null,
        onmessage: function(message) {
            suqing.onmessage_fn.apply(this, arguments);
            var data = message.data;
            if (data.includes("你的最大内力增加了") && data.includes("点。")) {
                var n = data.replace(/[^0-9]/ig,"");
                console.log(n);
                suqing.data.内力每跳值 = parseInt(n);
            } else if ((data.includes("{") && data.includes("}")) || (data.includes("[") && data.includes("]"))) {
                data = new Function("return " + data + ";")();
                
            }
            
            if (data.type === "state") { // 【状态】
                console.log("STATE");
            } else if (data.type === "dialog") { // 【会话】
                console.log("DIALOG");
                if (data.dialog === "score") { // 1. 角色数值
                    suqing.data.角色 = data.name;
                    suqing.data.年龄 = data.age;
                    suqing.data.门派 = data.family;

                    suqing.data.先天悟性 = data.int;
                    suqing.data.先天悟性 = data.int_add;
                    suqing.data.内力当前值 = data.mp;
                    suqing.data.内力最大值 = data.max_mp;
                    suqing.data.内力上限值 = data.limit_mp;

                    suqing.data.学习效率 = data.study_per;
                    suqing.data.练习效率 = data.lianxi_per;
                } else if (data.dialog === "skills") { // 2. 技能列表
                    var skills = data.items; // array
                    for (var skill of skills) {
                        $(".skills tbody").append(`<tr><td>${skill.name}</td><td>${skill.id}</td><td>${skill.level}</td><tr>`);
                    }
                    var limit = data.limit;
                } else if (data.dialog === "pack") { // 3. 获得物品

                }
            } else if (data.type === "msg") {
                return;
            }
            console.log(data);
        },
        sendmessage: function(message) {
            $(".container").append($(`<span id="sendmessage" cmd="${message}"><span>`));
            $("#sendmessage").click();
            $(".container").remove($("#sendmessage"));
        },
    };

    unsafeWindow.WebSocket = function(url) {
        suqing.webSocket = new WebSocket(url);
    }
    unsafeWindow.WebSocket.prototype = {
        get url() {
            return suqing.webSocket.url;
        },
        get protocol() {
            return suqing.webSocket.protocol;
        },
        get readyState() {
            return suqing.webSocket.readyState;
        },
        get bufferedAmount() {
            return suqing.webSocket.bufferedAmount;
        },
        get extensions() {
            return suqing.webSocket.extensions;
        },
        get binaryType() {
            return suqing.webSocket.binaryType;
        },
        set binaryType(type) {
            suqing.webSocket.binaryType = type;
        },
        get onopen() {
            return suqing.webSocket.onopen;
        },
        set onopen(fn) {
            suqing.webSocket.onopen = fn;
        },
        get onclose() {
            return suqing.webSocket.onclose;
        },
        set onclose(fn) {
            suqing.webSocket.onclose = fn;
        },
        get onerror() {
            return suqing.webSocket.onerror;
        },
        set onerror(fn) {
            suqing.webSocket.onerror = fn;
        },
        close: function () {
            suqing.webSocket.close();
        },
        get onmessage() {
            return suqing.webSocket.onmessage;
        },
        set onmessage(fn) { // 截获接收到的数据
            suqing.onmessage_fn = fn;
            suqing.webSocket.onmessage = suqing.onmessage;
        },
        send: function (message) { // 截获发送出的数据
            suqing.webSocket.send(message);
            $(".console").append($(`<div> >> ${message}</div>`));
            $(".console")[0].scrollTop = $(".console")[0].scrollHeight;
        },
    };
    
    $(document).ready(function() {
        addDiv();
        addStyle();
    });

    function addDiv() {
        // 左右两侧作为弹性空间 再加一个额外区域 extra
        $("body").append($(`<div class="left"></div>`));
        $("body").append($(`<div class="right"></div>`));
        $("body").append($(`<div class="extra"></div>`));
        // 额外区域再分为 extra1 extra2
        $(".extra").append($(`<div class="extra1"></div>`));
        $(".extra").append($(`<div class="extra2"></div>`));
        // extra1 role
        $(".extra1").append(`<table class="role">
            <tr><td colspan="4">Character Attribute</td><tr>
            <tr><td>角色</td><td></td><td>境界</td><td></td></tr>
            <tr><td>年龄</td><td colspan="3"></td></tr>
            <tr><td>经验</td><td></td><td>潜能</td><td></td></tr>
            <tr><td>气血</td><td></td><td>内力</td><td></td></tr>
            <tr><td>臂力</td><td></td><td>根骨</td><td></td></tr>
            <tr><td>身法</td><td></td><td>悟性</td><td></td></tr>
            <tr><td>攻击</td><td></td><td>防御</td><td></td></tr>
            <tr><td>命中</td><td></td><td>躲闪</td><td></td></tr>
            <tr><td>招架</td><td></td><td>暴击</td><td></td></tr>
            <tr><td>攻速</td><td></td><td>功绩</td><td></td></tr>
        <table>`);
        // extra1 skill
        $(".extra1").append(`<table class="skill">
            <thead>
                <tr><td colspan="3">Skills</td><tr>
                <tr>
                    <td class="s1">技能</td>
                    <td class="s2">代码</td>
                    <td class="s3">等级</td>
                <tr>
            </thead>
            <tbody></tbody>
        <table>`);
        // extra1 send
        $(".extra1").append(`<table class="send">
            <tr><td>Message Sended</td></tr>
            <tr><td class="console"></td></tr>
        <table>`);
    }
    function addStyle() {
        GM_addStyle(`
            body {
                display: flex;
                flex-flow: row no-wrap;
                width: 100vw;
            }
            .login-content, .container {
                flex: 0 0 28rem;
                border: 0.05em solid #008000;
            }
            .container {
                width: 28rem;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select": none;
            }

            .left, .right {
                flex: 0 1 10rem;
                border: 0.05em solid #008000;
            }
            .left {
                order: -10;
            }
            .right {
                order: 10;
            }

            .extra {
                display: flex;
                flex-direction: column;
                flex: 1 0 50rem;
                width: auto;
                height: 100vh;
                overflow: scroll;
                border: 0.05em solid #008000;
            }
            .extra table {
                border-collapse: collapse;
            }
            .extra td {
                display: flex;
                height: 1.5rem;
                line-height: 1.5rem;
                text-align: center;
                border: 0.05rem solid #008000;
            }

            .extra1, .extra2 {
                display: flex;
                flex-direction: row;
                flex: 0 0 30rem;
            }

            .extra1 {
                width: 30rem;
            }

            .role {
                flex: 0 0 20rem;
            }
            .role td { width: 5rem; }
            . skill {
                flex: 0 1;
            }
            .skill .s1 { width: 6rem; }
            .skill .s1 { width: 10rem; }
            .skill .s1 { width: 3rem; }
            .send {
                flex: 0 0 ;
            }
            .console {
                width: 100%;
                height: 8rem;
                overflow: scroll;
                white-space: nowrap;
                border: 0.05em solid #008000;
            }
        `);
    }
    

})();


/*

=> score 属性
object: {type:"dialog", dialog:"score",  ...}
family: 门派

mp:       内力当前值
max_mp:   内力最大值
limit_mp: 内力上限
int:      先天悟性
int_add:  后天悟性

=> score2 详细
object: {type:"dialog", dialog:"score",  ...}
study_per:  学习效率
lianxi_per: 练习效率
*/