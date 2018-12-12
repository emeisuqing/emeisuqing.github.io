// 文件名称
var array_url = ["基础技能",
				 "华山派技能",
				 "少林派技能",
				 "峨眉派技能",
				 "逍遥派技能",
				 "其他技能"];

// 入口
function start() {
	for (var i = 0; i < array_url.length; i++) {
		var skills = document.getElementById("skills");
		var div = document.createElement("div");
		var p = document.createElement("p");
 		div.appendChild(p);
		skills.appendChild(div);

		p.innerHTML = array_url[i];
		div.id = array_url[i];
		getDataFromURL(array_url[i]);
	}
	createPractiseCodeButton();
	creatBackToVillaCodeButton();
}

// 处理读取到的文本 转化为 技能数据
function getDataFromURL(data_url) {
	$.ajax({
 		url: data_url,
 		dataType: 'text',
 	}).done(function(dataFile) {
 		if (!dataFile) return;
 		var dataArray = new Array();
 		var dataArray1 = dataFile.split(/\r?\n|\r/);
 		for (var i = 0; i < dataArray1.length; i++) {
 			var  dataArray2 = dataArray1[i].split(',');
 			dataArray[i] = dataArray2;
 		}
 		createSkillButton(dataArray, data_url);
 	});
}

// 技能数据 生成可以点击的按钮
function createSkillButton(dataArray, ID) {
	var div = document.getElementById(ID);
	for (var i = 0; i < dataArray.length; i++) {
		var button = document.createElement("button");
		button.type = "button";
		button.innerHTML = dataArray[i][0]; // 技能名称
		button.value = dataArray[i][1]; // 技能系数
		button.id = dataArray[i][2]; // 技能代码
		// 如果没有技能代码的话 不可以点击
		if (!dataArray[i][2]) {
			button.className = "skillButtonClicked"; // CSS
			button.onclick = null;
		} else { // 正常情况 可以点击
			button.className = "skillButton"; // 配置CSS
			button.onclick = clickSkillButton;
		}
		var div = document.getElementById(ID);
		div.appendChild(button);
	}
}
function clickSkillButton() { // 点击之后 转为 不可以点击
	addPractiseSkill(this.innerHTML, this.value, this.id);
	this.onclick = null;
	this.className = "skillButtonClicked"; // 配置CSS 被点击后
};
// END

// 表格的配置
function addPractiseSkill(skillName, skillValue, skillCode) {
	var table = document.getElementById("table"); // 表格
	var tr = document.createElement("tr"); // 行
	table.appendChild(tr);
	tr.id = skillCode + "tr";
	for (var i = 0; i < 6; i++) tr.appendChild(set_TD(i, skillName, skillValue, skillCode));
}
// 单元格的配置
function set_TD(index, skillName, skillValue, skillCode) {
	var td = document.createElement("td");
	td.id = skillCode + index;
	var tr = document.getElementById(skillCode + "tr");
	tr.value = skillValue;
	if (index == 0) {
		var selectColor = document.createElement("select");
		selectColor.id = skillCode + index;
		selectColor.options.add(new Option("白色", "1"));
		selectColor.options.add(new Option("绿色", "2"));
		selectColor.options.add(new Option("蓝色", "3"));
		selectColor.options.add(new Option("黄色", "4"));
		selectColor.options.add(new Option("紫色", "5"));
		selectColor.options.add(new Option("橙色", "6"));
		selectColor.onchange = function() {
			var skillValue = this.selectedIndex + 1;
			var skillCode = this.id.substring(0, this.id.length - 1);
			var tr = document.getElementById(skillCode + "tr");
			tr.className = "tr" + skillValue;
			tr.value = skillValue;
			updateData(skillCode); // 改变颜色
		};
		selectColor.selectedIndex = skillValue - 1;
		tr.className = "tr" + skillValue;
		td.appendChild(selectColor);
	}
	if (index == 1) td.innerHTML = skillName;
	if (index == 2 || index == 3) {
		if (index == 2) td.id = skillCode + "level1";
		if (index == 3) td.id = skillCode + "level2";
		td.innerHTML = 0;
		td.contentEditable = "true";
		td.style.background = "#333333";
		td.oninput = function() { // 改变等级数据
			updateData(this.id.substring(0, this.id.length - 6));
		};
	}
	if (index == 4) td.innerHTML = 0;
	if (index == 5) {
		td.style.width = "25px";
		var button = document.createElement(button);
		td.appendChild(button);
		button.type = "button";
		button.innerHTML = "×";
		button.onclick = function() {
			var tr = document.getElementById(skillCode + "tr");
			var table = document.getElementById("table");
			table.removeChild(tr);
			var button = document.getElementById(skillCode);
			button.className = "skillButton";
			button.onclick = clickSkillButton;
		};
	}
	return td;
}

// 改变颜色或者改变等级数据的时候，都需要更新技能数据。
function updateData(skillCode) {
	var tr = document.getElementById(skillCode + "tr");
	var k = parseFloat(tr.value * 2.5);
	var x = parseFloat(document.getElementById(skillCode + "level1").innerHTML);
	var y = parseFloat(document.getElementById(skillCode + "level2").innerHTML);
	var result = k * (y * y - x * x);
	document.getElementById(skillCode + "4").innerHTML = result;
}

function createPractiseCodeButton() {
	var button = document.createElement("button");
	button.type = "button";
	button.id = "createPractiseCode";
	button.innerHTML = "生成代码";
	button.onclick = clickCreatePractiseCodeButton;
	var p = document.getElementById("button");
	p.appendChild(button);
}

// 点击 生成练习代码
function clickCreatePractiseCodeButton() {
	var trArray = document.getElementById("table").children;
	var codeString = "";
	var qianneng = 0;
	for (var i = 1; i < trArray.length; i++) {
		var tr = trArray[i];
		var skillCode = tr.id.substring(0, tr.id.length - 2); // 技能代码
		var level = parseInt(tr.children[3].innerHTML); // 目标等级
		codeString = codeString + "lianxi " + skillCode + " " + level + ",";
		qianneng = qianneng + parseInt(tr.children[4].innerHTML);
	}
	codeString = codeString + "wakuang";
	var div = document.getElementById("code");
	div.innerHTML = codeString;
	var ps = document.getElementById("ps");
	ps.innerHTML = "感谢测试！将以上代码复制粘贴到游戏设置框内即可！<br>" + 
	  "请确保你有 " + qianneng + " 的潜能！以防挂机。";

	var button = document.getElementById("backToVillaCodeButton");
	button.onclick = clickBackToVillaCode;
	button.innerHTML = "添加自动回豪宅的代码";
}

// 关于回豪宅的代码
function creatBackToVillaCodeButton() {
	var button = document.createElement("button");
	button.id = "backToVillaCodeButton";
	button.type = "button";
	button.innerHTML = "添加自动回豪宅的代码";
	button.onclick = clickBackToVillaCode;
	var p = document.getElementById("button");
	p.appendChild(button);
}
function clickBackToVillaCode() {
	var code = "jh fam 0 start,go west,go west,go north,go enter,go west,";
	var div = document.getElementById("code");
	div.innerHTML = code + div.innerHTML;
	this.innerHTML = "取消自动回豪宅的代码";
	this.onclick = clickCreatePractiseCodeButton;
}
// END