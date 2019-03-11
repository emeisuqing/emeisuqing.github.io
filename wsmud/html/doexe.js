(function(sq, u) {
    var skills = u.roles[u.getIndex()].skills;

    skills.forEach(skill => {
        // console.log(skill);
        $("#table_doexe").append(
            $("<tr></tr>").addClass(skill.colorStyle).append(
                $("<td></td>").html(skill.name),
                $("<td></td>").html(skill.level),
                $("<td></td>").html(skill.levelTo).addClass("editable")
                .attr("contenteditable", true).blur(function() {
                    var levelTo = parseInt($(this).text());
                    u.setSkillLevelTo(skill.id, levelTo);
                    refresh();
                }),
                $("<td></td>").html(skill.cost),
                $("<td></td>").append(
                    $("<input>").attr("type", "checkbox")
                    .prop("checked", skill.doExe)
                    .click(function() {
                        u.setSkillDoExE(skill.id, $(this).prop("checked"));
                        refresh();
                    })
                ),
            )
        );
    });

    var role = wsmud.user.roles[wsmud.user.getIndex()];
    // console.log(role);
    $("#gohome").prop("checked", role.gohome).click(function() {
        role.gohome = $(this).prop("checked");
        refresh();
    });
    $("#wakuang").prop("checked", role.wakuang).click(function() {
        role.wakuang = $(this).prop("checked");
        refresh();
    });
    $("#xiulian").prop("checked", !role.wakuang).click(function() {
        role.wakuang = !$(this).prop("checked");
        refresh();
    });

    // code
    var code = role.gohome ? "jh fam 0 start,go west,go west,go north,go enter,go west" : "";
    skills.forEach(skill => {
        if (skill.doExe) code += ",lianxi " + skill.id + " " + skill.levelTo;
    });
    code += role.wakuang ? ",wakuang" : ",xiulian";
    $("#autocode").html(code);
    $("#copyCode").click(function() {
        sq.copyText(code);
    }).html("一键复制");

    // time
    // console.log(role.iq1, role.iq2, role.exe);
    $("#iq1").html(role.iq1).blur(change);
    $("#iq2").html(role.iq2).blur(change);
    $("#exe").html(role.exe + "%").blur(change);

    function change() {
        var iq1 = parseInt($("#iq1").text());
        var iq2 = parseInt($("#iq2").text());
        var exe = parseInt($("#exe").text());
        u.setIq(iq1, iq2, exe);
        refresh();
    }

    // cost
    var totalCost = 0;
    skills.forEach(skill => {
        // console.dir(skill.cost);
        if (skill.doExe) totalCost += skill.cost;
    });
    // console.log(totalCost);
    $("#total_cost").html(totalCost);
    // time
    var time = totalCost / (role.iq1 + role.iq2) / (1 + role.exe / 100 - role.iq1 / 100) / 12;
    $("#total_time").html(timeText(time));

    // .
    function refresh() {
        $(".doexe").click();
    }
    // .
    function timeText(t) {
        var string = "";
        if (t < 60) {
            string = string + parseInt(t) + "分钟";
            return string;
        } else {
            var h = parseInt(t/60);
            var m = parseInt(t%60);
    
            if (h>24) {
                var d = parseInt(h/24);
                h = h % 24;
                string = string + d + "天";
            }
            string = string + h + "小时" + m + "分钟";
            return string;
        }
    }
})(window.suqing, wsmud.user);

//t = qnxh/(xtwx+htwx)/(100/100+lxxl/100-xtwx/100)/12;