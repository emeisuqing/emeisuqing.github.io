"use strict";
window.namespace = function() {
    var a = arguments, o = null, i, j, d;
    for (i = 0; i < a.length; i ++) {
        d = a[i].split(".");
        o = window;
        for (j = 0; j < d.length; j ++) {
            o[d[j]] = o[d[j]] || {};
            o = o[d[j]];
        }
    }
    return o;
};

window.namespace("suqing");
suqing = function() {
    return {
        version: "0.19.308",
        // 本地缓存
        checkLocalStorage: function() {
            try { window.localStorage.setItem("suqing.check", "localStorage")}
            catch (error) { alert("(SuQing) Check window.localStorage => " + error)}
        },
        localLoad: function(key) {
            return JSON.parse(localStorage.getItem(key));
        },
        localSave: function(key, data) {
            localStorage.setItem(key, JSON.stringify(data));
        },
        localClear: function() {
            localStorage.clear();
        },
        // 时间戳
        timestamp: function() {
            return (new Date()).valueOf();
        },
        // 当前年份 4位数
        thisyear: function() {
            return (new Date()).getFullYear();
        },
        // copy
        copyText: function(value) {
            var textarea = document.createElement('textarea');
            textarea.value = value;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("Copy");
            textarea.style.display = 'none'; // 不显示
            alert('已经复制到剪贴板！');
            console.log("Copy successfully.");
        }
    };
}();
console.log("(SuQing) Version: " + suqing.version);