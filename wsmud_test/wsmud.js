$(document).ready(function() {
    if (!window.localStorage) alert("请退出浏览器的隐私模式，否则无法使用本地缓存！");
    layout.loadLeft();
    // wsmud.checkLocalStorage();
    $("#message").html("角色信息会保存在浏览器的本地缓存中！");
});

const version = "20190225";
var index = 0;
var role = ["预设角色"];
var skill = [{"预设角色":[]}];
var lingwu = [{"预设角色":[]}];

userData = {
    
    checkLocalStorage: function() {
        if (localStorage.getItem(localData.key)) {
            localData.value = JSON.parse(localStorage.getItem(localData.key));
        } else wsmud.save();
        
        if (localStorage.getItem(skillData.key)) { // 有缓存就读取
            skillData.value = JSON.parse(localStorage.getItem(skillData.key));
            console.log(skillData.value);
        } else {
            $.ajax({url:skillData.url,dataType:"text"}).done(function(data) {
                var rows = data.split("\n"); // 先按行分割
                for (let i = 0; i < rows.length; i++) {
                    var t = rows[i].split(","); // 再按逗号分割
                    if (t.length < 6) continue; // 该行数据内容格式不正确就排除
                    var classTemp = t[0];
                    if (skillData.value[classTemp] == undefined) {
                        skillData.value[classTemp] = [];
                    }
                    var skillTemp = {"class":t[0],"name":t[1],"color":t[2],"id":t[3],"type1":t[4],"type2":t[5]};
                    skillData.value[classTemp].push(skillTemp);
                }
                localStorage.setItem(skillData.key, JSON.stringify(skillData.value)); // 添加到本地缓存
            });
        }
    },
    save: function() {
        localStorage.setItem(localData.key, JSON.stringify(localData.value));
    },
    clear: function() {
        localStorage.clear();
    }
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
        if (localData.value.roles != null) {
            for (let i = 0; i < localData.value.roles.length; i++) {
                const role = localData.value.roles[i];
                $("#role_list").append("<button class='button'"
                    + "id='"+i+"_"+role.name+"'"
                    + "value='"+i+"'"
                    + ">" + role.fwq + " " + role.mp + " " + role.name
                    + "</button>");
                // 点击事件
                $("#"+i+"_"+role.name).click(function() {
                    var index = this.value;
                    localData.value.index = index;
                    var role = localData.value.roles[index];
                    $("#message").html("当前选中角色：" + role.fwq + " " + role.mp + " " + role.name);
                });
            }
        }

        $("#creatRoleButton").click(function() {
            var name = $("#name").val();
            var fwq = $("#fwq option:selected").text();
            var mp = $("#mp option:selected").text();
            var role = {
                "name" : name,
                "fwq" : fwq,
                "mp" : mp,
            };
            localData.value.roles.push(role);
            wsmud.save();
            $("#roleInfo").click();
        });
        $("#deleteRoleButton").click(function() {
            var index = localData.value.index;
            $("#message").html("删除：" + localData.value.roles[index].name);
            localData.value.roles.splice(index, 1);
            wsmud.save();
            $("#roleInfo").click();
        });
    }
}
skillChooser = {
    load: function() {
        for (const key in skillData.value) {
            const skills = skillData.value[key];
            $("#skillClass").append(new Option(key, key));
            $("#skillClass").change(function() {
                var option = $("#skillClass option:selected");
                var key = option.val();
                $("#skills").html("");
                if (key == 0) return;
                for (let i = 0; i < skillData.value[key].length; i++) {
                    const skill = skillData.value[key][i];
                    $("#skills").append(new Option(skill.name, skill.id));
                }

            });
        }

        $("#addSkill").click(function() {
            var className = $("#skillClass option:selected").val();
            var skid = $("#skills option:selected").val();
            var skill = undefined;
            for (let i = 0; i < skillData.value[className].length; i++) {
                const temp = skillData.value[className][i];
                if (temp.id == skid) {
                    skill = temp;
                    break;
                }
            }
            if (localData.value.skills[localData.value.index] == undefined) {
                localData.value.skills[localData.value.index] = [];
            }
            localData.value.skills[localData.value.index].push(skill);
            wsmud.save();
            $("#message").html("添加了技能：<span class='color" + skill.color + "'>"
                                + skill.name + "</span>");
            $("#skillChooser").click();
        });
    }
}