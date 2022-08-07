// ==UserScript==
// @name         Leitstelle Bielefeld
// @version      1.0.1
// @description  ~ no description provided ~
// @author       Bobelle
// @match        *://rettungssimulator.online/*
// @match        *://beta.rettungssimulator.online/*
// @match        *://rettungssimulator.online/missionNew/*
// @match        *://beta.rettungssimulator.online/missionNew/*
// @icon         https://www.google.com/s2/favicons?domain=rettungssimulator.online
// ==/UserScript==
/* global $ toggleMap socket systemMessage noticeModal hideModal replaceFunc */
function keywordsAd() {
    'use strict';
    const worte = ["<b><h5>Design by Bobelle©</h5></b><b>VERDACHTSDIAGNOSEN:</b>", "","ACS","Akutes Abdomen","Akute Atemnot","Alkoholintox","Anaphylaktischer Schock","Apoplex","Appendizitis","Asthmatischer Anfall","Beginnende Geburt",
                   "Bewußtlosigkeit","Crush-Syndrom","Frakturen o.ä.:","Unterschenkel#","Geburt","Gynäkologische Blutung","Herzinfarkt",
                   "Hypertonie","Krampfanfall", "Kreislaufbeschwerden","Kindlicher Fieberkrampf","Kopfplatzwunde","Lumbago","Nicht ansprechbare Person","Rauchgasinhalation","Rückenschmerzen", "Schleudertrauma",
                   "Schulterluxation","Synkope","Unterkühlung","Varitzenblutung", "Wirbelsäulen-Trauma",""]
    var html_string = "<span style='overflow:auto'>"
    for (var i = 0; i < worte.length; i++) {
        html_string += `<span onclick='$("#iframe").contents().find("#patientDiagnose").val(this.innerHTML)'>${worte[i]}</span><br>`;
    };
    html_string += "</span>"
    $("#ad").append(html_string);
};

function colorAlarm() {
    'use strict';
    var neu = document.createElement("style");
    neu.innerHTML = "#missionForm{border-color: light green; color: light green;} #missionForm:hover{background-color: yellow; color: red; border-color: red;}"
    var vater = document.head;
    document.head.appendChild(neu);
};

function bigMap() {
    'use strict';

    function toggleBigMap() {
        setTimeout(function () {
            toggleMap();
        }, 1000)
        $('header').remove();
    };
    if (window.location.href.endsWith('#map=true') || window.location.href.endsWith('&map=true') || window.location.href.includes('#map=true') || window.location.href.includes('&map=true')) {
        $(document).ready(toggleBigMap)
    } else {
        $('#ad').append('<br><a href="https://rettungssimulator.online/#map=true" class="button button-success button-round no-prevent" style="width:18%" target="_blank">Karte</a><h1>',)
    };
};

function chatMessage() {
    'use strict';
    socket.on("associationMessage", (msg) => {
        if (msg.message && msg.userName != $(".username .frame-opener").html()) {
            systemMessage({
                'title': `${msg.userName}`,
                'message': `<span id="chatMessageAlert">${msg.message}</span>`,
                'type': 'info'
            });
            hideModal();
        }
    });
}

function wordsChat() {
    'use strict';
    const orte = ["Anröchte","Ahlen","Alverdissen","Bielefeld","Bad Sassendorf","Brackwede","Beckum","Bünde","Büren","Belecke","Bad Salzufeln","Blomberg","Bösingfeld","Barntrup"
                  ,"Detmold","Delbrück","Drensteinfurt","Dürentrup","Erwitte","Enger","Exter"];
    var html_string = "<div class='panel-headline'></div><span style='overflow: auto;'>"
    for (var j = 0; j < orte.length; j++) {
        html_string += `<span onclick='$("#iframe").contents().find("#newMissionCityInput").val(this.innerHTML)'>${orte[j]}</span><br>`;
    };
    html_string += "</span>"
    $("#chat").html(html_string);
};

function greet() {
    'use strict';
    systemMessage({
        'title': '<b>Systemupdate:</b>',

        'message':`<h5>Design by Bobelle©</h5><b>Leitstelle Bielefeld:</b>  ${parseInt($(".call-next").text()) + 1} offene Anrufe<br><b>Disponentenplatz   1:</b>   ${$(".mission-list-icon-1").length}  Einsätze in Warteschleife`,
        'type': 'info'
    });
};

function wordsMissionAlarm() {
    'use strict';
    const worte = [ "<b>Rettungsdienst</B>", "Arzt vor Ort", "<b>UNFÄLLE:</B>", "Häuslicher Notfall", "Verkehrsunfall","<b>ERKRANKUNGEN:</B>", "Häuslicher Notfall","Nicht ansprechbare Person",];
    const worte2 = [ "<b>Feuerwehr</B>", "BMA Auslösung", "<b>Stichwortergänzungen:</B>", "RTH Chritstph 13 mit alamiert", "Polizei vor Ort",];
    var zahl;
    worte.length < worte2.length ? zahl = worte2.length : zahl = worte.length;
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
        html_string += `<tr><td onclick='$("#newMissionCustomText").val(replaceFunc(this.innerText));'>${worte[i]}</td><td onclick='$("#newMissionCustomText").val(replaceFunc(this.innerText));'>${worte2[i]}</td></tr>`;
    };
    html_string += "</tbody></table>"
    $(".panel-body").append(html_string);
};

function sChat() {
    'use strict';
    const worte = ['S1-im Hintergrund', 'S2', 'S3-beschäftigt', 'S4-Chat aus', 'S6', 'S6-Gute Nacht. Bis morgen','Leitstelle', 'Leitstelle verstanden',
                   'Leitstelle verstanden, schönen Feierabend','Alle meine Patienten sind freigegeben.Wenn keiner mehr unterwegs ist, können alle meine Einsätze geschlossen werden.',
                   'Herzlich willkommen bei uns. Schön, das du den Weg zu uns gefunden hast.', 'Darf ich fragen, wo du baust?',
                   'Aller Anfang ist schwer. Lies dir bitte ggf. als Hilfestellung unseren Anfängerleitfaden unter den Regeln durch.',
                   'Ist die Vergütung der Einsätze und deren Anforderungen bekannt? Ggf. auch nachzulesen unter den Regeln']
    let html = '<div>';
    for (var i = 0; i < worte.length; i++) {
        html += `<input type='radio' class='sendStatus' val='${worte[i]}' name='statusCheck' id='check_${i}'><label for='check_${i}' class='labelChatSend'>${worte[i]}</label><br>`;
    };
    html += '<button class="button button-round button-success" id="sendMessageStatus">Status senden</button></div><h1>';
    $('#ad').append(html);
    $('#sendMessageStatus').on('click', function () {
        if ($('.sendStatus.active').length != 1) {
            noticeModal('Fehler', 'Du musst einen Status auswählen! Wenn ein Status ausgewählt ist, wähle ihn bitte nochmal aus!', 'Schließen');
            return;
        };
        var für = $(".sendStatus.active").attr("id");
        try {
            var query = document.querySelectorAll(`.labelChatSend[for='${CSS.escape(für)}']`)[0];
        } catch (e) {
            noticeModal('Fehler', 'Bitte lade die Seite neu! Wenn der Fehler weiter auftritt, wende dich an NiZi112!', 'Schließen');
        };
        if (worte.indexOf(query.innerText) == -1 || !query.innerText) {
            noticeModal('Fehler2', 'Bitte lade die Seite neu! Wenn der Fehler weiter auftritt, wende dich an NiZi112!', 'Schließen');
        }
        $.ajax({
            url: "/api/sendAssociationChatMessage",
            dataType: "json",
            type: "POST",
            data: {
                "message": query.innerText,
            },
            success: function (r) {}
        });
        $('.sendStatus.active').removeClass('active');
    });
    $('.sendStatus').on('click', function (e) {
        $('.sendStatus.active').removeClass('active');
        $(e.target).addClass('active');
    });
};

function newWindow() {
    let darkMode = false; // true oder false
    let missionNames = [
        ['<b>#A</b>','','','','','<b><h5>Design by Bobelle©</h5></b>'],
        ['Akutes Abdomen','Alarm Fußfessel','Alkoholintoxikation','Allergische Reaktion','Angriff auf Sicherheitsdienst','Anzeige Graffiti'],
        ['Ausgekugeltes Gelenk','Auffahrunfall','Atemnot','Akute Thrombose','Abgestürztes Segelflugzeug','Aggressiver Bettler'],
        ['','','','','',''],

        ['<b>#B</b>','','','','',''],
        ['Balkonbrand','Baum auf Straße','Baum droht zu fallen','Baumkrone droht herab zu stürzen','Brand in Biogasanlage','Blockierte Haltestelle'],
        ['Beschädigter Bahnübergang','Bewusstlose Person','Bluthochdruck','Böschungsbrand','Brustschmerz','Brennendes Laub'],
        ['Brand in Autowerkstatt','Brand in Buchladen','Brand in Gutshaus','Brand in Holzspanplattenlager','Brennendes Geschenk','Brennendes Gebüsch'],
        ['Brand in Labor','Brand in Lackiererei','Brand in Turnhalle','Brand mehrerer Fahrzeuge','Brennendes Elektrogerät','Brennender Sperrmüll'],
        ['Brennende Bushaltestelle','Brennende Garage','Brennende Garagenreihe','Brennende Lagerhalle','Brennender Schuppen','Brennender PKW'],
        ['Brennende Landmaschine','Brennende Marktbude','Brennende Müllsammelstelle','Brennende Parkbank','Brennender Papiercontainer','Brennender Müllwagen '],
        ['Brennende Straßenlaterne','Brennende Windkraftanlage','Brennender Altkleidercontainer','Brennender Baum','Brennender LKW','Brennender Holzstapel',],
        ['Brennender Benzinkanister','Brennender Bus','Brennender Erdgas-PKW','Brennender Frachtcontainer','Brennender Jägerhochsitz','Brennender Getränkeautomat'],
        ['Brand in Supermarkt','Brand in Bibliothek','','','','',''],
        ['','','','','',''],

        ['<b>#C</b>','','','','',''],
        ['Chlorgasaustritt','','','','',''],
        ['','','','','',''],

        ['<b>#D</b>','','','','',''],
        ['Dachstuhlbrand','','','','',''] ,
        ['','','','','',''],

        ['<b>#E</b>','','','','',''],
        ['Einbruch','Entgleister Güterzug','','','',''],
        ['','','','','',''],

        ['<b>#F</b>','','','','',''],
        ['Fahren ohne Fahrschein','Fahrraddiebstahl','Feuer in Autohaus','Feuer in Schule','Feuer in Tiefgarage','Fraktur'],
        ['','','','','',''],

        ['<b>#G</b>','','','','',''],
        ['Gartenlaubenbrand','Gasgeruch','Gasleitung beschädigt','Geburt','Gestürzte Person','Geplatzte Krampfader'],
        ['Gefahr durch Wespennest','Gefahrgut-LKW verunglückt','Gegenstände auf Fahrbahn','','',''],
        ['','','','','',''],

        ['<b>#H</b>','','','','',''],
        ['Herrenloses Gepäckstück','Hochgedrückter Gullydeckel','Hilflose Person in Kletteranlage','Herzrhythmusstörung','',''],
        ['','','','','',''],

        ['<b>#I</b>','','','','',''],
        ['Identitätsfeststellung','','','','',''],
        ['','','','','',''],

        ['<b>#J</b>','','','','',''],
        ['','','','','',''],

        ['<b>#K</b>','','','','',''],
        ['Keller unter Wasser','Kleine Ölspur','Kellerbrand','Kleiner Feldbrand ','Kurze Bewusstlosigkeit','Küchenbrand'],
        ['Kleiner Waldbrand','Kleinflächenbrand','Klimaanlage in Zug ausgefallen','Kreislaufbeschwerden','','',],
        ['','','','','','',],

        ['<b>#L</b>','','','','',''],
        ['LKW gegen Ampel','LKW in Graben','Lose Dachziegel ','Ladendiebstahl','','','',''],
        ['','','','','',''],

        ['<b>#M</b>','','','','',''],
        ['Mittlere Ölspur','Mittlerer Feldbrand','Mittlerer Waldbrand','Motorradbrand ','Mülleimerbrand','Motorradunfall'],
        ['','','','','',''],

        ['<b>#N</b>','','','','',''],
        ['','','','','',''],
        ['','','','','',''],

        ['<b>#O</b>','','','','',''],
        ['','','','','',''],
        ['','','','','',''],

        ['<b>#P</b>','','','','',''],
        ['Person auf Rollfeld','Person auf Zug','Person hinter Tür',' Person in Aufzug','PKW in Graben',''],
        ['','','','','',''],

        ['<b>#Q</b>','','','','',''],
        ['','','','','',''],
        ['','','','','',''],

        ['<b>#R</b>','','','','',''],
        ['Rückenschmerzen','','','','',''],
        ['','','','','',''],

        ['<b>#S</b>','','','','',''],
        ['Scheunenbrand','Schlaganfall','Schlägerei','Schlange in Garten','Schwerer Verkehrsunfall','Sturz aus Höhe'],
        ['Schornsteinbrand','Straße unter Wasser','','','',''],
        ['','','','','',''],

        ['<b>#T</b>','','','','',''],
        ['Tankwagen verliert Flüssigkeit','Tiefgarage unter Wasser','Tier auf Balkon','Tier auf Baum','Trunkenheitsfahrt','Tier in Zaun eingeklemmt'],
        ['Tier in Gullydeckel','Tier in Keller','','','',''],
        ['','','','','',''],

        ['<b>#U</b>','','','','',''],
        ['Unangemeldete Demonstration','Unfallaufnahme', 'Unterkühlung ','','',''],
        ['','','','','',''],

        ['<b>#V</b>','','','','',''],
        ['Verstoß gegen das Betäubungsmittelgesetz','Verstoß gegen das Sprengstoffgesetz','Verdächtige Person','Verletzte Person in Baugrube','Verunfallte Person in Abwasserschacht','Verletzter Kranführer'],
        ['Verletzter Industriekletterer','','','','',''],
        ['','','','','',''],

        ['<b>#W</b>','','','','',''],
        ['Wildunfall','Wohnungsbrand','','','',''],
        ['','','','','',''],

        ['<b>#X</b>','','','','',''],
        ['','','','','',''],
        ['','','','','',''],

        ['<b>#Y</b>','','','','',''],
        ['','','','','',''],
        ['','','','','',''],

        ['<b>#Z</b>','','','','',''],
        ['','','','','',''],
        ['','','','','',''],

        ['<b>Events Sommer</h3></b>','<b>Event Ostern</h3></b>','<b>Events Halloween</h3></b>','<b>Event Winter</h3></b>','<b>Event Weihnachten</h3></b>','<b>Event Silvester</h3></b>',''],
        ['Gefahr durch Wespennest','Brand in Hasenbau','Brennende Hexenhütte','Unterkühlung','Brennende Weihnachtsmarktbude','Brennende Silvesterabfälle'],
        ['Klimaanlage in Zug ausgefallen','Brand in Ostereierlager','Brennendes Geisterschloss','Gestürzte Person durch Glatteis','Brennender Weihnachtsbaum','',''],
        ['','Schokoladenhasen Intoxikation','Zombie Biss','Person von Eiszapfen getroffen','Weihnachtsmann sitzt in Schornstein fest',''],
        ['','Osterei nicht gefunden','Fledermaus in Wohnung','','','',''],
        ['','Osterhase steckt im Bau fest','Brennende Vogelscheuche','',],
        ['','Verletzter Osterhase','Brennender Besen','Schwan im Eis',''],
        ['','Brand in Hasenbau','Brennender Kürbis','','','','','',''],
        ['','Brand in Ostereierlager','Störung der Totenruhe','','','',''],
        ['','Schokoladenhasen Intoxikation','Verletzte Hexe','','',''],
        ['','','','','',''],
        ['','','','','',''],

        ['<b></b>', '<b></b>', '<h2>TH-Rettung Mensch/Tier</h2>', '<b></b>', '<b></b>','<b></b>' ],
        ['<b>im Freien</b>','<b>im/am Gebäude</b>','<b>Gebäude hohe Personenzahl</b>','<b>Gewerbe/Industrie</b>','<b>Landwirtschaft</b>','<b>Verkehr</b>',],
        ['TH0#Tierrettung klein', 'THO#Türöffnung','THO#Person in Aufzug','TH1 Rettung H/T;R1N1# Baugrube','','TH1#VU#PKW in Graben', ],
        ['TH1#Tierrettung groß','THO;R1;P1#Türöffnung RD','THO;R1#Person in Aufzug','TH1 Rettung H/T;R1N1# Abwasserschacht','','TH1#VU#LKW in Graben', ],
        ['TH0;DL#Tierrettung','','','','','TH0#VU#LKW gegen Ampel', ],
        ['THO;DL;R1#Wespennest','TH1#Sturz aus Höhe','','TH1 Rettung H/T;R1N1# Kletterpark','','TH1Y#VUK#Person klemmt', ],
        ['TH0;RW#Tierrettung','THO#Kind in Notlage', '','TH1 Rettung H/T;R1N1# Baukran', '','TH1Y#VUK2#Personen eingeklemmt', ],
        ['','','','TH1 Rettung H/T;R1N1# Windkraftanlage','','TH1Y#Automatischer Fahrzeugnotruf',],
        ['','','','TH1 Rettung H/T;R1N1# Sendemast','','TH2#VU#PKW von Brücke',],
        ['','','','','','',],

        ['<b></b>', '<b></b>', '<h2>Technische Hilfe- allgemein</h2>', '<b></b>', '<b></b>','<b></b>' ],
        ['<b>im Freien</b>','<b>im/am Gebäude</b>','<b>Gebäude hohe Personenzahl</b>','<b>Gewerbe/Industrie</b>','<b>Landwirtschaft</b>','<b>Verkehr</b>',],
        ['TH0;DL#Droht zu fallen Baum/Baumkrone/Äste','TH1#Baum auf Dach','','','','TH0#Baum auf Straße',],
        ['','','','','','TH0#Baum im Gleis',],
        ['TH0#Straße unter Wasser','TH0#Keller unter Wasser','TH1#Tiefgarage unter Wasser','TH0#klein','','TH0#Gegenstände im Gleisbereich ',],
        ['','','','','','',],
        ['','TH0;DL#Dachsicherung','','TH1#Baukran umgestürzt','','TH1#Güterzug entgleist',],
        ['','','','','','',],

        ['<b></b>', '<b></b>', '<h2>Technische Hilfe-Gefahrgut</h2>', '<b></b>', '<b></b>','<b></b>' ],
        ['<b>im Freien</b>','<b>im/am Gebäude</b>','<b>Gebäude hohe Personenzahl</b>','<b>Gewerbe/Industrie</b>','<b>Landwirtschaft</b>','<b>Verkehr</b>',],
        ['','ABC1#Gasgeruch','ABC1Y#Autom.GMA#Chlorgas','','','TH0#Ölspur klein', ],
        ['', 'ABC1#Leckage Gasleitung','ABC1Y#Chlorgasaustritt','','','TH1#Ölspur  groß', ],
        ['','ABC1#Leckage Öltank','','','','',],
        ['','','','','','ABC1#Leckage Tanklastzug',],
        ['','','','','','ABC1#VU#Gefahrguttransport',],

        ['<b></b>', '<b></b>', '<h2>Polizeieinsätze</h2>', '<b></b>', '<b></b>','<b></b>' ],
        ['<b>Identitätsfeststellung</b>','<b>Öffentlichkeitsdelikte</b>','<b>Gewaltdelikte</b>', '<b>Eigentumsdelikte</b>','<b>Bundesbahn/Flughafen</b>','<b>Verkehrsdelikte</b>' ],
        ['P1#Personenüberprüfung','P1#Ruhestörung','BP2#Aggressive Person', 'P1#Erschleichen von Leistungen','BP2#nicht zuordbarer Gegenstand','P1#Blockierte Haltestelle', ],
        ['P1#Personalienfeststellung','P1#Sachbeschädigung','P3#Schlägerei','BP1#Erschleichen von Leistungen','BP1#Beförderungsausschluss ','P2#Gegenstände auf der Fahrbahn'],
        ['BP1#Personenüberprüfung','BP1#Sachbeschädigung','P2#Körperverletzung','P1#Diebstahl','BP1;R1#BTMG-Verstoß','P2#Trunkenheitsfahrt', ],
        ['BP1#Personalienfeststellung','P1#Vandalismus','','BP1#Diebstahl','BP1#Gefährlicher Eingriff in den Bahnverkehr', 'P1#Unfallaufnahme', ],
        ['','','','P1#Raub','BP1#Störung Bahnübergang','P1#Auffahrunfall', ],
        ['','BP1;R1#BTMG-Verstoß','','BP1#Raub','BP1#Gegenstände im Gleisbereich ','P1#Wildunfall', ],
        ['','P2#Automatischer Fußfessel-Alarm', '','P1#Einbruch','BP2#Ausfall Zugklimaanlage','',],
        ['','','','P3#Einbruch/Täter vor Ort','','',],
        ['','','','BP1#Einbruch','','',],
        ['','','','P1;R1#Einbruch','','',],
        ['','','','BP1;R1#Einbruch','','',],

    ];
    let missionCities = [
        ['Stadt 1', 'Stadt'],
        ['Stadt 2']
    ];
    let missionStreets = [
        ['Straße 1', 'Straße'],
        ['Straße 2']
    ];
    let missionHouseNumbers = [
        ['Nummer 1', 'Nummer'],
        ['Nummer 2']
    ];
    let freeText = [
        ['Text 1', 'Text'],
        ['Text 2']
    ];

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
        return `<h2>Alarmstichworte:</h2>
        ${getListFromArray(missionNames, 'missionName')}

        <br>`
    }

    function openWindow() {
        let newWindow;
        if ((newWindow == null) || (newWindow.closed) || (!newWindow)) {
            newWindow = window.open('', "Intelligenter Helfer für alles Mögliche",
                                    "width=1320 (360),height=524,resizable=yes,status=no," +
                                    "menubar=no,location=no,scrollbars=no,toolbar=no,top=63,left=0");
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
        if (darkMode) newWindow.document.body.classList.add('dark');
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
(function () {
    'use strict';
    $('#iframe').css('z-index', '2');
    if (window.location.href.includes('/missionNew/')) {
        //case new Mission
        //Stichworte unter den Alarmbuttons
        wordsMissionAlarm();
        newWindow();
    } else if (window.location.href.endsWith('#dispo=true') || window.location.href.endsWith('&dispo=true') || window.location.href.includes('#dispo=true') || window.location.href.includes('&dispo=true')) {
        //case disposition
        //Stichwörter in der Anzeige
        keywordsAd();
        //eingefärbter Alarmbutton
        colorAlarm();
        //große Karte
        bigMap();
        //Nachricht bei Chatmessage
        chatMessage();
        //begrüßung
        greet();
        //Sachen im Chat
        wordsChat()
        $('#ad').css({
            'grid-area': '1 / 1 / 4 / 2',
            'z-index': '2'
        });
        $('#map').hide();
        $('#departments').hide();
        $('#missions').css({
            'grid-area': '1 / 3 / 4 / 4',
            'z-index': '2'
        });
        $('#radio').css({
            'grid-area': '1 / 4 / 4 / 5',
            'z-index': '2'
        });
    } else if (window.location.href.endsWith('#other=true') || window.location.href.endsWith('&other=true') || window.location.href.includes('#other=true') || window.location.href.includes('&other=true')) {
        //case other
        $('#map').hide();
        $('#missions').hide();
        $('#calls').hide();
        $('#radio').hide();
        $('#ad').css({
            'grid-area': '1 / 2 / 4 / 3',
            'z-index': '2'
        });
        $('#departments').css({
            'grid-area': '1 / 3 / 4 / 5',
            'z-index': '2'
        });
        $('#chat').css({
            'grid-area': '1 / 1 / 4 / 2',
            'z-index': '2'
        });
        $('#ad').append(`<textarea class='input-round' rows='10' autocomplete='off' id='notes_nizi_resi'>${localStorage.notesNiZi}</textarea>
            <button class='button button-round button-success' onclick='localStorage.notesNiZi = $("#notes_nizi_resi").val();'>Speichern</button><h1>`);
        sChat();
    } else if (window.location.href.endsWith('#map=true') || window.location.href.endsWith('&map=true') || window.location.href.includes('#map=true') || window.location.href.includes('&map=true')) {
        //case map
        bigMap();
    } else if (window.location.href.endsWith('#alliance=true') || window.location.href.endsWith('&alliance=true') || window.location.href.includes('#alliance=true') || window.location.href.includes('&alliance=true')) {
        //case alliance
        $('#departments').hide();
        $('#calls').hide();
        $('#radio').hide();
        $('#chat').css({
            'grid-area': '1 / 4 / 4 / 4',
            'z-index': '2'
        }).find('.panel-headline').text('Protokolle');
        $('#chat #chatMessages').hide();
        $('#chat #missionLog').removeClass('hidden');
        $('#missions').css({
            'grid-area': '1 / 2 / 4 / 2',
            'z-index': '2'
        }).find('.panel-headline').text('Eigene Einsätze');
        $('#radio').css({
            'grid-area': '1 / 3 / 4 / 3',
            'z-index': '2',
            'display': 'block',
        }).find('.panel-headline').text('Geteilte Einsätze');
        $('#radio .panel-body').html('').css('overflow', 'auto');
        $('#radio .panel-body').html($('#sharedMissions').html());
        $('#radio').attr('id', 'missions').addClass('sharedMissionsNiZi missions-container');
        function update(){
            setTimeout(() => {
                $('.sharedMissionsNiZi .panel-body').html($('#sharedMissions').html());
            }, 100);
        }
        socket.on("newMission", () => update());
        socket.on("missionStatus", () => update());
        socket.on("finishMission", () => update());
    };
})();