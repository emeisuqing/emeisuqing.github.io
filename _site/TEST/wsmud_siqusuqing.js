// ==UserScript==
// @name         wsmud_siqusuqing
// @namespace    https://greasyfork.org/zh-CN/users/235233-siqusuqing
// @version      0.1
// @description  WSCS Mud Plugins
// @author       siqusuqing
// @match        http://*.wsmud.com/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @require      https://cdn.bootcss.com/jquery-contextmenu/3.0.0-beta.2/jquery.contextMenu.min.js#右键菜单插件
// @grant        GM_addStyle
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';
// 开始

// 苏轻从头开始 学习写一个武神传说脚本

// 文档就绪事件处理器
$(document).ready(function(){
    // 为了防止文档在完全加载之前运行代码
    // 通常将代码置于此处
});


var SQ = {
	receive_message: function (msg) {
            ws_on_message.apply(this, arguments);
            if (!msg || !msg.data) return;
            var data;
            if (msg.data[0] == '{' || msg.data[0] == '[') {
                var func = new Function("return " + msg.data + ";");
                data = func();
            } else {
                data = {
                    type: 'text',
                    msg: msg.data
                };
            }
            WG.run_hook(data.type, data);
        },

};
SQ.prototype.init = function() {

};
/* jshint ignore:start */
SQ.prototype.send = async function(command) {
	if (command) {
		$("").attr("command", command).click();
	}
};
/* jshint ignore:end */


if (WebSocket) { // 判断 WebSocket 是否可以用
	console.log('插件运行正常！');

	var _ws = WebSocket, ws, ws_on_message;
	unsafeWindow.WebSocket = function (url) { ws = new _ws(url); };
	unsafeWindow.WebSocket.prototype = {
		CONNECTING: _ws.CONNECTING, OPEN: _ws.OPEN, CLOSING: _ws.CLOSING, CLOSED: _ws.CLOSED,
		get url() { return ws.url; },
		get protocol() { return ws.protocol; },
		get readyState() { return ws.readyState; },
		get bufferedAmount() { return ws.bufferedAmount; },
		get extensions() { return ws.extensions; },
		get binaryType() { return ws.binaryType; },
		set binaryType(t) { ws.binaryType = t; },
		get onopen() { return ws.onopen; },
		set onopen(fn) { ws.onopen = fn; },
		get onmessage() { return ws.onmessage; },
		set onmessage(fn) { ws_on_message = fn; ws.onmessage = WG.receive_message; },
		get onclose() { return ws.onclose; },
		set onclose(fn) { ws.onclose = fn; },
		get onerror() { return ws.onerror; },
		set onerror(fn) { ws.onerror = fn; },
		send: function (text) { ws.send(text); },
		close: function () { ws.close(); }
	};
} else {
	console.log("插件运行失败！");
}

ws_on_message = function() {

};








// 结束
})();