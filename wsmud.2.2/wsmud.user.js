"use strict";
window.namespace("wsmud.user");
wsmud.user = function() {
    var fn = suqing.fun;
    var index = 0, roles = [], baseSkill = "基础技能";
    var list = {
        force: [],
        dodge: [],
        parry: [],
        unarmed: [],
        weapon: [],
    };
    function load() {
        if (fn.getLocalStorage("log") == null) {
            return;
        }
        index = fn.getLocalStorage("index");
        var objects = fn.getLocalStorage("roles");
        objects.forEach(object => {
            var role = new Role();
            role.parseObject(object);
            roles.push(role);
        });
        console.log("(WSMUD) 加载数据完毕");
    }
    function save() {
        fn.setLocalStorage("log", fn.getTimeStampNow());
        fn.setLocalStorage("index", index);
        fn.setLocalStorage("roles", roles);
    }
    function getSkill(id) {
        var data = wsmud.data.skilldata();
        console.log(data);
        for (var family in data) {
            for (var i = 0; i < data[family].length; i++) {
                var skill = data[family][i];
                if (skill.id == id) return skill;
            }
        }
    }
    function getUserSkill(id) {
        return roles[index].skills.find(skill => {
            return id == skill.id;
        });
    }
    return {
        roles: roles,
        load: load,
        getUserSkill: getUserSkill,
        getIndex: function() {
            return index;
        },
        setIndex: function(n) {
            index = n;
            save();
        },
        
        addRole: function(role) {
            wsmud.data.skilldata()[baseSkill].forEach(skill => {
                skill.family = baseSkill;
                role.skills.push(skill);
            });
            roles.push(role);
            console.log("新增角色 name = " + role.name);
            // sortSkills();
            save();
        },
        deleteRole: function(number) {
            if (index == number) index = 0;
            if (index > number) index --;
            roles.splice(number, 1);
            console.log("删除角色 index = " + number);
            save();
        },
        addSkill: function(id) {
            // console.log(wsmud.data.skilldata);
            var skill = getSkill(id);
            // skill.level = 1000;
            // console.log(skill);
            // console.log(wsmud.data.skilldata);
            roles[index].skills.push(skill);
            // console.log("新增技能 id = " + id);
            save();
        },
        deleteSkill: function(id) {
            var skills = roles[index].skills;
            skills.splice(skills.findIndex(skill => {
                return skill.id == id;
            }), 1);
            console.log("删除技能 id = " + id);
            save();
        },
        sortSkills: function() {
            var a = this.roles[index].skills, n = a.length;
            for (var j = 0; j < n - 1; j ++) {
                for (var i = 0; i < n - j - 1; i ++) {
                    // console.log(a[i], a[i + 1]);
                    if (a[i].k > a[i + 1].k) {
                        var temp = a[i];
                        a[i] = a[i + 1];
                        a[i + 1] = temp;
                    }
                }
            }
            console.log("技能排序完毕");
        },
        setSkillLevel: function(id, level) {
            getUserSkill(id).level = level;
            save();
        },
        setSkillLevelTo: function(id, levelTo) {
            getUserSkill(id).levelTo = levelTo;
            save();
        },
        setSkillDoExE: function(id, doExe) {
            getUserSkill(id).doExe = doExe;
            save();
        },
        setIq: function(iq1, iq2, exe) {
            roles[index].iq1 = iq1;
            roles[index].iq2 = iq2;
            roles[index].exe = exe;
            save();
        },
        // addSkillUpLogs: function(id, wudao) {
        //     getUserSkill(id).upLogs.push(wudao);
        //     save();
        // },
        state: ["百姓", "武士", "武师", "宗师", "武圣", "武帝", "武神"],
        school: ["无门无派", "武当派", "少林派", "华山派", "峨眉派", "逍遥派", "丐帮", "杀手楼"],
        server: ["一区", "二区", "三区", "四区"],
        resetWuDao: function() {
            roles[index].logs = [];
            for (var skill of roles[index].skills) {
                skill.upLogs = [];
            }
            save();
        },
        typeEN: ["force", "dodge", "parry", "unarmed", "weapon"],
        typeCN: ["内功", "轻功", "招架", "拳脚", "武器"],
        list: list,
        upWuDao: function(type, wdid, skid) {
            // console.log(list);
            // console.log([type, wdid, skid]);
            // console.log(list[type]);
            // debugger;

            if (list[type] == [] || list[type].length < 2) {
                console.log(list[type]);
                list[type] = wsmud.data.wudaodata()[type];
                console.log(list[type]);
            }
            for (var i = 0; i < 3; i++) {
                var wd = list[type][i];
                if (wd && wd.id == wdid) {
                    getUserSkill(skid).upLogs.push(wd);
                    // console.log(roles[index].logs);
                    
                    roles[index].logs.push([type, wdid, skid]);
                    list[type].splice(i, 1);
                    save();
                    // console.log(roles[index].logs);
                }
            }
            
        },
    };
}();

wsmud.user.load();


// 橙 k=5 紫4黄3蓝2绿1白0 