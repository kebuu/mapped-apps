var franceCenter = [47.101226, 2.406115];
var zenikaLyon = [45.762186, 4.862247];
var zenikaParis = [48.878933, 2.328639];


/* STEP 1 : - Ajouter une carte -> un div#map a été prévu pour accueillir la carte
            - Ajouter un fond de plan tuilé (tile) avec l'option "attribution" : Zenika - Technozaure | OSM -> url de OpenStreetMap : 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            - Centrer la carte sur la France avec un niveau de zoom de 5
            - Ajouter une "attribution"
            - doc map: http://leafletjs.com/reference.html#map-class
            - doc tile layer: http://leafletjs.com/reference.html#tilelayer
*/
var map = L.map('map').setView(franceCenter, 5);

var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: 'Zenika - Technozaure | OSM'
}).addTo(map);

/* STEP 2 : - Ajouter une marker sur zenika Lyon avec une popup contenant le texte 'Zenika Lyon'
            - Ajouter une marker sur zenika Paris avec une popup contenant le texte 'Zenika Paris' et une icone personnalisée:
                -> url de l'icone : /images/logo-zenika.jpg
                -> taille de l'icone : [20, 26]
            - doc : http://leafletjs.com/reference.html#marker
*/

/* STEP 3 : - Ajouter les couches WMS de velov et de poubelles de la ville de Lyon :
                -> url de la couche de velov : https://download.data.grandlyon.com/wms/smartdata
                -> nom de la couche de velov : jcd_jcdecaux.jcdvelov
                -> url de la couche de poubelles : https://download.data.grandlyon.com/wms/grandlyon
                -> nom de la couche de poubelles : gin_nettoiement.gincorbeille
                -> format : image/png
                -> transparence : à votre avis ?
                -> doc : http://leafletjs.com/reference.html#tilelayer-wms
            - Implementer la fonction zoomerSurLyon en centrant la carte sur Lyon avec un zoom de 14
*/

/* STEP 4 : - Ajouter le control "Scale" en bas à droite de la carte:
                -> doc http://leafletjs.com/reference.html#control-scale
            - Ajouter le control "MousePosition" à la carte:
                -> doc https://github.com/ardhi/Leaflet.MousePosition#leafletmouseposition
                -> Penser à créer un layer spécifique pour le control
            - Ajouter le control "MiniMap" à la carte en utilisant en fond de plan:
                -> doc https://github.com/Norkart/Leaflet-MiniMap#leafletminimap
            - Ajouter le control "ZoomInfo" à la carte:
                -> Il s'agit d'un control que j'ai réalisé : kebUtil.control.zoomInfo(map).addTo(map);
*/

/* STEP 5 : - Créer un tileLayer de fond de plan en utilisant mapbox sans l'ajouter à la carte
                -> url : 'https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png'
                -> option "attribution" : Zenika - Technozaure | MapBox
                -> option "id" : ctardella.kko459nh
            - Ajouter le control "Layers" à la carte
                -> Utiliser les couches OpenStreetMap et MapBox comme "baseLayers" et les couches velov et poubelle comme "overlays"
                -> doc http://leafletjs.com/reference.html#control-layers
*/

/* STEP M&M : - Quelle est la valeur de l'échelle en km au niveau de zoom 9 ?
*/

/* STEP Bonus : - Regarder la doc des différents controls pour adapter changer leur comportement
*/

var osmMini = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');

var mapbox = L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
    attribution: 'Zenika - Technozaure | Mapbox',
    id: 'ctardella.kko459nh'
});

var velov = L.tileLayer.wms("https://download.data.grandlyon.com/wms/smartdata", {
    layers: 'jcd_jcdecaux.jcdvelov',
    format: 'image/png',
    transparent: true
}).addTo(map);
//
var garbage = L.tileLayer.wms("https://download.data.grandlyon.com/wms/grandlyon", {
    layers: 'gin_nettoiement.gincorbeille',
    format: 'image/png',
    transparent: true
}).addTo(map);
//
var zenIcon = L.icon({
    iconUrl: '/images/logo-zenika.jpg',
    iconSize: [20, 26]
});

L.marker(zenikaLyon).addTo(map).bindPopup('Zenika Lyon');
L.marker(zenikaParis, {icon: zenIcon}).addTo(map).bindPopup('Zenika Paris');

var baseMaps = {
    "MapBox": mapbox,
    "OpenStreetMap": osm
};

var overlayMaps = {
    "Velov": velov,
    "Corbeille": garbage
};

L.control.layers(baseMaps, overlayMaps).addTo(map);
L.control.scale({position : 'bottomright'}).addTo(map);
L.control.mousePosition().addTo(map);
new L.Control.MiniMap(osmMini).addTo(map);
kebUtil.control.zoomInfo(map).addTo(map);

function zoomerSurLyon() {
    console.warn('Not implemented yet');
    map.setView(zenikaLyon, 14);
}