$(document).ready(function() {
    getData();
    if (data.ROLE_LIST != null) {
        for (let i = 0; i < data.ROLE_LIST.length; i++) {
            const role = data.ROLE_LIST[i];
            $("#role_list").append("<button class='button'"
                + "id='"+i+"_"+role.name+"'"
                + "value='"+i+"'"
                + ">" + role.fwq + " " + role.mp + " " + role.name
                + "</button>");
            // 点击事件
            $("#"+i+"_"+role.name).click(function() {
                var index = this.value;
                data.INDEX = index;
                var role = data.ROLE_LIST[index];
                $("#message").html("当前角色："
                    + role.fwq + " " + role.mp + " " + role.name);
            });
        }
    }

    // 点击创建按钮
    $("#creatRoleButton").click(function() {
        var name = $("#name").val();
        var fwq = $("#fwq option:selected").text();
        var mp = $("#mp option:selected").text();
        var role = {
            "name" : name,
            "fwq" : fwq,
            "mp" : mp,
        };
        getData();
        data.ROLE_LIST.push(role);
        saveData();
        $("#roleInfo").click();
    });
});



/**
<!-- 
本地存储 localstorage
存储方式 以键值对(Key-Value)的方式存储，永久存储，永不失效，除非手动删除。
大小：每个域名5M
getItem    //取记录
setIten    //设置记录
removeItem //移除记录
key        //取key所对应的值
clear      //清除记录
 -->

 */