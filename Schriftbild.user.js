// ==UserScript==
// @name         Schriftbild
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @description  try to take over the world!
// @author       Bobelle
// @match        ://rettungssimulator.online/mission/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=rettungssimulator.online
// @grant        none
// ==/UserScript==
(function () {
    let aaoIdsToHighlight = [142,318,143,186,198,179,322,185,323,249,182,150,321,180,194,317,199,273,212,184,213,241,274,243,291,290,196,214,245,275,299,300,301,302,230 ,
                             155 ,123 ,248 ,157 ,161 ,162 ,144 ,165 ,163 ,166 ,201, 202 ,203 ,206 ,204 ,205 ,207 ,208 ,209 ,224 ,226 ,227 ,228 ,229 ,272, 269,327,328,244,139,332,333];
    let colorsForAaos = {
        'blue': [],
        'red': [142,318,143,186,198,321,180,194,317,199,273,212,184,213,241,274,243,291,290,196,214,245,275,299,300,301,302,269,333 ],
        '#8332a8': [230 ,155 ,123 ,248 ,157 ,161 ,162 ,144 ,165 ,163 ,166 ,201, 202 ,203 ,206 ,204 ,205 ,207 ,208 ,209 ,224 ,226 ,227 ,228 ,229 ,272],
        '#eb34d8': [],
        '#EC7C25': [249,182,150,332],
        '#004C91': [179,322,185,323],
        '#f5ef42': [327,328,244,139],
    }
    aaoIdsToHighlight.forEach((id) => {
        let aao = document.querySelector(`.mission-aao[aaoid="${id}"]`);
        if(aao) {
            aao.querySelector('.mission-aao-name').style.fontWeight = "500";
        }
    });
    for(let color in colorsForAaos){
        colorsForAaos[color].forEach((id) => {
            let aao = document.querySelector(`.mission-aao[aaoid="${id}"]`);
            if(aao) {
                aao.querySelector('.mission-aao-name').style.color = color;
            }
        })
    }
})()