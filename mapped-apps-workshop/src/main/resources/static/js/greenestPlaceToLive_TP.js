var selectedMarkers = [];
var searchedProperties = ['essencefrancais', 'essence', 'localisation', 'nomvoie'];

var map = L.map('map').setView([45.762179, 4.862226], 13);
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);
kebUtil.control.zoomInfo(map).addTo(map);

/*
   Contexte : Au chargement de la page, une partie des données des arbres gérés par la ville de lyon sont chargés au format geoJson via la fonction getGeoJsonData
*/

/* STEP 1 : Compléter la fonction onGetGeoJsonDataSuccess pour afficher un marker simple (sans popup) pour chaque arbre
*/

/* STEP 2 : Modifier la fonction onGetGeoJsonDataSuccess pour afficher des clusters (groupement) d'arbres
                -> Utiliser un layer de type MarkerClusterGroup
                -> doc https://github.com/Leaflet/Leaflet.markercluster#leafletmarkercluster
*/

/* STEP 3 : Modifier la fonction onGetGeoJsonDataSuccess pour utiliser des markers de type L.StatefulMarker (voir en bas du fichier util.js si nécessaire)
                -> Configurer la couche geoJson en retournant ce type de marqueur, en prenant soin d'ajouter à chaque marqueur un évènement 'click' qui lancera la fonction onMarkerClick ci-dessous
                -> doc http://leafletjs.com/reference.html#geojson-pointtolayer
                -> Cliquer sur des marqueurs puis sur le bouton "Marquer les arbres sélectionnés comme 'traités'" pour constater que tout fonctionne comme prévu
*/

/* STEP 4 : Ajouter et configurer le control fuseSearch (les propriétés indexées sont contenu dans le tableau searchedProperties)
                -> Créer le control
                    -> Indiquer une taille maximum de résultat de 10
                -> L'ajouter à la carte
                -> Indexer les données lorsqu'elles sont disponibles, c'est à dire dans la fonction onGetGeoJsonDataSuccess
                -> doc https://github.com/naomap/leaflet-fusesearch#leaflet-fusesearch
*/

/* STEP Bonus : Modifier le control pour utiliser la fonction renderSearchResult comme fonction de rendu des résultats
                Cliquer sur un résultat de la recherche...
*/

/* STEP M&M's : Quel est la taille du plus gros cluster au niveau de zoom 10 ?
*/

function renderSearchResult(feature, resultItem) {
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

var searchCtrl = L.control.fuseSearch({
    maxResultLength : 10
});
searchCtrl.addTo(map);

function markAsTreated() {
     _.each(selectedMarkers, function(marker) {
         marker.setState('treated');
     });
     selectedMarkers = [];
 }

 function onMarkerClick(evt) {
    var targetMarker = evt.target;

    if(targetMarker.getState() === 'default') {
        targetMarker.setState('selected');
        selectedMarkers.push(targetMarker);
    } else if(targetMarker.getState() === 'selected') {
        targetMarker.setState('default');
        _.remove(selectedMarkers, targetMarker);
    }
}

 function onGetGeoJsonDataSuccess(data) {
    searchCtrl.indexFeatures(data.features, searchedProperties);

    var markers = new L.MarkerClusterGroup();

    var geoJsonData = L.geoJson(data, {
        pointToLayer : function(featureData, latlng) {
            var marker = L.StatefulMarker(latlng);
            marker.on('click', onMarkerClick);
            return marker;
        }
    });

    markers.addLayer(geoJsonData);
    map.addLayer(markers);

 }

function getGeoJsonData() {
    $.ajax({
        url : '/data/abr_arbres_alignement.abrarbre_5000.geojson',
        dataType : 'json',
        success : onGetGeoJsonDataSuccess,
        error : function() {
            console.log(arguments);
        }
    });
}
getGeoJsonData();