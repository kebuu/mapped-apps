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
    }
};