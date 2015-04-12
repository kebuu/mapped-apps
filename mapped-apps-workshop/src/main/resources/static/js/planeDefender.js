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

var splitTravel = function(travelCoords, split) {
    if(split === 0) {
        return travelCoords;
    } else {
        var splitTravelCoords = [];
        for (var i = 0; i < travelCoords.length - 1; i++) {
            var point1 = kebUtil.toXY(L.latLng(travelCoords[i]));
            var point2 = kebUtil.toXY(L.latLng(travelCoords[i + 1]));
            var pt1 = {
                "type": "Feature",
                "properties": {},
                "geometry": { "type": "Point", "coordinates": [point1.x,point1.y]
                }
            };

            var pt2 = {
                "type": "Feature",
                "properties": {},
                "geometry": { "type": "Point", "coordinates": [point2.x,point2.y]
                }
            };

            var midpoint = turf.midpoint(pt1, pt2);
            splitTravelCoords.push(travelCoords[i]);
            var lonLat = kebUtil.toLonLatProj(L.point(midpoint.geometry.coordinates));
            splitTravelCoords.push([lonLat.lat, lonLat.lng]);
        }
        splitTravelCoords.push(travelCoords[travelCoords.length - 1]);
        return splitTravel(splitTravelCoords, split - 1);
    }
};

var map = L.map('map').setView([45.090717, 2.384075], 6);
map.addControl(drawControl);

var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);

var defences = [];
var split = 3;
var speed = 200;
var planeTravelCoords = splitTravel(kebUtil.planeTravelCoords, split);

kebUtil.missile1.coords = splitTravel(kebUtil.missile1.coords, split);
kebUtil.missile1.startStep = (kebUtil.missile1.startStep - 1) * Math.pow(2, split) + 1;
kebUtil.missile2.coords = splitTravel(kebUtil.missile2.coords, split);
kebUtil.missile2.startStep = (kebUtil.missile2.startStep - 1) * Math.pow(2, split) + 1;
kebUtil.missile3.coords = splitTravel(kebUtil.missile3.coords, split);
kebUtil.missile3.startStep = (kebUtil.missile3.startStep - 1) * Math.pow(2, split) + 1;

var planeIcon = L.icon({ iconUrl: '/images/plane.png', iconSize: [20, 26]});
var missile1Icon = L.icon({ iconUrl: '/images/missile.png', iconSize: [20, 26]});
var missile2Icon = L.icon({ iconUrl: '/images/missile.png', iconSize: [20, 26]});
var missile3Icon = L.icon({ iconUrl: '/images/missile.png', iconSize: [20, 26]});
var explosionIcon = L.icon({ iconUrl: '/images/explosion.png', iconSize: [20, 26]});

var missile1Marker = L.rotatedMarker(kebUtil.missile1.coords[0], {icon: missile1Icon, angle: -50, opacity:0}).addTo(map);
var missile2Marker = L.rotatedMarker(kebUtil.missile2.coords[0], {icon: missile2Icon, angle: 105, opacity:0}).addTo(map);
var missile3Marker = L.rotatedMarker(kebUtil.missile3.coords[0], {icon: missile3Icon, angle: 5, opacity:0}).addTo(map);
var planeMarker = L.rotatedMarker(kebUtil.planeTravelCoords[0], {icon: planeIcon, angle: 180}).addTo(map);

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

var rotatePlane = function(gameStep) {
    var step1 = L.latLng(planeTravelCoords[gameStep - 1]);
    var step2 = L.latLng(planeTravelCoords[gameStep]);

    if(!!step1 && !!step2) {
        var point1 = map.project(step1);
        var point2 = map.project(step2);

        var angle = L.LineUtil.PolylineDecorator.computeAngle(point2, point1);
        planeMarker.options.angle = angle + 135;
    }
};

var movePlane = function(gameStep) {
    planeMarker.setLatLng(planeTravelCoords[gameStep]);
};

var getMissileStopCoords = function(defences, currentCoords, nextCoords) {
    if(!currentCoords || !nextCoords || !defences.length) {
        return null;
    } else {
        var currentPoint = kebUtil.toXY(L.latLng(currentCoords));
        var nextPoint = kebUtil.toXY(L.latLng(nextCoords));
        var missileDirection = { "type": "LineString", "coordinates": [[currentPoint.x, currentPoint.y], [nextPoint.x, nextPoint.y]] };

        return _.chain(defences)
            .filter(function(defence) {
                return defence.geometry.type === "LineString";
            })
            .map(function(defence) {
                var points =_.map(defence.geometry.coordinates, function(coordinates) {
                    var point = kebUtil.toXY(L.latLng(_.clone(coordinates).reverse()));
                    return [point.x, point.y];
                });
                var defenceDirection = { "type": "LineString", "coordinates": points };
                var inter =  gju.lineStringsIntersect(missileDirection, defenceDirection);
                return inter;
            })
            .filter(function(intersections) {
                return !!intersections;
            })
            .map(function(intersections) {
                var intersectionCoordinates = intersections[0].coordinates;
                return kebUtil.toLonLatProj(L.point(intersectionCoordinates[1], intersectionCoordinates[0]));
            })
            .value();
    }
};

var moveMissile = function(gameStep, missileNumber) {
    var missileKey = 'missile' + missileNumber;
    var missileInfo = kebUtil[missileKey];

    if(missileInfo.startStep === gameStep) {
        missiles[missileKey].marker.setOpacity(1);
    } else if(!missiles[missileKey].destroyed) {
        var missileStopLatLng = getMissileStopCoords(defences, missileInfo.coords[gameStep - missileInfo.startStep], missileInfo.coords[gameStep - missileInfo.startStep + 1]);
        if(missileStopLatLng && missileStopLatLng.length) {
            missiles[missileKey].marker.options.angle = 0;
            missiles[missileKey].marker.setLatLng(missileStopLatLng[0]);
            missiles[missileKey].marker.setIcon(explosionIcon);
            missiles[missileKey].destroyed = true;
        } else if(missileInfo.startStep < gameStep) {
            missiles[missileKey].marker.setLatLng(missileInfo.coords[gameStep - missileInfo.startStep + 1]);
        }
    }
};

var gameStep = 1;
var planeTravelInterval = setInterval(function() {
    if((gameStep - 1) % Math.pow(2, split) === 0) {
        L.marker(planeMarker.getLatLng()).addTo(map);
    }
    rotatePlane(gameStep);
    movePlane(gameStep);
    moveMissile(gameStep, 1);
    moveMissile(gameStep, 2);
    moveMissile(gameStep, 3);

    if(isPlaneDestroyed()) {
        planeMarker.options.angle = 0;
        planeMarker.setIcon(explosionIcon);
        clearInterval(planeTravelInterval);
    }

    gameStep++;
    if(gameStep === planeTravelCoords.length || isPlaneDestroyed()) {
        clearInterval(planeTravelInterval);
    }
}, speed);

/* STEP Bonus : - Ajouter un marker à l'adresse que vous avez trouvée en faisant les steps Bonus des autres TPs
                    -> Le site torop.net permet de geolocaliser une adresse : http://www.torop.net/coordonnees-gps.php (format à utiliser : numéro rue nomDeLaRue, ville)
                - Zoomer sur le marqueur avec un zoom de 17
                - Jeter un coup d'oeil à la fonction exportFn
                - Cliquer sur le bouton 'Export' et enregistrer l'image (au bout de quelque seconds vous devriez avoir une popup de téléchargement)
                - Envoyer cette image en guise de réponse
*/

map.on('draw:created', function (e) {
var type = e.layerType;
var layer = e.layer;

    if (type === 'polyline') {
        defences.push(e.layer.toGeoJSON());
    }

    // Do whatever else you need to. (save to db, add to map etc)
    map.addLayer(layer);

});