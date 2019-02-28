var colorNameArray = ["白色","绿色","蓝色","黄色","紫色","橙色"]; // 0=白 1~5=绿蓝黄紫橙
var wudaoNameArray = ["无","内功","轻功","拳脚","招架","武器"]; // 0=无 1~4=内轻拳招 5=武器

var FILENAME = "skillData.wscs";
var skillData = {}; // 文件技能数据
var userSkills = []; // 用户技能数据
var wudaoList = {"内功":[],"轻功":[],"拳脚":[],"招架":[],"武器":[]}; // 武道进阶队列

// Skill 类
function Skill(skillClass, skillName, skillColor, skillId, wudao1, wudao2) {
	this.skillClass = skillClass;
	this.skillName = skillName;
	this.skillColor = skillColor;
	this.skillId = skillId;
	this.wudao1 = wudao1; // 类别1
	this.wudao2 = wudao2; // 类别2

	this.log = []; // 几轮武道类别
	this.affix = []; // 记录武道词条
	this.levelFr = 1000; // 记录当前等级
	this.levelTo = 1000; // 记录目标等级
}
Skill.prototype.canWudao = function(wudaoName) {
	if (this.wudao1==wudaoName || this.wudao2==wudaoName) {
		if (this.affix.length+colorNameArray.indexOf(this.skillColor)<5) return true;
	}
	return false;
};
Skill.prototype.k = function() {
	return colorNameArray.indexOf(this.skillColor)+this.affix.length+1;
};
Skill.prototype.color = function() {
	return (this.k()-1);
};
Skill.prototype.cost = function() {
	var cost = this.k()*2.5*(this.levelTo*this.levelTo - this.levelFr*this.levelFr);
	if (cost<0) cost = 0;
	return parseInt(cost);
};
Skill.prototype.newLevel = function() {
	this.levelFr = parseInt(Math.sqrt(this.levelFr*this.levelFr*(this.k()-1)/this.k()));
};

// Affix 类
function Affix(affix, property, value, unit) {
	this.affix = affix;       // 武道词缀
	this.property = property; // 属性
	this.value = value;       // 数值
	this.unit = unit;         // 单位
}
Affix.prototype.copy = function() {
	var copy = new Affix(this.affix, this.property, this.value, this.unit);
	return copy;
};
Affix.prototype.message = function(level, color) {
	var value = parseInt(level * color * (this.value/5000));
	var message = this.affix+this.property+value+this.unit;
	return message;
};

// 1000级橙色技能的武道数据
var FORCE = [new Affix("【御气之道】", "内力上限＋", 125000, ""),
			 new Affix("【防御之道】", "防御＋", 2500, ""),
			 new Affix("【气血之道】", "气血＋", 60000, ""),
			 new Affix("【炼体之术】", "根骨＋", 400, ""),
			 new Affix("【强体之术】", "臂力＋", 300, ""),
			 new Affix("【永生之道】", "年龄－", 10, "岁"),
			 new Affix("【守护之道】", "免伤＋", 5, "%"),
			 new Affix("【暴虐之道】", "终伤＋", 5, "%")];
var DODGE = [new Affix("【躲闪之道】", "躲闪＋", 2500, ""),
			 new Affix("【防御之道】", "防御＋", 2500, ""),
			 new Affix("【御气之道】", "内力上限＋", 110000, ""),
			 new Affix("【命中之道】", "命中＋", 2000, ""),
			 new Affix("【轻盈之道】", "身法＋", 300, "")];
var UNARMED = [new Affix("【命中之道】", "命中＋", 2500, ""),
			   new Affix("【进攻之道】", "攻击＋", 2150, ""),
			   new Affix("【御气之道】", "内力上限＋", 110000, ""),
			   new Affix("【防守之道】", "防御＋", 2000, ""),
			   new Affix("【招架之道】", "招架＋", 2000, ""),
			   new Affix("【强体之术】", "臂力＋", 400, "")];
var PARRY = [new Affix("【招架之道】", "招架＋", 2400, ""),
			 new Affix("【气血之道】", "气血＋", 47500, ""),
			 new Affix("【御气之道】", "内力上限＋", 110000, ""),
			 new Affix("【防御之道】", "防御＋", 2000, ""),
			 new Affix("【明悟之术】", "悟性＋", 150, ""),
			 new Affix("【炼体之术】", "根骨＋", 300, "")];
var WEAPON = [new Affix("【进攻之道】", "攻击＋", 2000, ""),
			  new Affix("【命中之道】", "命中＋", 2300, ""),
			  new Affix("【防守之道】", "防御＋", 2300, ""),
			  new Affix("【招架之道】", "招架＋", 2000, ""),
			  new Affix("【强体之术】", "臂力＋", 300, ""),
			  new Affix("【躲闪之道】", "躲闪＋", 2000, ""),
			  new Affix("【残暴之心】", "暴击＋", 2.5, "%")];
var AFFIX = {"内功":FORCE,"轻功":DODGE,"拳脚":UNARMED,"招架":PARRY,"武器":WEAPON};







// 开始
(function() {
	$.ajax({
 		url: FILENAME,
 		dataType: 'text',
 	}).done(function(dataFile) {
 		var rows = dataFile.split(/\r?\n|\r/);
 		for (var i = 0; i < rows.length; i++) {
 			var array = rows[i].split(",");
 			if (array.length<6) continue;
 			var skill = new Skill(array[0],array[1],array[2],array[3],array[4],array[5]);
 			var key = array[0];
 			if (skillData[key]==undefined) {
 				skillData[key] = [skill]; // 如果没有定义就创建第一个 key:array[0]
 			} else {
 				skillData[key].push(skill); // 添加 key:array[0,1,2,..]
 			}
 		} // skillData 处理完毕
 		layout();
		updateSkillList();
 	});
 	// AJAX是异步
})();

// 生成自动练习代码的部分
var isBackHome = false;
function clickBackHome() {
	$("#notBackHome").toggleClass("button");
	$("#notBackHome").toggleClass("clickedButton");
	$("#needBackHome").toggleClass("button");
	$("#needBackHome").toggleClass("clickedButton");
	isBackHome = !isBackHome;
	updateData();
}
var isWaKuang = true;
function clickWaKuang() {
	$("#wakuang").toggleClass("button");
	$("#wakuang").toggleClass("clickedButton");
	$("#xiulian").toggleClass("button");
	$("#xiulian").toggleClass("clickedButton");
	isWaKuang = !isWaKuang;
	updateData();
}

function layout() {
	$("#notBackHome").click(clickBackHome);
	$("#needBackHome").click(clickBackHome);
	$("#wakuang").click(clickWaKuang);
	$("#xiulian").click(clickWaKuang);
	$("#lxxl").blur(updateData);
	$("#xtwx").blur(updateData);
	$("#htwx").blur(updateData);
	
	var tds = document.getElementsByClassName("affixClassTds");
	for (var i = 0; i < tds.length; i++) {
		var button = document.createElement("button");
		button.type = "button";
		button.onclick = clickAffixClass;
		button.innerHTML = wudaoNameArray[i];
		if (i==0) button.id = "无";
		button.className = "button";
		tds[i].appendChild(button);
	}
}

function updateSkillList() {
	for (var key in skillData) { // 遍历数据
 		var td1 = document.createElement("td");
 		td1.innerHTML = "「"+key+"」";

 		var td2 = document.createElement("td");
 		var array = skillData[key];
 		for (var i = 0; i < array.length; i++) td2.appendChild(buttonBySkill(array[i]));

 		var tr = document.createElement("tr");
 		tr.appendChild(td1);
 		tr.appendChild(td2);
 		var table = document.getElementById("skillList");
 		table.appendChild(tr);
 	}
}
function buttonBySkill(skill) {
	var button = document.createElement("button");
 	button.type = "button";
 	button.innerHTML = skill.skillName;
 	// button.value = skill.skillColor;
 	button.id = skill.skillId;
 	button.className = "button";
 	button.onclick = addSkill; // 点击添加技能
 	return button;
}



// 添加技能
function addSkill() {
	for (var key in skillData) {
		for (var i = 0; i < skillData[key].length; i++) {
			var skill = skillData[key][i];
			if (skill.skillId==this.id) { // 找到
				userSkills.push(skill); // 添加
				this.onclick = null;
				this.className = "clickedButton";
				updateData();
				return;
			}
		}
	}
}
// 删除技能
function deleteSkill() {
	var tr = this.parentNode;
	tr.parentNode.removeChild(tr);

	var skillId = this.value;
	for (var i = 0; i < userSkills.length; i++) {
		if (userSkills.length==1) document.getElementById("skillTable").parentNode.className = "hidden";
		if (userSkills[i].skillId==skillId) {
			userSkills.splice(i, 1);
			var button = document.getElementById(skillId);
			button.className = "button";
			button.onclick = addSkill;
			return;
		}
	}
}
// 等级改变
function levelChanged() {
	var skillId = this.value;
	var levelFr = parseInt(document.getElementById(skillId+"_levelFr").innerHTML);
	var levelTo = parseInt(document.getElementById(skillId+"_levelTo").innerHTML);
	for (var i = 0; i < userSkills.length; i++) {
		if (userSkills[i].skillId==skillId) {
			userSkills[i].levelFr = levelFr;
			userSkills[i].levelTo = levelTo;
			updateData();
			return;
		}
	}

}

function clickAffixClass() {
	var array = document.getElementsByClassName("clickedWuDaoButton");
	for (var k = 0; k < array.length; k++) array[k].className = "button";
	this.className = "clickedWuDaoButton"; // 修改样式

	var AffixClass = this.innerHTML;
	var td = document.getElementById("skillsCanWuDao");
	td.innerHTML = "";

	for (var i = 0; i < userSkills.length; i++) { // 遍历
		if (userSkills[i].canWudao(AffixClass)) {
			var button = buttonBySkill(userSkills[i]);
			button.value = i;
			button.onclick = clickCanWudaoSkill;
			td.appendChild(button);
		}
	}
	if (td.innerHTML == "") td.innerHTML = "你没有可以武道进阶的技能呀？";
}

function clickCanWudaoSkill() {
	var skill = userSkills[this.value];
	var affixClass = document.getElementsByClassName("clickedWuDaoButton")[0].innerHTML;

	if (wudaoList[affixClass][1]==undefined) {
		for (var j = 0; j < AFFIX[affixClass].length; j++) {
			wudaoList[affixClass][j] = AFFIX[affixClass][j].copy();
		}
	}

	for (var i = 0; i < 3; i++) {
		if (wudaoList[affixClass][i]==undefined) break;
		var button = document.createElement("button");
		button.innerHTML = wudaoList[affixClass][i].affix;
		button.className = "button";
		button.onclick = clickAffix;
		button.value = i;

		var tds = document.getElementsByClassName("affixTds");
		tds[i].innerHTML = ""; // 先清空
		tds[i].appendChild(button);
	}


	var td = document.getElementById("toConfirm");
	td.innerHTML = "TEST";

	var array = document.getElementsByClassName("clickedWuDaoButton");
	if (array.length>1) array[1].className = "button";
	this.className = "clickedWuDaoButton";
}

function clickAffix() {
	// 按钮的样式
	var array = document.getElementsByClassName("clickedWuDaoButton");
	if (array[2]!=undefined) array[2].className = "button";
	this.className = "clickedWuDaoButton";

	var string_class = array[0].innerHTML;
	var string_skill = array[1].innerHTML;
	var string_affix = array[2].innerHTML;

	var isRepeated = false; // flag

	string_class = "进阶"+string_class;
	for (var i = 0; i < userSkills.length; i++) {
		if (userSkills[i].skillName==string_skill) {
			string_skill = "技能：<span class=\""+userSkills[i].skillColor+"\">"+string_skill+"</span>";
			for (var j = 0; j < userSkills[i].affix.length; j++) {
				if (userSkills[i].affix[j].affix==string_affix) { // 不可重复进阶
					isRepeated = true;
					break;
				}
			}
			break;
		}
	}
	string_affix = "武道属性：<span class=\"橙色\">" + string_affix + "</span>";

	var td = document.getElementById("toConfirm");
	td.innerHTML = string_class+string_skill+"　"+string_affix+"　";

	var button = document.createElement("button");
	td.appendChild(button);

	if (isRepeated) {
		button.innerHTML = "无效";
	} else {
		button.type = "button";
		button.value = i;
		button.innerHTML = "确认";
		button.onclick = clickConfirm;
	}
}

function clickConfirm() {
	var array = document.getElementsByClassName("clickedWuDaoButton");

	var string_class = array[0].innerHTML;
	var string_skill = array[1].innerHTML;
	var string_affix = array[2].innerHTML;

	var skill = userSkills[this.value];

	for (var i = 0; i < wudaoList[string_class].length; i++) {
		var affix = wudaoList[string_class][i];
		if (affix.affix==string_affix) {
			skill.log.push(string_class); // 技能升阶
			skill.affix.push(affix); // 技能升阶
			skill.newLevel(); // 等级转换
			wudaoList[string_class].splice(i, 1); // 删除队列中的武道属性
			break;
		}
	}
	updateData();
}

function reset() {
	for (var i = 0; i < userSkills.length; i++) {
		skill = userSkills[i];
		skill.log = [];
		skill.affix = [];
		wudaoList = {"内功":[],"轻功":[],"拳脚":[],"招架":[],"武器":[]};
	}
	updateData();
}










function updateData() {
	var skillTable = document.getElementById("skillTable");
	while (skillTable.rows.length != 1) { // 清空表格
		skillTable.removeChild(skillTable.lastChild);
	}
	skillTable.parentNode.className = "hidden";

	var codeString = ""; // practise code
	if (isBackHome) codeString += "jh fam 0 start,go west,go west,go north,go enter,go west,";

	var qnxh = 0; // qnxh

	for (var i = 0; i < userSkills.length; i++) {
		skillTable.parentNode.className = "";
		var skill = userSkills[i];

		// practise code
		codeString = codeString + "lianxi " + skill.skillId + " " + skill.levelTo + ",";
		// qnxh
		qnxh += skill.cost();

		// table
		var td_skillName = document.createElement("td"); // 技能名称
		td_skillName.innerHTML = skill.skillName;
		td_skillName.className = "skillNameTd";
		var td_levelFr = document.createElement("td"); // 当前等级
		td_levelFr.contentEditable = true;
		td_levelFr.className = "editable";
		td_levelFr.id = skill.skillId + "_levelFr";
		td_levelFr.value = skill.skillId;
		td_levelFr.onblur = levelChanged;
		td_levelFr.innerHTML = skill.levelFr;
		var td_levelTo = document.createElement("td"); // 目标等级
		td_levelTo.contentEditable = true;
		td_levelTo.className = "editable";
		td_levelTo.id = skill.skillId + "_levelTo";
		td_levelTo.value = skill.skillId;
		td_levelTo.onblur = levelChanged;
		td_levelTo.innerHTML = skill.levelTo;
		var td_cost = document.createElement("td"); // 潜能消耗
		td_cost.id = skill.skillId + "_cost";
		td_cost.innerHTML = skill.cost();

		var td_class = document.createElement("td"); // 武道类别
		td_class.id = skill.skillId + "_class";
		td_class.innerHTML = "";
		var td_affix = document.createElement("td"); // 武道属性
		td_affix.id = skill.skillId + "_affix";
		td_affix.className = "affixTd";
		td_affix.innerHTML = "";

		var td_delete = document.createElement("td"); // 删除
		td_delete.value = skill.skillId;
		td_delete.innerHTML = "×";
		td_delete.onclick = deleteSkill;

		for (var x = 0; x < skill.log.length; x++) { //遍历武道记录
			if (x!=0) {
				td_class.innerHTML += "<br>";
				td_affix.innerHTML += "<br>";
			}
			td_class.innerHTML += skill.log[x];
			td_affix.innerHTML += skill.affix[x].message(skill.levelFr,skill.color());
		}

		var tr = document.createElement("tr");
		tr.className = colorNameArray[skill.color()];
		tr.appendChild(td_skillName);
		tr.appendChild(td_levelFr);
		tr.appendChild(td_levelTo);
		tr.appendChild(td_cost);
		tr.appendChild(td_class);
		tr.appendChild(td_affix);
		tr.appendChild(td_delete);

		skillTable.appendChild(tr);
	}

	var buttons = document.getElementsByClassName("clickedWuDaoButton");
	for (var n = 0; n < buttons.length; n++) buttons[n].className = "button";
	document.getElementById("无").className = "clickedWuDaoButton";
	document.getElementById("skillsCanWuDao").innerHTML = "请先选择武道类别";
	document.getElementsByClassName("affixTds")[0].innerHTML = "Simulator 2.0";
	document.getElementsByClassName("affixTds")[1].innerHTML = "Simulator 2.0";
	document.getElementsByClassName("affixTds")[2].innerHTML = "Simulator 2.0";
	document.getElementById("toConfirm").innerHTML = "使用的时候注意了哟，可能还有没解决的问题。";

	var cost = {"无":0,"内功":0,"轻功":0,"拳脚":0,"招架":0,"武器":0};
	for (var xx = 0; xx < userSkills.length; xx++) {
		for (var yy = 0; yy < userSkills[xx].log.length; yy++) {
			cost[userSkills[xx].log[yy]]++;
		}
	}
	var costBook = 0;
	for (var m = 0; m < 6; m++) {
		for (var nn = 0; nn < cost[wudaoNameArray[m]]; nn++) {
			if (nn+1 > 10) {
				costBook = costBook + 10;
			} else {
				costBook = costBook + (nn+1);
			}
		}
	}
	var costQianNeng = 0;
	var sum = 0;
	for (var key in cost) {
		sum = sum + cost[key];
	}
	for (var l = 0; l < sum; l++) {
		if ((2*l+1) > 20) {
			costQianNeng = costQianNeng + 20000000;
		} else {
			costQianNeng = costQianNeng + 1000000*(2*l+1);
		}
	}
	document.getElementById("totalBook").innerHTML = costBook;
	document.getElementById("totalQn").innerHTML = costQianNeng;

	// var button = document.getElementById("reset");
	// button.onclick = reset;
	$("#reset").click(reset); // jQuery 方式


	if (isWaKuang) {
		codeString += "wakuang";
	} else {
		codeString += "xiulian";
	}
	$("#code").html(codeString);

	// qnxh
	$("#qnxh").html(qnxh);
	var lxxl = parseInt($("#lxxl").html());
	var xtwx = parseInt($("#xtwx").html());
	var htwx = parseInt($("#htwx").html());

	var t = qnxh/(xtwx+htwx)/(100/100+lxxl/100-xtwx/100)/12;
	$("#time").html(timeText(t));
}

function timeText(t) {
	var string = "";
	if (t < 60) {
		string = string + parseInt(t) + "分钟";
		return string;
	} else {
		var h = parseInt(t/60);
		var m = parseInt(t%60);

		if (h>24) {
			var d = parseInt(h/24);
			h = h % 24;
			string = string + d + "天";
		}
		string = string + h + "小时" + m + "分钟";
		return string;
	}
}