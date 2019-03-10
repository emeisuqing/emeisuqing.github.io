var layout = {
    setSize : function() {
        var window_h = $(window).height();
        var header_h = $(".header").height();
        var footer_h = $(".footer").height();
        $(".left").height(window_h - header_h - footer_h);
        $(".right").height(window_h - header_h - footer_h);
        console.log("Set window size.");
    },
    leftBarName: {
        role: "角色档案",
        skill: "技能配置",
        practice: "练习计算",
        lingwu: "武道模拟",
    },
    setLeftBar : function() {
        $(".leftBar").attr({
            "href": " ",
            "onclick": "return false",
        });
        for (const key in this.leftBarName) {
            $("." + key).click(function() {
                $(".right").load("./" + key + ".html");
            }).html(this.leftBarName[key]);
        }
    },
    setFooter: function() {
        var date = new Date();
        var year = date.getFullYear();
        var footer = "Copyright &copy; 2018 - " + year;
        $(".footer").html(footer + " <a href='https://suqing.fun'>suqing.fun</a> All rights Reserved.");
    },
}
var timeout = {
    ids : [],
    actionTime : 0,
    clear : function() {
        for (let i = 0; i < timeout.ids.length; i++) {
            const id = timeout.ids[i];
            clearTimeout(id);
        }
        ids = [];
        console.log("Clear all timeout.");
    },
    timestamp : function() {
        var time = Date.parse(new Date()).toString();
        return time;
    }
}
window.addEventListener("load", function() {
    layout.setSize();
    layout.setLeftBar();
    layout.setFooter();
});
window.addEventListener("resize", function() {
    timeout.ids.push(setTimeout(function() {
        console.log("Set timeout.");
        if (timeout.actionTime < timeout.timestamp()) {
            layout.setSize();
            timeout.clear();
        }
    }, 1000));
    timeout.actionTime = timeout.timestamp() + 1000;
});