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
        alert("插件加载失败！"); 
        return;
    }
    var suqing = {
        name: GM_info.script.name,
        version: GM_info.script.version,
        update: [
            {"0.1.0": "成功截获 WebSocket 的发送消息与接受消息"},
        ],
        record: {
            get: 0,
            获得潜能: 0,
        },
        webSocket: null,
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
        set onmessage(fn) { // 截获 接收到的数据 然后分析数据
            suqing.webSocket.onmessage = function(message) {
                fn.apply(this, arguments);
                var data = message.data;
                if ((data.includes("{") && data.includes("}")) || (data.includes("[") && data.includes("]"))) {
                    data = new Function("return " + data + ";")();
                }
                console.log(data);

                if (data.type == "state" && data.state == "你正在挖矿中") {
                } else {
                }
                
            };
        },
        send: function (message) { // 截获 发送出的数据
            suqing.webSocket.send(message);
            $(".ex5").html($(".ex5").html() + ">> " + message + "<br>");
            $(".ex5")[0].scrollTop = $(".ex5")[0].scrollHeight;
        },
    };
    var sendmessage = function(message) { // 模拟 发送数据
        if ($("#sendmessage").html() != "sendmessage") {
            $(".container").append(
                $("<span id=\"sendmessage\"></span>").html("sendmessage").hide()
            );
        }
        $("#sendmessage").attr("cmd", message).click();
    }

    $(document).ready(function() {
        GM_addStyle(`
            body {
                width: 100%;
            }
            .container {
                float: left;
                width: 50%;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select": none;
            }
            .extra {
                float: left;
                width: 50%;
                height: 100%;
                border-left: 0.1em solid #FFFFFF;
            }
            .ex1, .ex2, .ex3, .ex4, .ex5 {
                float: left;
                width: 100%;
                height: 20%;
                border: 0.1em solid #008000;
                overflow: scroll;
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
        $("body").append($("<div class=\"extra\"></div>"));
        $(".extra").append(
            $("<div></div>").addClass("ex1"),
            $("<div></div>").addClass("ex2"),
            $("<div></div>").addClass("ex3"),
            $("<div></div>").addClass("ex4"),
            $("<div></div>").addClass("ex5 color3"),
        );
    });
})();