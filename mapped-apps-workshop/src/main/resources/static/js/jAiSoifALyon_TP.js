var map = L.map('map').setView([45.762179, 4.862226], 13);
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);

/* Contexte :   Une carte avec un fond de plan est déjà créée et centrée sur Lyon
*/

/* STEP 1 : - Ajouter les couches WMS de fontaines de la ville de Lyon :
                -> url de la couche de fontaine : https://download.data.grandlyon.com/wms/grandlyon
                -> nom de la couche de fontaine : epo_eau_potable.epobornefont
                - doc : http://leafletjs.com/reference.html#tilelayer-wms
*/

/* STEP 2 : - Activer la geolocalisation :
                - Compléter la fonction locateMe (cf. bas du fichier) en demandant une geolocalisation
                    -> docs http://leafletjs.com/reference.html#map-locate
                - Ajouter un eventHandler sur la carte afin de réagir à l'évènement "locationfound"
                    -> docs http://leafletjs.com/reference.html#events
                            http://leafletjs.com/reference.html#location-event
                - Centrer sur la position trouvée et y ajouter un marker avec une popup ouverte indiquant "Votre position" (cf. TP précédant)
                    -> doc  http://leafletjs.com/reference.html#map-locationfound
                            http://leafletjs.com/reference.html#map-openpopup
*/

/* STEP 3 : - Trouver la fontaine la plus proche :
                - Compléter la fonction findClosestFountain (cf. bas du fichier) en utilisant la fonction kebUtil.findClosestFountain
                    -> il suffit de lui passer en paramètre l'objet LatLng correspondant à votre position
                - Regarder le code de la fonction kebUtil.findClosestFountain et vérifier qu'on comprend ce qu'il fait
                - doc   http://docs.geoserver.org/stable/en/user/services/wfs/reference.html
                        http://leafletjs.com/reference.html#latlng-distanceto
*/

/* STEP 4 : - Lancer une requête de type GetFeatureInfo et afficher le résultat sur la carte :
                - Ajouter un évènement au 'click' sur la carte
                    -> doc  http://leafletjs.com/reference.html#events
                            http://leafletjs.com/reference.html#event-objects
                - Appeler alors la méthode kebUtil.getFeatureInfo ayant pour paramètres : la carte et un objet json (permettant de configurer la requête GetFeatureInfo) défini ainsi:
                    -> {
                            x : null, // Position x du point cliqué dans le contexte du conteneur : http://leafletjs.com/reference.html#events-containerpoint
                            y : null, // Position y du point cliqué dans le contexte du conteneur : http://leafletjs.com/reference.html#events-containerpoint
                            bbox : null, // BBox de la carte en String : http://leafletjs.com/reference.html#map-getbounds http://leafletjs.com/reference.html#latlngbounds-tobboxstring
                            width : null, // Longueur de la carte : http://leafletjs.com/reference.html#map-getsize
                            height : null // Hauteur de la carte : http://leafletjs.com/reference.html#map-getsize
                    }
*/

/* STEP M&M's : - Quelle est le nom de la fontaine la plus proche (il faut zoomer dessus et cliquer dessus sans cliquer sur le marqueur)?
*/

/* STEP Bonus : - Regarder le code de la fonction kebUtil.getFeatureInfo et vérifier qu'on comprend ce qu'il fait
                    - un console.log en reponse au bon évènement fera l'affaire
*/

/* STEP Bonus : - Essayer de récuperer l'information que l'utilisateur a refuser la demande de localisation de l'application
                    - un console.log en reponse au bon évènement fera l'affaire
*/

function locateMe() {
    console.warn('Not implemented yet');
}

function findClosestFountain() {
    console.warn('Not implemented yet');
}