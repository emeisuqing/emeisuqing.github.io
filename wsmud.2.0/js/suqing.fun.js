$(document).ready(function() {
    layout.loadLeft();

    if (window.localStorage) {
        $("#message").html("角色信息会保存在浏览器的本地缓存中！");
        if (localStorage.getItem("index")) {
            userData.load();
        } else {
            userData.save();
        }
    } else {
        alert("请退出浏览器的隐私模式，否则无法使用本地缓存！");
    }

});

userData = {
    index : 0,
    roles : [{name:"预设角色", fwq:"一区", mp:"无门无派"}],
    skills : [{"预设角色":new Array()}],
    lingwus : [{"预设角色":new Array()}],
    load: function() {
        userData.index = JSON.parse(localStorage.getItem("index"));
        userData.roles = JSON.parse(localStorage.getItem("roles"));
        userData.skills = JSON.parse(localStorage.getItem("skills"));
        userData.lingwus = JSON.parse(localStorage.getItem("lingwus"));
    },
    save: function() {
        localStorage.setItem("index", JSON.stringify(userData.index));
        localStorage.setItem("roles", JSON.stringify(userData.roles));
        localStorage.setItem("skills", JSON.stringify(userData.skills));
        localStorage.setItem("lingwus", JSON.stringify(userData.lingwus));
    },
    clear: function() {
        localStorage.clear();
    },
}

layout = {
    setBody: function() {
        var h = $(window).height(); // 窗口高 h
        var w = $(window).width();  // 窗口宽 w
        $("header").width(w);
        $("header").height(150);
        $("footer").width(w);
        $("footer").height(20);
        $("main").width(w);
        $("main").height(h - $("header").height() - $("footer").height());
        $("#left").width(200);
        $("#right").width(w - $("#left").width());
    },
    setFooter: function() {
        var date = new Date();
        var year = date.getFullYear();
        var footer = "Copyright &copy; 2018 - " + year;
        $("#footer").html(footer + " <a href='https://suqing.fun'>suqing.fun</a> All rights Reserved.");
    },
    loadLeft: function() {
        var loadArray = ["roleInfo", "updateLog", "friendLink", "aboutAuthor", "skillChooser"];
        for (let index = 0; index < loadArray.length; index++) {
            const element = loadArray[index];
            $("#"+element).click(function() {
                console.log("click: " + element + " → toLoad: " + element + ".html");
                $("#right").load("./load/" + element + ".html");
            });
        }
    },
}
window.onload=function(){layout.setBody();}
window.onresize=function(){setTimeout(layout.setBody(),500);}


roleInfo = {
    load: function() {
        if (userData.roles != null) {
            for (let i = 0; i < userData.roles.length; i++) {
                const role = userData.roles[i];
                let button_html = "<button class='button' type='button' "
                    + "id='" + i + "_" + role.name + "' "
                    + "value=" + i + "></button>";
                $("#role_list").append(button_html);
                                                            
                $("#" + i + "_" + role.name).html(role.fwq + " " + role.mp + " " + role.name);
                $("#" + i + "_" + role.name).click(function() {
                    userData.index = this.value;
                    let role = userData.roles[userData.index];
                    $("#message").html("当前选中角色：" + role.fwq + " " + role.mp + " " + role.name);
                });
            }
        }

        $("#creatRoleButton").click(function() {
            let role = {
                "name" : $("#name").val(),
                "fwq" : $("#fwq option:selected").text(),
                "mp" : $("#mp option:selected").text(),
            };
            userData.roles.push(role);
            userData.save();
            $("#roleInfo").click();
        });
        $("#deleteRoleButton").click(function() {
            let index = userData.index;
            $("#message").html("删除：<span class='color6'>" + userData.roles[index].name + "</span>");
            userData.roles.splice(index, 1);
            userData.save();
            $("#roleInfo").click();
        });
    }
}