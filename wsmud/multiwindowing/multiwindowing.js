(function() {
	var div = document.getElementById("buttonArea");
	div.appendChild(createDuoKaiButton("单开", 1));
	div.appendChild(createDuoKaiButton("双开", 2));
	div.appendChild(createDuoKaiButton("十开", 10));
	div.appendChild(createDuoKaiButton("廿开", 20));
})();

function createDuoKaiButton(name, value) {
	var button = document.createElement("button");
	button.type = "button";
	button.value = value;
	button.onclick = function() {
		count = this.value;
		run();
	};
	button.innerHTML = name;
	return button;
}

function creatFloatDiv() {
	var float = document.getElementById("float");
	var allBig = document.createElement("button");
	allBig.innerHTML = "全部最大化";
	allBig.className = "float";
	allBig.onclick = function() {
		for (var i = 1; i <= count; i++) {
			document.getElementById("box"+i).className = "big_box";
			document.getElementById("cover"+i).className = "disable";
		}
	};
	var allSmall = document.createElement("button");
	allSmall.innerHTML = "全部最小化";
	allSmall.className = "float";
	allSmall.onclick = function() {
		for (var i = 1; i <= count; i++) {
			document.getElementById("box"+i).className = "small_box";
			document.getElementById("cover"+i).className = "cover";
		}
	};

	float.appendChild(allBig);
	float.appendChild(allSmall);
}

var count = 0;
function run() {
	creatFloatDiv();
	var buttonArea = document.getElementById("buttonArea");
	buttonArea.className = "disable";
	var iframeArea = document.getElementById("iframeArea");
	iframeArea.innerHTML = "";
	for (var i = 1; i <= count; i++) {
		var box = document.createElement("div");
		box.className = "small_box";
		box.id = "box"+i;

		var iframe = document.createElement("iframe");
		iframe.src = "http://game.wsmud.com/";
		//target="_blank"
		// iframe.target = "_blank";
		$("iframe").attr("target", "_blank");

		var cover = document.createElement("div");
		cover.className = "cover";
		cover.id = "cover" + i;
		cover.innerHTML = i;
		cover.onclick = function() {
			this.className = "disable"; // cover 消失
			document.getElementById("box"+this.innerHTML).className = "big_box"; // box 变大
		};

		box.appendChild(iframe);
		box.appendChild(cover);
		iframeArea.appendChild(box);
	}
}



function clickCover() {
	var box_array = document.getElementsByClassName("small_box"+" "+this.innerHTML);
	for (var i = 0; i < box_array.length; i++) {
		box_array[i].className = "big_box";
	}
}