"use strict";
window.namespace("wsmud.user");
wsmud.user = function() {
    var index = 0, roles = [], baseSkill = "基础技能";
    function load() {
        if (suqing.localLoad("sqlog") == null) return;
        index = suqing.localLoad("index");
        var objects = suqing.localLoad("roles");
        objects.forEach(object => {
            var role = new Role();
            role.parseObject(object);
            roles.push(role);
        });
        console.log("加载数据完毕");
    }
    function save() {
        suqing.localSave("sqlog", suqing.timestamp());
        suqing.localSave("index", index);
        suqing.localSave("roles", roles);
    }
    function getSkill(id) {
        var data = wsmud.data.skilldata;
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
            wsmud.data.skilldata[baseSkill].forEach(skill => {
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
            var skill = getSkill(id);
            console.log(skill);
            roles[index].skills.push(skill);
            console.log("新增技能 id = " + id);
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
        addSkillUpLogs: function(id, wudao) {
            getUserSkill(id).upLogs.push(wudao);
            save();
        },
        state: ["百姓", "武士", "武师", "宗师", "武圣", "武帝", "武神"],
        school: ["无门无派", "武当派", "少林派", "华山派", "峨眉派", "逍遥派", "丐帮", "杀手楼"],
        server: ["一区", "二区", "三区", "四区"],
        wudaos: {
            force: { cn: "内功", list: []},
            dodge: { cn: "轻功", list: []},
            parry: { cn: "招架", list: []},
            unarmed: { cn: "拳脚", list: []},
            weapon: { cn: "武器", list: []},
        },
    };
}();

wsmud.user.load();