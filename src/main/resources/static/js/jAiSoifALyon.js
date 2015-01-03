var map = L.map('map').setView([45.762179, 4.862226], 13);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var fontaine = L.tileLayer.wms("https://download.data.grandlyon.com/wms/grandlyon", {
    layers: 'epo_eau_potable.epobornefont',
    format: 'image/png',
    transparent: true
}).addTo(map);

map.on('locationfound', function(locationEvent) {

    var yourPositionPopup = new L.Popup({closeOnClick : false, autoPan : false, offset : L.point(0, -25)});
    yourPositionPopup.setLatLng(locationEvent.latlng);
    yourPositionPopup.setContent('Your position');
    map.addLayer(yourPositionPopup);

    L.marker(locationEvent.latlng).addTo(map).bindPopup(yourPositionPopup);

    $.ajax({
        url : 'https://download.data.grandlyon.com/wfs/grandlyon?SERVICE=WFS&REQUEST=GetFeature&version=2.0.0&TYPENAME=epo_eau_potable.epobornefont&outputFormat=application/json; subtype=geojson',
        success : function(data) {
            var closestFeature = _.chain(data.features)
                .min(function(feature) {
                     var coordinates = feature.geometry.coordinates;
                     return locationEvent.latlng.distanceTo(kebUtil.toLatLng(coordinates));
                 })
                .value();

            var closestFeatureLatLng = kebUtil.toLatLng(closestFeature.geometry.coordinates);
            map.setView(closestFeatureLatLng);
            L.marker(closestFeatureLatLng).addTo(map)
                .bindPopup('Closest at ' + Math.round(locationEvent.latlng.distanceTo(closestFeatureLatLng)) + 'm<br>' +
                '<a target="_blank" href="https://www.google.fr/maps/dir/' + locationEvent.latlng.lat + ',' + locationEvent.latlng.lng + '/' + closestFeatureLatLng.lat + ',' + closestFeatureLatLng.lng +'/">Lets go ?</a>')
                .openPopup();
        }
    });
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

map.locate();