function start() {
	$.ajax({
		url: 'csv.csv',
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
	for (var i = 0; i < array.length; i++) {
		var tr = document.createElement("tr"); // 行
		for (var j = 0; j < array[i].length; j++) {
			var td = document.createElement("td"); // 单元格
			var text = document.createTextNode(array[i][j]); // 文本
			if (j==1) {
				switch (array[i][j]) {
					case '0':
						tr.style.color = 'gray';
						break;
					case '5':
						tr.style.color = '#3CB371'; //绿
						break;
					case '7.5':
						tr.style.color = '#00F5FF'; //蓝
						break;
					case '10':
						tr.style.color = '#FFFF00'; //黄
						break;
					case '12.5':
						tr.style.color = '#FF00FF'; //紫
						break;
					case '15':
						tr.style.color = '#EE7600'; //橙
						break;
				}
				continue;
			}
			if (j==5) td.style.background = 'white';
			td.appendChild(text);
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
	document.body.appendChild(table);
}