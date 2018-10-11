function start() {
	$.ajax({
		url: 'csv.csv',
		dataType: 'text',
	}).done(analyseData);
}


function analyseData(dataFile) {
	var data = new Array();

	var dataArray1 = dataFile.split(/\r?\n|\r/);
	for (var i = 0; i < dataArray1.length; i++) {
		var  dataArray2 = dataArray1[i].split(',');
		data[i] = dataArray2;
	}


	creatTable(data);

}



function creatTable(array) {
	var table = window.document.createElement("table");
	for (var i = 0; i < array.length; i++) {
		var tr = document.createElement("tr");
		for (var j = 0; j < array[i].length; j++) {
			var td = document.createElement("td");
			var text = document.createTextNode(array[i][j]);
			td.appendChild(text);
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
	document.body.appendChild(table);
}