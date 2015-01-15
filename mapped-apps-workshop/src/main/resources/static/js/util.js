var kebUtil = {
    toLatLng : function(coordinates) {
        return L.latLng(coordinates[1], coordinates[0]);
    },
    
    control : {
        zoomInfo : function(map) {
            var zoomInfoControl = L.control();
            
            zoomInfoControl.onAdd = function (map) {
                this._div = L.DomUtil.create('div', 'zoomInfo'); 
                this.update();
                return this._div;
            };
            
            zoomInfoControl.update = function () {
                this._div.innerHTML = '<h4>Zoom</h4>' +  map.getZoom();
            };
            
            map.on('zoomend', function() {
                zoomInfoControl.update();
            });
            
            return zoomInfoControl;
        }
    }, 
    
    statefulMarker : function(coordinates, options) {
        var marker = L.Marker.extend({
            initialize: function (coordinates, options) {
                L.Marker.prototype.initialize.call(this, coordinates); 
                           
                this._iconByState = options.states;                
                this.setState('default');
            },
            
            setState : function(state) {
                var stateIcon = this._iconByState[state];
                
                if(stateIcon) {
                    this.setIcon(stateIcon);                
                    this._state = state;
                } else {
                    throw Error('No icon found for state \'' + state + '\'');
                }
            },
            
            getState : function() {
                return this._state;
            }
        });
        
        return new marker(coordinates, options);
    },

    findClosestFountain : function(fromLatLng) {
        $.ajax({
            url : 'https://download.data.grandlyon.com/wfs/grandlyon?SERVICE=WFS&REQUEST=GetFeature&version=2.0.0&TYPENAME=epo_eau_potable.epobornefont&outputFormat=application/json; subtype=geojson',
            success : function(data) {
                var closestFeature = _.chain(data.features)
                    .min(function(feature) {
                         var coordinates = feature.geometry.coordinates;
                         return fromLatLng.distanceTo(kebUtil.toLatLng(coordinates));
                     })
                    .value();

                var closestFeatureLatLng = kebUtil.toLatLng(closestFeature.geometry.coordinates);

                L.marker(closestFeatureLatLng).addTo(map)
                    .bindPopup('Fontaine la plus proche à ' + Math.round(fromLatLng.distanceTo(closestFeatureLatLng)) + 'm<br>' +
                    '<div style="text-align:center"><a target="_blank" href="https://www.google.fr/maps/dir/' + fromLatLng.lat + ',' + fromLatLng.lng + '/' + closestFeatureLatLng.lat + ',' + closestFeatureLatLng.lng +'/">Y aller</a></div>')
                    .openPopup();
            }
        });
    },

    getFeatureInfo : function(map, urlParams) {
        var getFeatureInfoUrlTemplate = 'https://download.data.grandlyon.com/wms/grandlyon?' +
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

        $.ajax({
            url : _.template(getFeatureInfoUrlTemplate, urlParams),
            success : function(data) {
                if(data) {
                    var clickedPoint = L.point(urlParams.x, urlParams.y);
                    var popup = L.popup()
                        .setLatLng(map.layerPointToLatLng(map.containerPointToLayerPoint(clickedPoint)))
                        .setContent(data.replace(/\n/g, '<br/>'))
                        .openOn(map);
                }
            }
        });
    }
};

var defaultStates = {
    default : L.icon({iconUrl: '/images/marker-icon-green.png'}),
    selected : L.icon({iconUrl: '/images/marker-icon-orange.png'}),
    treated : L.icon({iconUrl: '/images/marker-icon-purple.png'}),
};

L.StatefulMarker = function (coordinates, options) {
    var usedOptions = options || {};
    usedOptions.states = usedOptions.states || defaultStates;
    
    return kebUtil.statefulMarker(coordinates, usedOptions);
};