class WuDao {
    constructor(name, propCN, value, unit, type, prop, id) {
        this.name = name;     // 名字
        this.propCN = propCN; // 属性
        this.value = value;   // 数值 number
        this.unit = unit;     // 单位
        this.type = type;     // 进阶大类
        this.prop = prop;     // 属性
        this.id = id;         // 莫非设置的值
    }
    parseObject(object) {
        for (var key in object) this[key] = object[key];
    }
    getText(level, count) {
        console.log(`level: ${level}, count: ${count}`);
        var value = parseInt(level * count * (this.value / 5000));
        var text = this.name + this.propCN + value + this.unit;
        console.log(`text: ${text}`);
        return text;
    }
}

class Skill {
    constructor(id, name, color, typeOne, typeTwo) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.typeOne = typeOne;
        this.typeTwo = typeTwo;

        this.level = 0;     // 当前等级
        this.levelTo = 0;   // 目标等级
        this.doExe = false; // 是否需要练习
        this.upLogs = [];
        
        this.family = "";
        this.description = "description";

        // this.cost;
    }
    parseObject(object) {
        for (var key in object) {
            if (key == "upLogs") {
                object.upLogs.forEach(value => {
                    var wd = new WuDao();
                    wd.parseObject(value);
                    this[key].push(wd);
                });
            } else {
                this[key] = object[key];
            }
        }
    }
    // class = "color1"
    get colorStyle() {
        return "color" + (this.color + this.upLogs.length);
    }
    // 是否能够进阶 0白1绿2蓝3黄4紫
    get upable() {
        return (this.color + this.upCount) < 5 ? true : false;
    }
    // 进阶次数
    get upCount() {
        return this.upLogs.length;
    }
    // 系数
    get k() {
        return this.color + this.upLogs.length + 1;
    }
    // 消耗潜能
    get cost() {
        // console.log("Skill - skill.cost");
        if (this.level > this.levelTo) {
            return 0;
        } else {
            var cost = 2.5 * this.k * (this.levelTo * this.levelTo - this.level * this.level);
            return cost;
        }
    }
}

class Role {
    constructor(name, state, school, server) {
        this.name = name;
        this.state = state;
        this.school = school;
        this.server = server;

        this.skills = []; // 技能列表
        this.logs = [];   // 武道记录
        this.gohome = true;
        this.wakuang = true;
        this.iq1 = 50;
        this.iq2 = 1000;
        this.exe = 100; // %
    }
    parseObject(object) {
        for (const key in object) {
            if (key == "skills") {
                object[key].forEach(value => {
                    var skill = new Skill();
                    skill.parseObject(value);
                    this[key].push(skill);
                });
            // } else if (key == "logs") {
                
            } else {
                this[key] = object[key];
            }
        } 
    }
    static checkName(string) {
        var regular = /^[\u4e00-\u9fa5]+$/;
        return string && string.length > 0 && string.length < 7 && regular.test(string);
    }
}


/*
var wsdata = {
    getSkill: function(id) {
        console.log("查找技能：" + id);
        var dic = wsdata.skilldata;
        for (var key in dic) {
            var array = object[key];
            var skill = array.find(function(skill) {
                return skill.id == id;
            });
            return (new Skill).parseObject(JSON.parse(JSON.stringify(skill)))
        }
    },

    wudaodata: {
        
        // 1000级橙色武道属性值
        
    
}





// <!-- 
// 赵敏的戒指
// 0,命中:＋180,最终伤害＋3%,忽视对方防御＋3%,绝招冷却时间-3%
// 1,命中＋198,最终伤害＋3%,忽视对方防御＋3%,绝招冷却时间-3%
// 2,命中＋216,最终伤害＋3%,忽视对方防御＋3%,绝招冷却时间-3%
// 3,命中＋252,最终伤害＋3%,忽视对方防御＋3%,绝招冷却时间-3%
// 4,命中＋306,最终伤害＋3%,忽视对方防御＋3%,绝招冷却时间-3%
// 5,命中＋378,最终伤害＋3%,忽视对方防御＋3%,绝招冷却时间-3%
// 6,命中＋468,最终伤害＋3%,忽视对方防御＋3%,绝招冷却时间-3%
// 7,命中＋576,最终伤害＋3%,忽视对方防御＋3%,绝招冷却时间-3%
// 8,命中＋702,最终伤害＋3%,忽视对方防御＋3%,绝招冷却时间-3%
// 9,命中＋846,最终伤害＋4%,忽视对方防御＋4%,绝招冷却时间-4%
// 10,命中＋1008,最终伤害＋4%,忽视对方防御＋4%,绝招冷却时间-4%
// 11,命中＋0,最终伤害＋3%,忽视对方防御＋3%,绝招冷却时间-3%
// 12,命中＋0,最终伤害＋3%,忽视对方防御＋3%,绝招冷却时间-3%

// 杨不悔的项链
// 8,根骨:+117,悟性:+136,身法:+136,容貌:+7
// 9,根骨:+141,悟性:+164,身法:+164,容貌:+8
// 10,根骨:+168,悟性:+196,身法:+196,容貌:+9
// -->


*/