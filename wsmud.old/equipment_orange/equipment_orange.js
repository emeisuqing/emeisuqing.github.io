function start() {
	$.ajax({
		url: 'equipment_orange',
		dataType: 'text',
	}).done(analyseData);
}

// 分析数据 得到数组
function analyseData(dataFile) {
	var data = new Array();

	// 按照行分割数据
	var dataArray1 = dataFile.split(/\r?\n|\r/);
	for (var i = 0; i < dataArray1.length; i++) {
		// 按照逗号分割数据
		var  dataArray2 = dataArray1[i].split(',');
		data[i] = dataArray2;
	}

	creatTable(data);
}

// 创建表格 <table>
function creatTable(array) {
	var table = window.document.createElement("table");
	var classText = ["武器", "衣服", "鞋子", "头饰", "护腕", "腰带"]; 

	for (var i = 0; i < array.length; i++) {
		var tr = document.createElement("tr"); // 行
		for (var j = 0; j < array[i].length; j++) {
			var td = document.createElement("td"); // 单元格
			var text = document.createTextNode(array[i][j]); // 文本
			if (array[i][j]=="") continue;

			// 合并单元格
			for (var t = 0; t < classText.length; t++) {
				if (array[i][j]== classText[t]) {
					td.setAttribute('rowspan', '2');
				}
			}

			if (i%2==1 && i<12 && j!=0) td.style.color = "orange"; // 紫色
			if (i==0 || j==0) td.style.color = "#228B22"; // 绿色
			
			
			td.appendChild(text);
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
	document.body.appendChild(table);
}