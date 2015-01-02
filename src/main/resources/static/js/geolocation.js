var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    view: new ol.View({
        center: ol.proj.transform([6.126019, 45.043144], 'EPSG:4326', 'EPSG:3857'),
        zoom: 14
    })
});

var geolocation = new ol.Geolocation({
    projection: map.getView().getProjection()
});

var positionFeature = new ol.Feature();
positionFeature.setStyle(new ol.style.Style({
    image: new ol.style.Circle({
        radius: 6,
        fill: new ol.style.Fill({
            color: 'red'
        }),
        stroke: new ol.style.Stroke({
            color: 'red',
            width: 2
        })
    })
}));

geolocation.setTracking(true);

positionFeature.bindTo('geometry', geolocation, 'position')
    .transform(function() {}, function(coordinates) {
        return coordinates ? new ol.geom.Point(coordinates) : null;
    });

var featuresOverlay = new ol.FeatureOverlay({
    map: map,
    features: [positionFeature]
});