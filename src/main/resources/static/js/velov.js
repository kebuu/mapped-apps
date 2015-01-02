var wmsSource = new ol.source.TileWMS({
    url: 'https://download.data.grandlyon.com/wms/smartdata',
    params: {'LAYERS': 'jcd_jcdecaux.jcdvelov'}
});

var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        }),
        new ol.layer.Tile({
            source: wmsSource
          })
    ],
    view: new ol.View({
        center: ol.proj.transform([4.835121, 45.755800], 'EPSG:4326', 'EPSG:3857'),
        zoom: 11
    })
});

map.on('singleclick', function(evt) {
    var url = wmsSource.getGetFeatureInfoUrl(evt.coordinate, map.getView().getResolution(), 'EPSG:3857', {'INFO_FORMAT': 'text/plain'});
    $.ajax({
        url : url,
        success : function(data) {
            console.log(arguments);
        }
    });
});