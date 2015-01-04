var selectedMarkers = [];
var searchedProperties = ['essencefrancais', 'essence', 'localisation', 'nomvoie'];

var map = L.map('map').setView([45.762179, 4.862226], 13);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);

kebUtil.control.zoomInfo(map).addTo(map);
var searchCtrl = L.control.fuseSearch({
    maxResultLength : 10, 
    showResultFct : function(feature, resultItem) {
        var str = '<b>' + feature.properties[searchedProperties[0]] + '</b>';
        for (var i = 1; i < searchedProperties.length; i++) {
            str += '<br/>' + feature.properties[searchedProperties[i]];
        }
        resultItem.innerHTML = str;

        resultItem.onclick = function() {
            map.setView(kebUtil.toLatLng(feature.geometry.coordinates), 18);
        }
        return resultItem;
    }
});
searchCtrl.addTo(map);

$.ajax({
    url : '/data/abr_arbres_alignement.abrarbre_5000.geojson',
    dataType : 'json',
    success : function(data) {
        searchCtrl.indexFeatures(data.features, searchedProperties);
        
        var markers = new L.MarkerClusterGroup();
        var geoJsonData = L.geoJson(data, {
            pointToLayer : function(featureData, latlng) {
                var marker = L.StatefulMarker(latlng);
                marker.on('click', function(evt) {
                    var targetMarker = evt.target;
                    if(targetMarker.getState() === 'default') {
                        targetMarker.setState('selected');
                        selectedMarkers.push(targetMarker);
                    } else if(targetMarker.getState() === 'selected') {
                        targetMarker.setState('default');
                        _.remove(selectedMarkers, targetMarker);
                    }
                });
                return marker;
            }
        });
        markers.addLayer(geoJsonData);
        map.addLayer(markers);
    },
    error : function() {
        console.log(arguments);
    }
});

function markAsTreated() {
    _.each(selectedMarkers, function(marker) {
        marker.setState('treated');
    });
    selectedMarkers = [];
}