class Lingwu {
    constructor(name, property, value, unit, type, id) {
        this.name = name;
        this.property = property;
        this.value = value;
        this.unit = unit;

        this.type = type;
        this.id = id;
    }

    parseObject(object) {
        for (var key in object) {
            this[key] = object[key];
        }
    }
    // getLingwuTextBySkill(skill) {
    //     var level = skill.level;
    //     var count = skill.color + skill.upgradeCount;
    //     var value = parseInt(level * count * (this.value / 5000));
    //     var text = this.name + this.property + value + this.unit;
    //     return text;
    // }

    getTextByLevelAndCount(level, count) {
        var value = parseInt(level * count * (this.value / 5000));
        var text = this.name + this.property + value + this.unit;
        return text;
    }
}

// function copyLingwu(value) {
//     var lingwu = new Lingwu(value.name, value.property, value.value, value.unit, value.type, value.id);
//     return lingwu;
// }

var WSData = {
    type: {
        force: {
            cn: "内功",
            ls: [],
        },
        dodge: {
            cn: "轻功",
            ls: [],
        },
        parry: {
            cn: "招架",
            ls: [],
        },
        unarmed: {
            cn: "拳脚",
            ls: [],
        },
        weapon: {
            cn: "武器",
            ls: [],
        },
    },
    force: function() {
        return [
            new Lingwu("【御气之道】", "内力上限＋", 125000, "", "force", 0),
            new Lingwu("【防御之道】", "防御＋", 2500, "", "force", 1),
            new Lingwu("【气血之道】", "气血＋", 60000, "", "force", 2),
            new Lingwu("【炼体之术】", "根骨＋", 400, "", "force", 3),
            new Lingwu("【强体之术】", "臂力＋", 300, "", "force", 4),
            new Lingwu("【永生之道】", "年龄－", 10, "岁", "force", 5),
            new Lingwu("【守护之道】", "免伤＋", 5, "%", "force", 6),
            new Lingwu("【暴虐之道】", "终伤＋", 5, "%", "force", 7),
        ];
    },
    dodge: function() {
        return [
            new Lingwu("【躲闪之道】", "躲闪＋", 2500, "", "dodge", 8),
            new Lingwu("【防御之道】", "防御＋", 2500, "", "dodge", 9),
            new Lingwu("【御气之道】", "内力上限＋", 110000, "", "dodge", 10),
            new Lingwu("【命中之道】", "命中＋", 2000, "", "dodge", 11),
            new Lingwu("【轻盈之道】", "身法＋", 300, "", "dodge", 12),
        ];
    },
    parry: function() {
        return [
            new Lingwu("【招架之道】", "招架＋", 2400, "", "parry", 13),
            new Lingwu("【气血之道】", "气血＋", 47500, "", "parry", 14),
            new Lingwu("【御气之道】", "内力上限＋", 110000, "", "parry", 15),
            new Lingwu("【防御之道】", "防御＋", 2000, "", "parry", 16),
            new Lingwu("【明悟之术】", "悟性＋", 150, "", "parry", 17),
            new Lingwu("【炼体之术】", "根骨＋", 300, "", "parry", 18),
        ];
    },
    unarmed: function() {
        return [
            new Lingwu("【命中之道】", "命中＋", 2500, "", "unarmed", 19),
            new Lingwu("【进攻之道】", "攻击＋", 2150, "", "unarmed", 20),
            new Lingwu("【御气之道】", "内力上限＋", 110000, "", "unarmed", 21),
            new Lingwu("【防御之道】", "防御＋", 2000, "", "unarmed", 22),
            new Lingwu("【招架之道】", "招架＋", 2000, "", "unarmed", 23),
            new Lingwu("【强体之术】", "臂力＋", 400, "", "unarmed", 24)
        ];
    },
    weapon: function() {
        return [
            new Lingwu("【进攻之道】", "攻击＋", 2000, "", "weapon", 27),
            new Lingwu("【命中之道】", "命中＋", 2300, "", "weapon", 25),
            new Lingwu("【防御之道】", "防御＋", 2300, "", "weapon", 26),
            new Lingwu("【招架之道】", "招架＋", 2000, "", "weapon", 28),
            new Lingwu("【强体之术】", "臂力＋", 300, "", "weapon", 29),
            new Lingwu("【躲闪之道】", "躲闪＋", 2000, "", "weapon", 30),
            new Lingwu("【残暴之心】", "暴击＋", 2.5, "%", "weapon", 31)
        ];
    },
}







// // 1000级橙色技能的武道数据
// var FORCE = [new Lingwu("【御气之道】", "内力上限＋", 125000, "", "force", 0),
// 			 new Lingwu("【防御之道】", "防御＋", 2500, "", "force", 1),
// 			 new Lingwu("【气血之道】", "气血＋", 60000, "", "force", 2),
// 			 new Lingwu("【炼体之术】", "根骨＋", 400, "", "force", 3),
// 			 new Lingwu("【强体之术】", "臂力＋", 300, "", "force", 4),
// 			 new Lingwu("【永生之道】", "年龄－", 10, "岁", "force", 5),
// 			 new Lingwu("【守护之道】", "免伤＋", 5, "%", "force", 6),
//              new Lingwu("【暴虐之道】", "终伤＋", 5, "%", "force", 7)];
             
// var DODGE = [new Lingwu("【躲闪之道】", "躲闪＋", 2500, "", "dodge", 8),
// 			 new Lingwu("【防御之道】", "防御＋", 2500, "", "dodge", 9),
// 			 new Lingwu("【御气之道】", "内力上限＋", 110000, "", "dodge", 10),
// 			 new Lingwu("【命中之道】", "命中＋", 2000, "", "dodge", 11),
// 			 new Lingwu("【轻盈之道】", "身法＋", 300, "", "dodge", 12)];

// var PARRY = [new Lingwu("【招架之道】", "招架＋", 2400, "", "parry", 13),
// 			 new Lingwu("【气血之道】", "气血＋", 47500, "", "parry", 14),
// 			 new Lingwu("【御气之道】", "内力上限＋", 110000, "", "parry", 15),
// 			 new Lingwu("【防御之道】", "防御＋", 2000, "", "parry", 16),
// 			 new Lingwu("【明悟之术】", "悟性＋", 150, "", "parry", 17),
//              new Lingwu("【炼体之术】", "根骨＋", 300, "", "parry", 18)];

// var UNARMED = [new Lingwu("【命中之道】", "命中＋", 2500, "", "unarmed", 19),
// 			   new Lingwu("【进攻之道】", "攻击＋", 2150, "", "unarmed", 20),
// 			   new Lingwu("【御气之道】", "内力上限＋", 110000, "", "unarmed", 21),
// 			   new Lingwu("【防御之道】", "防御＋", 2000, "", "unarmed", 22),
// 			   new Lingwu("【招架之道】", "招架＋", 2000, "", "unarmed", 23),
//                new Lingwu("【强体之术】", "臂力＋", 400, "", "unarmed", 24)];
               
// var WEAPON = [new Lingwu("【进攻之道】", "攻击＋", 2000, "", "weapon", 27),
// 			  new Lingwu("【命中之道】", "命中＋", 2300, "", "weapon", 25),
// 			  new Lingwu("【防御之道】", "防御＋", 2300, "", "weapon", 26),
// 			  new Lingwu("【招架之道】", "招架＋", 2000, "", "weapon", 28),
// 			  new Lingwu("【强体之术】", "臂力＋", 300, "", "weapon", 29),
// 			  new Lingwu("【躲闪之道】", "躲闪＋", 2000, "", "weapon", 30),
//               new Lingwu("【残暴之心】", "暴击＋", 2.5, "%", "weapon", 31)];

// var allLingwuData = {
//     "内功": getForce(),
//     "轻功": DODGE,
//     "拳脚": UNARMED,
//     "招架": PARRY,
//     "武器": WEAPON,
// };


