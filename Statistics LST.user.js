// ==UserScript==
// @name         Statistics LST
// @version      1.0.0
// @description  Shows statistics in the controlCenter
// @author       NiZi112
// @match        https://rettungssimulator.online/department/*
// @match        https://rettungssimulator.online/
// @icon         https://www.google.com/s2/favicons?domain=rettungssimulator.online
// ==/UserScript==
/* global getAPI $ */

(async function() {
    getAPI = async function(name) {
        if(
            !sessionStorage.getItem(`a${name}`) || JSON.parse(sessionStorage.getItem(`a${name}`)).lastUpdate > (new Date).getTime() * 1000 * 60 * 5
        ){
            return new Promise((res) => {
                $.ajax({
                    url : `/api/${name}`,
                    dataType :'json',
                    type : 'GET',
                    error:(e)=> {
                        noticeModal('Error', `Es ist ein Fehler bei einem GET einer API aufgetreten<br>Script: ${GM_info.script.name}<br>Version: ${GM_info.script.version} <br>Autor: ${GM_info.script.author}`);
                        console.error(`Error while fetching API ${name}:`);
                        console.error(e);
                        res('Error')
                    },
                    success: (r) => {
                        sessionStorage.setItem(`a${name}`, JSON.stringify({value:r, lastUpdate:(new Date).getTime()}))
                        res(r)
                    }
                })
            })
        }else{
            return new Promise((res) => {
                res(JSON.parse(sessionStorage.getItem(`a${name}`)).value);
            })
        }
    }
    if($('#tab_controlCenter_stats').length){
        if(!localStorage.counterConfig) localStorage.counterConfig = JSON.stringify({
            dayReset: (new Date()).getDate(),
            yearReset: (new Date()).getFullYear(),
            missionsToday: 0,
            missionsYear: 0,
            moneyToday: 0,
            moneyYear: 0,
            patientsToday: 0,
            patientsYear: 0
        });
        var config = JSON.parse(localStorage.counterConfig)
        //vehicles
        const userVehicles = await getAPI('userVehicles');
        const vehicleCategories = await getAPI('vehicleCategories');
        for(var i in userVehicles){
            for(var j in vehicleCategories){
                if(!vehicleCategories[j].count) vehicleCategories[j].count = 0
                if(vehicleCategories[j].ids.includes(userVehicles[i].vehicleID)){
                    ++vehicleCategories[j].count;
                }
            }
        }
        //buildings
        const userBuildings = await getAPI('userBuildings');
        const buildingCategories = await getAPI('buildings');
        userBuildings.forEach((el) => {
            if(!buildingCategories[(el.buildingType - 1)].count) buildingCategories[(el.buildingType - 1)].count = 0
            buildingCategories[(el.buildingType - 1)].count++
        })
        //insert into #tab_controlCenter_stats
        var table = `
      <table class="table-divider striped">
      <thead>
        <tr>
          <th>
          <u>Wachentyp</u>
          </th>
          <th>
          <u>Anzahl</u>
          </th>
        </tr>
        </thead>
        </tbody>`
    buildingCategories.forEach((el) => {
        table += `
        <tr>
          <td>${el.buildingName}</td>
          <td>${el.count ? el.count : 0}</td>
        </tr>`;
    })
        table += `
          </tbody>
          <thead>
            <tr>
              <th>
              <u>Fahrzeugtyp</u>
              </th>
              <th>
              <u>Anzahl</u>
              </th>
            </tr>
          </thead>
          </tbody>`;
        for(i in vehicleCategories){
            if(!vehicleCategories[i].ids.length || vehicleCategories[i].ids[0] == 10000) continue
            table += `
            <tr>
              <td>${vehicleCategories[i].name}</td>
              <td>${vehicleCategories[i].count ? vehicleCategories[i].count : 0}</td>
            </tr>`
        }
        table += `
          </tbody>
          <thead>
            <tr>
              <th>
              <u>Typ</u>
              </th>
              <th>
              <u>Anzahl</u>
              </th>
            </tr>
          </thead>
          <tbody>
          <tr>
            <td>
            Einsätze heute
            </td>
            <td>
            ${config.missionsToday}
            </td>
          </tr>
          <tr>
            <td>
            Einsätze dieses Jahr
            </td>
            <td>
            ${config.missionsYear}
            </td>
          </tr>
          <tr>
            <td>
            Patienten heute
            </td>
            <td>
            ${config.patientsToday}
            </td>
          </tr>
          <tr>
            <td>
            Patienten dieses Jahr
            </td>
            <td>
            ${config.patientsYear}
            </td>
          </tr>
          <tr>
            <td>
            Münzen heute
            </td>
            <td>
            ${config.moneyToday}
            </td>
          </tr>
          <tr>
            <td>
            Münzen dieses Jahr
            </td>
            <td>
            ${config.moneyYear}
            </td>
          </tr>
          </tbody>
        </table>`
        $('#tab_controlCenter_stats').append(table)
        $('#tab_controlCenter_stats').find('.label').css('text-decoration', 'line-through')
    }
    if(location.pathname == '/'){
        if(!localStorage.counterConfig) localStorage.counterConfig = JSON.stringify({
            dayReset: (new Date()).getDate(),
            yearReset: (new Date()).getFullYear(),
            missionsToday: 0,
            missionsYear: 0,
            moneyToday: 0,
            moneyYear: 0,
            patientsToday: 0,
            patientsYear: 0
        });
        const config = JSON.parse(localStorage.counterConfig);
        function changeConfig(type, plus = 1){
            if(config.yearReset != (new Date()).getFullYear()){
                for(i in config){
                    config[i] = 0;
                }
                config.yearReset = (new Date()).getFullYear();
                config.dayReset = (new Date()).getDate();
            }
            if(config.dayReset != (new Date()).getDate()){
                for(var i in config){
                    config[i] = 0;
                }
                config.dayReset = (new Date()).getDate();
            }
            if(type){
                switch(type){
                    case 'patients':
                        config.patientsToday++;
                        config.patientsYear++;
                        break;
                    case 'money':
                        config.moneyToday += plus;
                        config.moneyYear += plus;
                        break;
                    case 'missions':
                        config.missionsToday++;
                        config.missionsYear++
                        break;
                    default:
                        console.error(`Unknown config type "${type}" => changeConfig@Statistics LST (V${GM_info.script.version})`);
                }
            }
            localStorage.counterConfig = JSON.stringify(config)
        }
        socket.on('patientStatus', (e) => {
            if(e.userPatientStatus != 4)
                changeConfig('patients')
        })
        var actual = parseInt($('.muenzen:first').text().replaceAll('.', ''));
        socket.on('muenzenUpdate', (e) => {
            e = parseInt(e.toString().replaceAll('.', ''))
            actual = parseInt(actual.toString().replaceAll('.', ''))
            if(e > actual){
                var diff = e - actual;
                changeConfig('money', diff)
            }
            actual = e;
        })
        socket.on('finishMission', (e) => {
            changeConfig('missions')
        })
    }
})();