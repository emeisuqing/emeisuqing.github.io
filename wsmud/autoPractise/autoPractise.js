var data = new Array();

function start() {
	$.ajax({
		url: 'skillIdData',
		dataType: 'text',
	}).done(analyseData);
	lastButton();
}

function analyseData(dataFile) {
	var dataArray1 = dataFile.split(/\r?\n|\r/); // 按照行分割数据
	for (var i = 0; i < dataArray1.length; i++) {
		var  dataArray2 = dataArray1[i].split(','); // 按照逗号分割数据
		data[i] = dataArray2;
	}
	createButton(data);
}

function createButton(array) {
	for (var i = 0; i < array.length; i++) {
		var skillName = document.createTextNode(array[i][0]); // 技能名称
		var skillCode = document.createTextNode(array[i][1]); // 技能代码
		var button = document.createElement("button");
		button.id = array[i][1];
		button.type = "button";
		button.className = "button";
		button.onclick = skillButton;
		button.appendChild(skillName);
		var div = document.getElementById("list");
		div.appendChild(button);
	}
}

function skillButton() {
	addSkill(this.innerHTML, this.id);
	this.onclick = null;
	this.style.color = "white";
	this.style.border = "1px solid white";
}

function addSkill(skillName, skillCode) {
	var table = document.getElementById("table");
	var tr = document.createElement("tr"); // 行
	tr.id = skillCode + "tr";
	tr.appendChild(td1(skillCode));
	tr.appendChild(td2(skillCode, skillName));
	tr.appendChild(td34(skillCode, "3"));
	tr.appendChild(td34(skillCode, "4"));
	tr.appendChild(td5(skillCode));
	tr.appendChild(td6(skillCode));

	table.appendChild(tr);
}

function td1(skillCode) {
	var td = document.createElement("td");
	td.id = skillCode + "1";
	var selectColor = document.createElement("select");
	selectColor.id = skillCode + "se";
	selectColor.options.add(new Option("白色", "2.5"));
	selectColor.options.add(new Option("绿色", "5"));
	selectColor.options.add(new Option("蓝色", "7.5"));
	selectColor.options.add(new Option("黄色", "10"));
	selectColor.options.add(new Option("紫色", "12.5"));
	selectColor.options.add(new Option("橙色", "15"));
	selectColor.onchange = function() {
		var value = this.options[this.selectedIndex].value;
		var skillCode = this.id.substring(0, this.id.length - 2);
		var tr = document.getElementById(skillCode + "tr");
		switch(value) {
			case "2.5":
				tr.style.color = "white";break;
			case "5":
				tr.style.color = "#33CC33";break;
			case "7.5":
				tr.style.color = "aqua";break;
			case "10":
				tr.style.color = "yellow";break;
			case "12.5":
				tr.style.color = "#CC00FF";break;
			case "15":
				tr.style.color = "orange";break;
		}
	};
	td.appendChild(selectColor);
	return td;
}

function td2(skillCode, skillName) {
	var td = document.createElement("td"); 
	td.id = skillCode + "2";
	td.innerHTML = skillName;
	return td;
}

function td34(skillCode, count) {
	var td = document.createElement("td");
	td.id = skillCode + count;
	td.innerHTML = "0";
	td.contentEditable = "true";
	td.style.background = "#333333";
	td.oninput = update;
	return td;
}

function td5(skillCode) {
	var td = document.createElement("td");
	td.id = skillCode + "5";
	td.innerHTML = "0";
	return td;
}

function td6(skillCode) {
	var td = document.createElement("td");
	td.id = skillCode + "5";
	td.style.width = "25px";
	var button = document.createElement(button);
	button.innerHTML = "×";
	button.type = "button";
	button.onclick = function() {
		var tr = document.getElementById(skillCode + "tr");
		var table = document.getElementById("table");
		table.removeChild(tr);
		var backButton = document.getElementById(skillCode);
		backButton.style.color = "gray";
		backButton.style.border = "1px solid gray";
		backButton.onclick = skillButton;
	};
	td.appendChild(button);
	return td;
}

function update() {
	var skillCode = this.id.substring(0, this.id.length - 1);
	var select = document.getElementById(skillCode + "se");
	var k = parseFloat(select.options[select.selectedIndex].value);
	var x = parseFloat(document.getElementById(skillCode + "3").innerHTML);
	var y = parseFloat(document.getElementById(skillCode + "4").innerHTML);
	var result = k * (y * y - x * x);
	document.getElementById(skillCode + "5").innerHTML = result;
}


function lastButton() {
	var button = document.createElement("button");
	button.innerHTML = "生成代码";
	button.id = "lastButton";
	button.type = "button";
	button.onclick = clickLastButton;
	var p = document.getElementById("button");
	p.appendChild(button);
}

function clickLastButton() {
	var table = document.getElementById("table");
	var trArray = table.children;
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
	var pre = document.getElementById("code");
	pre.innerHTML = codeString;
	var ps = document.getElementById("ps");
	ps.innerHTML = "感谢测试！将以上代码复制粘贴到游戏设置框内即可！<br>" + 
	  "请确保你有 " + qianneng + " 的潜能！以防挂机。";
}


