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
    }, 
    planeTravelCoords : [ [45.78284835197676,4.822998046875], [45.460130637921004,4.361572265625], [45.79050946752472,3.065185546875], [45.298075138707965,1.746826171875], [45.66780526567164,0.12084960937499999], [44.84029065139799,-0.59326171875], [43.8899753738369,-0.48339843749999994], [43.50872101129684,-1.60400390625], [43.32517767999296,-0.3955078125], [43.636075155965784,1.417236328125]],
    missile1 :  {
        coords : [ [44.15068115978091,4.075927734375], [44.5826428195842,3.14208984375], [45.00365115687189,2.21923828125], [45.298075138707965,1.746826171875]],
        startStep : 0
    },
    missile2 : {
        coords : [ [45.63708709571876,-4.350585937499999], [45.3444241045224,-3.218994140625], [45.089035564831036,-1.856689453125], [44.84029065139799,-0.59326171875]],
        startStep : 3
    },
    missile3 : {
        coords : [ [41.795888098191426,-0.72509765625], [42.5611728553181,-0.648193359375], [43.02071359427862,-0.516357421875], [43.32517767999296,-0.3955078125]],
        startStep : 6
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