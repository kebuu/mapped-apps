var map = L.map('map', {drawControl: true}).setView([47.090717, 2.384075], 7);
var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);

var planeIcon = L.icon({ iconUrl: '/images/plane.png', iconSize: [20, 26]});
var missile1Icon = L.icon({ iconUrl: '/images/missile.png', iconSize: [20, 26]});
var missile2Icon = L.icon({ iconUrl: '/images/missile.png', iconSize: [20, 26]});
var missile3Icon = L.icon({ iconUrl: '/images/missile.png', iconSize: [20, 26]});
var explosionIcon = L.icon({ iconUrl: '/images/explosion.png', iconSize: [20, 26]});

var missile1Marker = L.marker(kebUtil.missile1.coords[0], {icon: missile1Icon}).addTo(map);
var missile2Marker = L.marker(kebUtil.missile2.coords[0], {icon: missile2Icon});
var missile3Marker = L.marker(kebUtil.missile3.coords[0], {icon: missile3Icon});
var planeMarker = L.marker(kebUtil.planeTravelCoords[0], {icon: planeIcon}).addTo(map);

var missiles = {
    missile1 : {
        marker: missile1Marker,
        destroyed: false
    },
    missile2 : {
        marker: missile2Marker,
        destroyed: false
    },
    missile3 : {
        marker : missile3Marker,
        destroyed: false
    }
};

var isPlaneDestroyed = function() {
    return missile1Marker.getLatLng().equals(planeMarker.getLatLng()) ||
        missile2Marker.getLatLng().equals(planeMarker.getLatLng()) ||
        missile3Marker.getLatLng().equals(planeMarker.getLatLng());
};

var movePlane = function(gameStep) {
    planeMarker.setLatLng(kebUtil.planeTravelCoords[gameStep]);
};

var moveMissile = function(gameStep, missileNumber) {
    var missileKey = 'missile' + missileNumber;
    var missileInfo = kebUtil[missileKey];

    if(missileInfo.startStep === gameStep) {
        missiles[missileKey].marker.addTo(map);
    } else if(!missiles[missileKey].destroyed) {
        missiles[missileKey].marker.setLatLng(missileInfo.coords[gameStep - missileInfo.startStep]);
    }
};

var gameStep = 1;
var planeTravelInterval = setInterval(function() {
    L.marker(planeMarker.getLatLng()).addTo(map);
    movePlane(gameStep);
    moveMissile(gameStep, 1);

    if(isPlaneDestroyed()) {
        planeMarker.setIcon(explosionIcon);
        clearInterval(planeTravelInterval);
    }

    gameStep++;
    if(gameStep === kebUtil.planeTravelCoords.length) {
        clearInterval(planeTravelInterval);
    }
}, 1000);

/* STEP Bonus : - Ajouter un marker à l'adresse que vous avez trouvée en faisant les steps Bonus des autres TPs
                    -> Le site torop.net permet de geolocaliser une adresse : http://www.torop.net/coordonnees-gps.php (format à utiliser : numéro rue nomDeLaRue, ville)
                - Zoomer sur le marqueur avec un zoom de 17
                - Jeter un coup d'oeil à la fonction exportFn
                - Cliquer sur le bouton 'Export' et enregistrer l'image (au bout de quelque seconds vous devriez avoir une popup de téléchargement)
                - Envoyer cette image en guise de réponse
*/

map.on('draw:created', function (e) {
console.log(e);

var type = e.layerType,
        layer = e.layer;

    if (type === 'marker') {
        // Do marker specific actions
    }

    // Do whatever else you need to. (save to db, add to map etc)
    map.addLayer(layer);

});