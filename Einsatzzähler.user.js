// ==UserScript==
// @name         Einsatzzähler
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Zählt die Einsätze des Tages!
// @author       NiZi112
// @match        https://rettungssimulator.online/*
// @icon         https://www.google.com/s2/favicons?domain=rettungssimulator.onlin
// @grant        none
// ==/UserScript==
(function() {
    'use strict';
    var datum = new Date();
    var datum_heute = datum.getDate()
    if(!localStorage.getItem("finished_missions_nizi")){localStorage.setItem("finished_missions_nizi", "0")};
    if(!localStorage.getItem("finished_missions_nizi_time")){localStorage.setItem("finished_missions_nizi_time", datum_heute)};
    if(localStorage.getItem("finished_missions_nizi_time") != datum_heute){localStorage.setItem("finished_missions_nizi", "0")};
    if(localStorage.getItem("finished_missions_nizi_time") != datum_heute){localStorage.setItem("finished_missions_nizi_time", datum_heute)};
    var neue_liste = document.createElement("li");
    var hallo = $("#darkMode")
    neue_liste.innerHTML = "Einsätze heute: " + localStorage.getItem("finished_missions_nizi");
    hallo.after(neue_liste);
    socket.on("finishMission", (userMissionID) =>{
        var mission = localStorage.getItem("finished_missions_nizi");
        mission ++;
        localStorage.setItem("finished_missions_nizi", mission);
        neue_liste.innerHTML = "Einsätze heute: " + mission;
});
})();