var coordinates = [];
coordinates.push(ol.proj.transform([6.126019, 45.043144], 'EPSG:4326', 'EPSG:3857'));
coordinates.push(ol.proj.transform([6.126019, 45.053144], 'EPSG:4326', 'EPSG:3857'));
coordinates.push(ol.proj.transform([6.116019, 45.043144], 'EPSG:4326', 'EPSG:3857'));
coordinates.push(ol.proj.transform([6.126019, 45.043144], 'EPSG:4326', 'EPSG:3857'));

var polygon = new ol.geom.Polygon([coordinates]);
console.log(polygon.getArea());

var feature = new ol.Feature({
  geometry: polygon
});

var source = new ol.source.Vector({
    features : [feature]
});

var vectorLayer = new ol.layer.Vector({
    source : source
});

var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        }),
        vectorLayer
    ],
    view: new ol.View({
        center: ol.proj.transform([6.126019, 45.043144], 'EPSG:4326', 'EPSG:3857'),
        zoom: 16
    })
});
