var kebUtil = {
    degreeToRadian : function(degree) {
        return degree * Math.PI / 180;
    },
    distance : function(latLngA, latLngB) {
        var latA = kebUtil.degreeToRadian(latLngA.lat);
        var lngA = kebUtil.degreeToRadian(latLngA.lng);
        var latB = kebUtil.degreeToRadian(latLngB.lat);
        var lngB = kebUtil.degreeToRadian(latLngB.lng);

        return 6378 * Math.acos(Math.cos(latA) * Math.cos(latB) * Math.cos(lngB - lngA) + Math.sin(latA) * Math.sin(latB));
    },

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
    }
};