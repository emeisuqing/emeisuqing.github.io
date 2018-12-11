var force = [new WuDaoAffix("【御气之道】", "内力上限＋", 125000, ""),
			 new WuDaoAffix("【防御之道】", "防御＋", 2500, ""),
			 new WuDaoAffix("【气血之道】", "气血＋", 60000, ""),
			 new WuDaoAffix("【炼体之术】", "根骨＋", 400, ""),
			 new WuDaoAffix("强体之道", "臂力＋", 300, ""),
			 new WuDaoAffix("永生之道", "年龄－", 10, "岁"),
			 new WuDaoAffix("守护之道", "免伤＋", 5, "%"),
			 new WuDaoAffix("暴虐之道", "终伤＋", 5, "%")];

var dodge = [new WuDaoAffix("【躲闪之道】", "躲闪＋", 2500, ""),
			 new WuDaoAffix("【防御之道】", "防御＋", 2500, ""),
			 new WuDaoAffix("御气之道", "内力上限＋", 110000, ""),
			 new WuDaoAffix("【命中之道】", "命中＋", 2000, ""),
			 new WuDaoAffix("轻盈之道", "身法＋", 300, "")];

var unarmed = [new WuDaoAffix("【命中之道】", "命中＋", 2500, ""),
			   new WuDaoAffix("【进攻之道】", "攻击＋", 2150, ""),
			   new WuDaoAffix("【御气之道】", "内力上限＋", 110000, ""),
			   new WuDaoAffix("【防守之道】", "防御＋", 2000, ""),
			   new WuDaoAffix("招架之道", "招架＋", 2000, ""),
			   new WuDaoAffix("强体之术", "臂力＋", 400, "")];

var parry = [new WuDaoAffix("【招架之道】", "招架＋", 2400, ""),
			 new WuDaoAffix("【气血之道】", "气血＋", 47500, ""),
			 new WuDaoAffix("【御气之道】", "内力上限＋", 110000, ""),
			 new WuDaoAffix("防御之道", "防御＋", 2000, ""),
			 new WuDaoAffix("明悟之道", "悟性＋", 150, ""),
			 new WuDaoAffix("炼体之术", "根骨＋", 300, "")];

var weapon = [new WuDaoAffix("【进攻之道】", "攻击＋", 2000, ""),
		  	  new WuDaoAffix("【精准之道】", "命中＋", 2300, ""),
			  new WuDaoAffix("【防守之道】", "防御＋", 2300, ""),
			  new WuDaoAffix("【招架之道】", "招架＋", 2000, ""),
			  new WuDaoAffix("【强体之术】", "臂力＋", 300, ""),
			  new WuDaoAffix("躲闪之道", "躲闪＋", 2000, ""),
			  new WuDaoAffix("【残暴之心】", "暴击＋", 2.5, "%")];

var advanceData = [["force", force],
				   ["dodge", dodge],
				   ["unarmed", unarmed],
				   ["parry", parry],
				   ["weapon", weapon]];



				   // [].concat(force).concat(force).concat(force).concat(force)

// // // // // // // // // // // // // // // // // // // // 


function WuDaoAffix(affix, property, value, unit) {
	this.affix = affix;       // 武道词缀
	this.property = property; // 属性
	this.value = value;       // 数值
	this.unit = unit;         // 单位

	this.skill = new Skill();
}

WuDaoAffix.prototype.message = function() {
	var value = this.skill.colorInt * (this.value/5000);
	var message = this.affix+this.property+value+this.unit;
	return message;
}

// // // // // // // // // // // // // // // // // // // // 


// Skill对象
function Skill() {
	this.name = "";        // 技能名称
	this.colorInt = 0;     // 技能颜色（白绿蓝黄紫橙 0->5）
	this.level = 0;        // 技能等级（当前）
	this.advanceTimes = 0; // 进阶次数
	this.code = "";        // 技能代码（skid）
	this.class1 = "";      // 技能类别 1
	this.class2 = "";      // 技能类别 2
}

// 技能系数
Skill.prototype.k = function() {
	return 2.5 * (this.colorNumber + 1);
}

// 升级需要的潜能
Skill.prototype.skillPotentialUpToLevel = function(toLevel) {
	var temp = toLevel * toLevel - this.level * this.level;
	return this.k() * temp;
}

// 技能当前拥有的潜能
Skill.prototype.skillPotential = function() {
	return (this.k() * this.level * this.level);
}

