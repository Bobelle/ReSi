// ==UserScript==
// @name         AAO Suche
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://rettungssimulator.online/mission/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=rettungssimulator.online
// @grant        none
// ==/UserScript==

(() => {
    let vehicles = document.querySelectorAll('#mission-vehicle-group-by-vehicle .mission-vehicle, .mission-vehicles-group')
    vehicles.forEach(vehicle => {
        vehicle.classList.add('searchable');
    });
    console.log(vehicles)
    $('.enroute:first').before(`<div class="card">
    <div class="card-headline card-headline-danger">
    Fahrzeug-Suche
    </div>
    <div class="card-body">
      <div class="input-container">
        <div class="input-label">Name</div>
        <div class="input-content">
          <input class="input-round" type="text" id="vehicleSearch" placeholder="Fahrzeug/Wache" autocomplete="on">
          <div class="input-icon"><i class="fa-duotone fa-radar"></i></div>
        </div>
      </div>
    </div>
    </div>`);
    document.querySelector('#vehicleSearch').addEventListener('keyup', (e) => {
        let search = e.target.value.toLowerCase();
        console.log(search)
        if(search == '') {
            vehicles.forEach(vehicle => {
                if(vehicle.classList.contains('mission-vehicles-group')) vehicle.style.display = 'block';
                else vehicle.style.display = 'flex';
            });
            return;
        }
        vehicles.forEach(vehicle => {
            if (vehicle.innerText.toLowerCase().includes(search)) {
                if(vehicle.classList.contains('mission-vehicles-group')) vehicle.style.display = 'block';
                else vehicle.style.display = 'flex';
            } else {
                vehicle.style.display = 'none';
            }
        });
    });
})();