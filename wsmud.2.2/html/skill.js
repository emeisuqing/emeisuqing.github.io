(function() {
    var u = wsmud.user, i = u.getIndex(), s = u.roles[i].skills;
    u.sortSkills();
    s.forEach(skill => {
        $("#table_skills").append(
            $("<tr></tr>").addClass(skill.colorStyle).append(
                $("<td></td>").html(skill.name),
                $("<td></td>").html(skill.id),
                $("<td></td>").html(skill.level).addClass("editable")
                .attr("contenteditable", true).blur(function() {
                    var level = parseInt($(this).text());
                    u.setSkillLevel(skill.id, level);
                }),
                $("<td></td>").append(
                    $("<a></a>")
                    .attr({"href": "", "onclick": "return false;"})
                    .html(skill.color == 0 ? "" : "删").addClass("color10")
                    .click(function() {
                        u.deleteSkill(skill.id);
                        refresh();
                    })
                ),
            )
        );
    });
    
    $("#table_add").hide();
    var b1 = $("#button_on_off");
    var s1 = "添加技能 △ ", s2 = "添加技能 ▽ ";
    b1.html(s2).click(function() {
        $("#table_add").slideToggle(200, function() {
            b1.html(b1.html() == s1 ? s2 : s1);
        });
    });


    var f = $("#select_family"), n = $("#select_name"), b = $("#button_add");
    var data = wsmud.data.skilldata();
    for (var family in data) {
        f.append($("<option></option>").attr("value", family).html(family));
    }
    f.change(function() {
        n.html("");
        var family = $("#select_family option:selected").html();
        // var data = wsmud.data.skilldata();
        data[family].forEach(skill => {
            if (wsmud.user.getUserSkill(skill.id) == null) {
                n.append($("<option></option>").attr("value", skill.id).html(skill.name));
            }
        });
    });

    b.click(function() {
        var id = $("#select_name option:selected").val();
        if (id) wsmud.user.addSkill(id);
        refresh();
    });

    function refresh() {
        $(".skill").click();
    }
})();

// $("#select_skill_category").css("width", "8em");
// $("#select_skill_name").css("width", "12em").append(
//     $("<option></option>").attr("value", "undefined").html("基础技能已默认")
// );