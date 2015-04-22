var franceCenter = [47.101226, 2.406115];
var zenikaLyon = [45.762186, 4.862247];
var zenikaParis = [48.878933, 2.328639];

var map = L.map('map', {
    fullscreenControl: true
}).setView(franceCenter, 5);

var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: 'Zenika - Technozaure | OSM'
}).addTo(map);

var osmMini = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');

var mapbox = L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
    attribution: 'Zenika - Technozaure | Mapbox',
    id: 'ctardella.kko459nh'
});

var velov = L.tileLayer.wms("https://download.data.grandlyon.com/wms/rdata", {
    layers: 'jcd_jcdecaux.jcdvelov',
    format: 'image/png',
    transparent: true
});
velov.addTo(map);

var garbage = L.tileLayer.wms("https://download.data.grandlyon.com/wms/grandlyon", {
    layers: 'gin_nettoiement.gincorbeille',
    format: 'image/png',
    transparent: true
});
garbage.addTo(map);

var zenIcon = L.icon({
    iconUrl: '/images/logo-zenika.jpg',
    iconSize: [20, 26]
});

L.marker(zenikaLyon, {icon: zenIcon}).addTo(map).bindPopup('Zenika Lyon');
L.marker(zenikaParis).addTo(map).bindPopup('Zenika Paris');

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

function zoomToLyon() {
    map.setView(zenikaLyon, 14);
}