// ==UserScript==
// @name         Light Map
// @namespace    https://rettungssimulator.online
// @version      0.1
// @description  Helle Map im DarkMode
// @author       DispoOhnePlan
// @match        https://rettungssimulator.online
// @match        https://rettungssimulator.online/
// @icon         https://www.google.com/s2/favicons?domain=rettungssimulator.online
// @grant        GM_addStyle
// ==/UserScript==


GM_addStyle("body.dark .leaflet-tile {filter: none !important;-webkit-filter: none !important;}");