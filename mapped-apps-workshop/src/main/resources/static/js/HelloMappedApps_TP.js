var franceCenter = [47.101226, 2.406115];
var zenikaLyon = [45.762186, 4.862247];
var zenikaParis = [48.878933, 2.328639];


/* STEP 1 : - Ajouter une carte
                -> un div#map a été prévu pour accueillir la carte
            - doc map: http://leafletjs.com/reference.html#map-class
            - Ajouter un fond de plan tuilé (tile) avec l'option "attribution" : Zenika - Technozaure | OSM
                -> url de OpenStreetMap : 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            - doc tile layer: http://leafletjs.com/reference.html#tilelayer
            - Centrer la carte sur la France (cf. haut du fichier) avec un niveau de zoom de 5 (cf. la méthode map.setView)
*/

/* STEP 2 : - Ajouter un marker sur zenika Lyon (cf. haut du fichier) avec une popup contenant le texte 'Zenika Lyon'
            - Ajouter un marker sur zenika Paris (cf. haut du fichier) avec une popup contenant le texte 'Zenika Paris' et une icone personnalisée:
                -> url de l'icone : /images/logo-zenika.jpg
                -> taille de l'icone : [20, 26]
            - Pour info les popup s'ouvre lorsque l'on clique sur le marker
            - doc : http://leafletjs.com/reference.html#marker
                    http://leafletjs.com/reference.html#marker-bindpopup
                    http://leafletjs.com/reference.html#icon
*/

/* STEP 3 : - Ajouter les couches WMS de velov et de poubelles de la ville de Lyon :
                -> url de la couche de velov : https://download.data.grandlyon.com/wms/rdata
                -> nom de la couche de velov : jcd_jcdecaux.jcdvelov
                -> url de la couche de poubelles : https://download.data.grandlyon.com/wms/grandlyon
                -> nom de la couche de poubelles : gin_nettoiement.gincorbeille
                -> format : image/png
                -> transparence : à votre avis ?
                -> doc : http://leafletjs.com/reference.html#tilelayer-wms
                - (Penser à faire un addTo(map) pour ajouter une couche à la carte)
            - Implementer la fonction zoomToLyon (cf. bas du fichier) en centrant la carte sur Zenika Lyon avec un zoom de 14
                -> doc http://leafletjs.com/reference.html#map-setview
*/

/* STEP 4 : - Ajouter le control "Scale" en bas à droite de la carte:
                -> doc http://leafletjs.com/reference.html#control-scale
            - Ajouter le control "MousePosition" à la carte:
                -> doc https://github.com/ardhi/Leaflet.MousePosition#leafletmouseposition
            - Ajouter le control "MiniMap" à la carte en utilisant OSM en fond de plan:
                -> doc https://github.com/Norkart/Leaflet-MiniMap#leafletminimap
                -> Penser à créer un layer spécifique pour le control (rappel de l'url d'OSM : http://{s}.tile.osm.org/{z}/{x}/{y}.png)
            - Ajouter le control "ZoomInfo" à la carte:
                -> Il s'agit d'un control que j'ai réalisé : kebUtil.control.zoomInfo(map).addTo(map);
*/

/* STEP M&M's : - Quelle est la valeur de l'échelle (control "Scale") au niveau de zoom 9 (en km) ?
*/

/* Bonus : - Créer un tileLayer de fond de plan en utilisant mapbox sans l'ajouter à la carte
                -> url : 'https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png'
                -> option "attribution" : Zenika - Technozaure | MapBox
                -> option "id" : ctardella.kko459nh
            - Ajouter le control "Layers" à la carte
                -> Utiliser les couches OpenStreetMap et MapBox comme "baseLayers" et les couches velov et poubelle comme "overlays"
                -> doc http://leafletjs.com/reference.html#control-layers
*/

/* STEP Bonus : - Regarder la doc des différents controls pour adapter/changer leur comportement
*/

function zoomToLyon() {
    console.warn('Not implemented yet');
}