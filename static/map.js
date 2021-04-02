
    //create map
	mapboxgl.accessToken = 'pk.eyJ1IjoibGl2aWFyaWJlaXJvIiwiYSI6ImNraTRuOTFlNDBjNTIzMW1od3FhdTh0em8ifQ.TM5OGqVV7cV2IWdq_ZMb3A';
        var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v10',
        center: [4.079306, 48.293024],
        minZoom: 3,
        zoom: 5
    });

    map.addControl(new mapboxgl.NavigationControl(),'bottom-right');

    map.addControl(new MapboxLanguage({
        defaultLanguage: 'fr'
    }));

   
    var zoomThreshold = 6;
    var zoomComThreshold = 9;
    var hoveredStateId = null;


    //load layers
    map.on('load', function () {

        map.getStyle().layers.map(function (layer) {
            if (layer.id.indexOf('road') >= 0) {
            map.setLayoutProperty(layer.id, 'visibility', 'none');
            }
        });

        //add region source
        map.addSource('region', {
            'type': 'vector',
            'url': 'mapbox://liviaribeiro.3qf6fysf'
        });
        
        //add region layer
        map.addLayer(
            {
                'id': 'Regions',
                'source': 'region',
                'source-layer': 'REGION_SIMPLIFIED',
                'maxzoom': zoomThreshold,
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

        //add region popup layer
        map.addLayer(
            {
                'id': 'Regions_popup',
                'source': 'region',
                'source-layer': 'REGION_SIMPLIFIED',
                'maxzoom': zoomThreshold,
                'type': 'fill',
                'paint': {
                    'fill-color': "#627BC1",
                    'fill-opacity': 0
                },
                'layout': {
                    'visibility': 'visible'
                }
            }  
        );

        map.addLayer({
            'id': 'Regions_line',
            'type': 'line',
            'source': 'region',
            'source-layer': 'REGION_SIMPLIFIED',
            'maxzoom': zoomThreshold,
            'layout': {
                'visibility': 'visible'
            },
            'paint': {
                'line-color': '#ffffff',
                'line-width': 1
            }
        });

        map.on('click', 'Regions', function (e) {
            var polygon = e.features[0].geometry.coordinates;
            var fit = new L.Polygon(polygon).getBounds();
            var southWest = new mapboxgl.LngLat(fit['_southWest']['lat'], fit['_southWest']['lng']);
            var northEast = new mapboxgl.LngLat(fit['_northEast']['lat'], fit['_northEast']['lng']);
            var center = new mapboxgl.LngLatBounds(southWest, northEast).getCenter();
            console.log(fit)
            map.flyTo({
            center: center, zoom:7
            });
        });

        var popup = new mapboxgl.Popup({
            closeButton: false
        });

        // When the user moves their mouse over the state-fill layer, we'll update the
        // feature state for the feature under the mouse.
        map.on('mousemove', 'Regions', function (e) {
            if (e.features.length > 0) {
                if (hoveredStateId) {
                    map.setFeatureState(
                    { source: 'region', sourceLayer: 'REGION_SIMPLIFIED', id: hoveredStateId },
                        { hover: false }
                    );
                }

                hoveredStateId = e.features[0].id;

                map.setFeatureState(
                    { source: 'region', sourceLayer: 'REGION_SIMPLIFIED', id: hoveredStateId },
                    { hover: true }
                    );
                }
                
        });
        
        // When the mouse leaves the state-fill layer, update the feature state of the
        // previously hovered feature.
        map.on('mouseleave', 'Regions', function () {
                if (hoveredStateId) {
            map.setFeatureState(
                { source: 'region', sourceLayer: 'REGION_SIMPLIFIED', id: hoveredStateId },
                { hover: false }
                );
            }
            hoveredStateId = null;
        });


        // When the user moves their mouse over the state-fill layer, we'll update the
        // feature state for the feature under the mouse.
        map.on('mousemove', 'Regions_popup', function (e) {
            if (e.features.length > 0) {
                popup.setLngLat(e.lngLat)
                    .setHTML('<p>'+e.features[0].properties.NOM_REG+'</p')
                    .addTo(map);
                }     
        });
        
        map.on('mouseleave', 'Regions_popup', function () {
            popup.remove();
        });

        //add departement source
        map.addSource('departement', {
            'type': 'vector',
            'url': 'mapbox://liviaribeiro.76ba45w7'
        });
        
        //add departement layer
        map.addLayer(
            {
                'id': 'Departements',
                'source': 'departement',
                'source-layer': 'DEPARTEMENT_SIMPLIFIED',
                'minzoom': zoomThreshold,
                'maxzoom': zoomComThreshold,
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
                    // make layer not visible by default
                    'visibility': 'visible'
                }
            }  
        );

        map.addLayer({
            'id': 'Departements_line',
            'type': 'line',
            'source': 'departement',
            'source-layer': 'DEPARTEMENT_SIMPLIFIED',
            'minzoom': zoomThreshold,
            'maxzoom': zoomComThreshold,
            'layout': {
                'visibility': 'visible'
            },
            'paint': {
                'line-color': '#ffffff',
                'line-width': 1
            }
        });

        map.on('click', 'Departements', function (e) {
            var polygon = e.features[0].geometry.coordinates;
            var fit = new L.Polygon(polygon).getBounds();
            var southWest = new mapboxgl.LngLat(fit['_southWest']['lat'], fit['_southWest']['lng']);
            var northEast = new mapboxgl.LngLat(fit['_northEast']['lat'], fit['_northEast']['lng']);
            var center = new mapboxgl.LngLatBounds(southWest, northEast).getCenter();
            console.log(fit)
            map.flyTo({
            center: center, zoom:9
            });
        });

        // When the user moves their mouse over the state-fill layer, we'll update the
        // feature state for the feature under the mouse.
        map.on('mousemove', 'Departements', function (e) {
            if (e.features.length > 0) {
            if (hoveredStateId) {
        map.setFeatureState(
            { source: 'departement', sourceLayer: 'DEPARTEMENT_SIMPLIFIED', id: hoveredStateId },
            { hover: false }
            );
        }
        hoveredStateId = e.features[0].id;
        map.setFeatureState(
            { source: 'departement', sourceLayer: 'DEPARTEMENT_SIMPLIFIED', id: hoveredStateId },
            { hover: true }
            );
        }
        popup.setLngLat(e.lngLat)
                    .setHTML('<p>'+e.features[0].properties.NOM_DEP+'</p>')
                    .addTo(map);
                
        });
        
        // When the mouse leaves the state-fill layer, update the feature state of the
        // previously hovered feature.
        map.on('mouseleave', 'Departements', function () {
                if (hoveredStateId) {
            map.setFeatureState(
                { source: 'departement', sourceLayer: 'DEPARTEMENT_SIMPLIFIED', id: hoveredStateId },
                { hover: false }
                );
            }
            hoveredStateId = null;
            popup.remove();
        });
        

        //add commune source
        map.addSource('commune', {
            'type': 'vector',
            'url': 'mapbox://liviaribeiro.1d5mkyd4'
        });

        // add commune layer
        map.addLayer(
            {
                'id': 'Communes',
                'source': 'commune',
                'source-layer': 'COMMUNE_SIMPLIFIED',
                'minzoom': zoomComThreshold,
                'maxzoom': 10,
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
                    // make layer not visible by default
                    'visibility': 'visible'
                }
            }  
        );    
        
        map.addLayer({
            'id': 'Communes_line',
            'type': 'line',
            'source': 'commune',
            'source-layer': 'COMMUNE_SIMPLIFIED',
            'minzoom': zoomComThreshold,
            'layout': {
                'visibility': 'visible'
            },
            'paint': {
                'line-color': '#ffffff',
                'line-width': 1
            }
        });

        map.on('click', 'Communes', function (e) {
            var polygon = e.features[0].geometry.coordinates;
            var fit = new L.Polygon(polygon).getBounds();
            var southWest = new mapboxgl.LngLat(fit['_southWest']['lat'], fit['_southWest']['lng']);
            var northEast = new mapboxgl.LngLat(fit['_northEast']['lat'], fit['_northEast']['lng']);
            var center = new mapboxgl.LngLatBounds(southWest, northEast).getCenter();
            console.log(fit)
            map.flyTo({
            center: center, zoom:12
            });
        });

        // When the user moves their mouse over the state-fill layer, we'll update the
        // feature state for the feature under the mouse.
        map.on('mousemove', 'Communes', function (e) {
            if (e.features.length > 0) {
            if (hoveredStateId) {
        map.setFeatureState(
            { source: 'commune', sourceLayer: 'COMMUNE_SIMPLIFIED', id: hoveredStateId },
            { hover: false }
            );
        }
        hoveredStateId = e.features[0].id;
        map.setFeatureState(
            { source: 'commune', sourceLayer: 'COMMUNE_SIMPLIFIED', id: hoveredStateId },
            { hover: true }
            );
            popup.setLngLat(e.lngLat)
                    .setHTML('<p>'+e.features[0].properties.NOM_COM+'<p>')
                    .addTo(map);
        }
        });
        
        // When the mouse leaves the state-fill layer, update the feature state of the
        // previously hovered feature.
        map.on('mouseleave', 'Communes', function () {
                if (hoveredStateId) {
            map.setFeatureState(
                { source: 'commune', sourceLayer: 'COMMUNE_SIMPLIFIED', id: hoveredStateId },
                { hover: false }
                );
            }
            hoveredStateId = null;
            popup.remove();
        });
        
        map.moveLayer('place-village');
        map.moveLayer('place-city-sm');
        map.moveLayer('place-city-md-s');
        map.moveLayer('place-city-md-n');
        map.moveLayer('place-city-lg-s');
        map.moveLayer('place-city-lg-n');
        map.moveLayer('place-town');
        map.moveLayer('state-label-lg');
        map.moveLayer('state-label-md');
        map.moveLayer('state-label-sm');
        map.moveLayer('country-label-lg');
        map.moveLayer('country-label-md');
        map.moveLayer('country-label-sm');
        
        //add cadrage source
        map.addSource('cadrage', {
            'type': 'vector',
            'url': 'mapbox://liviaribeiro.13vs779l'
        });

        
        // add densité moyenne layer
        map.addLayer(
            {
                'id': 'Densité Moyenne',
                'source': 'cadrage',
                'source-layer': 'COMMUNE_CADRAGE_SIMPLIFIED',
                'type': 'fill',
                'paint': {
                    'fill-color': [
                        "step",
                        ["get", "DENSITE17"],
                        "hsl(207, 66%, 98%)",
                        50,
                        "#c8e0f4",
                        100,
                        "hsl(207, 64%, 70%)",
                        1000,
                        "hsl(207, 63%, 44%)",
                        10000,
                        "hsl(207, 66%, 23%)"
                        ],
                    'fill-opacity': 0.75,
                },
                'layout': {
                    // make layer not visible by default
                    'visibility': 'none'
                }
            }  
        );    

        map.on('mousemove', 'Densité Moyenne', function (e) {
            if (e.features.length > 0) {
                popup.setLngLat(e.lngLat)
                    .setHTML('<p>'+e.features[0].properties.NOM_COM+'</p><p>'
                        +(e.features[0].properties.DENSITE17).toFixed(2)+' habitants/km2 </p>')
                    .addTo(map);
                }     
        });
        
        map.on('mouseleave', 'Densité Moyenne', function () {
            popup.remove();
        });


        //add  niveau de vie médian layer
        map.addLayer(
            {
                'id': 'Niveau de vie médian',
                'source': 'cadrage',
                'source-layer': 'COMMUNE_CADRAGE_SIMPLIFIED',
                'type': 'fill',
                'paint': {
                    'fill-color': [
                        "step",
                        ["get", "NIVEAUDEVIE17"],
                        "#FFFFFF",
                        0,
                        "hsl(207, 66%, 98%)",
                        20000,
                        "#c8e0f4",
                        24000,
                        "hsl(207, 64%, 70%)",
                        28000,
                        "hsl(207, 63%, 44%)",
                        34000,
                        "hsl(207, 66%, 23%)"
                        ],
                    'fill-opacity': 0.75,
                    
                },
                'layout': {
                    // make layer not visible by default
                    'visibility': 'none'
                }
            }  
        );    

        map.on('mousemove', 'Niveau de vie médian', function (e) {
            if (e.features.length > 0) {
                popup.setLngLat(e.lngLat)
                    .setHTML('<p>'+e.features[0].properties.NOM_COM+'</p><p>'
                        +(e.features[0].properties.NIVEAUDEVIE17)+' euros </p>')
                    .addTo(map);
                }     
        });
        
        map.on('mouseleave', 'Niveau de vie médian', function () {
            popup.remove();
        });
        
        //add indice relatif à la jeunesse
        map.addLayer(
            {
                'id': 'Indice relatif à la jeunesse',
                'source': 'cadrage',
                'source-layer': 'COMMUNE_CADRAGE_SIMPLIFIED',
                'type': 'fill',
                'paint': {
                    'fill-color': [
                        "step",
                        ["get", "INDICEJEUNESSE17"],
                        "#FFFFFF",
                        0,
                        "#FEF3CF",
                        50,
                        "#FDCF41",
                        80,
                        "#FEF3CF",
                        100,
                        "#F79142",
                        150,
                        "#E10600",
                        ],
                    'fill-opacity': 0.75,
                    
                },
                'layout': {
                    // make layer not visible by default
                    'visibility': 'none'
                }
            }
        );  

        map.on('mousemove', 'Indice relatif à la jeunesse', function (e) {
            if (e.features.length > 0) {
                popup.setLngLat(e.lngLat)
                    .setHTML('<p>'+e.features[0].properties.NOM_COM+'</p><p>Indice relatif à la jeunesse : '
                        +(e.features[0].properties.INDICEJEUNESSE17).toFixed(0)+ '</p>')
                    .addTo(map);
                }     
        });
        
        map.on('mouseleave', 'Indice relatif à la jeunesse', function () {
            popup.remove();
        });


        //add évolution de la population
        map.addLayer(
            {
                'id': 'Évolution de la population',
                'source': 'cadrage',
                'source-layer': 'COMMUNE_CADRAGE_SIMPLIFIED',
                'type': 'fill',
                'paint': {
                    'fill-color': [
                        "step",
                        [
                            "get",
                            "TYPOLOGIEEVOL1217"
                        ],
                        "hsl(240, 0%, 63%)",
                        1,
                        "hsl(0, 85%, 51%)",
                        2,
                        "#f674b1",
                        3,
                        "#fcb0d4",
                        4,
                        "hsl(207, 96%, 78%)",
                        5,
                        "hsl(207, 68%, 52%)",
                        6,
                        "#143f61"
                        ],
                },
                'layout': {
                    // make layer not visible by default
                    'visibility': 'none'
                }
            }  
        );      
        
        map.on('mousemove', 'Évolution de la population', function (e) {
            if (e.features.length > 0) {
                popup.setLngLat(e.lngLat)
                    .setHTML('<p>'+e.features[0].properties.NOM_COM+'</p><p>'
                        +(e.features[0].properties.TYPOLOGIEEVOL1217)+'</p>')
                    .addTo(map);
                }     
        });
        
        map.on('mouseleave', 'Évolution de la population', function () {
            popup.remove();
        });


        //add population source
         map.addSource('population', {
            'type': 'vector',
            'url': 'mapbox://liviaribeiro.1n6485zf'
        });

        //add population layer
        map.addLayer(
            {
            'id': 'Population',
            'type': 'circle',
            'source': 'population',
            'source-layer': 'COMMUNE_CARTO_POINTS_CADRAGE-6p2apo',
            'paint': {
                'circle-radius': ['*', 30, ['/',['sqrt', ["get", "POPULATION"]],['sqrt', 2187526]]],
                'circle-color': "hsla(0, 71%, 68%, 0.5)"
                },
                'layout': {
                    // make layer not visible by default
                    'visibility': 'none'
                }
        });

        //add zonage rural source
        map.addSource('zonage rural', {
            'type': 'vector',
            'url': 'mapbox://liviaribeiro.32c0jrtl'
        });
        
        //add zonage rural layer
        map.addLayer(
            {
                'id': 'Zonage Rural',
                'source': 'zonage rural',
                'source-layer': 'COMMUNE_CARTO_RURAL_SIMPLE-7gdwr0',
                'type': 'fill',
                'paint': {
                    'fill-color':[
                        "step",
                        ["get", "ZONAGE_RURAL"],        
                        "#ff3d3d",
                        1.1,
                        "#f9a4c9",
                        2.1,
                        '#a9fc92',
                        3.1,
                        "#528603",
                        4,
                        "#528603"
                        ],'fill-opacity': 0.75
                },
                'layout': {
                    // make layer visible by default
                    'visibility': 'none'
                }
            }  
        );

        //add zone d'emploi source
        map.addSource("zone emploi", {
            'type': 'vector',
            'url': 'mapbox://liviaribeiro.a9e2kc06'
        });
        
        //add zone d'emploi layer
        map.addLayer(
            {
                'id': "Zone d'emploi",
                'source': 'zone emploi',
                'source-layer': 'fond_ZE2020_geo20-6lgoy1',
                'type': 'fill',
                'paint': {
                    'fill-color': '#627BC1',
                    'fill-opacity':0.5
                },
                'layout': {
                    // make layer visible by default
                    'visibility': 'none'
                }
            }  
        );

        map.on('click', "Zone d'emploi", function (e) {
            new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties.lb_clst)
            .addTo(map);
        });

        map.loadImage(
            'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
            function (error, image) {
            if (error) throw error;
            map.addImage('custom-marker', image);})

        //add zonage action coeur de ville
        map.addSource('acv', {
            'type': 'vector',
            'url': 'mapbox://liviaribeiro.2f6ii8rh',
            'cluster': true,
            'clusterMaxZoom': 14, // Max zoom to cluster points on
            'clusterRadius': 50 
        });

        map.addLayer({
            'id': 'Action coeur de ville',
            'type': 'symbol',
            'source': 'acv',
            'source-layer': 'COMMUNE_CARTO_ACV-834rrb',
            'layout': {
            'icon-image': [
                "case",
                [
                    "match",
                    ["get", "ACV"],
                    ["000000"],
                    false,
                    true
                ],
                "custom-marker",
                ""
                ],
            'icon-size': 0.5,
            'visibility': 'none',
            'icon-allow-overlap': true
            },
        });

        map.on('click', "Action coeur de ville", function (e) {
            new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties.NOM_COM)
            .addTo(map);
        });

        map.addSource('equipements', {
            'type': 'geojson',
            'data': "/equipements",

        });


        map.addLayer({
            'id': 'Equipements',
            'type': 'circle',
            'source': 'equipements',
            'paint': {
                'circle-color': '#ff5500',
                'circle-radius': {
                    stops: [[6, 1], [9, 5], [16, 10]]
                }          
            },            
            'layout': {
                    // make layer not visible by default
                    'visibility': 'none',
                },
                
        });

        // When a click event occurs on a feature in
        // the unclustered-point layer, open a popup at
        // the location of the feature, with
        // description HTML from its properties.
        map.on('click', 'Equipements', function (e) {
            var coordinates = e.features[0].geometry.coordinates.slice();
            var name = e.features[0].properties.nom;
            var adresse = e.features[0].properties.adresse;
            var domaine = e.features[0].properties.domaine;
            
            // Ensure that if the map is zoomed out such that
            // multiple copies of the feature are visible, the
            // popup appears over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
            
            new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML('<p>'+name+'</p>'+ 
                '<p>'+adresse+'</p>'
            )
            .addTo(map);
        });

         //add departement source
         map.addSource('commune_entreprises', {
                'type': 'vector',
                'url': 'mapbox://liviaribeiro.08u9p4r9'
        });
            
        //add departement layer
        map.addLayer(
            {
                'id': 'Effectifs culture commune',
                'source': 'commune_entreprises',
                'source-layer': 'COMMUNE_ENTREPRISE',
                'minzoom': zoomComThreshold,
                'type': 'fill',
                'paint': {
                    'fill-color': [
                        "step",
                        ["get", "EFFECTIFSCULTURE17"],
                        "hsl(207, 66%, 98%)",
                        50,
                        "#c8e0f4",
                        100,
                        "hsl(207, 64%, 70%)",
                        1000,
                        "hsl(207, 63%, 44%)",
                        10000,
                        "hsl(207, 66%, 23%)"
                        ],
                    'fill-opacity': 0.75,
                },
                'layout': {
                    // make layer not visible by default
                    'visibility': 'none'
                }
            }  
        );

        map.on('mousemove', 'Effectifs culture commune', function (e) {
            if (e.features.length > 0) {
                popup.setLngLat(e.lngLat)
                    .setHTML('<p>'+e.features[0].properties.nom+'</p><p>Effectifs culture : '
                        +(e.features[0].properties.EFFECTIFSCULTURE17)+ '</p>')
                    .addTo(map);
                }     
        });
        
        map.on('mouseleave', 'Effectifs culture commune', function () {
            popup.remove();
        });

        //add departement layer
        map.addLayer(
            {
                'id': 'Etablissements culture commune',
                'source': 'commune_entreprises',
                'source-layer': 'COMMUNE_ENTREPRISE',
                'minzoom': zoomComThreshold,
                'type': 'fill',
                'paint': {
                    'fill-color': [
                        "step",
                        ["get", "ETLABISSEMENTSCULTURE17"],
                        "hsl(207, 66%, 98%)",
                        50,
                        "#c8e0f4",
                        100,
                        "hsl(207, 64%, 70%)",
                        1000,
                        "hsl(207, 63%, 44%)",
                        10000,
                        "hsl(207, 66%, 23%)"
                        ],
                    'fill-opacity': 0.75,
                },
                'layout': {
                    // make layer not visible by default
                    'visibility': 'none'
                }
            }  
        );

        map.on('mousemove', 'Etablissements culture commune', function (e) {
            if (e.features.length > 0) {
                popup.setLngLat(e.lngLat)
                    .setHTML('<p>'+e.features[0].properties.nom+'</p><p>Etablissements culture : '
                        +(e.features[0].properties.ETLABISSEMENTSCULTURE17)+ '</p>')
                    .addTo(map);
                }     
        });
        
        map.on('mouseleave', 'Etablissements culture commune', function () {
            popup.remove();
        });

        //add departement source
        map.addSource('departement_entreprises', {
                'type': 'vector',
                'url': 'mapbox://liviaribeiro.659hkczd'
        });
            
        //add departement layer
        map.addLayer(
            {
                'id': 'Effectifs culture département',
                'source': 'departement_entreprises',
                'source-layer': 'DEPARTEMENT_ENTREPRISE',
                'minzoom': zoomThreshold,
                'maxzoom': zoomComThreshold,
                'type': 'fill',
                'paint': {
                    'fill-color': [
                        "step",
                        ["get", "EFFECTIFSCULTURE17"],
                        "hsl(207, 66%, 98%)",
                        50,
                        "#c8e0f4",
                        100,
                        "hsl(207, 64%, 70%)",
                        1000,
                        "hsl(207, 63%, 44%)",
                        10000,
                        "hsl(207, 66%, 23%)"
                        ],
                    'fill-opacity': 0.75,
                },
                'layout': {
                    // make layer not visible by default
                    'visibility': 'none'
                }
            }  
        );

        map.on('mousemove', 'Effectifs culture département', function (e) {
            if (e.features.length > 0) {
                popup.setLngLat(e.lngLat)
                    .setHTML('<p>'+e.features[0].properties.NOM_DEP+'</p><p>Effectifs culture : '
                        +(e.features[0].properties.EFFECTIFSCULTURE17)+ '</p>')
                    .addTo(map);
                }     
        });
        
        map.on('mouseleave', 'Effectifs culture département', function () {
            popup.remove();
        });

        //add departement layer
        map.addLayer(
            {
                'id': 'Etablissements culture département',
                'source': 'departement_entreprises',
                'source-layer': 'DEPARTEMENT_ENTREPRISE',
                'minzoom': zoomThreshold,
                'maxzoom': zoomComThreshold,
                'type': 'fill',
                'paint': {
                    'fill-color': [
                        "step",
                        ["get", "ETLABISSEMENTSCULTURE17"],
                        "hsl(207, 66%, 98%)",
                        50,
                        "#c8e0f4",
                        100,
                        "hsl(207, 64%, 70%)",
                        1000,
                        "hsl(207, 63%, 44%)",
                        10000,
                        "hsl(207, 66%, 23%)"
                        ],
                    'fill-opacity': 0.75,
                },
                'layout': {
                    // make layer not visible by default
                    'visibility': 'none'
                }
            }  
        );

        map.on('mousemove', 'Etablissements culture département', function (e) {
            if (e.features.length > 0) {
                popup.setLngLat(e.lngLat)
                    .setHTML('<p>'+e.features[0].properties.NOM_DEP+'</p><p>Etablissements culture : '
                        +(e.features[0].properties.ETLABISSEMENTSCULTURE17)+ '</p>')
                    .addTo(map);
                }     
        });
        
        map.on('mouseleave', 'Etablissements culture département', function () {
            popup.remove();
        });

        //add région source
        map.addSource('region_entreprises', {
                'type': 'vector',
                'url': 'mapbox://liviaribeiro.79o9xcfa'
        });
            
        //add région layer
        map.addLayer(
            {
                'id': 'Effectifs culture région',
                'source': 'region_entreprises',
                'source-layer': 'REGION_ENTREPRISE',
                'maxzoom': zoomThreshold,
                'type': 'fill',
                'paint': {
                    'fill-color': [
                        "step",
                        ["get", "EFFECTIFSCULTURE17"],
                        "hsl(207, 66%, 98%)",
                        1000,
                        "#c8e0f4",
                        10000,
                        "hsl(207, 64%, 70%)",
                        20000,
                        "hsl(207, 63%, 44%)",
                        100000,
                        "hsl(207, 66%, 23%)"
                        ],
                    'fill-opacity': 0.75,
                },
                'layout': {
                    // make layer not visible by default
                    'visibility': 'none'
                }
            }  
        );

        map.on('mousemove', 'Effectifs culture région', function (e) {
            if (e.features.length > 0) {
                popup.setLngLat(e.lngLat)
                    .setHTML('<p>'+e.features[0].properties.NOM_REG+'</p><p>Effectifs culture : '
                        +(e.features[0].properties.EFFECTIFSCULTURE17)+ '</p>')
                    .addTo(map);
                }     
        });
        
        map.on('mouseleave', 'Effectifs culture région', function () {
            popup.remove();
        });

        map.addLayer(
            {
                'id': 'Etablissements culture région',
                'source': 'region_entreprises',
                'source-layer': 'REGION_ENTREPRISE',
                'maxzoom': zoomThreshold,
                'type': 'fill',
                'paint': {
                    'fill-color': [
                        "step",
                        ["get", "ETLABISSEMENTSCULTURE17"],
                        "hsl(207, 66%, 98%)",
                        1000,
                        "#c8e0f4",
                        2000,
                        "hsl(207, 64%, 70%)",
                        5000,
                        "hsl(207, 63%, 44%)",
                        10000,
                        "hsl(207, 66%, 23%)"
                        ],
                    'fill-opacity': 0.75,
                },
                'layout': {
                    // make layer not visible by default
                    'visibility': 'none'
                }
            }  
        );

        map.on('mousemove', 'Etablissements culture région', function (e) {
            if (e.features.length > 0) {
                popup.setLngLat(e.lngLat)
                    .setHTML('<p>'+e.features[0].properties.NOM_REG+'</p><p>Etablissements culture : '
                        +(e.features[0].properties.ETLABISSEMENTSCULTURE17)+ '</p>')
                    .addTo(map);
                }     
        });
        
        map.on('mouseleave', 'Etablissements culture région', function () {
            popup.remove();
        });

        //add région source
        map.addSource('region_depenses', {
                'type': 'vector',
                'url': 'mapbox://liviaribeiro.dunv0eqb'
        });
            
        //add région layer
        map.addLayer(
            {
                'id': 'Dépenses Culture',
                'source': 'region_depenses',
                'source-layer': 'REGION_DEPENSES',
                //'maxzoom': zoomThreshold,
                'type': 'fill',
                'paint': {
                    'fill-color': [
                        "step",
                        ['get', 'DEPENSESTOTALES',['get', 'Patrimoines', ['get', 'depenses']]],
                        "hsl(207, 66%, 98%)",
                        1000,
                        "#c8e0f4",
                        10000,
                        "hsl(207, 64%, 70%)",
                        20000,
                        "hsl(207, 63%, 44%)",
                        100000,
                        "hsl(207, 66%, 23%)"
                        ],
                    'fill-opacity': 0.75,
                },
                'layout': {
                    // make layer not visible by default
                    'visibility': 'none'
                }
            }  
        );

        map.on('mousemove', 'Dépenses culture', function (e) {
            if (e.features.length > 0) {
                popup.setLngLat(e.lngLat)
                    .setHTML('<p>'+e.features[0].properties.NOM_REG+'</p><p>Effectifs culture : '
                        +(e.features[0].properties.EFFECTIFSCULTURE17)+ '</p>')
                    .addTo(map);
                }     
        });
        
        map.on('mouseleave', 'Dépenses culture', function () {
            popup.remove();
        });
       
    });

    

