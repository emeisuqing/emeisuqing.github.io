$(document).ready(function(){
    console.log("Load main.js successfully.");

    var loadFileNemeArray = ["roleInfo", "skillSelect", "levelSetting", "autoPractise", "simulator",
    "commandFlow", "readMe", "equipmentData", "medicineData", "updateLog", "aboutAuthor"];

    for (let index = 0; index < loadFileNemeArray.length; index++) {
        const element = loadFileNemeArray[index];
        $("#"+element).click(function() {
            console.log("click - " + element);
            $("#content").load("./load/" + element + ".html");
        });
    }
});