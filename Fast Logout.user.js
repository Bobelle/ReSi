// ==UserScript==
// @name         Fast Logout
// @namespace    http://tampermonkey.net/
// @version      1.1000.0.1
// @description  Erlaubt einen schnellen Logout mit einfachem Button in der oberen Leiste!
// @author       NiZi112
// @match        https://rettungssimulator.online/
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==
(function() {
    'use strict';
   var platz = document.getElementsByClassName("brand-img");
    platz[0].style.display="inline";
    platz[0].style.paddingRight = "20px";
    platz[0].addEventListener("click", function(){ $.ajax({
        url: "/api/deauthenticate",
        type : "GET",
        success : function(r) {
          console.log(r);
          window.location.reload();
        }
    }); });
})();