// ==UserScript==
// @name         suqing_wsmud_script
// @namespace
// @version      0.1
// @description  武神传说
// @author       SuQing
// @match        http://game.wsmud.com/*
// @match        http://www.wsmud.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';


console.log("test script");



resetElementsId();

var div = document.createElement("div");
div.style.position = "absolute";
div.style.width = "50%";
div.style.height = "100%";
div.style.background = "rgba(0,0,0,0.8)";

var button = document.createElement("button");
button.innerHTML = "Get Data";
button.onclick = function() {
    // var temp = document.getElementsByClassName("value");
    // var g = new G();
    // g.send("score");
};
div.appendChild(button);
    
    // var span = document.createElement("span");
    // span.innerHTML = "<span data-prop=\"gender\" class=​\"value\">​</span>​";
    // div.appendChild(span);
    


document.getElementById("messageArea").appendChild(div);

function resetElementsId() {
    document.getElementsByClassName("content-message")[0].id = "messageArea";
    // var temp = document.getElementsByClassName("value");
        
}

})();