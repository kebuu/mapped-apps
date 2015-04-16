var map = L.map('map').setView([45.090717, 2.384075], 6);
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);

var defences = [];

var drawControl = new L.Control.Draw({
    draw: {
        rectangle : false,
        circle : false,
        marker : false,
            polygon: {
                allowIntersection: false,
                showArea: true,
                metric : true
            }
    }
});

map.addControl(drawControl);

map.on('draw:created', function (e) {

    var type = e.layerType;
    var layer = e.layer;

    if (type === 'polyline') {
        map.addLayer(layer);
        defences.push(e.layer.toGeoJSON());
    }
});