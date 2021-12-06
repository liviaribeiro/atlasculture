import { buildMap } from './buildMap.js';
const initMap = () => {
  mapboxgl.accessToken = 'pk.eyJ1IjoibGl2aWFyaWJlaXJvIiwiYSI6ImNraTRuOTFlNDBjNTIzMW1od3FhdTh0em8ifQ.TM5OGqVV7cV2IWdq_ZMb3A';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10',
        center: [2.209666999999996, 46.232192999999995],
        minZoom: 3,
        zoom: 5,
        preserveDrawingBuffer: true
    });

    // Add the control to the map.
    var geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        proximity: [2.3488,48.8534],
        trackProximity: true,
        marker: false
    });

    document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

    const aplats = ['Indice de jeunesse', 'Densité de la population', 'Évolution de la population', 'Niveau de vie médian', 'Taux de pauvreté',
        'Grille communale de densité', "Aires d'attraction des villes", 'Catégories du rural et de l’urbain', "Entreprises culturelles du secteur marchand", "Entreprises culturelles du secteur marchand départements", "Entreprises culturelles du secteur marchand régions",
        'Salariés actifs des secteurs culturels marchands', "Salariés actifs des secteurs culturels marchands départements", "Salariés actifs des secteurs culturels marchands régions",
        'Actifs exerçant une profession culturelle', "Actifs exerçant une profession culturelle ZE", "Actifs exerçant une profession culturelle région",
        'Actifs dans les secteurs culturels', "Actifs dans les secteurs culturels ZE", "Actifs dans les secteurs culturels région",
        'Dépenses culturelles des régions', 'Dépenses culturelles des départements', 'Dépenses culturelles des intercommunalités',
        'Dépenses culturelles des communes', 'Dépenses du ministère de la Culture', "Dépenses du ministère de la Culture Département"]

// __
    var popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnMove: true
    });

    var hoveredStateId = null;

    const zoomThreshold = 6;
    const zoomComThreshold = 8;
    window.map = map
    window.geocoder = geocoder
    window.popup = popup
    window.zoomComThreshold = zoomComThreshold
    window.zoomThreshold = zoomThreshold
    window.hoveredStateId =hoveredStateId


}

export { initMap }
