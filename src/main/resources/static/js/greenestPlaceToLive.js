var map = L.map('map').setView([45.762179, 4.862226], 13);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

        console.log('test');
$.ajax({
    url : '/data/abr_arbres_alignement.abrarbre_5000.geojson',
    dataType : 'json',
    success : function(data) {
        var markers = new L.MarkerClusterGroup();
        markers.addLayer(L.geoJson(data));
        map.addLayer(markers);
    },
    error : function() {
        console.log(arguments);
    }
});