(function() {
    $("#board").addClass("color10");
    
    var data = wsmud.data.wudaodata;
    var u = wsmud.user;
    var r = u.roles[u.getIndex()];
    // 1
    $("#message").html("请选择你想要进阶的武道类别");
    for (var type in u.wudaos) {
        var typeCN = u.wudaos[type].cn;
        console.log(typeCN);
        $("#buttons").append(
            $("<button type=\"button\"></button>")
            .html(typeCN).attr("en", type).click(clickType)
        );
    }
    // 2
    function clickType() {
        var type = $(this).attr("en");
        var typeCN = u.wudaos[type].cn;
        $("#message").html("请选择你想要进阶的" + typeCN + "属性");
        $("#buttons").html("");

        var list = u.wudaos[type].list;
        if (list.length == undefined || list.length < 2) {
            // list = data[type];
            u.wudaos[type].list = data[type];
            // console.log(list);
        }
        for (var i = 0; i < 3; i++) {
            var wudao = u.wudaos[type].list[i];
            $("#buttons").append(
                $("<button type=\"button\"></button>").html(wudao.name).click(clickWudao).attr({
                    "en": type,
                    "index": i,
                })
            );
        }
    }
    // 3
    function clickWudao() {
        var type = $(this).attr("en");
        var index = $(this).attr("index");
        var typeCN = u.wudaos[type].cn;
        // console.log(u.wudaos);
        var list = u.wudaos[type].list;
        // console.log(list);
        // console.log(index);
        var wudao = list[index];

        $("#message").html("请选择你想要进阶" + typeCN + wudao.name + "的技能<br>");
        $("#buttons").html("");
        $("#buttons").append(
            $("<button type=\"button\"></button>").html("取消").click(refresh)
        );
        // console.log(wsmud.user.roles[wsmud.user.getIndex()].skills);
        wsmud.user.roles[wsmud.user.getIndex()].skills.forEach(skill => {
            console.log(skill);
            if ((skill.typeOne == typeCN || skill.typeTwo == typeCN)
            && skill.upable) {

                for (let i = 0; i < skill.upLogs.length; i++) {
                    const w = skill.upLogs[i];
                    if (w.prop == wudao.prop) return;
                }

                $("#buttons").append(
                    $("<button type=\"button\"></button>").html(skill.name).click(clickSkill).attr({
                        "en": type,
                        "index": index,
                        "skillId": skill.id,
                    })
                )
            }
        });
    }
    // 4
    function clickSkill() {
        var type = $(this).attr("en");
        var index = $(this).attr("index");
        var skillId = $(this).attr("skillId");
        var typeCN = u.wudaos[type].cn;
        var wudao = u.wudaos[type].list[index];

        var skill = r.skills.find(skill => {
            return skill.id == skillId;
        });
        // skill.upLogs.push(wudao);
        u.addSkillUpLogs(skillId, wudao);
        u.wudaos[type].list.splice(index, 1);
        refresh();
    }

    r.skills.forEach(skill => {
        if (skill.upCount == 0) return;
        // skill.upLogs.forEach(wudao => {
        $("#table_wudao").append(
            $("<tr></tr>").addClass(skill.colorStyle).append(
                $("<td></td>").html(skill.name),
                $("<td></td>").html(skill.level),
                $("<td></td>").html((function() {
                    var r = "";
                    skill.upLogs.forEach(wudao => {
                        var cn = u.wudaos[wudao.type].cn;
                        if (r == "") r = cn;
                        else r += "<br>" + cn;
                    });
                    return r;
                })()),
                $("<td></td>").css("text-align", "left").html((function() {
                    // wudao.getText(skill.level, skill.upCount)
                    var r = "";
                    skill.upLogs.forEach(wudao => {
                        if (r == "") r = wudao.getText(skill.level, skill.upCount);
                        else r += "<br>" + wudao.getText(skill.level, skill.upCount);
                    });
                    return r;
                })()),
            )
        );
        // });
    });

    function refresh() {
        $(".wudao").click();
    }
})();