var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    view: new ol.View({
        center: ol.proj.transform([6.126019, 45.043144], 'EPSG:4326', 'EPSG:3857'),
        zoom: 16
    })
});

var exportPNGElement = document.getElementById('export-png');

exportPNGElement.addEventListener('click', function(e) {
    map.once('postcompose', function(event) {
        var canvas = event.context.canvas;
        exportPNGElement.href = canvas.toDataURL('image/png');
    });
    map.renderSync();
}, false);