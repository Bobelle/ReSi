// ==UserScript==
// @name         Shortlinks
// @version      1.0.1
// @description  Macht Sachen!
// @author      Bobelle
// @match        https://rettungssimulator.online/
// @icon         https://www.google.com/s2/favicons?domain=rettungssimulator.online
// ==/UserScript==

(function() {
    'use strict';
    $('#ad').append(`<div class="button-split">
            <a target="_blank" href="https://forum.rettungssimulator.online/" class="no-prevent button button-round button-success button-w50"><center>Forum</center></a>
            <a target="_blank" href="https://wiki.rettungssimulator.online/" class="no-prevent button button-round button-success button-w50"><center>Wiki</center></a>
            <a target="_blank" href="https://rettungssimulator.online/aaoEdit/1354" class="no-prevent button button-round button-success button-w50"><center>AAO</center></a>
            <a target="_blank" href="https://rettungssimulator.online/association/6#associationMembers" class="no-prevent button button-round button-success button-w50"><center>Verband</center></a>
            </div>`)
})();