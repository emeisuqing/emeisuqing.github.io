/* * * * * * * * * * Simulator * * * * * * * * * */
function Simulator() {
	this.force = new Array();
	this.dodge = new Array();
	this.unarmed = new Array();
	this.parry = new Array();
	this.weapon = new Array();

	this.skills = new Array();
}
/* END */

/* * * * * * * * * * Skill * * * * * * * * * */
function Skill(name, color, level, classArr) {
	this.name = name;
	this.color = color;
	this.level = level;
	this.class = classArr;
	this.times = 0; // 进阶次数
	this.log = new Array();
	this.affix = new Array();
}
Skill.prototype.skillPotential = function(level) { // 技能等级对应的潜能
	return (2.5 * (this.color + 1) * level * level);
}
Skill.prototype.skillLevel = function() {
	return parseInt(Math.sqrt(this.skillPotential(this.level) / (2.5*(this.color+this.times+1))));
}
/* END */

/* * * * * * * * * * WuDaoAffix * * * * * * * * * */
function WuDaoAffix(affix, property, value, unit) {
	this.affix = affix;       // 武道词缀
	this.property = property; // 属性
	this.value = value;       // 数值
	this.unit = unit;         // 单位
}
WuDaoAffix.prototype.message = function(level, color) {
	var value = parseInt(level * color * (this.value/5000));
	var message = this.affix+this.property+value+this.unit;
	return message;
}
/* END */

/* * * * * * * * * * 常量 * * * * * * * * * */
const FORCE = [new WuDaoAffix("【御气之道】", "内力上限＋", 125000, ""), new WuDaoAffix("【防御之道】", "防御＋", 2500, ""), new WuDaoAffix("【气血之道】", "气血＋", 60000, ""), new WuDaoAffix("【炼体之术】", "根骨＋", 400, ""), new WuDaoAffix("强体之道", "臂力＋", 300, ""), new WuDaoAffix("永生之道", "年龄－", 10, "岁"), new WuDaoAffix("守护之道", "免伤＋", 5, "%"), new WuDaoAffix("暴虐之道", "终伤＋", 5, "%")];
const DODGE = [new WuDaoAffix("【躲闪之道】", "躲闪＋", 2500, ""), new WuDaoAffix("【防御之道】", "防御＋", 2500, ""), new WuDaoAffix("【御气之道】", "内力上限＋", 110000, ""), new WuDaoAffix("【命中之道】", "命中＋", 2000, ""), new WuDaoAffix("轻盈之道", "身法＋", 300, "")];
const UNARMED = [new WuDaoAffix("【命中之道】", "命中＋", 2500, ""), new WuDaoAffix("【进攻之道】", "攻击＋", 2150, ""), new WuDaoAffix("【御气之道】", "内力上限＋", 110000, ""), new WuDaoAffix("【防守之道】", "防御＋", 2000, ""), new WuDaoAffix("招架之道", "招架＋", 2000, ""), new WuDaoAffix("强体之术", "臂力＋", 400, "")];
const PARRY = [new WuDaoAffix("【招架之道】", "招架＋", 2400, ""), new WuDaoAffix("【气血之道】", "气血＋", 47500, ""), new WuDaoAffix("【御气之道】", "内力上限＋", 110000, ""), new WuDaoAffix("防御之道", "防御＋", 2000, ""), new WuDaoAffix("明悟之道", "悟性＋", 150, ""), new WuDaoAffix("炼体之术", "根骨＋", 300, "")];
const WEAPON = [new WuDaoAffix("【进攻之道】", "攻击＋", 2000, ""), new WuDaoAffix("【精准之道】", "命中＋", 2300, ""), new WuDaoAffix("【防守之道】", "防御＋", 2300, ""), new WuDaoAffix("【招架之道】", "招架＋", 2000, ""), new WuDaoAffix("【强体之术】", "臂力＋", 300, ""), new WuDaoAffix("躲闪之道", "躲闪＋", 2000, ""), new WuDaoAffix("【残暴之心】", "暴击＋", 2.5, "%")];
const COLOR = ["白色", "绿色", "蓝色", "黄色", "紫色", "橙色"];
const DIC = {"none":"无", "force":"内功", "dodge":"轻功", "unarmed":"拳法", "parry":"招架", "weapon":"武器", };
const SKILLS = [new Skill("五虎断门刀", 1, 1000, [5, 0]), new Skill("秋风拂尘", 1, 1000, [5, 0]), new Skill("云龙鞭法", 1, 1000, [5, 0]),
				new Skill("蛤蟆功", 4, 1000, [1, 3]), new Skill("灵蛇杖法", 4, 1000, [4, 5]),
				new Skill("蛇岛奇功", 2, 1000, [4, 5]), new Skill("胡家刀法", 2, 1000, [4, 5]),
				new Skill("八卦棍法", 2, 1000, [4, 5]), new Skill("中平枪法", 3, 1000, [4, 5]),
				new Skill("踏歌行", 2, 1000, [2, 0]), new Skill("天南步", 2, 1000, [2, 0]),
				new Skill("金蛇锥法", 2, 1000, [5, 0]), new Skill("狂风快刀", 3, 1000, [5, 0]),
				new Skill("衡山五神剑", 3, 1000, [4, 5]), new Skill("全真剑法", 3, 1000, [5, 0]),
				new Skill("明玉功", 4, 1000, [1, 2]), new Skill("移花接木", 4, 1000, [4, 0]),
				new Skill("九阴白骨爪", 4, 1000, [3, 4])];
/* END */


// 全局变量
var simulator = new Simulator();
var KEY = "none";
var cost = [0, 0, 0, 0, 0];

// 配置页面元素
function configurePage() {
	// 可选技能
	for (var i = 0; i < SKILLS.length; i++) {
		var button = document.createElement("button");
		button.type = "button";
		button.innerHTML = SKILLS[i].name;
		button.value = i;
		button.onclick = function() {
			var skill = SKILLS[this.value];
			document.getElementById("skillName").innerHTML = skill.name;
			document.getElementById("skillColorSelect").selectedIndex = skill.color;
			document.getElementById("skillLevel").innerHTML = skill.level;
			document.getElementById("classSelectOne").selectedIndex = skill.class[0];
			document.getElementById("classSelectTwo").selectedIndex = skill.class[1];
		}
		document.getElementById("chooseSkill").appendChild(button);
	}
	// 技能颜色的选择器
	for (var i = 0; i < COLOR.length; i++) {
		var option = new Option(COLOR[i], i);
		document.getElementById("skillColorSelect").options.add(option);
	}
	document.getElementById("skillColorSelect").selectedIndex = 4;
	// 技能类别的选择器
	for (var key in DIC) {
		var optionOne = new Option(DIC[key], key);
		document.getElementById("classSelectOne").options.add(optionOne);
		var optionTwo = new Option(DIC[key], key);
		document.getElementById("classSelectTwo").options.add(optionTwo);
	}
	// 确认按钮
	document.getElementById("addSkillButton").type = "button";
	document.getElementById("addSkillButton").onclick = clickAddSkillButton;
	// 进阶按钮
	for (var key in DIC) {
		if (key != "none") {
			var id = key + "Button";
			document.getElementById(id).type = "button";
			document.getElementById(id).value = key;
			document.getElementById(id).onclick = clickSkillClassButton;
		}
	}
}

// 按钮 确认添加技能
function clickAddSkillButton() {
	var skill = new Skill();
	skill.name = document.getElementById("skillName").innerHTML;
	for (var i = 0; i < simulator.skills.length; i++) {
		if (simulator.skills[i].name==skill.name) {
			document.getElementById("message1").innerHTML = "不可重复添加相同技能！";
			return;
		}
	}
	skill.color = document.getElementById("skillColorSelect").selectedIndex;
	skill.level = parseInt(document.getElementById("skillLevel").innerHTML);
	var selectOne = document.getElementById("classSelectOne");
	var selectTwo = document.getElementById("classSelectTwo");
	skill.class = [selectOne.options[selectOne.selectedIndex].value,
				   selectTwo.options[selectTwo.selectedIndex].value];
	simulator.skills.push(skill);
	document.getElementById("message1").innerHTML = "你成功添加了技能："+skill.name;
	updateSkillTable();
}
// 按钮 技能进阶大类
function clickSkillClassButton() {
	document.getElementById("messageTdTwo").innerHTML = "你选择了 " + 
		DIC[this.value] + " 进行武道进阶";
	KEY = this.value;
	document.getElementById("advanceSkillList").innerHTML = "";
	updateThreeButton();
}
// 按钮 进阶三选一
function clickAdvanceButton() {
	document.getElementById("advanceSkillList").innerHTML = "";
	for (var i = 0; i < simulator.skills.length; i++) {
		var skill = simulator.skills[i];
		if (skill.class[0]==KEY || skill.class[1]==KEY) {
			if (skill.color+skill.times == 5) continue; // 橙色就不能再进阶了
			var button = document.createElement("button");
			button.type = "button";
			button.value = this.value;
			button.innerHTML = skill.name;
			button.onclick = clickSkillToAdvanceButton;
			document.getElementById("advanceSkillList").appendChild(button);
		}
	}
	if (document.getElementById("advanceSkillList").innerHTML=="") {
		document.getElementById("advanceSkillList").innerHTML = "你没有可以进阶的技能呀？";
	}
}
// 按钮 具体技能
function clickSkillToAdvanceButton() {
	var skillName = this.innerHTML;
	for (var i = 0; i < simulator.skills.length; i++) {
		if (simulator.skills[i].name == skillName) {
			simulator.skills[i].times++;
			simulator.skills[i].log.push(KEY); // 记录类别
			document.getElementById("advanceSkillList").innerHTML = "武道模拟器测试版";
			switch(KEY) {
				case "force":
					simulator.skills[i].affix.push(simulator.force[this.value]); // 记录词缀
					simulator.force.splice(this.value, 1);  // 删除进阶过的词缀
					cost[0]++;break;
				case "dodge":
					simulator.skills[i].affix.push(simulator.dodge[this.value]);
					simulator.dodge.splice(this.value, 1);cost[1]++;break;
				case "unarmed":
					simulator.skills[i].affix.push(simulator.unarmed[this.value]);
					simulator.unarmed.splice(this.value, 1);cost[2]++;break;
				case "parry":
					simulator.skills[i].affix.push(simulator.parry[this.value]);
					simulator.parry.splice(this.value, 1);cost[3]++;break;
				case "weapon":
					simulator.skills[i].affix.push(simulator.weapon[this.value]);
					simulator.weapon.splice(this.value, 1);cost[4]++;break;
				default:
					break;
			}
			updateThreeButton();
			updateSkillTable();
			break;
		}
	}
}

// 刷新页面 技能表格
function updateSkillTable() {
	document.getElementById("skillTable").innerHTML = "<tr><td>技能</td><td>等级</td><td>类别</td><td>属性</td></tr>";
	for (var i = 0; i < simulator.skills.length; i++) {
		var skill = simulator.skills[i];
		var td1 = document.createElement("td");
		td1.innerHTML = skill.name;

		var td2 = document.createElement("td");
		td2.innerHTML = skill.skillLevel();

		var td3 = document.createElement("td");
		var string3 = "";
		for (var j = 0; j < skill.log.length; j++) {
			string3 = string3 + DIC[skill.log[j]] + "<br>";
		}
		td3.innerHTML = string3;

		var td4 = document.createElement("td");
		var string4 = "";
		for (var j = 0; j < skill.affix.length; j++) {
			skill.affix.skill = skill;
			var message = skill.affix[j].message(skill.skillLevel(), skill.color+skill.times);
			string4 = string4 + message + "<br>";
		}
		td4.innerHTML = string4;

		var tr = document.createElement("tr");
		tr.className = "color" + (skill.color+skill.times);
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		tr.appendChild(td4);
		document.getElementById("skillTable").appendChild(tr);

		var costBook = 0;
		for (var k = 0; k < cost.length; k++) {
			for (var j = 0; j < cost[k]; j++) {
				if (j+1 > 10) {
					costBook = costBook + 10;
				} else {
					costBook = costBook + j + 1;
				}
			}
		}
		document.getElementById("costBook").innerHTML = costBook;

		var costQianNeng = 0;
		var sum = cost[0]+cost[1]+cost[2]+cost[3]+cost[4];
		for (var j = 0; j < sum; j++) {
			if ((2*j+1) > 20) {
				costQianNeng = costQianNeng + 20000000;
			} else {
				costQianNeng = costQianNeng + 1000000*(2*j+1);
			}
		}
		document.getElementById("costQianNeng").innerHTML = costQianNeng;
	}
}

// 刷新页面 进阶词条三选一
function updateThreeButton() {
	switch(KEY) {
		case "force":
			if (!simulator.force[2]) simulator.force = simulator.force.concat(FORCE);
			configureButton(simulator.force);
			break;
		case "dodge":
			if (!simulator.dodge[2]) simulator.dodge = simulator.dodge.concat(DODGE);
			configureButton(simulator.dodge);
			break;
		case "unarmed":
			if (!simulator.unarmed[2]) simulator.unarmed = simulator.unarmed.concat(UNARMED);
			configureButton(simulator.unarmed);
			break;
		case "parry":
			if (!simulator.parry[2]) simulator.parry = simulator.parry.concat(PARRY);
			configureButton(simulator.parry);
			break;
		case "weapon":
			if (!simulator.weapon[2]) simulator.weapon = simulator.weapon.concat(WEAPON);
			configureButton(simulator.weapon);
			break;
		default:
			break;
	}
	// 配置3个武道词条的按钮
	function configureButton(tempArray) {
		for (var i = 0; i < 3; i++) {
			var button = document.getElementById("advanceButton" + i);
			button.type = "button";
			button.value = i;
			button.innerHTML = tempArray[i].affix;
			button.onclick = clickAdvanceButton;
		}
	}
}














