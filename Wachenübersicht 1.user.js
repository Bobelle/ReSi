// ==UserScript==
// @name         Wachenübersicht 1
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @description  Leitstelle Bielefeld
// @author       Bobelle
// @match        https://rettungssimulator.online/missionNew/*
// @icon         http://rettungssimulator.online/favicon.ico
// @grant        none
// ==/UserScript==
function newWindow(){
    let darkMode = false; // true oder false
    let missionNames2 = [['','<b><h2>Feuerwehr</h2></b>','','<b><h5>Design by Bobelle©</h5></b>',],
                         ['<b>Feuer- und Rettungswache Ost','<b>Feuer- und Rettungswache Nord','<b>Feuer- und Rettungswache West','<b>Feuer- und Rettungswache Süd',],
                         ['<b>Feuerwehr</b>','<b>Feuerwehr</b>','<b>Feuerwehr</b>','<b>Feuerwehr</b>',],
                         ['Florian Bielefeld 01 ABC-ErkKW','Florian Bielefeld 02 DLAK42 (DLAK 42) ','Florian Bielefeld 03 DLK23/12 (DLK 23/12) ','Florian Bielefeld 04 ABC-ErkKW (ABC-ErkKW) ',],
                         ['Florian Bielefeld 01 DLK 23/12','Florian Bielefeld 02 ELW1 (ELW) ','Florian Bielefeld 03 ELW1 (ELW) ','Florian Bielefeld 04 DLAK42 (DLAK 42) ',],
                         ['Florian Bielefeld 01 ELW1','Florian Bielefeld 02 FwK (FwK) ','Florian Bielefeld 03 GW-Atemschutz (GW-A) ','Florian Bielefeld 04 ELW1 (ELW) ',],
                         ['Florian Bielefeld 01 ELW2','Florian Bielefeld 02 GW-Dekon P (GW-Dekon P) ','Florian Bielefeld 03 GW-Gefahrgut (GW-G) ','Florian Bielefeld 04 ELW2 (ELW 2) ',],
                         ['Florian Bielefeld 01 GW-Atemschutz','Florian Bielefeld 02 GW-Gefahrgut (GW-G) ','Florian Bielefeld 03 GW-Öl (GW-Öl) ','Florian Bielefeld 04 GW-Atemschutz (GW-A) ',],
                         ['Florian Bielefeld 01 GW-Gefahrgut','Florian Bielefeld 02 HLF20 (HLF 20) ','Florian Bielefeld 03 GW-Tierrettung (GW-Tier) ','Florian Bielefeld 04 GW-Gefahrgut (GW-G) ',],
                         ['Florian Bielefeld 01 GW-Höhenrettung','Florian Bielefeld 02 KdoW (KdoW) ','Florian Bielefeld 03 HLF20 (HLF 20) ','Florian Bielefeld 04 GW-Höhenrettung (GW-H) ',],
                         ['Florian Bielefeld 01 GW-Tierrettung','Florian Bielefeld 02 KLF (KLF) ','Florian Bielefeld 03 LF20 1 (LF 20) ','Florian Bielefeld 04 HLF20 (HLF 20) ',],
                         ['Florian Bielefeld 01 HLF20','Florian Bielefeld 02 LF20 1 (LF 20) ','Florian Bielefeld 03 LF20 2 (LF 20) ','Florian Bielefeld 04 KEF (KEF) ',],
                         ['Florian Bielefeld 01 KdoW','Florian Bielefeld 02 LF20 2 (LF 20) ','Florian Bielefeld 03 MZF (MZF) ','Florian Bielefeld 04 LF20 1 (LF 20) ',],
                         ['Florian Bielefeld 01 LF20','Florian Bielefeld 02 MZF (MZF) ','Florian Bielefeld 03 RW (RW) ','Florian Bielefeld 04 LF20 2 (LF 20) ',],
                         ['Florian Bielefeld 01 MZF','Florian Bielefeld 02 RW (RW) ','Florian Bielefeld 03 TLF16/25 (TLF 16/25) ','Florian Bielefeld 04 MZF (MZF) ',],
                         ['Florian Bielefeld 01 TLF 9000','Florian Bielefeld 02 RW-K (RW-K) ','----------','Florian Bielefeld 04 RW (RW) ',],
                         ['Florian Bielefeld 01 TLF16/25','Florian Bielefeld 02 SW2000 (SW 2000) ','----------','Florian Bielefeld 04 RW-K (RW-K) ',],
                         ['Florian Bielefeld 01 TMF','Florian Bielefeld 02 TLF16/25 (TLF 16/25) ','----------','Florian Bielefeld 04 TLF16/25 (TLF 16/25) ',],
                         ['<b>Rettungsdienst</b>','<b>Rettungsdienst</b>','<b>Rettungsdienst</b>','<b>Rettungsdienst</b>',],
                         ['Florian Bielefeld 01 RTW 1','Florian Bielefeld 02 RTW 1','Florian Bielefeld 03 RTW 1','Florian Bielefeld 04 RTW 1',],
                         ['Florian Bielefeld 01 RTW 2','Florian Bielefeld 02 RTW 2','Florian Bielefeld 03 RTW 2','Florian Bielefeld 04 RTW 2',],
                         ['Florian Bielefeld 01 RTW 3','Florian Bielefeld 02 RTW 3','Florian Bielefeld 03 RTW 3','Florian Bielefeld 04 RTW 3',],
                         ['Florian Bielefeld 01 iRTW 1','Florian Bielefeld 02 KTW 1(Reserve)','Florian Bielefeld 03 KTW 1(Reserve)','Florian Bielefeld 04 RTW 3',],
                         ['Florian Bielefeld 01 NEF 1(Reserve)','Florian Bielefeld 02 KTW 2(Reserve)','Florian Bielefeld 03 KTW 2(Reserve)','Florian Bielefeld 04 KTW 1(Reserve)',],
                         ['Florian Bielefeld 01 KTW 1(Reserve)','Florian Bielefeld 02 NEF 1(Reserve)','Florian Bielefeld 03 NEF 1(Reserve)','Florian Bielefeld 04 NEF 1(Reserve)',],
                         ['','','','',],
                         ['','<b><h2>Rettungsdienst</h2></b>','','',],
                         ['<b><h3>Rettungswache 5(ASB,DRK,JUH)</h3></b>','<b><h3>Rettungswache 6(ASB,DRK,JUH)</h3></b>','<b><h3>Rettungswache 7(ASB,DRK,JUH)</h3></b>','<b><h3>Rettungswache 8(ASB,DRK,JUH)</h3></b>',],
                         ['RD Bielefeld 05 RTW 1','RD Bielefeld 06 RTW 1','RD Bielefeld 07 RTW 1','RD Bielefeld 08 RTW 1',],
                         ['RD Bielefeld 05 RTW 2','RD Bielefeld 06 RTW 2','RD Bielefeld 07 RTW 2','RD Bielefeld 08 RTW 2',],
                         ['RD Bielefeld 05 RTW 3','RD Bielefeld 06 RTW 3','RD Bielefeld 07 RTW 3','RD Bielefeld 08 RTW 3',],
                         ['RD Bielefeld 05 KTW 1(Reserve)','RD Bielefeld 06 KTW 1(Reserve)','RD Bielefeld 07 KTW 1(Reserve)','RD Bielefeld 08 KTW 1(Reserve)',],
                         ['RD Bielefeld 05 KTW 2(Reserve)','RD Bielefeld 06 KTW 2(Reserve)','RD Bielefeld 07 KTW 2(Reserve)','RD Bielefeld 08 KTW 2(Reserve)',],
                         ['RD Bielefeld 05 KTW 3(Reserve)','RD Bielefeld 06 KTW 3(Reserve)','RD Bielefeld 07 KTW 3(Reserve)','RD Bielefeld 08 KTW 3(Reserve)',],
                         ['','','','',],
                         ['<b><h3>Rettungswache 9(Haupt)</h3></b>','<b><h3>Rettungswache 10(Biekra)</h3></b>','<b><h3>Florian Bielefeld NEF 1 Standort</h3></b>','<b><h3>RD Bielefeld NEF 2 Standort</h3></b>',],
                         ['RD Bielefeld 09 RTW 1','RD Bielefeld 10 RTW 1','Florian Bielefeld 01 NEF 1','Florian Bielefeld 01 NEF 2',],
                         ['RD Bielefeld 09 RTW 2','RD Bielefeld 10 RTW 2','----------','Florian Bielefeld 01 NEF 2(Reserve)',],
                         ['RD Bielefeld 09 RTW 3','RD Bielefeld 10 RTW 3','----------','----------',],
                         ['RD Bielefeld 09 KTW 1(Reserve)','RD Bielefeld 10 KTW 1(Reserve)','----------','----------',],
                         ['RD Bielefeld 09 KTW 2(Reserve)','RD Bielefeld 10 KTW 2(Reserve)','----------','----------',],
                         ['','','','',],
                         ['<b><h3>Luftrettungszentrum Bielefeld</h3></b>','','','<b><h3>',],
                         ['RTH Christoph 13 (Bielefeld)','Florian Bielefeld 11 NEF 1(Reserve)','','',],
                         ['RTH Christoph 8 (Lünen)','','','',],
                         ['Florian Bielefeld 60 MTW(Reserve)','Florian Bielefeld 61 MTW(Reserve)','Florian Bielefeld 62 MTW(Reserve)','Florian Bielefeld 63 MTW(Reserve)',],
                         ['','','','',],
                         ['','<b><h2>Freiwillige Feuerwehr</h2></b>','','',],
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
                         ['<b>Klinikum Bielefeld Mitte','<b>EvK Johannes Krankenhaus Bielefeld','<b>EvK Klinikum Bethel Bielefeld','<b>Klinikum Bielefeld Rosenhöhe',],
                         ['Teutoburger Str. 50, 33604 Bielefeld','Schildescher Str. 99, 33611 Bielefeld','Kantensiek 11, 33617 Bielefeld','An der Rosenhöhe 27,33647 Bielefeld',],
                         ['Alle Fachrichtungen','Alle Fachrichtungen','Alle Fachrichtungen','Alle Fachrichtungen',],];

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
                                     "width=2000 (360),height=1400,resizable=yes,status=no," +
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
        $('#ad').append(`<textarea class='input-round' rows='10' autocomplete='off' id='notes_nizi_resi'>${localStorage.notesNiZi}</textarea>
            <button class='button button-round button-success' onclick='localStorage.notesNiZi = $("#notes_Bobelle_resi").val();'>Speichern</button>`);

    };
})();