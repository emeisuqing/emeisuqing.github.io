(function() {
    var u = wsmud.user;
    console.log(u.roles[u.getIndex()]);

    if (u.roles.length < 1) $("#table_roles").hide();
    $("#table_add").hide();

    // roles
    u.roles.forEach((role, index) => {
        $("#table_roles").append(
            $("<tr></tr>").addClass("color" + role.state).append(
                // id
                $("<td></td>").append(
                    $("<input type=\"checkbox\">")
                    .prop("checked", index === u.getIndex() ? true : false)
                    .addClass("checkbox")
                    .click(function() {
                        $(".checkbox").prop("checked", false);
                        $(this).prop("checked", true);
                        u.setIndex(index);
                    })
                ),
                // name
                $("<td></td>").html(role.name),
                // state
                $("<td></td>").html(u.state[role.state]),
                // school
                $("<td></td>").html(u.school[role.school]),
                // server
                $("<td></td>").html(u.server[role.server]),
                // del
                $("<td></td>").append(
                    $("<a></a>")
                    .attr({"href": "", "onclick": "return false;"})
                    .html("删").addClass("color10")
                    .click(function() {
                        u.deleteRole(index);
                        refresh()
                    })
                ),
            )
        );
    });

    var button1 = $("#button_on_off"), button2 = $("#button_add");
    // button1
    var a = "新建角色档案 △ ", b = "新建角色档案 ▽ ";
    button1.html(b).click(function() {
        $("#table_add").slideToggle(200, function() {
            button1.html(button1.html() == a ? b : a);
        });
    });
    // name
    
    // state
    u.state.forEach((state, index) => {
        $("#select_state").append(
            $("<option></option>").attr("value", index).html(state)
        );
    });
    // school
    u.school.forEach((school, index) => {
        $("#select_school").append(
            $("<option></option>").attr("value", index).html(school)
        );
    });
    // server
    u.server.forEach((server, index) => {
        $("#select_server").append(
            $("<option></option>").attr("value", index).html(server)
        );
    });

    // button2
    button2.click(function() {
        var name = $("#input_name").val();
        var state = $("#select_state option:selected").val();
        var school = $("#select_school option:selected").val();
        var server = $("#select_server option:selected").val();
        if (Role.checkName(name)) {
            u.addRole(new Role(name, state, school, server));
            refresh();
        } else {
            alert("姓名输入格式有误！");
        }
    });

    function refresh() {
        $(".role").click();
    }
})();