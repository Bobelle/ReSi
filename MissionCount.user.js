// ==UserScript==
// @name         MissionCount
// @namespace    http://tampermonkey.net/
// @version      0.8.1
// @description  Counts missions
// @author       Ron31
// @match        https://rettungssimulator.online/
// @downloadURL  https://github.com/Ron31/LSS-Scripts/raw/dev/resi-missionCount/resi-missions.user.js
// @updateURL    https://github.com/Ron31/LSS-Scripts/raw/dev/resi-missionCount/resi-missions.user.js
// @grant        none
// ==/UserScript==

function updateCount() {
    let ownMissions = document.querySelectorAll('div#missions-container-own div.mission-list-mission');
    let sharedMissions = document.querySelectorAll('div#missions-container-shared div.mission-list-mission');
    let attendedMissions = document.querySelectorAll('div#missions-container-shared div.mission-list-mission svg.mission-participation[class*="text"]');
    document.getElementById('missionCount').innerText = ownMissions.length.toString();
    document.getElementById('missionCountSharedAttended').innerText = attendedMissions.length.toString();
    document.getElementById('missionCountShared').innerText = sharedMissions.length.toString();
}

(async function() {
    'use strict';
    if(!localStorage.aBuildings || JSON.parse(localStorage.aBuildings).lastUpdate < (new Date().getTime() - 5 * 1000 * 60)) await $.getJSON('/api/userBuildings').done(data => localStorage.setItem('aBuildings', JSON.stringify({lastUpdate: new Date().getTime(), value: data})) );
    const aBuildings = JSON.parse(localStorage.aBuildings).value;
    const f = (x) => Math.ceil(4 * Math.log2(x + 2)+ 0.05 * x) - 4;
    let dep = aBuildings.filter(x => GENERATING_BUILDING_IDS.includes(x.buildingType));
    //document.querySelector('div[tab-id="ownMissions"]').style.width = null;
    //document.querySelector('div[tab-id="ownMissions"]').style.marginRight = '15px';
    //document.querySelector('span[tab-id="sharedMissions"]').parentElement.style.width = null;

    let span = document.querySelector('div[tab="ownMissions"]');
    let span2 = document.querySelector('div[tab="sharedMissions"]');
    let ownMissions = document.querySelectorAll('div#missions-container-own div.mission-list-mission');
    let sharedMissions = document.querySelectorAll('div#missions-container-shared div.mission-list-mission');
    let attendedMissions = document.querySelectorAll('div#missions-container-shared div.mission-list-mission svg.mission-participation[class*="text"]');
    span.insertAdjacentHTML('afterbegin', '<span class="badge-container"><span class="badge ncOpenMissions" style="color: #fff !important; background-color: red !important;"><span id="missionCount">' + ownMissions.length + '</span>/<span id="missionCountPossible">' + f(dep.length) + '</span></span></span>')
    span2.insertAdjacentHTML('afterbegin', '<span class="badge-container"><span class="badge ncOpenMissions" style="color: #fff !important; background-color: red !important;"><span id="missionCountSharedAttended">' + attendedMissions.length + '</span>/<span id="missionCountShared">' + sharedMissions.length  + '</span></span></span>')

    socket.on("newMission", () => {
        updateCount();
    });

    socket.on("missionStatus", () => {
        setTimeout(updateCount, 1000);
    });

    socket.on("finishMission", () =>{
        updateCount();
    });
    socket.on("departmentBuy", async () => {
        await $.getJSON('/api/userBuildings').done(data => localStorage.setItem('aBuildings', JSON.stringify({lastUpdate: new Date().getTime(), value: data})) );
        const aBuildings = JSON.parse(localStorage.aBuildings).value;
        dep = aBuildings.filter(x => GENERATING_BUILDING_IDS.includes(x.buildingType));
        document.querySelector('missionCountPossible').innerText = f(dep.length);
    })
})();
