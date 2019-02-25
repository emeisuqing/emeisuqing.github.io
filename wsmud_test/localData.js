// 用户数据
var DATA = {
    "KEY" : "wsmud",
    "INDEX" : 0,
    "ROLE_LIST" : new Array(),
    "SKILL_LIST" : new Array(),
    "LINGWU_LIST" : new Array()
};
// 技能数据
var SKILL = {
    "KEY" : "skill",
    "LIST" : new Array()
};

// 加载完毕 立即执行
$(document).ready(function() {
    // 「第一步」检查浏览器是否支持 localStorage
    if (window.localStorage) {
        $("#message").html("角色信息会保存在浏览器的本地缓存中！");

        // 「第二步」查看用户数据的缓存
        if (localStorage.getItem("wsmud")) { // 有缓存就读取
            DATA = JSON.parse(localStorage.getItem("wsmud"));
        } else { // 无缓存就新建
            saveUserData();
        }

        // 「第三步」查看技能数据的缓存
        if (localStorage.getItem("skill")) { // 有缓存就读取
            console.dir(localStorage.getItem("skill"));
            SKILL = JSON.parse(localStorage.getItem("skill"));
        } else { // 无缓存就下载
            $.ajax({
                url : "data/skilldata.sq",
                dataType : "text"
            }).done(function(data) {
                var rows = data.split("\n"); // 先按行分割
                for (let i = 0; i < rows.length; i++) {
                    var temp = rows[i].split(","); // 再按逗号分割
                    if (temp.length < 6) continue; // 该行数据不正确就排除
                    var skill = {
                        "CLASS" : temp[0],
                        "NAME" : temp[1],
                        "COLOR" : temp[2],
                        "ID" : temp[3],
                        "TYPE1" : temp[4],
                        "TYPE2" : temp[5]
                    };
                    SKILL.LIST.push(skill);
                }
                localStorage.setItem("skill", JSON.stringify(SKILL)); // 添加到本地缓存
            });
        }
    // 「最后」若浏览器不支持 localStorage 则弹出警告
    } else {
        alert("你的浏览器当前状态无法使用本地缓存！\n倘若你开启了浏览器的隐私模式，退出即可。\n否则，你将无法正常使用本站的大部分功能。");
    }
});



// 保存用户数据
function saveUserData() {
    localStorage.setItem("wsmud", JSON.stringify(data));
}

// // 清空所有数据
// function clearData() {
//     localStorage.clear();
// }