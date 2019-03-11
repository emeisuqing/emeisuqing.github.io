"use strict";
window.namespace("wsmud.layout");
wsmud.layout = function() {
    var version = "0.19.309";
    // size
    var setSize = function() {
        var windowH = $(window).height();
        var headerH = $(".header").height();
        var footerH = $(".footer").height();
        $(".left").height(windowH - headerH - footerH);
        $(".right").height(windowH - headerH - footerH);
    };
    // left
    var linkNames = {
        role: "角色档案",
        skill: "技能配置",
        doexe: "练习模拟",
        wudao: "武道模拟",
    };
    var setLeft = function() {
        $(".link").attr({"href": "", "onclick": "return false"});
        for (const key in linkNames) {
            $("." + key).click(function() {
                $(".right").load("./html/" + key + ".html");
            }).html(linkNames[key]);
        }
    };
    // footer
    var setFooter = function() {
        $(".footer").html("Copyright &copy; 2018 - " + suqing.thisyear
            + " <a href='https://suqing.fun'>suqing.fun</a>"
            + " All rights Reserved.");
    };
    // resize
    var taskIds = [], actionTime;
    var reSize = function() {
        actionTime = suqing.timestamp() + 1000; // 唯一的 actionTime
        taskIds.push(setTimeout(function() {
            if (actionTime < suqing.timestamp()) {
                setSize();
                for (let i = 0; i < taskIds.length; i++) clearTimeout(taskIds[i]);
                taskIds = [];
            }
        }, 1000));
    };
    return {
        version: version,        
        load: function() {
            setSize();
            setLeft();
            setFooter();
            // $(".role").click();
        },
        reSize: reSize,
    };
}();
console.log("(WsMud) Layout Version: " + wsmud.layout.version);

window.addEventListener("load", wsmud.layout.load);
window.addEventListener("resize", wsmud.layout.reSize);