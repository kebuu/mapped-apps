var map = L.map('map').setView([45.762179, 4.862226], 13);
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);

/* STEP 1 : Ajouter les couches WMS de fonaines de la ville de Lyon :
                -    -> url de la couche de velov : https://download.data.grandlyon.com/wms/grandlyon
                             > nom de la couche de velov : epo_eau_potable.epobornefont
*/

/* STEP 2 : Activer la geolocalisation :
                - Compléter la fonction locateMe en demandant une geolocalisation
                - Ajouter un eventHandler sur la carte réagissant à l'évènement "locationfound"
                - Centrer "location" trouvée et ajouter un marker avec une popup indiquant "Votre position"
                - docs  http://leafletjs.com/reference.html#map-locate http://leafletjs.com/reference.html#map-locationfound
*/

/* STEP 3 : Trouver la fontaine la plus proche :
                - Compléter la fonction findClosestFountain en utilisant la fonction kebUtil.findClosestFountain
                    -> il suffit de lui passer en paramètre l'objet LatLng correspondant à notre position
                - Regarder le code de la fonction kebUtil.findClosestFountain et vérifier qu'on comprend bien ce qu'il fait (même si c'est pas forcément très propre...)
                - doc http://docs.geoserver.org/stable/en/user/services/wfs/reference.html http://leafletjs.com/reference.html#latlng-distanceto
*/

/* STEP M&M's : - Quelle est le nom de la fontaine la plus proche ?

*/

/* STEP Bonus : Essayer de récuperer l'information que l'utilisateur a réfuser la demande de localisation de l'application
                    - un console.log en reponse au bon évènement peut faire l'affaire
*/

var fontaine = L.tileLayer.wms("https://download.data.grandlyon.com/wms/grandlyon", {
    layers: 'epo_eau_potable.epobornefont',
    format: 'image/png',
    transparent: true
}).addTo(map);

map.on('locationfound', function(locationEvent) {
    L.marker(locationEvent.latlng).addTo(map).bindPopup('Your position');
});
map.on('locationerror', function(errorEvent) {
    console.log(errorEvent);
});

map.on('click', function(evt) {
    var urlTemplate = 'https://download.data.grandlyon.com/wms/grandlyon?' +
                              'SERVICE=WMS'+
                              '&VERSION=1.1.1'+
                              '&REQUEST=GetFeatureInfo'+
                              '&LAYERS=epo_eau_potable.epobornefont'+
                              '&QUERY_LAYERS=epo_eau_potable.epobornefont'+
                              '&STYLES='+
                              '&BBOX=${bbox}'+
                              '&FEATURE_COUNT=10'+
                              '&HEIGHT=${height}'+
                              '&WIDTH=${width}'+
                              '&FORMAT=image/png'+
                              '&INFO_FORMAT=text/plain' +
                              '&SRS=EPSG:4326'+
                              '&X=${x}'+
                              '&Y=${y}';

    var urlParams = {
        x : map.layerPointToContainerPoint(evt.layerPoint).x,
        y : map.layerPointToContainerPoint(evt.layerPoint).y,
        bbox : map.getBounds().toBBoxString(),
        width : map.getSize().x,
        height : map.getSize().y,
    };

    $.ajax({
        url : _.template(urlTemplate, urlParams),
        success : function(data) {
            if(data) {
                var popup = L.popup()
                    .setLatLng(evt.latlng)
                    .setContent(data.replace(/\n/g, '<br/>'))
                    .openOn(map);
            }
        }
    });
});


function locateMe() {
    console.warn('Not implemented yet');
    map.locate({setView : true});
}

function findClosestFountain() {
    console.warn('Not implemented yet');
    kebUtil.findClosestFountain(map.getCenter());
}