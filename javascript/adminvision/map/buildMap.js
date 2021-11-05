import { addLegend, hideLegend,openCloseLegend, openLegend, addLegendCircle,addLegendEquipement, addLegendSymbol } from './legend/legends.js'
import { showInfo, hideInfo, addInfo } from './legend/info.js'
import { addSource } from './addSource.js';
import { dataVariables } from './context/dataVariables.js';
import { dataDomaines } from './context/dataDomaines.js'
const buildMap = () => {

  const aplats = ['Indice de jeunesse', 'Densité de la population', 'Évolution de la population', 'Niveau de vie médian', 'Taux de pauvreté',
        'Grille communale de densité', "Aires d'attraction des villes", 'Catégories du rural et de l’urbain', "Entreprises culturelles du secteur marchand", "Entreprises culturelles du secteur marchand départements", "Entreprises culturelles du secteur marchand régions",
        'Salariés actifs des secteurs culturels marchands', "Salariés actifs des secteurs culturels marchands départements", "Salariés actifs des secteurs culturels marchands régions",
        'Actifs exerçant une profession culturelle', "Actifs exerçant une profession culturelle ZE", "Actifs exerçant une profession culturelle région",
        'Actifs dans les secteurs culturels', "Actifs dans les secteurs culturels ZE", "Actifs dans les secteurs culturels région",
        'Dépenses culturelles des régions', 'Dépenses culturelles des départements', 'Dépenses culturelles des intercommunalités',
        'Dépenses culturelles des communes', 'Dépenses du ministère de la Culture', "Dépenses du ministère de la Culture Département"]

    $(document).ready(function(){
        $("#myBtn").click(function(){
            $("#exampleModal").modal("show");
        });
        $('#exampleModal').on('shown.bs.modal', function() {
            generate_modal_body();
        }) ;
    });

    var popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnMove: true
    });

    var zoomThreshold = 6;
    var zoomComThreshold = 8;
    var hoveredStateId = null;

    map.on('load', function () {

        map.loadImage(
            'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
            function (error, image) {
            if (error) throw error;
            map.addImage('custom-marker', image);}
        )
        const listIcones = ['patrimoine-rouge.png', 'theatre-rose.png', 'archives-orange.png', 'patrimoine-rose.png', 'livre-bleu.png', 'arts-bleu.png', 'cinema-bleu.png', 'musique-jaune.png', 'edu-vert.png', 'archives-jaune.png', 'patrimoine-jaune.png', 'cinema-vert.png', 'musique-rouge.png', 'patrimoine-marron.png', 'edu-bleu.png', 'theatre-orange.png', 'livre-vert.png', 'arts-vert.png', 'theatre-rose-clair.png', 'theatre-violet.png', 'danse-bleu.png', 'musique-bleu.png', 'patrimoine-violet.png', 'theatre-noir.png', 'patrimoine-vert.png', 'patrimoine-orange.png', 'theatre-marron.png', 'archives-vert.png', 'theatre-vert.png', 'patrimoine-rose-clair.png', 'patrimoine-noir.png', 'cirque-vert.png', 'theatre-jaune.png', 'musique-orange.png', 'archives-bleu.png', 'danse-vert.png', 'musique-vert.png', 'patrimoine-bleu.png', 'theatre-rouge.png', 'cirque-bleu.png', 'musique-rose-clair.png', 'livre-jaune.png', 'theatre-bleu.png']
        listIcones.forEach((icone) => {
          map.loadImage(
              `/static/icones/${icone}`,
              function (error, image) {
              if (error) throw error;
              map.addImage(`${icone.split('.')[0]}`, image);}
          )
        })


        map.setLayoutProperty('country-label', 'text-field', ['get', 'name_fr']);
        map.setLayoutProperty('state-label', 'text-field', ['get', 'name_fr']);
        //map.setLayoutProperty('settlement-label', 'text-field', ['get', 'name_fr']);
        //map.setLayoutProperty('settlement-subdivision-label', 'text-field', ['get', 'name_fr']);
        //map.setLayoutProperty('road-label', 'text-field', ['get', 'name_fr']);
        //map.setLayoutProperty('waterway-label', 'text-field', ['get', 'name_fr']);
        //map.setLayoutProperty('natural-line-label', 'text-field', ['get', 'name_fr']);
        //map.setLayoutProperty('natural-point-label', 'text-field', ['get', 'name_fr']);
        map.setLayoutProperty('water-line-label', 'text-field', ['get', 'name_fr']);
        //map.setLayoutProperty('water-point-label', 'text-field', ['get', 'name_fr']);
        //map.setLayoutProperty('poi-label', 'text-field', ['get', 'name_fr']);
        //map.setLayoutProperty('airport-label', 'text-field', ['get', 'name_fr']);

        map.setPaintProperty("water", 'fill-color', "#a8e0f5");
        map.setPaintProperty("national-park", 'fill-color', "#b4e49b");

        function addZoneLayer(zoneLayer, zoneLayerURL, zoneSourceLayer, maxZoom, minZoom) {

            var lineWidth = 1;
            if (zoneLayer == "region") {
                lineWidth = 2.5;
            }
            var zoneLayerID = zoneLayer + 'Layer';
            var zoneLineID = zoneLayer + 'Line';


            map.addSource(zoneLayer, {
                'type': 'vector',
                'url': zoneLayerURL
            });

            map.addLayer(
                {
                    'id': zoneLayerID,
                    'source': zoneLayer,
                    'source-layer': zoneSourceLayer,
                    'minzoom': minZoom,
                    'maxzoom': maxZoom,
                    'type': 'fill',
                    'paint': {
                        'fill-color': "#627BC1",
                        'fill-opacity': [
                            'case',
                            ['boolean', ['feature-state', 'hover'], false],
                            0.25,
                            0
                            ]
                    },
                    'layout': {
                        'visibility': 'visible'
                    }
                }
            );

            map.addLayer({
                'id': zoneLineID,
                'type': 'line',
                'source': zoneLayer,
                'source-layer': zoneSourceLayer,
                'minzoom': minZoom,
                'layout': {
                    'visibility': 'visible'
                },
                'paint': {
                    'line-color': '#ffffff',
                    'line-width': lineWidth
                }
            });

            map.on('click', zoneLayerID, function (e) {
                var polygon = e.features[0].geometry.coordinates;
                var fit = new L.Polygon(polygon).getBounds();
                var southWest = new mapboxgl.LngLat(fit['_southWest']['lat'], fit['_southWest']['lng']);
                var northEast = new mapboxgl.LngLat(fit['_northEast']['lat'], fit['_northEast']['lng']);
                var center = new mapboxgl.LngLatBounds(southWest, northEast).getCenter();
                map.flyTo({
                    center: center, zoom:maxZoom+1
                });
            });

            map.on('mousemove', zoneLayerID, function (e) {
                if (e.features.length > 0) {
                    if (hoveredStateId) {
                        map.setFeatureState(
                        { source: zoneLayer, sourceLayer: zoneSourceLayer, id: hoveredStateId },
                            { hover: false }
                        );
                    }

                    hoveredStateId = e.features[0].id;

                    map.setFeatureState(
                        { source: zoneLayer, sourceLayer: zoneSourceLayer, id: hoveredStateId },
                        { hover: true }
                        );
                    }
            });

            map.on('mouseleave', zoneLayerID, function () {
                if (hoveredStateId) {
                    map.setFeatureState(
                        { source: zoneLayer, sourceLayer: zoneSourceLayer, id: hoveredStateId },
                        { hover: false }
                        );
                    }
                    hoveredStateId = null;
                });
        }

        function formatNumber(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
            }

        var regionLayer = "region";
        var regionURL = 'mapbox://liviaribeiro.3qf6fysf';
        var regionSourceLayer = 'REGION_SIMPLIFIED';
        var regionMaxZoom = zoomThreshold;
        var regionMinZoom = 4;
        var departementLayer = "departement";
        var departementURL = 'mapbox://liviaribeiro.76ba45w7';
        var departementSourceLayer = 'DEPARTEMENT_SIMPLIFIED';
        var departementMaxZoom = zoomComThreshold;
        var departementMinZoom = zoomThreshold;
        var communeLayer = "commune";
        var communeURL = 'mapbox://liviaribeiro.1d5mkyd4';
        var communeSourceLayer = 'COMMUNE_SIMPLIFIED';
        var communeMaxZoom = 12;
        var communeMinZoom = zoomComThreshold;

        addZoneLayer(regionLayer, regionURL, regionSourceLayer, regionMaxZoom, regionMinZoom);
        addZoneLayer(departementLayer, departementURL, departementSourceLayer, departementMaxZoom, departementMinZoom);
        addZoneLayer(communeLayer, communeURL, communeSourceLayer, communeMaxZoom, communeMinZoom);

        addSource();

        dataVariables(zoomThreshold,zoomComThreshold);


        //Festivals
        map.addSource('festivals', {
            'type': 'vector',
            'url': "mapbox://liviaribeiro.d49j0q6z"
        });

        map.addLayer(
            {
            'id': 'Festivals',
            'type': 'circle',
            'source': 'festivals',
            'source-layer': 'COMMUNE_FESTIVALS-91tdqh',
            'paint': {
             'circle-radius': ['*', 30, ['/',['sqrt', ["get", "NOMBREFESTIVALS"]],['sqrt', 290]]],
             'circle-color': "#de2d26",
             'circle-opacity': 0.75,
             },
             'layout': {
                    // make layer not visible by default
              'visibility': 'none'
              }
       });

       map.on('click', 'Festivals', function (e) {
                var coordinates = e.features[0].geometry.coordinates.slice();
                var nombre = e.features[0].properties.NOMBREFESTIVALS;
                var commune = e.features[0].properties.NOM_COM;

                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                popup.setLngLat(coordinates)
                    .setHTML('<p><b>'+commune+'</b></p>'+
                    '<p>'+nombre+' festival(s)</p>'
                )
                .addTo(map);
            });

        map.on("mouseenter", 'Festivals', () => {
            map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", 'Festivals', () => {
            map.getCanvas().style.cursor = "";
        });

        dataDomaines();
    });

}
window.buildMap = buildMap
export { buildMap }
