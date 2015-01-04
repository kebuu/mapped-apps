var map = L.map('map').setView([48.781042, 2.057863], 17);

var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);
L.marker([48.781042, 2.057863]).addTo(map).bindPopup('Chez CTA');

var exportPNGElement = document.getElementById('export-png');
var exportFn = function() {
    leafletImage(map, function(err, canvas) {
        exportPNGElement.href = canvas.toDataURL('image/png');
        exportPNGElement.click();
    });
};