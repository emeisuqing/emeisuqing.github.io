/*
 * @Author: fun.suqing
 * @Date: 2019-03-12 21:01:24
 * @Last Modified by: fun.suqing
 * @Last Modified time: 2019-04-15 13:00:51
 */

"use strict"; // 严格模式

class 武道 {
    constructor(name, prop, value, unit, type, sq, id) {
        this.name = name;   // 名字
        this.prop = prop;   // 属性变化
        this.value = value; // 属性数值 number
        this.unit = unit;   // 属性单位
        this.type = type;   // 进阶大类
        this.sq = sq;       // 苏轻设置的值
        this.id = id;       // 莫非设置的值
    }
    fromObject(object) {
        for (var key in object) {
            this[key] = object[key];
        }
    }
    get text() {
        return `【${this.name}】${this.prop}${this.value}${this.unit}`;
    }
}
class 技能 {
    constructor(category, code, name, color, type1, type2) {
        this.category = category;  // 大类
        this.code = code;          // 代码
        this.name = name;          // 名称
        this.color = color;        // 颜色 0白1绿2蓝3黄4紫5橙6红
        this.type1 = type1;        // 武道类型1
        this.type2 = type2;        // 武道类型2
        this.level1 = 0;           // 当前等级
        this.level2 = 0;           // 目标等级
        this.needPractice = false; // 是否需要练习
        this.limitPractice = false;// 练习至上限
        this.wudaos = [];          // 武道进阶记录
    }
    get k() {
        return this.color + this.wudaos.length; // k 小于 5 时可以武道进阶
    }
    get cost() {
        if (this.level1 > this.level2) {
            return 0;
        }
        var n = 2.5 * (this.k + 1);
        var m = this.level2 * this.level2 - this.level1 * this.level1;
        return n * m;
    }
    fromObject(object) {
        for (var key in object) {
            if (key == "wudaos") {
                this[key] = [];
                object[key].forEach(obj => {
                    var wudao = new 武道();
                    wudao.fromObject(obj);
                    this[key].push(wudao);
                });
            } else {
                this[key] = object[key];
            }
        }
    }
    upgradeByWudao(wudao) {
        this.level1 = Math.sqrt(this.level1 * this.level1 * (this.k + 1) / (this.k + 2));
        this.level1 = parseInt(this.level1);
        this.wudaos.push(wudao);
    }
}
class 角色 {
    constructor(name) {
        this.name = name;
        this.state = 0;
        this.school = 0;

        this.skills = []; // 技能列表
        this.wudaos = []; // 武道记录
        this.needGohouse = true; // 回家
        this.needWakuang = true; // 挖矿
        this.iq1 = 30;   // 先天悟性
        this.iq2 = 100;  // 后天悟性
        this.rate = 100; // 练习效率
        this.list = {force: [], dodge: [], parry: [], unarmed: [], weapon: []};
    }
    fromObject(object) {
        console.log("(Role) Method: fromObject()");
        console.log(object);
        for (var key in object) {
            if (key == "skills") {
                this[key] = [];
                object[key].forEach((obj, index) => {
                    var skill = new 技能();
                    skill.fromObject(obj);
                    this[key].push(skill);
                });
            } else if (key == "list") {
                this.list = {force: [], dodge: [], parry: [], unarmed: [], weapon: []};
                for (var type in object[key]) {
                    var array = object[key][type];
                    array.forEach(obj => {
                        var wd = new 武道();
                        wd.fromObject(obj);
                        this[key][type].push(wd);
                    });
                }
            } else {
                this[key] = object[key];
            }
        }
    }
    getSkillIndexByCode(code) {
        var index = this.skills.findIndex(skill => {
            return skill.code == code;
        });
        return index;
    }
    setSkillLevelByCode(code, level) {
        var index = this.getSkillIndexByCode(code);
        if (index != null) {
            this.skills[index].level1 = level;
        }
    }
    setSkillLevelToByCode(code, level) {
        var index = this.getSkillIndexByCode(code);
        if (index != null) {
            this.skills[index].level2 = level;
        }
    }
    setNeedPracticeByCode(code, bool) {
        var index = this.getSkillIndexByCode(code);
        if (index != null) {
            this.skills[index].needPractice = bool;
        }
    }
    setLimitPracticeByCode(code, bool) {
        var index = this.getSkillIndexByCode(code);
        if (index != null) {
            this.skills[index].limitPractice = bool;
        }
    }
    upgradeSkillByData(array) {
        var type = array[0];
        var id = array[1];
        var code = array[2];
        var index = this.getSkillIndexByCode(code);
        this.wudaos.push(array);

        var wudao = wsmud.getWudaoData().find(wd => {
            return wd.id == id;
        })
        this.skills[index].upgradeByWudao(wudao);
    }
}

var wsmud = function() {
    // 一些常量字符串
    var classNames = ["主页菜单", "基础配置", "模拟练习", "模拟武道", "武道流程", "读取配置", "问题反馈"];
    var stateNames = ["百姓", "武士", "武师", "宗师", "武圣", "武帝", "武神"];
    var schoolNames = ["无门无派", "武当派", "少林派", "华山派", "峨眉派", "逍遥派", "丐帮", "杀手楼"];
    var typeNames = {
        force: "内功",
        dodge: "轻功",
        parry: "招架",
        unarmed: "拳脚",
        weapon: "武器",
    };

    var h = null; // showMessage() 方法中的变量

    // 关于本地缓存 localStorage
    // 1. key = "role"     value = ${name}
    // 2. key = "roles"    value = [${name1}, ${name2}, ...]
    // 3. key = ${name}    value = ${Object}
    var role = null;
    function saveRole() {
        role.name = $("#角色姓名").text();
        role.state = $("#境界选择 option:selected").val();
        role.school = $("#门派选择 option:selected").val();
        var data = JSON.stringify(role);
        localStorage.setItem("role", role.name);  // 当前角色 关键字是 role
        localStorage.setItem(role.name, data);    // 具体数据 关键字是 name
        wsmud.showMessage(`整理当前数据...<br>${data}<br>`);

        var roles = JSON.parse(localStorage.getItem("roles"));
        if (roles == null) {
            roles = [role.name];
        } else {
            var index = roles.indexOf(role.name);
            if (index == -1) roles.push(role.name); // 有了就不要加了
        }
        localStorage.setItem("roles", JSON.stringify(roles));
        wsmud.showMessage("保存当前数据完毕！");
    }
    // 技能数据的冒泡排序
    function sortSkills() {
        var a = wsmud.getRole().skills, n = a.length;
        for (var j = 0; j < n - 1; j ++) {
            for (var i = 0; i < n - j - 1; i ++) {
                if (a[i].k > a[i + 1].k) {
                    var temp = a[i];
                    a[i] = a[i + 1];
                    a[i + 1] = temp;
                }
            }
        }
    }
    var wudao = ["", "", ""]; // type id code

    return {
        // 获取当前角色数据
        getRole: function() {
            if (role == null) {
                role = new 角色("无名");
                var name = localStorage.getItem("role");
                if (name != null) {
                    var object = JSON.parse(localStorage.getItem(name));
                    if (object != null) role.fromObject(object);
                } else {
                    wsmud.getSkillData().forEach(skill => {if (skill.category == "基础技能") role.skills.push(skill)});
                }
            }
            return role;
        },

        setMainHeight: function() {
            $("main").height(
                $(window).height() - $("header").height() - $("footer").height() - $(".hr").height() - $(".hr").height() - $(".hr").height() - $(".hr").height()
            );
        },
        showBlockByIndex: function(n) {
            classNames.forEach((name, index) => {
                if (index == n) {
                    $("." + classNames[index]).show();
                } else {
                    $("." + classNames[index]).hide();
                }
            });
        },
        showMessage: function(string) {
            $(".日志输出").append($(`<div>>> ${string}</div>`));
            // 这里实现了一个滚动的效果
            function fn() {
                var a = $("footer")[0].scrollTop;
                var b = $("footer")[0].scrollHeight;
                if (h == null) {
                    h = b - a;
                }
                if (a >= b - h) {
                    $("footer")[0].scrollTop = b;
                } else {
                    $("footer")[0].scrollTop = a + 1;
                    setTimeout(fn, 1000/60);
                }
            }
            fn();
        },
        setElements: function() {
            wsmud.showMessage("<a href='https://suqing.fun/wsmud.old/' target='_blank'>旧版本模拟器地址</a> && <a href='http://www.wsmud.site/' target='_blank'>多开页面的地址</a>");
            wsmud.showMessage("<span class='color1'>点击标题可以返回！点击标题可以返回！点击标题可以返回！</span>");
            wsmud.showMessage("最后更新时间：2019.4.15 修复了轻功武道进阶防御数值的问题");
            // 0.1 页头的点击事件
            $("header").click(() => wsmud.showBlockByIndex(0));
            // 0.2 主页按钮的点击事件
            $(".主页菜单 button").click(function() {
                // 此处不能简写 必须使用匿名函数 否则 this 会指向当前对象
                var value = $(this).attr("value");
                wsmud.showBlockByIndex(value);
                switch (value) {
                    case "1":
                        wsmud.refreshSkills();
                        wsmud.showMessage("配置完数据之后别忘记保存哟！");
                        break;
                    case "2":
                        wsmud.refreshPractices();
                        wsmud.showMessage("练习代码是粘贴在游戏高级设置里的！");
                        break;
                    case "3":
                        $(".type").removeClass("clicked");
                        $(".props").html("请选择武道类别");
                        $(".skillsToWd").html("武道模拟");
                        wsmud.showMessage("发现武道模拟有错的话请告诉作者！");
                        wsmud.refreshWuDaos();
                        break;
                    case "4":
                        wsmud.refreshProcess();
                        break;
                    case "5":
                        wsmud.refreshRoles();
                    default:
                        break;
                }
            });
            // 1.1 刷新页面
            // 2.1 选择技能类别的数据
            var set = new Set(), value = 0;
            wsmud.getSkillData().forEach(skill => set.add(skill.category));
            set.forEach(category => $("#选择类别").append($(`<option value="${value++}">${category}</option>`)));

            wsmud.setBlock1();
            // 2.2 选择技能类别的事件
            $("#选择类别").change(() => {
                var category = $("#选择类别 option:selected").text();
                $("#选择技能").html("");
                wsmud.getSkillData().forEach(skill => {
                    if (skill.category == category)
                        $("#选择技能").append($(`<option value='${skill.code}'>${skill.name}</option>`));
                });
            });
            // 2.3 添加技能的点击事件
            $("#addskill").click(function() {
                var code = $("#选择技能 option:selected").attr("value");
                if (code) {
                    wsmud.addSkillByCode(code);
                } else {
                    wsmud.showMessage("你要添加什么技能？");
                }
            });
            // 2.4 保存的点击事件
            $("#saveData").click(function() {
                saveRole();
            });
            $(`#newData`).click(function() {
                role = null;
                localStorage.removeItem("role");
                wsmud.refreshSkills();
            });
            // 2.5 加载的点击事件
            // $("#loadData").click(function() {
            //     wsmud.showMessage("快去催苏轻敲代码！");
            // });
            // $("#input").click(function() {
            //     wsmud.showMessage("快去催苏轻敲代码！");
            // });
            // $("#output").click(function() {
            //     wsmud.showMessage("快去催苏轻敲代码！");
            // });
            // 2.6 门派选择的事件
            $("#门派选择").change(() => {
                var school = $("#门派选择 option:selected").text();
                wsmud.getRole().school = $("#门派选择 option:selected").val();
                wsmud.getSkillData().forEach(skill => {
                    if (skill.category == school) {
                        wsmud.addSkillByCode(skill.code);
                    }
                });
                wsmud.refreshSkills();
            });
            $("#境界选择").change(() => {
                wsmud.getRole().state = $("#境界选择 option:selected").val();
            });
            $("#角色姓名").blur(function() {
                wsmud.getRole().name = $(this).text();
            });

            // 3.1 一键设置练习等级按钮的点击事件
            $("#setLevelTo").click(() => {
                var level = parseInt($("#levelTo").text());
                if (isNaN(level)) {
                    wsmud.showMessage(`一键设置练习等级出错！ => ${$("#levelTo").text()}`);
                } else {
                    wsmud.getRole().skills.forEach(skill => {
                        skill.level2 = level;
                    });
                    wsmud.refreshPractices();
                }
            });
            // 3.2 一键复制练习代码按钮的点击事件
            $("#copyCode").click(() => {
                var text = $("#autocode").html();
                wsmud.copyToClipboard(text);
            });
            // 3.3.1 回豪选择框的设置
            $("#goHouse").prop("checked", wsmud.getRole().needGohouse)
            .click(function() {
                var bool = $(this).prop("checked");
                wsmud.getRole().needGohouse = bool;
                if (wsmud.getRole().needGohouse) {
                    $("#goParty").prop("checked", false);
                    wsmud.getRole().needGoparty = false;
                }
                wsmud.refreshAutoCode();
            });
            // 3.3.2 帮派练功房的设置
            $("#goParty").prop("checked", wsmud.getRole().needGoparty)
            .click(function() {
                var bool = $(this).prop("checked");
                wsmud.getRole().needGoparty = bool;
                if (wsmud.getRole().needGoparty) {
                    $("#goHouse").prop("checked", false);
                    wsmud.getRole().needGohouse = false;
                }
                wsmud.refreshAutoCode();
            });
            // 3.4 挖矿选择框的设置
            $("#waKuang").prop("checked", wsmud.getRole().needWakuang)
            .click(function() {
                var bool = $(this).prop("checked");
                wsmud.getRole().needWakuang = bool;
                $("#xiuLian").prop("checked", !bool);
                wsmud.refreshAutoCode();
            });
            // 3.5 修炼选择框的设置
            $("#xiuLian").prop("checked", !wsmud.getRole().needGohouse)
            .click(function() {
                var bool = $(this).prop("checked");
                wsmud.getRole().needWakuang = !bool;
                $("#waKuang").prop("checked", !bool);
                wsmud.refreshAutoCode();
            });
            // 3.6 先天悟性
            $("#xtwx").html(wsmud.getRole().iq1)
            .blur(function() {
                var value = parseInt($(this).text());
                wsmud.getRole().iq1 = value;
                wsmud.refreshPracticeCost();
            });
            // 3.7 后天悟性
            $("#htwx").html(wsmud.getRole().iq2)
            .blur(function() {
                var value = parseInt($(this).text());
                wsmud.getRole().iq2 = value;
                wsmud.refreshPracticeCost();
            });
            // 3.8 练习效率
            $("#lxxl").html(`${wsmud.getRole().rate}%`)
            .blur(function() {
                var value = parseInt($(this).text());
                wsmud.getRole().rate = value;
                wsmud.refreshPracticeCost();
            });
            // 3.9 消耗潜能和时间

            // 武道页面
            wsmud.setBlock3();
            wsmud.setBlock5();

            // 武道流程
            $("#copy_process").click(function() {
                console.log("(Event) button.click");
                var text = $("#process_code").text();
                wsmud.copyToClipboard(text);
            });
        },
        setBlock1: function() {
            var role = wsmud.getRole();
            $("#setAllLevelButton").click(() => {
                var level = parseInt($("#setAllLevel").html());
                wsmud.getRole().skills.forEach(skill => skill.level1 = level);
                wsmud.refreshSkills();
            });


            // 导入技能数据 - json 字符串
            $("#addskill_json").click(() => {
                let string = $("#skill_json").text();
                if (string) {
                    let object = JSON.parse(string);
                    console.log(object);
                    let name = object.player, state = object.level, school = object.family;
                    let skills = object.items;
                    for (let obj of skills) {
                        let code = obj.id;
                        let level = obj.level;
                        if (code === "lianyao" || code === "literate") continue;
                        // console.log(code, level);
                        let check = wsmud.getRole().skills.find(skill => skill.code == code);
                        if (check === undefined) {
                            var skill = wsmud.getSkillData().find(skill => skill.code == code);
                            if (skill === undefined) {
                                let name = obj.name;
                                //console.log(name);
                                skill = new 技能("自创", code, name, 6, 0, 0);
                            }
                            //console.log(skill);
                            skill.level1 = level;
                            wsmud.getRole().skills.push(skill);
                        } else {
                            check.level1 = level;
                        }
                    }
                    wsmud.getRole().name = name;
                    wsmud.getRole().state = stateNames.indexOf(state);
                    wsmud.getRole().school = schoolNames.indexOf(school);
                    wsmud.refreshSkills();
                }
            });

        },
        setBlock3: function() { // 武道模拟界面
            // 0.1 前置
            $(".type").click(clickType); // buttons
            $(".props").html("请选择武道类别"); // td
            $(".skillsToWd").html("武道模拟"); // td
            // 1.0 点击武道类型
            function clickType() {
                // 点击变色
                $(".clicked").removeClass("clicked");
                $(this).addClass("clicked");
                // 重置过程
                $(".props").html("");
                $(".skillsToWd").html("武道模拟");
                //
                var type = $(this).attr("id");
                var list = wsmud.getRole().list;
                if (list[type].length < 2) {
                    list[type] = [];
                    wsmud.getWudaoData().forEach(wd => {if (wd.type == type) wsmud.getRole().list[type].push(wd);});
                }
                for (var i = 0; i < list[type].length; i++) {
                    if (i == 3) break; // 最多3条属性。
                    var wd = list[type][i];
                    $(".props").append(
                        $(`<button type="${wd.type}" sq="${wd.sq}" id="${wd.id}">${wd.name}</button>`)
                        .addClass("prop").click(clickProp)
                    );
                }
                wudao = [type, "", ""];
                console.log(wudao);
                wsmud.getRole().list = list;
            }
            // 2.0 点击武道属性
            function clickProp() {
                // 点击变色
                $(".prop").removeClass("clicked");
                $(this).addClass("clicked");
                $(".skillsToWd").html(""); // 清除

                var type = $(this).attr("type");
                var sq = $(this).attr("sq");
                var id = $(this).attr("id");

                var skills = wsmud.getRole().skills;
                skills.forEach(skill => {
                    if (skill.type1 != typeNames[type] && skill.type2 != typeNames[type]) return; // 类型不符合 无法进阶
                    console.log(skill);
                    if (skill.k >= 5) return; // 橙色技能无法进阶
                    for (var i = 0; i < skill.wudaos.length; i++) {
                        var wd = skill.wudaos[i];
                        if (wd.sq == sq) return; // 已经重复的属性无法进阶
                    }
                    $(".skillsToWd").append(
                        $(`<button type="button" class="wdSkills" code="${skill.code}"></button>`)
                        .html(skill.name).click(clickSkill)
                    );
                });
                wudao = [type, id, ""];
                console.log(wudao);
            }
            // 3.0 点击选中技能
            function clickSkill() {
                $(".wdSkills").removeClass("clicked");
                $(this).addClass("clicked");

                var code = $(this).attr("code");
                wudao = [wudao[0], wudao[1], code];
                console.log(wudao);
            }
            // 4.0 点击确认进阶
            $("#confirm").click(function() {
                for (var i = 0; i < wudao.length; i++) {
                    if (wudao[i] == "") return;
                }
                // 执行进阶
                wsmud.getRole().upgradeSkillByData(wudao);
                // 删掉进阶过的属性
                var type = wudao[0];
                var id = wudao[1];
                var array = wsmud.getRole().list[type];
                var index = array.findIndex(wd => {
                    return wd.id == id;
                });
                array.splice(index, 1);
                wsmud.getRole().list[type] = array;
                // 刷新
                wsmud.refreshWuDaos();
                $(".props").html("请选择武道类别");
                $(".skillsToWd").html("武道模拟");
                $(".clicked").removeClass("clicked");
                // wsmud.getRole().wudaos.push(wudao);
                wudao = ["", "", ""];
            });
            // 撤销操作
            $("#retract").click(function() {
                wsmud.showMessage("稍等！功能还在敲！");
                var index = wsmud.getRole().wudaos.length - 1;
                var code = wsmud.getRole().wudaos[index][2];
                var id = wsmud.getRole().wudaos[index][1];
                var type = wsmud.getRole().wudaos[index][0];
                console.log(code);

                for (let i = 0; i < wsmud.getRole().skills.length; i++) {
                    var skill = wsmud.getRole().skills[i];
                    if (skill.code === code) {
                        let n = skill.wudaos.length - 1;

                        wsmud.getRole().list[type].unshift(wsmud.getRole().skills[i].wudaos[n]);

                        wsmud.getRole().skills[i].wudaos.splice(n, 1);
                        skill.level1 = Math.sqrt(skill.level1 * skill.level1 * (skill.k + 1) / (skill.k));
                        wsmud.getRole().skills[i].level1 = parseInt(skill.level1);
                        break;
                    }
                }

                wsmud.getRole().wudaos.splice(index, 1);
                wsmud.refreshWuDaos();
            });

            // 重置武道
            $("#reset").click(function() {
                wsmud.getRole().wudaos = [];
                wsmud.getRole().list = {force: [], dodge: [], parry: [], unarmed: [], weapon: []};
                wsmud.getRole().skills.forEach(skill => skill.wudaos = []);

                $(".type").removeClass("clicked");
                $(".props").html("请选择武道类别");
                $(".skillsToWd").html("武道模拟");
                wsmud.showMessage("路漫漫其修远兮，武道之路重头再来！");
                wsmud.refreshWuDaos();
            });

            // 下载按钮
            $("#btn_download").click(function() {
                $("#download tbody").append(
                    $(`<tr><td colspan="3">武神传说小站 —— https://suqing.fun/wsmud/</td></tr>`)
                );
                wsmud.downloadImageById("download");
                setTimeout(() => {
                    wsmud.refreshWuDaos();
                }, 10);
            });
        },
        setBlock5: function() {
            // console.log($("#roles"));


        },
        refreshRoles: function() {
            $("#roles tbody").html("");
            let array = JSON.parse(localStorage.getItem("roles"));
            // if (typeof array !== "Array") return;
            for (const name of array) {
                let data = JSON.parse(localStorage.getItem(name));
                if (data === null) {
                    localStorage.setItem("roles", "[]");
                    wsmud.showMessage(`<span class="color6">数据出错，请重新保存一下！</span>`);
                    return;
                }
                $("#roles tbody").append(
                    $(`<tr class="color${data.state}"></tr>`).append(
                        $(`<td style="width:5em">${data.name}</td>`),
                        $(`<td style="width:5em">${stateNames[data.state]}</td>`),
                        $(`<td style="width:5em">${schoolNames[data.school]}</td>`),
                        $(`<td style="width:5em"></td>`).append(
                            $(`<button type="button" value="${data.name}">读取</button>`).click(function() {
                                let name = $(this).attr("value");
                                let obj = JSON.parse(localStorage.getItem(name));
                                wsmud.getRole().fromObject(obj);
                                localStorage.setItem("role", name);
                                wsmud.showMessage(`你读取了数据：${data.name}`);
                            })
                        ),
                        $(`<td style="width:5em"></td>`).append(
                            $(`<button type="button" value="${data.name}">删除</button>`).click(function() {
                                if ($(this).html() === "删除") {
                                    $(this).html("确认");
                                } else {
                                    let name = $(this).attr("value");
                                    let array = JSON.parse(localStorage.getItem("roles"));
                                    let newArray = [];
                                    for (let i = 0; i < array.length; i++) {
                                        if (name !== array[i]) newArray.push(array[i]);
                                    }
                                    localStorage.setItem("roles", JSON.stringify(newArray));
                                    localStorage.removeItem(name);
                                    wsmud.showMessage(`你删除了数据：${name}`);
                                    wsmud.refreshRoles();
                                }
                            })
                        ),
                    )
                );
            }
        },
        refreshProcess: function() {
            var string = "";
            for (const array of wsmud.getRole().wudaos) {
                var id = array[1];
                var code = array[2];
                if (string != "") string += ",";
                string += `${id} ${code}`;
            }
            console.log(string);

            var process = getCommandGroup(string);
            // console.log(process);
            $("#process_code").text(process);
            // 转换字符串为命令组的函数
            // 此函数由 wsmud_Raid 的作者 Rob.cn / 一区令狐凯 提供
            function getCommandGroup(exp) {
                if (exp == "") return;
                var getType = function(code) {
                    var codes = [7, 12, 18, 24, 31];
                    var types = ["force", "dodge", "parry", "unarmed", "weapon"];
                    for (let i = 0; i < codes.length; i++) {
                        const max = codes[i];
                        if (code <= max) return types[i];
                    }
                    throw "unknown lingwu number";
                };
                var getCommands = function(counter, times, number, code, skill) {
                    var type = getType(code);
                    var now = number + 1;
                    var commands = `
                    [(${counter})==${number}]($flag)=null
                    [(${counter})==${number}]($flag2)=null
                    [(${counter})==${number}]packitem wu {武道o%}
                    [(${counter})==${number}]@tip 你想从武道秘籍中领悟($flag)技能|你正在领悟|你从武道($flag2)中领悟到了
                    [(${counter})==${number}&(flag)!=null]lingwu type ${type}
                    [(${counter})==${number}&(flag)!=null]@tip 你想从武道秘籍中领悟哪种($type)秘技
                    [(${counter})==${number}&(flag)!=null]lingwu no ${code}
                    [(${counter})==${number}&(flag)==null&(flag2)==null]lingwu continue
                    [(${counter})==${number}&(flag2)==null]@tip 你从武道秘籍中领悟到了
                    [(${counter})==${number}]lingwu select
                    [(${counter})==${number}]@tip 你目前有以下技能可使用你领悟的
                    [(${counter})==${number}]lingwu ${skill}
                    [(${counter})==${number}]@tip 你领悟了
                    [(${counter})==${number}]($${counter})=(${counter})+1
                    [(${counter})<${times}]tm (:hour):(:minute):(:second) 当前武道进阶进度：(${counter})/${times}
                    [(${counter})==${times}]tm (:hour):(:minute):(:second) 本次武道进阶已完成。`;
                    commands = commands.replace(/\n\s*/g, "\n");
                    return commands;
                };

                var parts = exp.split(/,+/);
                var times = parts.length;
                var counter = `WudaoCounter__${new Date().getTime()}`;
                var result = `@stopSSAuto\nstopstate\n[(${counter})==null]($${counter})=0`;
                for (let j = 0; j < parts.length; j++) {
                    const part = parts[j];
                    var code = /^\s*(\d+)\s/.exec(part)[1];
                    var skill = /\s*([a-zA-Z][a-zA-Z0-9]*)/.exec(part)[1];
                    var commands = getCommands(counter, times, j, code, skill);
                    result += commands;
                }
                result += `\n($${counter})=null\n$to 住房-练功房;dazuo\n@recoverSSAuto`;
                return result;
            }
        },

        copyToClipboard: function(text) {
            var textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("Copy");
            wsmud.showMessage(`copy to clipboard ...<br>>> 复制成功！`);
            textarea.parentNode.removeChild(textarea);
        },

        getSkillData: function() {
            return [
                // 基础技能
                new 技能("基础技能", "force", "基本内功", 0, 0, 0),
                new 技能("基础技能", "dodge", "基本轻功", 0, 0, 0),
                new 技能("基础技能", "unarmed", "基本拳脚", 0, 0, 0),
                new 技能("基础技能", "parry", "基本招架", 0, 0, 0),
                new 技能("基础技能", "blade", "基本刀法", 0, 0, 0),
                new 技能("基础技能", "sword", "基本剑法", 0, 0, 0),
                new 技能("基础技能", "club", "基本棍法", 0, 0, 0),
                new 技能("基础技能", "staff", "基本杖法", 0, 0, 0),
                new 技能("基础技能", "whip", "基本鞭法", 0, 0, 0),
                new 技能("基础技能", "throwing", "基本暗器", 0, 0, 0),
                // 武当派
                new 技能("武当派", "wudangxinfa", "武当心法", 1, "内功", "无"),
                new 技能("武当派", "wudangjianfa", "武当剑法", 1, "武器", "无"),
                new 技能("武当派", "wudangchangquan", "武当长拳", 1, "拳脚", "无"),
                new 技能("武当派", "tiyunzong", "梯云纵", 2, 0, 0),
                new 技能("武当派", "taijishengong", "太极神功", 3, 0, 0),
                new 技能("武当派", "taijiquan", "太极拳", 3, 0, 0),
                new 技能("武当派", "taijijian", "太极剑法", 4, 0, 0),
                new 技能("武当派", "taijiquan2", "太极拳(进阶)", 4, "拳脚", "招架"),
                new 技能("武当派", "tiyunzong2", "梯云纵(进阶)", 4, "轻功", "无"),
                new 技能("武当派", "taijijian2", "太极剑法(进阶)", 5, "无", "无"),
                new 技能("武当派", "taijishengong2", "先天太极(进阶)", 5, "无", "无"),
                new 技能("武当派", "taijishengong4", "太极真义", 6, 0, 0),
                // 少林派
                new 技能("少林派","shaolinshenfa", "少林身法", 1, 0, 0),
                new 技能("少林派","ranmudao", "燃木刀法", 3, 0, 0),
                new 技能("少林派","yizhichan", "一指禅", 3, 0, 0),
                new 技能("少林派","yijinjing", "易筋经", 4, 0, 0),
                new 技能("少林派","weituogun", "韦陀棍", 1, "武器", "无"),
                new 技能("少林派","hunyuanyiqi", "混元一气", 1, "内功", "无"),
                new 技能("少林派","fuhuquan", "伏虎拳", 1, "拳脚", "无"),
                new 技能("少林派","damojian", "达摩剑", 2, "武器", "无"),
                new 技能("少林派","jingangquan", "大力金刚拳", 2, "拳脚", "招架"),
                new 技能("少林派","shaolinshenfa2", "一苇渡江(进阶)", 4, "轻功", "无"),
                new 技能("少林派","yizhichan2", "一指禅(进阶)", 4, "拳脚", "无"),
                new 技能("少林派","ranmudao2", "燃木刀法(进阶)", 5, "无", "无"),
                new 技能("少林派","yijinjing2", "金刚不坏体(进阶)", 5, "无", "无"),
                new 技能("少林派","yijinjing4", "金刚不灭体", 6, 0, 0),
                // 华山派
                new 技能("华山派","poyuquan", "劈石破玉拳", 1, 0, 0),
                new 技能("华山派","zixiashengong", "紫霞神功", 3, 0, 0),
                new 技能("华山派","kuangfengkuaijian", "狂风快剑", 3, 0, 0),
                new 技能("华山派","dugujiujian", "独孤九剑", 4, 0, 0),
                new 技能("华山派","feiyanhuixiang", "飞燕回翔", 1, "轻功", "无"),
                new 技能("华山派","huashanxinfa", "华山心法", 1, "内功", "无"),
                new 技能("华山派","huashanjianfa", "华山剑法", 1, "武器", "无"),
                new 技能("华山派","huashanquanfa", "华山拳法", 1, "拳脚", "无"),
                new 技能("华山派","poyuquan2", "劈石破玉拳(进阶)", 4, "拳脚", "招架"),
                new 技能("华山派","zixiashengong2", "紫霞神功(进阶)", 4, "内功", "无"),
                new 技能("华山派","dugujiujian2", "独孤九剑(进阶)", 5, "无", "无"),
                new 技能("华山派","kuangfengkuaijian2", "狂风快剑(进阶)", 5, "无", "无"),
                new 技能("华山派","dugujiujian4", "独孤剑诀", 6, 0, 0),
                // 峨眉派
                new 技能("峨眉派","zhutianbu", "诸天化身步", 1, 0, 0),
                new 技能("峨眉派","linjizhuang", "临济十二庄", 3, 0, 0),
                new 技能("峨眉派","jiuyinbaiguzhao", "九阴白骨爪", 3, 0, 0),
                new 技能("峨眉派","yitianjianfa", "倚天剑法", 4, 0, 0),
                new 技能("峨眉派","emeixinfa", "峨眉心法",1,"内功","无"),
                new 技能("峨眉派","jindingzhang", "金顶绵掌", 1, "拳脚", "招架"),
                new 技能("峨眉派","huifengjian", "回风拂柳剑", 2, "武器", "无"),
                new 技能("峨眉派","jiuyinbaiguzhao2", "九阴白骨爪(进阶)", 4, "拳脚", "招架"),
                new 技能("峨眉派","zhutianbu2", "诸天化身步(进阶)", 4, "轻功", "无"),
                new 技能("峨眉派","linjizhuang2", "临济十二庄(进阶)", 5, "无", "无"),
                new 技能("峨眉派","yitianjianfa2", "倚天剑法(进阶)", 5, "无", "无"),
                new 技能("峨眉派","yitianjianfa4", "诸天剑诀", 6, 0, 0),
                // 逍遥派
                new 技能("逍遥派", "lingboweibu", "凌波微步", 3, 0, 0),
                new 技能("逍遥派", "beimingshengong", "北冥神功", 3, 0, 0),
                new 技能("逍遥派", "liuyangzhang", "天山六阳掌", 3, 0, 0),
                new 技能("逍遥派", "xiaowuxianggong", "小无相功", 4, 0, 0),
                new 技能("逍遥派", "ruyidao", "如意刀", 1, "武器", "无"),
                new 技能("逍遥派", "xiaoyaoxinfa", "逍遥心法", 1, "内功", "无"),
                new 技能("逍遥派", "zhemeishou", "天山折梅手", 2, "拳脚", "招架"),
                new 技能("逍遥派", "beimingshengong2", "北冥神功(进阶)", 4, "内功", "招架"),
                new 技能("逍遥派", "liuyangzhang2", "天山六阳掌(进阶)", 4, "拳脚", "无"),
                new 技能("逍遥派", "lingboweibu2", "凌波微步(进阶)", 5, "无","无"),
                new 技能("逍遥派", "xiaowuxianggong2", "小无相功(进阶)", 5, "无", "无"),
                new 技能("逍遥派", "lingboweibu4", "神游太虚", 6, 0, 0),
                // 丐帮
                new 技能("丐帮", "huntianqigong2", "混元天罡(进阶)", 4, "内功", "无"),
                new 技能("丐帮", "xiaoyaoyou2", "逍遥游(进阶)", 4, "轻功", "无"),
                new 技能("丐帮", "dagoubang2", "打狗棒(进阶)", 5, "无", "无"),
                new 技能("丐帮", "xianglongzhang2", "降龙十八掌(进阶)", 5, "无", "无"),
                new 技能("丐帮", "xiaoyaoyou", "逍遥游", 2, 0, 0),
                new 技能("丐帮", "dagoubang", "打狗棒", 3, 0, 0),
                new 技能("丐帮", "huntianqigong", "混天气功", 3, 0, 0),
                new 技能("丐帮", "xianglongzhang", "降龙十八掌", 4, 0, 0),
                new 技能("丐帮", "jiaohuabangfa", "叫花棒法", 1, "武器", "招架"),
                new 技能("丐帮", "feiyanzoubi", "飞檐走壁", 1, "轻功", "无"),
                new 技能("丐帮", "gaibangxinfa", "丐帮心法", 1, "内功", "无"),
                new 技能("丐帮", "taizuchangquan", "太祖长拳", 1, "拳脚", "无"),
                new 技能("丐帮", "xianglongzhang4", "降龙掌", 6, 0, 0),
                // 杀手楼
                new 技能("杀手楼", "shashoubufa", "杀手步法", 1, "轻功", "无"),
                new 技能("杀手楼", "shashouxinfa", "杀手心法", 1, "内功", "无"),
                new 技能("杀手楼", "chuanxinzhang", "穿心掌", 2, 0, 0),
                new 技能("杀手楼", "shashengjue", "杀生决", 3, 0, 0),
                new 技能("杀手楼", "taxuexunmei", "踏雪寻梅", 3, 0, 0),
                new 技能("杀手楼", "mantianhuayu", "漫天花雨", 4, 0, 0),
                new 技能("杀手楼", "feidao", "飞刀", 1, "武器", "无"),
                new 技能("杀手楼", "chuanxinzhang2", "穿心掌(进阶)", 4, "拳脚", "招架"),
                new 技能("杀手楼", "shashengjue2", "杀生决(进阶)", 4, "内功", "无"),
                new 技能("杀手楼", "mantianhuayu2", "漫天花雨(进阶)", 5, "武器", "无"),
                new 技能("杀手楼", "taxuexunmei2", "踏雪寻梅(进阶)", 5, "轻功", "无"),
                new 技能("杀手楼", "mantianhuayu4", "天谕", 6, 0, 0),
                // 六扇门
                new 技能("六扇门", "zonghengshu", "纵横术", 1, "招架", "无"),
                new 技能("六扇门", "qianlizhuifeng", "千里追风", 2, "轻功", "无"),
                new 技能("六扇门", "feilongshou", "飞龙探云手", 2, "拳脚", "无"),
                new 技能("六扇门", "shuangdao", "双刀流", 3, "武器", "无"),
                new 技能("六扇门", "tianluodiwang", "天罗地网", 4, "武器", "无"),
                new 技能("六扇门", "xixingdafa", "吸星大法", 4, "内功", "无"),
                // 公共内功
                new 技能("公共内功", "hamagong", "蛤蟆功", 4, "内功", "拳脚"),
                new 技能("公共内功", "huagongdafa", "化功大法", 4, "内功", "无"),
                new 技能("公共内功", "mingyugong", "明玉功", 4, "内功", "轻功"),
                new 技能("公共内功", "kumushengong", "枯木神功", 4, "内功", "无"),
                new 技能("公共内功", "shenzhaojing", "神照经", 4, "内功", "拳脚"),
                new 技能("公共内功", "xuehaimogong", "血海魔功", 4, "内功", "无"),
                new 技能("公共内功", "longxianggong", "龙象般若功", 5, "内功", "无"),
                new 技能("公共内功", "kuihuashengong", "葵花神功", 5, "内功", "无"),
                new 技能("公共内功", "bahuanggong", "不老长春功", 5, "内功", "无"),
                new 技能("公共内功", "jiuyangshengong", "九阳神功", 5, "内功", "无"),
                new 技能("公共内功", "jiuyinshengong", "九阴神功", 5, "内功", "无"),
                new 技能("公共内功", "taixuangong", "太玄功", 5, "内功", "无"),
                new 技能("公共内功", "mizongxinfa", "密宗心法", 1, "内功", "无"),
                new 技能("公共内功", "yunlongxinfa", "云龙心法", 1, "内功", "无"),
                new 技能("公共内功", "lengyueshengong", "冷月神功", 1, "内功", "无"),
                new 技能("公共内功", "shenlongxinfa", "神龙心法", 2, "内功", "无"),
                new 技能("公共内功", "wudushengong", "五毒神功", 2, "内功", "无"),
                new 技能("公共内功", "biboshengong", "碧波神功", 2, "内功", "无"),
                new 技能("公共内功", "baiyunxinfa", "白云心法", 3, "内功", "无"),
                new 技能("公共内功", "zhenyuejue", "镇岳诀", 3, "内功", "无"),
                new 技能("公共内功", "shenghuoshengong", "圣火神功", 3, "内功", "无"),
                new 技能("公共内功", "hanbingzhenqi", "寒冰真气", 4, "内功", 0),
                new 技能("公共内功", "xiantiangong", "先天功", 4, "内功", 0),
                new 技能("公共内功", "mengguxinfa", "蒙古心法", 2, "内功", 0),
                new 技能("公共内功", "panshishengong", "磐石神功", 3, "内功", 0),
                new 技能("公共内功", "yunvxinjing", "玉女心经", 3, "内功", 0),
                // 公共轻功
                new 技能("公共轻功", "shenxingbaibian", "神行百变", 2, "轻功", "无"),
                new 技能("公共轻功", "tagexing", "踏歌行", 2, "轻功", "无"),
                new 技能("公共轻功", "tiannanbu", "天南步", 2, "轻功", "无"),
                new 技能("公共轻功", "jinsheyoushenbu", "金蛇游身步", 3, "轻功", "无"),
                new 技能("公共轻功", "wuduyanluobu", "五毒烟萝步", 3, "轻功", "无"),
                new 技能("公共轻功", "anyingfuxiang", "暗影浮香", 3, "轻功", "无"),
                new 技能("公共轻功", "xuanxubu", "玄虚步", 4, "轻功", "无"),
                new 技能("公共轻功", "yixingbufa", "意形步法", 1, "轻功", "无"),
                new 技能("公共轻功", "yunlongshenfa", "云龙身法", 1, "轻功", "无"),
                new 技能("公共轻功", "jinyangong", "金雁功", 1, "轻功", "无"),
                new 技能("公共轻功", "sixiangbu", "四象步法", 2, "轻功", "无"),
                new 技能("公共轻功", "hengshanshenfa", "恒山身法", 2, "轻功", "无"),
                new 技能("公共轻功", "chuanyunzong", "穿云纵", 2, "轻功", "无"),
                new 技能("公共轻功", "chanchubufa", "蟾蜍步法", 2, "轻功", "无"),
                new 技能("公共轻功", "qingfushenfa", "青蝠身法", 2, "轻功", "无"),
                new 技能("公共轻功", "zhaixingong", "摘星功", 2, "轻功", 0),
                new 技能("公共轻功", "shenkongxing", "身空行", 2, "轻功", 0),
                new 技能("公共轻功", "yunvshenfa", "玉女身法", 2, "轻功", 0),
                // 公共拳脚
                new 技能("公共拳脚", "yingzhuagong", "鹰爪功", 2, "拳脚", "招架"),
                new 技能("公共拳脚", "jinshezhang", "金蛇游身掌", 3, "拳脚", "无"),
                new 技能("公共拳脚", "dasongyangshenzhang", "大嵩阳神掌", 3, "拳脚", "无"),
                new 技能("公共拳脚", "qishangquan", "七伤拳", 3, "拳脚", "招架"),
                new 技能("公共拳脚", "sanyinzhua", "三阴蜈蚣爪", 3, "拳脚", "招架"),
                new 技能("公共拳脚", "tanzhishengong", "弹指神通", 4, "拳脚", "无"),
                new 技能("公共拳脚", "kongmingquan", "空明拳", 4, "拳脚", "无"),
                new 技能("公共拳脚", "canhezhi", "参合指", 4, "拳脚", "无"),
                new 技能("公共拳脚", "liumaishenjian", "六脉神剑", 5, "无","无"),
                new 技能("公共拳脚", "anranxiaohun", "黯然销魂掌", 5, "无", "无"),
                new 技能("公共拳脚", "taizuchangquan", "太祖长拳", 1, "拳脚", 0),
                new 技能("公共拳脚", "dashouyin", "密宗大手印", 1, "拳脚", "无"),
                new 技能("公共拳脚", "houquan", "猴拳", 1, "拳脚", "无"),
                new 技能("公共拳脚", "huagumianzhang", "化骨绵掌", 2, "拳脚", "无"),
                new 技能("公共拳脚", "baguaquan", "八卦拳", 2, "拳脚", "无"),
                new 技能("公共拳脚", "liuyunzhang", "流云掌", 2, "拳脚", "无"),
                new 技能("公共拳脚", "taishanquanfa", "泰山拳法", 2, "拳脚", "招架"),
                new 技能("公共拳脚", "jueqingzhang", "绝情掌", 2, "拳脚", "无"),
                new 技能("公共拳脚", "tianchangzhang", "天长掌法", 3, "拳脚", "无"),
                new 技能("公共拳脚", "cuixinzhang", "摧心掌", 3, "拳脚", "无"),
                new 技能("公共拳脚", "yiyangzhi", "一阳指", 4, "拳脚", 0),
                new 技能("公共拳脚", "qianzhuwandushou", "千蛛万毒手", 3, "拳脚", "招架"),
                //
                // 公共招架
                new 技能("公共招架","yihuajiemu", "移花接木", 4, "招架", "无"),
                new 技能("公共招架","douzhuanxingyi", "斗转星移", 5, "无", "无"),
                new 技能("公共招架","qiankundanuoyi", "乾坤大挪移", 5, "无", "无"),
                // 公共剑法
                new 技能("公共剑法", "hengshanwushenjian", "衡山五神剑", 3, "武器", "招架"),
                new 技能("公共剑法", "quanzhenjianfa", "全真剑法", 3, "武器", "无"),
                new 技能("公共剑法", "bixiejianfa", "辟邪剑法", 5, "无", "无"),
                new 技能("公共剑法", "xuantiejianfa", "玄铁剑法", 5, "无", "无"),
                new 技能("公共剑法", "shenlongjian", "神龙剑", 1, "武器", "无"),
                new 技能("公共剑法", "tangshijianfa", "唐诗剑法", 1, "武器", "无"),
                new 技能("公共剑法", "yunlongjian", "云龙剑", 2, "武器", "无"),
                new 技能("公共剑法", "shenghuojianfa", "圣火令法", 2, "武器", "无"),
                new 技能("公共剑法", "jinshejianfa", "金蛇剑法", 3, "武器", "无"),
                new 技能("公共剑法", "wudugoufa", "五毒钩法", 3, "武器", "无"),
                new 技能("公共剑法", "hengshanjianfa", "恒山剑法", 3, "武器", "无"),
                new 技能("公共剑法", "songfengjianfa", "松风剑法", 3, "武器", "招架"),
                new 技能("公共剑法", "songshanjianfa", "嵩山剑法", 3, "武器", "招架"),
                new 技能("公共剑法", "luoyingshenjian", "落英神剑", 3, "武器", "无"),
                new 技能("公共剑法", "yifengjian", "移风剑法", 3, "武器","无"),
                new 技能("公共剑法", "tianyuqijian", "天羽奇剑", 3, "武器", "无"),
                new 技能("公共剑法", "shenjianjue", "神剑诀", 2, "武器", "无"),
                new 技能("公共剑法", "taishanjianfa", "泰山剑法", 3, "武器", 0),
                new 技能("公共剑法", "duanjiajianfa", "段家剑", 3, "武器", 0),
                // 公共刀法
                new 技能("公共刀法","wuhuduanmendao", "五虎断门刀", 1, "武器", "无"),
                new 技能("公共刀法","hujiadaofa", "胡家刀法", 2, "武器", "招架"),
                new 技能("公共刀法","kuangfengkuaidao", "狂风快刀", 3, "武器","无"),
                new 技能("公共刀法","xuedao", "血刀", 5, "无", "无"),
                // 公共棍法
                new 技能("公共棍法","juemengun", "绝门棍", 1, "武器", "轻功"),
                new 技能("公共棍法","baguagun", "八卦棍法", 2, "武器", "无"),
                new 技能("公共棍法","zhongpingqiang", "中平枪法", 3, "武器", "招架"),
                new 技能("公共棍法","mengguqiangfa", "蒙古骑枪", 3, "武器", "招架"),
                // 公共杖法
                new 技能("公共杖法", "shedaoqigong", "蛇岛奇功", 2, "武器", "招架"),
                new 技能("公共杖法", "lingshezhangfa", "灵蛇杖法", 4, "武器", "招架"),
                new 技能("公共杖法", "wuchangzhang", "无常杖", 2, "武器", "招架"),
                // 公共鞭法
                new 技能("公共鞭法", "yunlongbian", "云龙鞭法", 1, "武器", "无"),
                new 技能("公共鞭法", "qiufengfuchen", "秋风拂尘", 1, "武器", "无"),
                new 技能("公共鞭法", "yinsuojinling", "银索金铃", 3, "武器", "无"),
                // 公共暗器
                new 技能("公共暗器", "jinshezhui", "金蛇锥法", 2, "武器", "无"),
                new 技能("公共暗器", "feixingshu", "飞星术", 2, "武器", "无"),
                // 补充 new 技能("其他补充", "", "", 6, 0, 0),
                new 技能("其他补充", "wunianchangong", "无念禅功", 5, "内功", 0),
                new 技能("其他补充", "rulaishenzhang", "如来神掌", 5, "拳脚", 0),
                new 技能("其他补充", "changshengjue", "长生诀", 6, "内功", 0),
                new 技能("其他补充", "cihangjiandian", "慈航剑典", 6, "内功", 0),
                new 技能("其他补充", "yinyangjiuzhuan", "阴阳九转", 6, "内功", 0),
                new 技能("其他补充", "yuanyuewandao", "圆月弯刀", 4, "武器", "无"),
                new 技能("其他补充", "dabeifu", "天地交征阴阳大悲赋", 5, "内功", 0),
                new 技能("其他补充", "fumogun", "伏魔棍", 4, "武器", "无"),
                new 技能("其他补充", "fumozhang", "伏魔杖", 5, "武器", 0),
                new 技能("其他补充", "zhenyanshouyin", "真言手印", 5, "拳脚", 0),
                new 技能("其他补充", "bianjianfa", "彼岸剑法", 4, "武器", "招架"),
                new 技能("其他补充", "lingxibu", "灵犀步", 5, "轻功", "无"),
                new 技能("其他补充", "fuyujianfa", "覆雨剑法", 6, "武器", "招架"),
                new 技能("其他补充", "tianmoce", "天魔策", 6, "内功", "招架"),
                new 技能("其他补充", "zhanshentulu", "战神图录", 6, "内功", 0),
                new 技能("其他补充", "bite", "野兽扑咬", 0, 0, 0),
            ];
        },
        getWudaoData: function() {
            return [
                // 内功
                new 武道("御气之道", "内力上限＋", 125000, "", "force", "yq", 0),
                new 武道("防御之道", "防御＋", 2500, "", "force", "fy", 1),
                new 武道("气血之道", "气血＋", 60000, "", "force", "qx", 2),
                new 武道("炼体之术", "根骨＋", 400, "", "force", "gg", 3),
                new 武道("强体之术", "臂力＋", 300, "", "force", "bl", 4),
                new 武道("永生之道", "年龄－", 10, "岁", "force", "ln", 5),
                new 武道("守护之道", "免伤＋", 5, "%", "force", "ms", 6),
                new 武道("暴虐之道", "终伤＋", 5, "%", "force", "zs", 7),
                // 轻功
                new 武道("躲闪之道", "躲闪＋", 2500, "", "dodge", "ds", 8),
                new 武道("防御之道", "防御＋", 2000, "", "dodge", "fy", 9),
                new 武道("御气之道", "内力上限＋", 110000, "", "dodge", "yq", 10),
                new 武道("命中之道", "命中＋", 2000, "", "dodge", "mz", 11),
                new 武道("轻盈之道", "身法＋", 300, "", "dodge", "sf", 12),
                // 招架
                new 武道("招架之道", "招架＋", 2400, "", "parry", "zj", 13),
                new 武道("气血之道", "气血＋", 47500, "", "parry", "qx", 14),
                new 武道("御气之道", "内力上限＋", 110000, "", "parry", "yq", 15),
                new 武道("防御之道", "防御＋", 2000, "", "parry", "fy", 16),
                new 武道("明悟之术", "悟性＋", 150, "", "parry", "wx", 17),
                new 武道("炼体之术", "根骨＋", 300, "", "parry", "gg", 18),
                // 拳脚
                new 武道("命中之道", "命中＋", 2500, "", "unarmed", "mz", 19),
                new 武道("进攻之道", "攻击＋", 2150, "", "unarmed", "gj", 20),
                new 武道("御气之道", "内力上限＋", 110000, "", "unarmed", "yq", 21),
                new 武道("防守之道", "防御＋", 2000, "", "unarmed", "fy", 22),
                new 武道("招架之道", "招架＋", 2000, "", "unarmed", "zj", 23),
                new 武道("强体之术", "臂力＋", 400, "", "unarmed", "bl", 24),
                // 武器
                new 武道("进攻之道", "攻击＋", 2000, "", "weapon", "jg", 27),
                new 武道("精准之道", "命中＋", 2300, "", "weapon", "mz", 25),
                new 武道("防守之道", "防御＋", 2300, "", "weapon", "fy", 26),
                new 武道("招架之道", "招架＋", 2000, "", "weapon", "zj", 28),
                new 武道("强体之术", "臂力＋", 300, "", "weapon", "bl", 29),
                new 武道("躲闪之道", "躲闪＋", 2000, "", "weapon", "ds", 30),
                new 武道("残暴之心", "暴击＋", 2.5, "%", "weapon", "bj", 31),
            ];
        },


        // 刷新技能列表
        refreshSkills: function() {
            $("#角色姓名").html(wsmud.getRole().name);
            $("#境界选择").val(wsmud.getRole().state);
            $("#门派选择").val(wsmud.getRole().school);

            $(".skill tbody").html("");
            sortSkills(); // 刷新之前排个序
            wsmud.getRole().skills.forEach(skill => {
                $(".skill tbody").append(
                    $(`<tr class="color${skill.k}"></tr>`).append(
                        $(`<td>${skill.name}</td>`),
                        $(`<td>${skill.code}</td>`),
                        $(`<td contenteditable="true" class="editable" value="${skill.code}">${skill.level1}</td>`)
                        .blur(function() {
                            var code = $(this).attr("value");
                            var level = parseInt($(this).text());
                            // console.log(level);
                            if (isNaN(level)) { // 之前使用 level == NaN 是错误的
                                wsmud.showMessage("等级数据错误！");
                            } else {
                                wsmud.getRole().setSkillLevelByCode(code, level);
                            }
                        }),
                        $("<td></td>").append(skill.color == 0 ? "" :
                            $(`<a href="" onclick="return false" code="${skill.code}">✘</a>`).click(function() {
                                wsmud.deleteSkillByCode($(this).attr("code"));
                            })
                        )
                    )
                );
            });
            // wsmud.refreshPractices();
        },
        // 刷新练习列表
        refreshPractices: function() {
            $(".practice tbody").html("");
            wsmud.getRole().skills.forEach(skill => {
                $(".practice tbody").append(
                    $(`<tr class="color${skill.k}"></tr>`).append(
                        $(`<td>${skill.name}</td>`),
                        $(`<td>${skill.level1}</td>`),
                        $(`<td class="editable" contenteditable="true" value="${skill.code}">${skill.level2}</td>`)
                        .blur(function() {
                            var code = $(this).attr("value");
                            var level = parseInt($(this).text());
                            if (isNaN(level)) {
                                wsmud.showMessage("等级数据错误！");
                            } else {
                                console.log(code, level);
                                wsmud.getRole().setSkillLevelToByCode(code, level);
                                wsmud.refreshPractices();
                            }
                        }),
                        $(`<td>${skill.cost < 10000 ? skill.cost : (parseInt(skill.cost / 10000) + "万")}</td>`),
                        $(`<td></td>`)
                        .append($(`<input type="checkbox" code="${skill.code}">`)
                        .prop("checked", skill.needPractice).click(function() {
                            var code = $(this).attr("code");
                            var bool = $(this).prop("checked");
                            wsmud.getRole().setNeedPracticeByCode(code, bool);
                            wsmud.refreshAutoCode();
                            wsmud.refreshPracticeCost();
                        })),
                        $(`<td></td>`)
                        .append($(`<input type="checkbox" code="${skill.code}">`)
                        .prop("checked", skill.limitPractice).click(function() {
                            var code = $(this).attr("code");
                            var bool = $(this).prop("checked");
                            wsmud.getRole().setLimitPracticeByCode(code, bool);
                            wsmud.refreshAutoCode();
                            wsmud.refreshPracticeCost();
                        })),
                    )
                );
            });
            wsmud.refreshAutoCode();
            wsmud.refreshPracticeCost();
        },
        // 刷新自动练习代码
        refreshAutoCode: function() {
            var string = "";
            var role = wsmud.getRole();
            if (role.needGohouse) string += "jh fam 0 start,go west,go west,go north,go enter,go west,";
            if (role.needGoparty) string += "jh fam 0 start,go south,go south,go east,go east,go east,go north,";
            if (!role.needGohouse && !role.needGoparty) string += "";
            // string += role.needGohouse ? "jh fam 0 start,go west,go west,go north,go enter,go west," : "";
            role.skills.forEach(skill => {
                if ((skill.needPractice) || (skill.limitPractice)) {
                    if (skill.limitPractice) {
                        string += `lianxi ${skill.code},`;
                    } else {
                        string += `lianxi ${skill.code} ${skill.level2},`;
                    }
                }
            });
            string += role.needWakuang ? "wakuang" : "xiulian";
            $("#autocode").html(string);
        },
        // 刷新练习消耗
        refreshPracticeCost: function() {
            var role = wsmud.getRole();
            var cost = 0;
            role.skills.forEach(skill => {
                if (skill.needPractice) {
                    cost += skill.cost;
                }
            });
            var t = cost / (role.iq1 + role.iq2) / (1 + role.rate / 100 + role.iq1 / 100) / 12;
            var string = "";
            if (t < 60) {
                string = string + parseInt(t) + "分钟";
            } else {
                var h = parseInt(t / 60);
                var m = parseInt(t % 60);
                if (h > 24) {
                    var d = parseInt(h / 24);
                    h = h % 24;
                    string = string + d + "天";
                }
                string = string + h + "小时" + m + "分钟";
            }
            $("#costAndTime").html(`至少需要消耗<br>${cost < 10000 ? cost : (parseInt(cost / 10000) + "万")}潜能<br>${string}`);
        },
        // 刷新武道列表
        refreshWuDaos: function() {
            var role = wsmud.getRole();
            $("#wd_title").html(`${schoolNames[role.school]} ${stateNames[role.state]}<br>${role.name}`);

            $(".wudaos tbody").html("");
            wsmud.getRole().skills.forEach(skill => {
                if (skill.wudaos.length == 0) {
                    return; // 没有进阶的技能不显示
                }
                $(".wudaos tbody").append($(`<tr class="color${skill.k}"></tr>`).append(
                    $(`<td>${skill.name}</td>`),
                    $(`<td>${skill.level1}</td>`),
                    $(`<td>${(function() {
                        var text = "";
                        skill.wudaos.forEach(wudao => {
                            // 计算武道的具体数值
                            console.log(wudao.id);
                            var value = 0;
                            for (var w of wsmud.getWudaoData()) {
                                if (w.id == wudao.id) {
                                    value = w.value;
                                    break;
                                }
                            }
                            wudao.value = parseInt(value / 1000 * skill.level1 / 5 * skill.k);
                            // 文本
                            if (text != "") text += "<br>&nbsp;";
                            text += typeNames[wudao.type];
                            text += wudao.text;
                        });
                        return `&nbsp;${text}`;
                    })()}</td>`).css("text-align", "left").css("font-size", "0.9em"),
                ))
            });
            // 武道进阶消耗了多少书？消耗了多少潜能？
            var book = 0, qian = 0, temp = {};
            var a = wsmud.getRole().wudaos; // [type, id, code]
            var count = a.length;
            // 先算潜能 100万+300万+500万+...+2000万+2000万 （2000万封顶）
            for (var i = 0; i < count; i++) {
                var n = (2 * i + 1) * 100;
                var value =  n > 2000 ? 2000 : n;
                qian += value;
            }
            // 再算书 每个类型 1+2+3+...+10+10 （10本封顶）
            a.forEach(b => {
                if (temp[b[0]]) {
                    temp[b[0]] ++;
                } else {
                    temp[b[0]] = 1;
                }
            });
            console.log(temp);
            for (var type in temp) {
                var n = temp[type];
                for (var i = 0; i < n; i++) {
                    var m = i + 1;
                    book += m > 10 ? 10 : m;
                }
            }
            $("#book").html(`武道书需要${book}本`);
            $("#qian").html(`潜能消耗${qian}万`);
        },

        // 添加技能
        addSkillByCode: function(code) {
            var check = wsmud.getRole().skills.find(skill => skill.code == code);
            if (check == undefined) {
                var skill = wsmud.getSkillData().find(skill => skill.code == code);
                wsmud.getRole().skills.push(skill);
                wsmud.refreshSkills();
            } else {
                wsmud.showMessage(`不可重复添加技能！${check.name} => ${check.code}`);
            }
        },
        // 删除技能
        deleteSkillByCode: function(code) {
            // console.log(this.getRole().skills);
            var index = this.getRole().skills.findIndex(skill => {
                return skill.code == code;
            });
            this.getRole().skills.splice(index, 1);

            var i = this.getRole().wudaos.length;
            while (i --) {
                var wudao = this.getRole().wudaos[i];
                if (wudao[2] == code) {
                    this.getRole().wudaos.splice(i, 1);
                }
            }

            wsmud.showMessage(`你删除了一个技能。 => ${code}`);
            wsmud.refreshSkills();
        },

        // 下载图片
        downloadImageById: function(id) {
            var content = document.getElementById(id);
            var w = content.offsetWidth, h = content.offsetHeight, scale = 3;
            var canvas = document.createElement("canvas");
            canvas.width = w * scale;
            canvas.height = h * scale;
            canvas.getContext("2d").scale(scale, scale);

            html2canvas(content, {
                canvas: canvas,
                scale: scale,
                width: w,
                height: h,
                logging: false,
            }).then(canvas => {
                var context = canvas.getContext("2d");
                context.mozImageSmoothingEnabled = false; //关闭抗锯齿
                context.webkitImageSmoothingEnabled = false;
                context.msImageSmoothingEnabled = false;
                context.imageSmoothingEnabled = false;
                var img = Canvas2Image.convertToImage(canvas, canvas.width, canvas.height);
                var data = img.getAttribute("src");
                download(data);
            });
            function download(data){
                var link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
                link.href = data;
                link.download = getFilename();
                var event = document.createEvent('MouseEvents');
                event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                link.dispatchEvent(event);
            };
            function getFilename() {
                if (wsmud.getRole()) {
                    var role = wsmud.getRole();
                    console.log(schoolNames[role.school]);
                    return `${schoolNames[role.school]}${stateNames[role.state]}${role.name}武道进阶数据图.png`;
                } else {
                    return "武道进阶数据图.png";
                }
            };
        }
    };
}();
window.addEventListener("load", function() {
    console.log("(Event) window.onload");
    wsmud.setMainHeight();
    wsmud.setElements();
    wsmud.showBlockByIndex(0);
});
window.addEventListener("resize", function() {
    console.log("(Event) window.resize");
    setTimeout(() => {
        wsmud.setMainHeight();
        setTimeout(() => {
            wsmud.setMainHeight();
        }, 10000);
    }, 200);
});

let update = `
3.12 构思了网页的布局
3.16 重构了武神小站的整体代码 (使用 jQuery)
3.16 修复了武道重置的 bug
3.16 优化了底部文字滚动的视觉效果
3.17 修复了姓名不同步的 bug
3.17 修复了武道属性数值小数过长的问题
3.17 修复了武道书消耗计算错误的 bug
3.17 增加了武道进阶单步撤销的功能
3.18 修复了删除武道进阶过的技能出错的 bug
3.18 增加了一键生成图片的功能
3.18 增加了生成武道流程的页面
3.20 修复了境界不同步的 bug
3.20 修复了门派不同步的 bug
3.25 增加了一键导入技能的功能
3.25 增加了保存多个存档的功能
3.26 多开页面的重构

??? 角色数据的导入导出
`;

var data = wsmud.getSkillData();
console.log(data);