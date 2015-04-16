var map = L.map('map').setView([45.090717, 2.384075], 6);
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);

var defences = [];

/* STEP 1 : - Ajouter le controle de dessin
                -> doc : https://github.com/Leaflet/Leaflet.draw#using-the-plugin
            - Ne garder la possibilité de faire que des lignes
                -> doc : https://github.com/Leaflet/Leaflet.draw#controldraw
 */

/* STEP 2 : - Dessiner des lignes et les ajouter à la carte
                -> doc : https://github.com/Leaflet/Leaflet.draw#drawcreated
 */

/* STEP 3 : - Defender votre avion
                -> Ajouter les lignes dessinés au tableau de defence (definie ci-dessus) en les convertissant
                    préalabelement en GeoJson
                -> doc : http://leafletjs.com/reference.html#polyline-togeojson
            - Bloquer les missiles en dessinant des defences
 */

/* STEP M&M's : - Quel est la distance parcouru pas l'avion (à la centaine de mètre près) ?
 */

/* STEP Bonus : - Activer la modification du dessin
                    -> doc : https://github.com/Leaflet/Leaflet.draw#adding-the-edit-toolbar
 */