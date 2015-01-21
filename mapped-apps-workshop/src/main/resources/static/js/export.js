var map = L.map('map').setView([48.8849877, 2.5349760999999944], 17);
var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);
L.marker([48.8849877, 2.5349760999999944]).addTo(map);

var exportPNGElement = document.getElementById('export-png');
var exportFn = function() {
    leafletImage(map, function(err, canvas) {
        exportPNGElement.href = canvas.toDataURL('image/png');
        exportPNGElement.click();
    });
};