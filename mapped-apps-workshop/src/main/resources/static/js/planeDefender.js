var map = L.map('map', {drawControl: true}).setView([47.090717, 2.384075], 6);
var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);

/* STEP Bonus : - Ajouter un marker à l'adresse que vous avez trouvée en faisant les steps Bonus des autres TPs
                    -> Le site torop.net permet de geolocaliser une adresse : http://www.torop.net/coordonnees-gps.php (format à utiliser : numéro rue nomDeLaRue, ville)
                - Zoomer sur le marqueur avec un zoom de 17
                - Jeter un coup d'oeil à la fonction exportFn
                - Cliquer sur le bouton 'Export' et enregistrer l'image (au bout de quelque seconds vous devriez avoir une popup de téléchargement)
                - Envoyer cette image en guise de réponse
*/

map.on('draw:created', function (e) {
console.log(e);

var type = e.layerType,
        layer = e.layer;

    if (type === 'marker') {
        // Do marker specific actions
    }

    // Do whatever else you need to. (save to db, add to map etc)
    map.addLayer(layer);

});