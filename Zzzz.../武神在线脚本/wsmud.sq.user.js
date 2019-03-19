// ==UserScript==
// @name        武神详细数据电脑端
// @namespace   wsmud_beautify
// @version     0.1.0
// @author      suqing
// @match       http://game.wsmud.com/*
// @homepage    https://greasyfork.org/zh-CN/scripts/------
// @description 更加友好的武神传说游戏界面
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
        addStyle();

        $("body").append($("<div class=\"extra\"></div>"));
        $(".extra").append(
            
            // 3
            $(`<div class="extra3"></div>`).append(
                $(`
                <table class="skills">
                    <thead>
                    <tr><td colspan="3">Skills</td><tr>
                    <tr>
                        <td class="skillname">技能</td>
                        <td class="skillid">代码</td>
                        <td class="skilllevel">等级</td>
                    <tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
                `),
            ),
            // 2
            $(`<div class="extra2"></div>`).append(
                $(`
                <table class="character">
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
                </table>
                `),
            ),
            // 1
            $(`<div class="extra1"></div>`).append(
                $(`<div class="color3">Message Sended</div>`),
                $(`<div class="console color5"></div>`),
            ),

        );
    });

    function addStyle() {
        GM_addStyle(`
            body {
                width: 100%;
            }
            .container {
                float: left;
                width: 40%;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select": none;
            }
            .extra {
                float: left;
                width: 60%;
                height: 100%;
                overflow: scroll;
                border: 0.05em solid #008000;
            }
            .extra table {
                border-collapse: collapse;
            }
            .extra td {
                font-size: 0.8em;
                height: 1.5em;
                line-height: 1.5em;
                text-align: center;
                border: 0.05em solid #008000;
            }

            .extra1, .extra2 {
                float: left;
                margin: 1em;
            }
            .console {
                float: left;
                width: 16em;
                height: 8em;
                overflow: scroll;
                white-space: nowrap;
                border: 0.05em solid #008000;
            }

            .character td {
                width: 5em;
            }
            .skills .skillname {
                width: 6em;
            }
            .skills .skillid {
                width: 10em;
            }
            .skills .skilllevel {
                width: 3em;
            }


            .clear {
                clear: both;
            }
            .color0 {
                color: #FFFFFF;
            }
            .color1 {
                color: #00FF00;
            }
            .color2 {
                color: #00FFFF;
            }
            .color3 {
                color: #FFFF00;
            }
            .color4 {
                color: #912CEE;
            }
            .color5 {
                color: #FFA500;
            }
            .color6 {
                color: #FF0000;
            }
            .color10 {
                color: #008000;
            }
            .color40 {
                color: #404040;
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