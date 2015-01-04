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