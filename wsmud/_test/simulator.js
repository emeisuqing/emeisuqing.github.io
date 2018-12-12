var skillArray = new Array();

var colorTextArray = ["白色", "绿色", "蓝色", "黄色", "紫色", "橙色"];
var skillClassArray = [["无", "none"], ["内功", "force"], ["轻功", "dodge"], ["拳法", "unarmed"], ["招架", "parry"], ["武器", "weapon"]];



function start() {
	var skillClassSelector1 = document.getElementById("skillclass1");
	var skillClassSelector2 = document.getElementById("skillclass2");
	for (var i = 0; i < skillClassArray.length; i++) {
		skillClassSelector1.options.add(new Option(skillClassArray[i][0], skillClassArray[i][1]));
		skillClassSelector2.options.add(new Option(skillClassArray[i][0], skillClassArray[i][1]));
	}
	var skillColorSelector = document.getElementById("skillcolor");
	
	for (var i = 0; i < colorTextArray.length; i++) skillColorSelector.options.add(new Option(colorTextArray[i], i));
	skillColorSelector.selectedIndex = 1;	

	var button = document.getElementById("addnewskill");
	button.type = "button";
	button.onclick = clickAddNewSkillButton;

	wudao();
}

function clickAddNewSkillButton() {
	var skillName = document.getElementById("skillname").innerHTML;
	var td = document.getElementById("message1");

	if (!skillName) {
		td.innerHTML = "请输入技能名称！";
		return;
	}
	for (var i = 0; i < skillArray.length; i++) {
		if (skillArray[i].name == skillName) {
			td.innerHTML = "不可重复添加相同的技能！";
			return;
		}
	}

	var skillClassSelector1 = document.getElementById("skillclass1");
	var skillClassSelector2 = document.getElementById("skillclass2");
	var skillClass1 = skillClassSelector1.children[skillClassSelector1.selectedIndex].value;
	var skillClass2 = skillClassSelector2.children[skillClassSelector2.selectedIndex].value;
	if (skillClass1 == "none" && skillClass2 == "none") {
		td.innerHTML = "请选择技能的对应分类！";
		return;
	}
	if (skillClass1 == skillClass2) {
		td.innerHTML = "技能分类不能重复！";
		return;
	}

	var skill = new Skill();
	skill.name = skillName;
	skill.class1 = skillClass1;
	skill.class2 = skillClass2;
	skill.level = 1000;
	skill.colorInt = document.getElementById("skillcolor").selectedIndex;
	skillArray.push(skill);

	td.innerHTML = "你已经成功添加技能：" + skill.name;
	updateTable();
}


function updateTable() {
	var table = document.getElementById("table");
	var skill = skillArray[skillArray.length-1];
	table.appendChild(createTrBySkill(skill));
}

function createTrBySkill(skill) {
	var tr = document.createElement("tr");
	tr.className = "tr" + skill.colorInt;
	tr.id = skill.name;

	var td1 = document.createElement("td");
	td1.innerHTML = skill.name;

	var td2 = document.createElement("td");
	td2.innerHTML = "1000";
	td2.contentEditable = "true";
	td2.className = "edit";

	var td3 = document.createElement("td");


	var classText = "";
	if (skill.class1 != "none") {
		for (var i = 1; i < skillClassArray.length; i++) {
			if (skill.class1 == skillClassArray[i][1]) 
				td3.innerHTML = skillClassArray[i][0];
		}
	}
	if (skill.class2 != "none") {
		for (var i = 1; i < skillClassArray.length; i++) {
			if (skill.class2 == skillClassArray[i][1]) {
				if (td3.innerHTML) {
					td3.innerHTML = td3.innerHTML + "　" + skillClassArray[i][0];
				} else {
					td3.innerHTML = skillClassArray[i][0];
				}
			}
		}
	}


	var td4 = document.createElement("td");
	td4.innerHTML = "×";
	td4.value = skill;
	td4.onclick = clickDeleteSkill;

	tr.appendChild(td1);
	tr.appendChild(td2);
	tr.appendChild(td3);
	tr.appendChild(td4);
	return tr;
}

function clickDeleteSkill() {
	var skill = this.value;
	var tr = document.getElementById(skill.name);
	var table = document.getElementById("table");
	table.removeChild(tr);

	for (var i = 0; i < skillArray.length; i++) {
		if (skill == skillArray[i]) {
			skillArray.splice(i, 1);
			return;
		}
	}
}

function wudao() {
	var tr = document.getElementById("wudao1");
	var td = document.createElement("td");
	var button = document.createElement("button");
	button.type = "button";
	button.onclick = clickWuDao;
	button.innerHTML = "模拟武道进阶";
	tr.appendChild(td);
	td.appendChild(button);



}

function clickWuDao() {
	var tr = document.getElementById("wudao1");
	clearAllChlidren(tr);
	var td = document.createElement("td");
	tr.appendChild(td);

	for (var i = 1; i < skillClassArray.length; i++) {
		classText = skillClassArray[i][0];
		classValue = skillClassArray[i][1];
		var button = document.createElement("button");
		button.type = "button";
		button.innerHTML = classText;
		button.value = classValue;
		button.onclick = clickSkillClass;
		td.appendChild(button);
	}
}

function clickSkillClass() {
	var td = document.getElementById("wudao2");
	td.value = this.value;
	if (skillArray.length == 0) {
		td.innerHTML = "你没有可以进阶的技能呀？";
		return;
	}
	for (var i = 0; i < advanceData.length; i++) {

		if (advanceData[i][0] == this.value) {
			var array = advanceData[i][1];
			for (var j = 0; j < 3; j++) {
				if (j == 0) td.innerHTML = "";
				var affix = array[j];
				var button = document.createElement("button");
				button.type = "button";
				button.innerHTML = affix.affix;
				affixFlag = affix;
				button.onclick = clickAffix;
				td.appendChild(button);
			}
		}
	}
}

var affixFlag = new WuDaoAffix();

function clickAffix() {
	var affix = affixFlag;
	var td = document.getElementById("wudao2");
	var classValue = td.value;
	for (var i = 0; i < skillArray.length; i++) {
		var skill = skillArray[i];
		if (skill.class1 == classValue || skill.class2 == classValue) {
			affix.skill = skill;

			var table = document.getElementById("message");
			var tr = document.createElement("tr");
			var td = document.createElement("td");
			td.innerHTML = affix.skill.name + affix.message();
			tr.appendChild(td);
			table.appendChild(tr);
			return;
		}
	}
}

function clearAllChlidren(element) {
	for (var i = 0; i < element.children.length; i++) {
		element.removeChild(element.children[i]);
	}
}











