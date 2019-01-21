var skills = [
    {"skillName":"基础内功", "skillColor":"white", "level":2000, "add":0}, 
    {"skillName":"基础轻功", "skillColor":"white", "level":2000, "add":0},
    {"skillName":"基础拳脚", "skillColor":"white", "level":2000, "add":0},
    {"skillName":"基础招架", "skillColor":"white", "level":2000, "add":0},
    {"skillName":"基础刀法", "skillColor":"white", "level":2000, "add":0},
    {"skillName":"基础剑法", "skillColor":"white", "level":2000, "add":0},
    {"skillName":"基础棍法", "skillColor":"white", "level":2000, "add":0},
    {"skillName":"基础杖法", "skillColor":"white", "level":2000, "add":0},
    {"skillName":"基础鞭法", "skillColor":"white", "level":2000, "add":0},
    {"skillName":"基础暗器", "skillColor":"white", "level":2000, "add":0},
];

colorArray = {"white":0, "green":1, "blue":2, "yellow":3, "purple":4, "orange":5};

function updateSkills() {
    var table = document.getElementById("skillTable");
    table.innerHTML = "<tr><td>技能名称</td><td>当前等级</td><td>突破等级</td></tr>";

    for (let i = 0; i < skills.length; i++) {
        const skill = skills[i];
        var tr = document.createElement("tr");
        tr.className = skill.skillColor;
        
        var skillName = document.createElement("td");
        skillName.innerHTML = skill.skillName;
        var skillLevel = document.createElement("td");
        skillLevel.innerHTML = skill.level;
        skillLevel.contentEditable = true;
        skillLevel.className = "editable";
        skillLevel.onblur = levelChange;
        skillLevel.value = i;
        var skillLevel2 = document.createElement("td");
        skillLevel2.innerHTML = skill.level + skill.add;
        
        tr.appendChild(skillName);
        tr.appendChild(skillLevel);
        tr.appendChild(skillLevel2);
        table.appendChild(tr);
    }
}
function levelChange() {
    var index = this.value;
    skills[index].level = parseInt(this.innerHTML);
    updateSkills();
}


var timer = null; // 计时器
var count = 0;
function start() {
    if (count==0) { // 第一次
        $("#break").hide();
        $("#logTable").show();
    }
    timer = setTimeout("start()", 100); // 每0.1秒执行一次
    takeMedicine();
    count++;
}
function stop() {
    clearTimeout(timer);
}



// 吃突破丹
function takeMedicine() {
    var green = parseInt(document.getElementById("绿突破").innerHTML);
    var blue = parseInt(document.getElementById("蓝突破").innerHTML);
    var yellow = parseInt(document.getElementById("黄突破").innerHTML);
    var purple = parseInt(document.getElementById("紫突破").innerHTML);
    var add = randomInt(1, 5);
    var index = randomInt(0, skills.length - 1);

    var log = "<span style='color:" + skills[index].skillColor + "'>" 
             + skills[index].skillName + "</span>"
             + "提升了" + add + "级！<br>";

    if (green>0) {
        if (colorArray[skills[index].skillColor]>1) return;
        document.getElementById("绿突破").innerHTML = green - 1;
    } else if (blue>0) {
        if (colorArray[skills[index].skillColor]>2) return;
        document.getElementById("蓝突破").innerHTML = blue - 1;
    } else if (yellow>0) {
        if (colorArray[skills[index].skillColor]>3) return;
        document.getElementById("黄突破").innerHTML = yellow - 1;
    } else if (purple>0) {
        document.getElementById("紫突破").innerHTML = purple - 1;
    } else {
        $("#logTable").hide();
        stop();
        return;
    }
    $("#flag").before(log);
    document.getElementById("flag").click();
    skills[index].add += add;
    updateSkills();
}




function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function addSkill(skillColor) {
    var skill = {};
    skill.skillName = $("#skillName").html();
    skill.skillColor = skillColor;
    skill.level = parseInt($("#skillLevel").html());
    skill.add = 0;
    skills.push(skill);
    console.log(skill);
    updateSkills();    
}