// ==UserScript==
// @name         Wachenübersicht 2
// @namespace    http://tampermonkey.net/
// @version      1.0.2
// @description  Leitstelle Bielefeld
// @author       Bobelle
// @match        https://rettungssimulator.online/missionNew/*
// @icon         http://rettungssimulator.online/favicon.ico
// @grant        none
// ==/UserScript==
function newWindow(){
    let darkMode = false; // true oder false
    let missionNames2 = [['<b><h2>Feuerwehr</h2></b>','','<b><h2>','<b><h5>Design by Bobelle©</h5></b>',],
                         ['<b>Feuer- und Rettungswache Ost','<b>Feuer- und Rettungswache Nord','<b>Feuer- und Rettungswache West','<b>Feuer- und Rettungswache Süd',],
                         ['Florian Bielefeld 01 HLF 20/1','Florian Bielefeld 02 DLAK 42','Florian Bielefeld 03 DLK 18/12','Florian Bielefeld 04 HLF 20/1',],
                         ['Florian Bielefeld 01 HLF 20/2','Florian Bielefeld 02 ELW1','Florian Bielefeld 03 GW-Öl','Florian Bielefeld 04 HLF 20/2',],
                         ['Florian Bielefeld 01 KdoW','Florian Bielefeld 02 GW-Atemschutz','Florian Bielefeld 03 HLF 20/1','Florian Bielefeld 04 LF 20/1',],
                         ['Florian Bielefeld 01 LF 20/2','Florian Bielefeld 02 HLF 20/1','Florian Bielefeld 03 HLF 20/2','Florian Bielefeld 04 RW',],
                         ['Florian Bielefeld 01 TMF','Florian Bielefeld 02 LF 20/1','Florian Bielefeld 03 TLF 20/40','Florian Bielefeld 04 TLF 24/50',],
                         ['01---------- ','02----------','03----------','04----------',],
                         ['01---------- ','02----------','03----------','04----------',],
                         ['01---------- ','02----------','03----------','04----------',],
                         ['01---------- ','02----------','03----------','04----------',],
                         ['01---------- ','02----------','03----------','04----------',],
                         ['01---------- ','02----------','03----------','04----------',],
                         ['01---------- ','02----------','03----------','04----------',],
                         ['01---------- ','02----------','03----------','04----------',],
                         ['01---------- ','02----------','03----------','04----------',],
                         ['01---------- ','02----------','03----------','04----------',],
                         ['<b>Rettungsdienst</b>','<b>Rettungsdienst</b>','<b>Rettungsdienst</b>','<b>Rettungsdienst</b>',],
                         ['----------','----------','----------','----------',],
                         ['----------','----------','----------','----------',],
                         ['----------','----------','----------','----------',],
                         ['----------','----------','----------','----------',],
                         ['----------','----------','----------','----------',],
                         ['----------','----------','----------','----------',],
                         ['','','','',],
                         ['<b><h2>Rettungsdienst</h2></b>','','','',],
                         ['<b><h3>Rettungswache 5(ASB,DRK,JUH)</h3></b>','<b><h3>Rettungswache 6(ASB,DRK,JUH)</h3></b>','<b><h3>Rettungswache 7(ASB,DRK,JUH)</h3></b>','<b><h3>Rettungswache 8(ASB,DRK,JUH)</h3></b>',],
                         ['----------','RD Bielefeld 06 RTW 1','----------','----------',],
                         ['----------','RD Bielefeld 06 RTW 2','----------','----------',],
                         ['----------','RD Bielefeld 06 RTW 3','----------','----------',],
                         ['----------','----------','----------','----------',],
                         ['----------','----------','----------','----------',],
                         ['----------','----------','----------','----------',],
                         ['','','','',],
                         ['<b><h3>Rettungswache 9(Haupt)</h3></b>','<b><h3>Rettungswache 10(Biekra)</h3></b>','<b><h3>Florian Bielefeld NEF 1 Standort</h3></b>','<b><h3>RD Bielefeld NEF 2 Standort</h3></b>',],
                         ['','','','',],
                         ['----------','----------','----------','----------',],
                         ['----------','----------','----------','----------',],
                         ['----------','----------','----------','----------',],
                         ['----------','----------','----------','----------',],
                         ['','','','',],
                         ['<b><h3>Luftrettungszentrum Bielefeld</h3></b>','','','<b><h3>',],
                         ['RTH Christoph 13 (Bielefeld)','Florian Bielefeld 11 NEF 1(Reserve)','','',],
                         ['RTH Christoph 8 (Lünen)','','','',],
                         ['Florian Bielefeld 60 MTW(Reserve)','Florian Bielefeld 61 MTW(Reserve)','Florian Bielefeld 62 MTW(Reserve)','Florian Bielefeld 63 MTW(Reserve)',],
                         ['','','','',],
                         ['<b><h2>Freiwillige Feuerwehr</h2></b>','','','',],
                         ['<b>Freiwillige Feuerwehr Löschabteilung Mitte</b>','<b>Freiwillige Feuerwehr Löschabteilung West</b>','<b>Freiwillige Feuerwehr Löschabteilung Süd</b>','<b>Freiwillige Feuerwehr Löschabteilung Nord</b>',],
                         ['Florian Bielefeld 64 MTW(Reserve)','Florian Bielefeld 65 MTW(Reserve)','Florian Bielefeld 66 MTW(Reserve)','Florian Bielefeld 67 MTW(Reserve)',],
                         ['----------','----------','----------','----------',],
                         ['','','','',],
                         [,'<b>Freiwillige Feuerwehr Löschabteilung Sondereinheit ABC-Erkundung','<b>Freiwillige Feuerwehr Löschabteilung Vilsendorf','<b>Freiwillige Feuerwehr Löschabteilung Schildesche','<b>Freiwillige Feuerwehr Löschabteilung Altenhagen',],
                         ['Florian Bielefeld 68 MTW(Reserve)','Florian Bielefeld 69 MTW(Reserve)','Florian Bielefeld 70 MTW(Reserve)','Florian Bielefeld 71 MTW(Reserve)',],
                         ['Florian Bielefeld 68 AB-ABC','----------','----------','----------',],
                         ['','','','',],
                         [,'<b>Freiwillige Feuerwehr Löschabteilung Eckhardtsheim','<b>Freiwillige Feuerwehr Löschabteilung Babenhausen','<b>Freiwillige Feuerwehr Löschabteilung Theesen','<b>Freiwillige Feuerwehr Löschabteilung Sennestadt',],
                         ['Florian Bielefeld 72 MTW(Reserve)','Florian Bielefeld 73 MTW(Reserve)','Florian Bielefeld 74 MTW(Reserve)','Florian Bielefeld 75 MTW(Reserve)',],
                         ['----------','----------','----------','----------',],
                         ['','','','',],
                         [,'<b>Freiwillige Feuerwehr Löschabteilung Gadderbaum/Bethel','<b>Freiwillige Feuerwehr Löschabteilung Hoberge-Uerentrup','<b>Freiwillige Feuerwehr Löschabteilung Großdornberg','<b>Freiwillige Feuerwehr Löschabteilung Milse',],
                         ['Florian Bielefeld 76 MTW(Reserve)','Florian Bielefeld 77 MTW(Reserve)','Florian Bielefeld 78 MTW(Reserve)','Florian Bielefeld 79 MTW(Reserve)',],
                         ['----------','----------','----------','----------',],
                         ['','','','',],
                         [,'<b>Freiwillige Feuerwehr Löschabteilung Ummeln','<b>Freiwillige Feuerwehr Bielefeld Löschabteilung Quelle','<b>Freiwillige Feuerwehr Löschabteilung Senne','<b>Freiwillige Feuerwehr Löschabteilung Hillegossen',],
                         ['Florian Bielefeld 80 MTW(Reserve)','Florian Bielefeld 81 MTW(Reserve)','Florian Bielefeld 82 MTW(Reserve)','Florian Bielefeld 83 MTW(Reserve)',],
                         ['----------','----------','----------','----------',],
                         ['','','','',],
                         [,'<b>Freiwillige Feuerwehr Löschabteilung Feuerwehrweg','<b>Freiwillige Feuerwehr Löschabteilung Gellershagen','<b>Freiwillige Feuerwehr Löschabteilung Lämershagen','<b>Freiwillige Feuerwehr Löschabteilung Brake',],
                         ['Florian Bielefeld 84 MTW(Reserve)','Florian Bielefeld 85 MTW(Reserve)','Florian Bielefeld 86 MTW(Reserve)','Florian Bielefeld 87 MTW(Reserve)',],
                         ['----------','----------','----------','----------',],
                         ['','','','',],
                         [,'<b>Freiwillige Feuerwehr Löschabteilung Kupferhammer','<b>Freiwillige Feuerwehr Löschabteilung Ubbedissen','<b>Freiwillige Feuerwehr Löschabteilung Brackwede','<b>Freiwillige Feuerwehr Löschabteilung Sieker',],
                         ['Florian Bielefeld 88 MTW(Reserve)','Florian Bielefeld 89 MTW(Reserve)','Florian Bielefeld 90 MTW(Reserve)','Florian Bielefeld 91 MTW(Reserve)',],
                         ['----------','----------','----------','----------',],
                         ['','','','',],
                         [,'<b>Freiwillige Feuerwehr Löschabteilung Niederdornberg-Deppendorf','<b>Freiwillige Feuerwehr Löschabteilung Jöllenbeck','<b>Freiwillige Feuerwehr Löschabteilung Heepen','<b>Freiwillige Feuerwehr Löschabteilung Senne',],
                         ['Florian Bielefeld 92 MTW(Reserve)','Florian Bielefeld 93 MTW(Reserve)','Florian Bielefeld 94 MTW(Reserve)','Florian Bielefeld 95 MTW(Reserve)',],
                         [,'----------','----------','----------','----------',],
                         ['','','','',],
                         ['<b><h2>Landespolizei</h2></b>','','','',],
                         ['<b>Landespolizeiwache Ost','<b>Landespolizeiwache Nord','<b>Landespolizeiwache West','<b>Landespolizeiwache Süd',],
                         ['FuStW LP 1 Kesselbrink ','----------','----------','----------',],
                         ['FuStW T LP 1 Kesselbrink ','----------','----------','----------',],
                         ['FuStW LP 2 Kesselbrink','----------','----------','----------',],
                         ['----------','----------','----------','----------',],
                         ['----------','----------','----------','----------',],
                         ['<b><h2>Bundespolizei</h2></b>','','','',],
                         ['<b>Bundespolizeiwache Ost Hbf Bielefeld','','','',],
                         ['FuStW T BP 1 Hbf Bielefeld ','----------','----------','----------',],
                         ['FuStW T BP 2 Hbf Bielefeld ','----------','----------','----------',],
                         ['FuStW T BP 3 Hbf Bielefeld','----------','----------','----------',],
                         ['----------','----------','----------','----------',],
                         ['----------','----------','----------','----------',],
                         ['<b><h2>Schulen und Ausbildung</h2></b>','','','',],
                         ['<b>Feuerwehrschule Bielefeld','<b>Rettungsdienstschule Bielefeld','<b>Polizeischule Bielefeld','<b>',],
                         ['1','1','1','----------',],
                         ['<b><h2>Krankenhäuser</h2></b>','','','',],
                         ['<b>Krankenhaus 1','<b>Krankenhaus 2','<b>Krankenhaus 3','<b>Krankenhaus 4',],
                         ['----------','----------','----------','----------',],];


    function getListFromArray(arrayList, className) {
        let list = '<table class="table-divider striped"><tbody>';
        arrayList.forEach((el) => {
            list += '<tr>';
            el.forEach((e) => {
                list += `<td class="${className}"style="font-size: 12px;">${e}</td>`;
            });
            list += '</tr>';
        });
        list += '</tbody></table>';
        return list;
    }

    function buildFrameContent() {
        return `
        ${getListFromArray(missionNames2,'missionName2')}
        <br>`
    }

    function openWindow() {
        let newWindow2;
        if ((newWindow2 == null) || (newWindow2.closed) || (!newWindow2)) {
            newWindow2 = window.open('', "Intelligenter Helfer für alles Mögliche",
                                     "width=1400 (1400),height=1400,resizable=yes,status=no," +
                                     "menubar=no,location=no,scrollbars=no,toolbar=no,top=104,left=0");
            newWindow2.opener = top;
            newWindow2.focus();
        } else {
            newWindow2.focus();
        }
        window.addEventListener('unload', () => {
            newWindow.close();
        })
        newWindow2.document.head.innerHTML = `<title>Wachenübersicht ReSi</title><link rel="stylesheet" href="https://rettungssimulator.online/css/index.css"></link><link rel="shortcut icon" href="https://rettungssimulator.online/images/favicons/favicon.ico"></link>>`;
        newWindow2.document.body.innerHTML = buildFrameContent();
        if(darkMode) newWindow2.document.body.classList.add('dark');
        $('.missionName2', newWindow2.document).on('click', (e) => {
            $('#newMission2NameInput').val(replaceFunc($(e.target).text()));

        });
    }
    $('body').append(`<script>
        function replaceFunc(text){
          text = text.replace(/%text%/g, $("#newMission2CustomText").val());
          text = text.replace(/%ort%/g, $("#newMission2CityInput").val());
          text = text.replace(/%straße%/g, $("#newMission2RoadInput").val());
          text = text.replace(/%nummer%/g, $("#newMission2HousenumberInput").val());
          text = text.replace(/%name%/g, $("#newName2Input").val());
          text = text.replace(/%stichwort%/g, $("#newMissionName2Input").val());
          return text;
        };
        </script>`)
    $('.frame-close').before(`<button style="margin-left:10px;" class="left button button-success button-round openWindow2">Wachenübersicht</button>`);
    $('.openWindow2').on('click', openWindow)
    //openWindow2();
}
(function() {
    'use strict';
    $('#iframe').css('z-index', '20');
    if(window.location.href.includes('/missionNew/')){
        //case new Mission
        //Stichworte unter den Alarmbuttons

        newWindow();
    }else if(window.location.href.endsWith('#dispo=true') || window.location.href.endsWith('&dispo=true') || window.location.href.includes('#dispo=true') || window.location.href.includes('&dispo=true')){
        //case disposition
        //Stichwörter in der Anzeige

        //eingefärbter Alarmbutton

        //große Karte

        //Nachricht bei Chatmessage

        //begrüßung

        //Sachen im Chat

        $('#ad').css({
            'grid-area':'1 / 1 / 4 / 2',
            'z-index':'2'
        });
        $('#map').hide();
        $('#departments').hide();
        $('#missions').css({
            'grid-area':'1 / 3 / 4 / 4',
            'z-index':'2'
        });
        $('#radio').css({
            'grid-area':'1 / 4 / 4 / 5',
            'z-index':'2'
        });
    }else if(window.location.href.endsWith('#other=true') || window.location.href.endsWith('&other=true') || window.location.href.includes('#other=true') || window.location.href.includes('&other=true')){
        //case other
        $('#map').hide();
        $('#missions').hide();
        $('#calls').hide();
        $('#radio').hide();
        $('#ad').css({
            'grid-area':'1 / 2 / 4 / 3',
            'z-index':'2'
        });
        $('#departments').css({
            'grid-area':'1 / 3 / 4 / 5',
            'z-index':'2'
        });
        $('#chat').css({
            'grid-area':'1 / 1 / 4 / 2',
            'z-index':'2'
        });
        $('#ad').append(`<textarea class='input-round' rows='10' autocomplete='off' id='notes_bobelle_resi'>${localStorage.notesNiZi}</textarea>
            <button class='button button-round button-success' onclick='localStorage.notesNiZi = $("#notes_Bobelle_resi").val();'>Speichern</button>`);

    };
})();