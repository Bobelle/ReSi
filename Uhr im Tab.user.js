// ==UserScript==
// @name         Uhr im Tab
// @version      1.0.2
// @description  Erweitert viele Funktionen und fügt neue hinzu.
// @author       Bobelle
// @match        *://rettungssimulator.online/*
// @match        *://beta.rettungssimulator.online/*
// @match        *://rettungssimulator.online/missionNew/*
// @match        *://beta.rettungssimulator.online/missionNew/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// ==/UserScript==
/* global $ toggleMap socket systemMessage noticeModal hideModal replaceFunc */
(function() {
    'use strict';
    var hallo = document.createElement("div");
    document.getElementsByClassName("brand")[0].after(hallo);
    var aktualisieren= function(){
        var date = new Date();
        var stunde = date.getHours();
        var minute = date.getMinutes();
        var sekunde = date.getSeconds();
        if(sekunde < 10){sekunde = "0" + sekunde};
        if(minute < 10){minute = "0" + minute};
        hallo.innerHTML = stunde + ":" + minute + "Uhr <i class='far fa-clock'></i> | ILS Feuerwehr Stadt Bielefeld";
    };
    setInterval(aktualisieren, 50)
})();