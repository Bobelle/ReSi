// ==UserScript==
// @name         GeoJSON
// @version      1.2
// @description  geoJSON on map
// @author       Ron31
// @match        https://rettungssimulator.online/
// @grant        none
// @updateURL    https://github.com/Ron31/LSS-Scripts/raw/dev/resi-geoJSON/resi-geoJSON.user.js
// @downloadURL  https://github.com/Ron31/LSS-Scripts/raw/dev/resi-geoJSON/resi-geoJSON.user.js
// ==/UserScript==

(async function() {
    'use strict';
    if(typeof mymap === typeof undefined) return;

    let geoData;
    if(!geoData) {
        geoData = await (await fetch('https://raw.githubusercontent.com/isellsoap/deutschlandGeoJSON/main/4_kreise/2_hoch.geo.json')).json();
    }
    L.geoJSON(geoData, {style: {fillOpacity: 0.05, color: '#3388ff', weight: 1}}).addTo(mymap);
})();
