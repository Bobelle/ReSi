// ==UserScript==
// @name         Stichwörter & Orte einfügen
// @version      1.0.4
// @description  Fügt Stichwörter & Orte auf Klick in das jeweilige Feld ein!
// @author       NiZi112
// @match        https://rettungssimulator.online/missionNew/*
// @icon         https://www.google.com/s2/favicons?domain=rettungssimulator.online
// ==/UserScript==
/* global $ */

(function() {
    'use strict';
    const worte =["Polizei kommt mit.","Anrufer steht auf der Straße.","RTH Christoph13 mit alamiert.","Vorsicht!Austritt von giftigen Gasen.","--------------------","Notarztindikation","Medizinischer Notfall Chirurgisch"
                   ,"Medizinischer Notfall Intern","Medizinischer Notfall Neuro","Krankentransport","Einsatz Feuerwehr Brand","Einsatz Feuerwehr TH","Einsatz Polizei",];

    var zahl = Math.max(
	worte.length,

    )
    var html_string = `<script>
        function replaceFunc(text){
          text = text.replace(/%text%/g, $("#newMissionCustomText").val());
          text = text.replace(/%ort%/g, $("#newMissionCityInput").val());
          text = text.replace(/%straße%/g, $("#newMissionRoadInput").val());
          text = text.replace(/%nummer%/g, $("#newMissionHousenumberInput").val());
          text = text.replace(/%name%/g, $("#newNameInput").val());
          text = text.replace(/%stichwort%/g, $("#newMissionNameInput").val());
          return text;
        };
        </script>
        <table class="striped table-divider"><thead></thead><tbody>`;
    for (var i = 0; i < zahl; i++) {
        html_string += `<tr>`;
        html_string += `<td onclick='$("#newMissionCustomText").val(replaceFunc(this.innerText));'>${worte[i] ? worte[i] : ''}</td>`;
       `</tr>`;
    };
    html_string += "</tbody></table>"
    $(".panel-body").append(html_string);
})();