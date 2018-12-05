
function start() {
	var audio = document.getElementById("audio");
	audio.src = "music.mp3";
	
	audio.controls = true; // 显示播放控件
	audio.autoplay = false; // 自动播放
	audio.loop = true; // 循环播放

	var button = document.getElementById("playButton");
	button.innerHTML = "点击播放";
	button.onclick = clickPlayButton;

	var button = document.getElementById("replayButton");
	button.innerHTML = "重新播放";
	button.onclick = clickReplayButton;

}

function clickPlayButton() {
	var audio = document.getElementById("audio");
	if (audio.paused) {
		audio.play();
		this.innerHTML = "点击播放";
	} else {
		audio.pause();
		this.innerHTML = "点击暂停";
	}
}

function clickReplayButton() {
	var audio = document.getElementById("audio");
	audio.currentTime = 0;
}