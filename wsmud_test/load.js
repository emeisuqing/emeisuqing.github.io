var loadArray = ["roleInfo", "updateLog", "friendLink", "aboutAuthor", "skillChooser"];

$(document).ready(function(){
    for (let index = 0; index < loadArray.length; index++) {
        const element = loadArray[index];
        $("#"+element).click(function() {
            console.log("click: " + element + " → toLoad: " + element + ".html");
            $("#right").load("./load/" + element + ".html");
        });
    }
});