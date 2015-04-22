var map = L.map('map').setView([45.090717, 2.384075], 6);
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);

var defences = [];

/* STEP 1 : - Ajouter le control de dessin
                -> doc : https://github.com/Leaflet/Leaflet.draw#using-the-plugin
            - Ne garder la possibilité de faire que des lignes
                -> doc : https://github.com/Leaflet/Leaflet.draw#controldraw
 */

/* STEP 2 : - Dessiner des lignes et les ajouter à la carte
                -> doc : https://github.com/Leaflet/Leaflet.draw#drawcreated
 */

/* STEP 3 : - Defendez votre avion
                -> Ajouter les lignes dessinées au tableau de défence (definie ci-dessus) en les convertissant
                    préalabelement en GeoJson
                -> doc : http://leafletjs.com/reference.html#polyline-togeojson
            - Bloquer les missiles en dessinant des défences
 */

/* STEP M&M's : - Quel est la distance parcouru pas l'avion lorsqu'il ne se fait pas exploser (à la centaine de mètre près) ?
 */

/* STEP Bonus : - Ajouter la fonctionnalité que les défences placées sur le trajet de l'avion font exploser l'avion
                - Ajouter la possibilité de créer des défences de type polygone
 */