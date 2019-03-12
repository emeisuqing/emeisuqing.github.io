(function() {
    $("#board").addClass("color10");
    
    var data = wsmud.data.wudaodata;
    var u = wsmud.user;
    var r = u.roles[u.getIndex()];

    console.log(r.logs);

    for (var log of r.logs) {
        console.log(log);
        u.upWuDao(log[0], log[1], log[2]);
    }

    
    // 1
    $("#message").html("请选择你想要进阶的武道类别");
    u.typeEN.forEach((type, index) => {
        var typeCN = u.typeCN[index];
        $("#buttons").append(
            $("<button type=\"button\"></button>")
            .html(typeCN).attr("t", index).click(clickType)
        );
    });

    // 2
    function clickType() {
        var index = $(this).attr("t");
        var typeEN = u.typeEN[index];
        var typeCN = u.typeCN[index];
        $("#message").html("请选择你想要进阶的" + typeCN + "属性");
        $("#buttons").html("");

        var list = u.list[typeEN];
        if (list == [] || list.length < 2) {
            u.list[typeEN] = data[typeEN];
        }
        for (var i = 0; i < 3; i++) {
            var wudao = u.list[typeEN][i];
            $("#buttons").append(
                $("<button type=\"button\"></button>").html(wudao.name).click(clickWudao).attr({
                    "t": index,
                    "index": i,
                })
            );
        }
        // log[0] = typeEN;
    }
    // 3
    function clickWudao() {
        var index = $(this).attr("t");
        var typeEN = u.typeEN[index];
        var typeCN = u.typeCN[index];
        var i = $(this).attr("index");
        var list = u.list[typeEN];
        var wudao = list[i];

        $("#message").html("请选择你想要进阶" + typeCN + wudao.name + "的技能<br>");
        $("#buttons").html("").append(
            $("<button type=\"button\"></button>").html("取消").click(refresh)
        );
        u.roles[u.getIndex()].skills.forEach(skill => {
            if ((skill.typeOne == typeCN || skill.typeTwo == typeCN) && skill.upable) {

                for (let i = 0; i < skill.upLogs.length; i++) {
                    const w = skill.upLogs[i];
                    if (w.prop == wudao.prop) return;
                }

                $("#buttons").append(
                    $("<button type=\"button\"></button>").html(skill.name).click(clickSkill).attr({
                        "t": index,
                        "index": i,
                        "skillId": skill.id,
                    })
                )
            }
        });
    }
    // 4
    function clickSkill() {
        var index = $(this).attr("t");
        var typeEN = u.typeEN[index];
        var typeCN = u.typeCN[index];
        var i = $(this).attr("index");
        var list = u.list[typeEN];
        var wudao = list[i];

        var skillId = $(this).attr("skillId");

        // var log = [, , ];
        // r.logs.push(log);
        // u.list[typeEN].splice(i, 1);

        u.upWuDao(typeEN, wudao.id, skillId);
        refresh();
    }

    r.skills.forEach(skill => {
        if (skill.upCount == 0) return;
        $("#table_wudao").append(
            $("<tr></tr>").addClass(skill.colorStyle).append(
                $("<td></td>").html(skill.name),
                $("<td></td>").html(skill.level),
                $("<td></td>").html((function() {
                    var r = "";
                    skill.upLogs.forEach(wudao => {
                        var index = u.typeEN.indexOf(wudao.type);
                        var typeCN = u.typeCN[index];
                        var cn = typeCN;
                        if (r == "") r = cn;
                        else r += "<br>" + cn;
                    });
                    return r;
                })()),
                $("<td></td>").css("text-align", "left").html((function() {
                    // wudao.getText(skill.level, skill.upCount)
                    var r = "";
                    skill.upLogs.forEach(wudao => {
                        if (r == "") r = wudao.getText(skill.level, skill.k);
                        else r += "<br>" + wudao.getText(skill.level, skill.k);
                    });
                    return r;
                })()),
            )
        );
        // });
    });

    $("#reset_wudao").click(function() {
        // r.logs = [];
        // for (var skill of r.skills) {
        //     skill.upLogs = [];
        // }
        u.resetWuDao();
        refresh();
    });

    function refresh() {
        $(".wudao").click();
    }
})();