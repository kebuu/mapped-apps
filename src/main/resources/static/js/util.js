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
    }
};