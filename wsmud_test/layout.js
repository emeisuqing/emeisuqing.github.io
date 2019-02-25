window.onload = function() {
    console.log("Window onload.");
    layout();
}
window.onresize = function() {
    console.log("Window resize.");
    setTimeout(layout, 500);
}

function layout() {
    var h = $(window).height();
    var w = $(window).width();
    console.log("Height & Width: " + h + " * " + w);

    $("header").width(w);
    $("header").height(150);
    $("footer").width(w);
    $("footer").height(20);
    $("main").width(w);
    $("main").height(h - $("header").height() - $("footer").height());

    $("#left").width(200);
    $("#right").width(w - $("#left").width());
}

function setFooter() {
    var date = new Date();
    var year = date.getFullYear();
    console.log("Year: " + year);
    var footer = "Copyright &copy; 2018 - " + year;
    footer += " SuQing <a href='https://suqing.fun'>suqing.fun</a> All rights Reserved.";
    $("#footer").html(footer);
}