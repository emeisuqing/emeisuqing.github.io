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

window.namespace("suqing.fun");
suqing.fun = function() {
    var version = "2.0.0";
    return {
        version: version,
        getYear: function() {
            return (new Date()).getFullYear();
        },
        getMonth: function() {
            return (new Date()).getMonth() + 1; // 1 - 12
        },
        getDay: function() {
            return (new Date()).getDay(); // 1 - 31
        },
        getWeekday: function() {
            var day = (new Date()).getDay();
            return day == 0 ? 7 : day; // 1 - 7
        },
        getHour: function() {
            return (new Date()).getHours(); // 0 -23
        },
        getMinute: function() {
            return (new Date()).getMinutes(); // 0 - 59
        },
        getSecond: function() {
            return (new Date()).getSeconds(); // 0 - 59
        },
        getMilliSecond: function() {
            return (new Date()).getMilliseconds(); // 0 - 999
        },
        getTimeStampNow: function() {
            return (new Date()).valueOf();
        },
        copyToClipborad: function(value) {
            var textarea = document.createElement('textarea');
            textarea.value = value;
            textarea.style.display = "none";
            if (document.body) {
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand("Copy");
                textarea.parentNode.removeChild(textarea);
                alert('复制成功！');
            }
        },
        setLocalStorage: function(key, data) {
            localStorage.setItem(key, JSON.stringify(data));
        },
        getLocalStorage: function(key) {
            return JSON.parse(localStorage.getItem(key));
        },
        removeLocalStorage: function(key) {
            localStorage.removeItem(key);
        },
        clearLocalStorage: function() {
            localStorage.clear();
        },
    };
}();

window.namespace("wsmud.layout");
wsmud.layout = function() {
    var fn = suqing.fun;
    var linkNames = {
        role: "角色档案",
        skill: "技能配置",
        doexe: "练习模拟",
        wudao: "武道模拟",
    };
    var taskIds = [], actionTime = null;
    var setSize = function() {
        var windowH = $(window).height();
        var headerH = $(".header").height();
        var footerH = $(".footer").height();
        $(".left").height(windowH - headerH - footerH);
        $(".right").height(windowH - headerH - footerH);
    };
    var setLeft = function() {
        $(".link").attr({"href": "", "onclick": "return false"});
        for (const key in linkNames) {
            $("." + key).click(function() {
                $(".right").load("./html/" + key + ".html");
            }).html(linkNames[key]);
        }
    };
    var setFooter = function() {
        $(".footer").html("Copyright &copy; 2018 - " + fn.getYear()
            + " <a href='https://suqing.fun'>suqing.fun</a>"
            + " All rights Reserved.");
    };
    return {
        load: function() {
            setSize();
            setLeft();
            setFooter();
            console.log("(WSMUD) Layout Successfully.");
        },
        reSize: function() {
            console.log("(WSMUD) Set action time.");
            actionTime = suqing.fun.getTimeStampNow() + 1000; // 唯一的 actionTime
            taskIds.push(setTimeout(function() {
                if (actionTime < fn.getTimeStampNow()) {
                    setSize();
                    for (let i = 0; i < taskIds.length; i++) clearTimeout(taskIds[i]);
                    taskIds = [];
                    console.log("(WSMUD) Action!! Resize window.");
                }
            }, 1000));
        },
    };
}();

window.addEventListener("load", wsmud.layout.load);
window.addEventListener("resize", wsmud.layout.reSize);

class WD {
    constructor(name, prop, value, unit, type, sq, id) {
        this.name = name;   // 名字
        this.prop = prop;   // 属性
        this.value = value; // 数值 number
        this.unit = unit;   // 单位
        this.type = type;   // 进阶大类
        this.sq = sq;       // 苏轻设置的值
        this.id = id;       // 莫非设置的值
    }
    getDescription(level, count) {
        var value = parseInt(level * count * (this.value / 5000));
        var text = this.name + this.prop + value + this.unit;
        return text;
    }
    static fromObject(object) {
        for (var key in object) this[key] = object[key];
    }
}

