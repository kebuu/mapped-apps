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

var info = L.control();

		info.onAdd = function (map) {
		    this._div = L.DomUtil.create('div', 'info'); 
		    this.update();
		    return this._div;
		};
		
		info.update = function (props) {
		    this._div.innerHTML = '<h4>Distance</h4>' +  (props ? (props.distance>10000)?(props.distance/1000).toFixed(0)+' km':(props.distance).toFixed(0)+' m' : 'invalid');
		};
		info.addTo(map);		
		
		Geodesic.update = function () {
		  Geodesic.setLatLngs([[A.getLatLng(), B.getLatLng()]]);
		  info.update(Geodesic._vincenty_inverse(A.getLatLng(), B.getLatLng()));
		};