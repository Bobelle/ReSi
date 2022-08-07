// ==UserScript==
// @name         Einsatzliste
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @description  Leitstelle Bielefeld
// @author       Bobelle
// @match        https://rettungssimulator.online/missionNew/*
// @icon         http://rettungssimulator.online/favicon.ico
// @grant        none
// ==/UserScript==
/* global $ replaceFunc */

function newWindow(){
    let darkMode = false; // true oder false
    let missionNames = [['<b>#A</b>','','','',],
                        ['Akutes Abdomen','Alarm Fußfessel','Alkoholintoxikation','Allergische Reaktion',],
                        ['Angriff auf Sicherheitsdienst','Anzeige Graffiti','Atemnot','Auffahrunfall',],
                        ['Ausgekugeltes Gelenk','Aggressiver Bettler','Abgestürztes Segelflugzeug','----------',],
                        ['<b>#B</b>','','','',],
                        ['Balkonbrand','Baum auf Straße','Baum droht zu fallen','Baumkrone droht herab zu stürzen',],
                        ['Beschädigter Bahnübergang','Bewusstlose Person','Bluthochdruck','Böschungsbrand',],
                        ['Brand in Autowerkstatt','Brand in Buchladen','Brand in Gutshaus','Brand in Holzspanplattenlager',],
                        ['Brand in Labor','Brand in Lackiererei','Brand in Turnhalle','Brand mehrerer Fahrzeuge',],
                        ['Brennende Bushaltestelle','Brennende Garage','Brennende Garagenreihe','Brennende Lagerhalle',],
                        ['Brennende Landmaschine','Brennende Marktbude','Brennende Müllsammelstelle','Brennende Parkbank',],
                        ['Brennende Straßenlaterne','Brennende Windkraftanlage','Brennender Altkleidercontainer','Brennender Baum',],
                        ['Brennender Benzinkanister','Brennender Bus','Brennender Erdgas-PKW','Brennender Frachtcontainer',],
                        ['Brennender Getränkeautomat','Brennender Holzstapel','Brennender Jägerhochsitz','Brennender LKW',],
                        ['Brennender Müllwagen','Brennender Papiercontainer','Brennender PKW ','Brennender Schuppen',],
                        ['Brennender Sperrmüll ','Brennendes Elektrogerät',' Brennendes Gebüsch','Brennendes Geschenk',],
                        ['Brennendes Laub','Brustschmerz','Blockierte Haltestelle ','Brand in Biogasanlage',],
                        ['<b>#C</b>','','','',],
                        ['Chlorgasaustritt','----------','-----------','----------',],
                        ['<b>#D</b>','','','',],
                        ['Dachstuhlbrand','-----------','----------','----------',] ,
                        ['<b>#E</b>','','','',],
                        ['Einbruch','Entgleister Güterzug','-----------','-----------',],
                        ['<b>#F</b>','','','',],
                        ['Fahren ohne Fahrschein','Fahrraddiebstahl','Feuer in Autohaus','Feuer in Schule',],
                        ['Feuer in Tiefgarage','Fraktur','----------','----------',],
                        ['<b>#G</b>','','',],
                        ['Gartenlaubenbrand','Gasgeruch','Gasleitung beschädigt','Geburt',],
                        ['Gefahr durch Wespennest','Gefahrgut-LKW verunglückt','Gegenstände auf Fahrbahn','Geplatzte Krampfader',],
                        ['Gestürzte Person','','','',],
                        ['<b>#H</b>','','','',],
                        ['Herrenloses Gepäckstück','Hochgedrückter Gullydeckel','Hilflose Person in Kletteranlage','-----------',],
                        ['<b>#I</b>','','','',],
                        ['Identitätsfeststellung','----------','-----------','----------',],
                        ['<b>#J</b>','','','',],
                        ['-----------','----------','-----------','----------',],
                        ['<b>#K</b>','','','',],
                        ['Keller unter Wasser','Kleine Ölspur','Kellerbrand','Kleiner Feldbrand ',],
                        ['Kleiner Waldbrand','Kleinflächenbrand','Klimaanlage in Zug ausgefallen','Kreislaufbeschwerden',],
                        ['Küchenbrand','Kurze Bewusstlosigkeit','----------','----------',],
                        ['<b>#L</b>','','','',],
                        ['LKW gegen Ampel','LKW in Graben','Lose Dachziegel ','----------',],
                        ['<b>#M</b>','','','',],
                        ['Mittlere Ölspur','Mittlerer Feldbrand','Mittlerer Waldbrand','Motorradbrand ',],
                        ['Mülleimerbrand','Motorradunfall','----------','----------',],
                        ['<b>#N</b>','','','',],
                        ['-----------','-----------','----------','----------',],
                        ['<b>#O</b>','','','',],
                        ['----------','----------','----------','----------',],
                        ['<b>#P</b>','','','',],
                        ['Person auf Rollfeld','Person auf Zug','Person hinter Tür',' Person in Aufzug',],
                        ['PKW in Graben','----------','----------','----------',],
                        ['<b>#Q</b>','','','',],
                        ['----------','----------','----------','----------',],
                        ['<b>#R</b>','','','',],
                        ['Rückenschmerzen','----------','----------','----------',],
                        ['<b>#S</b>','','','',],
                        ['Scheunenbrand','Schlaganfall','Schlägerei','Schlange in Garten',],
                        ['Schornsteinbrand','Straße unter Wasser','Sturz aus Höhe','Schwerer Verkehrsunfall',],
                        ['<b>#T</b>','','','',],
                        ['Tankwagen verliert Flüssigkeit','Tiefgarage unter Wasser','Tier auf Balkon','Tier auf Baum',],
                        ['Tier in Gullydeckel','Tier in Keller','Tier in Zaun eingeklemmt','Trunkenheitsfahrt',],
                        ['<b>#U</b>','','','',],
                        ['Unangemeldete Demonstration','Unfallaufnahme', 'Unterkühlung ','----------',],
                        ['<b>#V</b>','','','',],
                        ['Verstoß gegen das Betäubungsmittelgesetz','Verstoß gegen das Sprengstoffgesetz','Verdächtige Person','Verletzte Person in Baugrube',],
                        ['Verletzter Industriekletterer','Verletzter Kranführer','Verunfallte Person in Abwasserschacht','----------',],
                        ['<b>#W</b>','','','',],
                        ['Wildunfall','Wohnungsbrand','----------','----------',],
                        ['<b>#X</b>','','','',],
                        ['----------','----------','----------','----------',],
                        ['<b>#Y</b>','','','',],
                        ['----------','----------','----------','----------',],
                        ['<b>#Z</b>','','','',],
                        ['----------','----------','----------','----------',],
                        ['<b>Events Sommer</h3></b>','<b>Event Ostern</h3></b>','<b>Events Halloween</h3></b>','<b>Event Weihnachten und Winter</h3></b>',],
                        ['Gefahr durch Wespennest','Brand in Hasenbau','Brennende Hexenhütte','Brennende Weihnachtsmarktbude',],
                        ['Klimaanlage in Zug ausgefallen','Brand in Ostereierlager','Brennendes Geisterschloss','Brennender Weihnachtsbaum',],
                        ['Böschungsbrand','Schokoladenhasen Intoxikation','Zombie Biss','Weihnachtsmann sitzt in Schornstein fest',],
                        ['----------','Osterei nicht gefunden','Fledermaus in Wohnung','Brennende Weihnachtsmarktbude',],
                        ['----------','Osterhase steckt im Bau fest','Brennende Vogelscheuche','Brennender Weihnachtsbaum',],
                        ['----------','Verletzter Osterhase','Brennender Besen','Schwan im Eis',],
                        ['----------','Brand in Hasenbau','Brennender Kürbis','Unterkühlung',],
                        ['----------','Brand in Ostereierlager','Störung der Totenruhe','Person von Eiszapfen getroffen',],
                        ['----------','Schokoladenhasen Intoxikation','Verletzte Hexe','Gestürzte Person durch Glatteis',],
                        ['----------','----------','----------','Brennende Silvesterabfälle',]];

    let missionCities = [['Stadt 1','Stadt'],['Stadt 2']];
    let missionStreets = [['Straße 1','Straße'],['Straße 2']];
    let missionHouseNumbers = [['Nummer 1','Nummer'],['Nummer 2']];

    function getListFromArray(arrayList, className) {
        let list = '<table class="table-divider striped"><tbody>';
        arrayList.forEach((el) => {
            list += '<tr>';
            el.forEach((e) => {
                list += `<td class="${className}">${e}</td>`;
            });
            list += '</tr>';
        });
        list += '</tbody></table>';
        return list;
    }

    function buildFrameContent() {
        return `
        ${getListFromArray(missionNames,'missionName')}
        <br>`
    }

    function openWindow() {
        let newWindow;
        if ((newWindow == null) || (newWindow.closed) || (!newWindow)) {
            newWindow = window.open('', "Intelligenter Helfer für alles Mögliche",
                                    "width=1000 (360),height=524,resizable=yes,status=no," +
                                    "menubar=no,location=no,scrollbars=no,toolbar=no,top=104,left=0");
            newWindow.opener = top;
            newWindow.focus();
        } else {
            newWindow.focus();
        }
        window.addEventListener('unload', () => {
            newWindow.close();
        })
        newWindow.document.head.innerHTML = `<title>Stichworte ReSi</title><link rel="stylesheet" href="https://rettungssimulator.online/css/index.css"></link><link rel="shortcut icon" href="https://rettungssimulator.online/images/favicons/favicon.ico"></link>>`;
        newWindow.document.body.innerHTML = buildFrameContent();
        if(darkMode) newWindow.document.body.classList.add('dark');
        $('.missionName', newWindow.document).on('click', (e) => {
            $('#newMissionNameInput').val(replaceFunc($(e.target).text()));
        });
        $('.street', newWindow.document).on('click', (e) => {
            $('#newMissionRoadInput').val(replaceFunc($(e.target).text()));
        });
        $('.houseNumber', newWindow.document).on('click', (e) => {
            $('#newMissionHousenumberInput').val(replaceFunc($(e.target).text()));
        });
        $('.city', newWindow.document).on('click', (e) => {
            $('#newMissionCityInput').val(replaceFunc($(e.target).text()));
        });
        $('.freeText', newWindow.document).on('click', (e) => {
            $('#newMissionCustomText').val(replaceFunc($(e.target).text()));
        });
    }
    $('body').append(`<script>
        function replaceFunc(text){
          text = text.replace(/%text%/g, $("#newMissionCustomText").val());
          text = text.replace(/%ort%/g, $("#newMissionCityInput").val());
          text = text.replace(/%straße%/g, $("#newMissionRoadInput").val());
          text = text.replace(/%nummer%/g, $("#newMissionHousenumberInput").val());
          text = text.replace(/%name%/g, $("#newNameInput").val());
          text = text.replace(/%stichwort%/g, $("#newMissionNameInput").val());
          return text;
        };
        </script>`)
    $('.frame-close').before(`<button style="margin-left:10px;" class="left button button-success button-round openWindow">Einsatzstichworte</button>`);
    $('.openWindow').on('click', openWindow)
    //openWindow();
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
            <button class='button button-round button-success' onclick='localStorage.notesNiZi = $("#notes_nizi_resi").val();'>Speichern</button>`);

    };
})();