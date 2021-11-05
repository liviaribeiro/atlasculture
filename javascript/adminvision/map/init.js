import { buildMap } from './buildMap.js';
const initMap = () => {
  mapboxgl.accessToken = 'pk.eyJ1IjoibGl2aWFyaWJlaXJvIiwiYSI6ImNraTRuOTFlNDBjNTIzMW1od3FhdTh0em8ifQ.TM5OGqVV7cV2IWdq_ZMb3A';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10',
        center: [2.209666999999996, 46.232192999999995],
        minZoom: 3,
        zoom: 5
    });

    // Add the control to the map.
    var geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        marker: false
    });
    document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
    window.map = map
    window.geocoder = geocoder
}

export { initMap }
