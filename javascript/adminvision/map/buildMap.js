const buildMap = (map) => {

  const aplats = ['Indice de jeunesse', 'Densité de la population', 'Évolution de la population', 'Niveau de vie médian', 'Taux de pauvreté',
        'Grille communale de densité', "Aires d'attraction des villes", 'Catégories du rural et de l’urbain', "Entreprises culturelles du secteur marchand", "Entreprises culturelles du secteur marchand départements", "Entreprises culturelles du secteur marchand régions",
        'Salariés actifs des secteurs culturels marchands', "Salariés actifs des secteurs culturels marchands départements", "Salariés actifs des secteurs culturels marchands régions",
        'Actifs exerçant une profession culturelle', "Actifs exerçant une profession culturelle ZE", "Actifs exerçant une profession culturelle région",
        'Actifs dans les secteurs culturels', "Actifs dans les secteurs culturels ZE", "Actifs dans les secteurs culturels région",
        'Dépenses culturelles des régions', 'Dépenses culturelles des départements', 'Dépenses culturelles des intercommunalités',
        'Dépenses culturelles des communes', 'Dépenses du ministère de la Culture', "Dépenses du ministère de la Culture Département"]

    function generate_modal_body(){
        modal = document.getElementById('modal-body');
        modal.innerHTML = "";
        active_layers = []
        for (var i = 0; i < aplats.length; i++){
            layer = aplats[i];
            var layer_visibility = map.getLayoutProperty(layer, 'visibility');
            if (layer_visibility == 'visible') {
                var layer_toDownload = document.createElement('a');
                layer_toDownload.class = "btn btn-download d-inline-flex align-items-center btn-link mt-5";
                layer_toDownload.href = "{{ portrait.fiche.url }}"
                layer_toDownload.innerHTML = layer;
                modal.appendChild(layer_toDownload)
            }
        }
    }

    $(document).ready(function(){
        $("#myBtn").click(function(){
            $("#exampleModal").modal("show");
        });
        $('#exampleModal').on('shown.bs.modal', function() {
            generate_modal_body();
        }) ;
    });

    function goToRegion(region) {
        if (region == "Guadeloupe") {
            center = [-61.687126, 16.2305103]
        }
        if (region == "Guyane") {
            center = [-52.999998, 4.0039882]
        }
        if (region == "La Réunion") {
            center = [55.5364801, -21.1307379]
        }
        if (region == "Martinique") {
            center = [-61.0158269, 14.6367927]
        }
        if (region == "Mayotte") {
            center = [45.1486261, -12.8253862,]
        }
        map.flyTo({
            center: center, zoom: 8
        });
    }

    function openCloseLegend(itemMenu) {
        if (document.getElementById(itemMenu).style.width == "30px") {
            document.getElementById(itemMenu).style.width = "257px";
        }
        else{
            document.getElementById(itemMenu).style.width = "30px";
        }
    }

    function openLegend(itemMenu) {
        var width = px*(100/document.documentElement.clientWidth)-63*px;
        console.log(width);
        document.getElementById(itemMenu).style.width = "width";
    }






    function addInfo(indicator, equipementID, definition, source, year) {
        let legendBox = document.getElementById('legend-box');
        let closeButton = document.createElement('button');
        closeButton.className = "closebtn";
        closeButton.onclick = function () {showInfo(hideInfo(equipementID))};
        var info = document.createElement('div');
        info.className = "legend shadow-sm p-3 mb-1 bg-white";
        info.setAttribute('id', "info-"+equipementID);
        info.appendChild(closeButton);
        var title = document.createElement('div');
        title.className = "title-legend mb-3 mt-3";
        title.innerHTML = indicator;
        info.appendChild(title);
        info.style.display = 'none';
        legendBox.appendChild(info);
        var definitionTitle = document.createElement('p');
        definitionTitle.className = "subtitle3";
        definitionTitle.innerHTML = "Définition";
        info.appendChild(definitionTitle);
        var definitionContent = document.createElement('p');
        definitionContent.innerHTML = definition;
        info.appendChild(definitionContent);
        var sourceTitle = document.createElement('p');
        sourceTitle.innerHTML = "Source";
        sourceTitle.className = "subtitle3";
        var sourceContent = document.createElement('p');
        sourceContent.innerHTML = source + ', ' + year;
        info.appendChild(sourceTitle);
        info.appendChild(sourceContent);
    }

    function showInfo(equipementID) {
        console.log("info-"+equipementID);
        info = document.getElementById("info-"+equipementID);
        info.style.display = "block";
        var legend = document.getElementById("legend-"+equipementID);
        console.log("legend-"+equipementID);
        legend.style.display = "none";
    }

    function hideInfo(equipementID) {
        console.log("info-"+equipementID);
        info = document.getElementById("info-"+equipementID);
        info.style.display = "none";
        var legend = document.getElementById("legend-"+equipementID);
        console.log("legend-"+equipementID);
        legend.style.display = "block";
    }

    function hideLegend(equipementID) {
        var legend = document.getElementById("legend-"+equipementID);
        console.log("legend-"+equipementID);
        legend.style.display = "none";
    }

    function addLegend(indicator, layers, colors) {
        let legendBox = document.getElementById('legend-box');
        var infoButton = document.createElement('button');
        infoButton.className = "infobtn";
        infoButton.onclick = function () {showInfo(indicator)};
        var closeButton = document.createElement('button');
        closeButton.className = "closebtn";
        closeButton.onclick = function () {showLayer(indicator)};
        var legend = document.createElement('div');
        legend.appendChild(closeButton);
        legend.appendChild(infoButton);
        legend.className = "legend shadow-sm p-3 my-2 bg-white";
        legend.setAttribute('id', "legend-"+indicator);
        var title = document.createElement('div');
        title.className = "title-legend mb-3 mt-3";
        title.innerHTML = indicator;
        legend.appendChild(title);


        for (let i = 0;  i < layers.length; i++) {
            var layer = layers[i];
            var color = colors[i];
            var item = document.createElement('div');
            var key = document.createElement('span');
            key.className = 'legend-key';
            key.style.backgroundColor = color;

            var value = document.createElement('span');
            value.innerHTML = layer;
            value.className = 'legend-value';
            item.appendChild(key);
            item.appendChild(value);
            legend.appendChild(item);
            legendBox.appendChild(legend);
        }
        legend.style.display = 'none';
    }

    function addLegendCircle(indicator, layers, radius, color) {
        let legendBox = document.getElementById('legend-box');
        var infoButton = document.createElement('button');
        infoButton.className = "infobtn";
        infoButton.onclick = function () {showInfo(indicator)};
        var closeButton = document.createElement('button');
        closeButton.className = "closebtn";
        closeButton.onclick = function () {showLayer(indicator)};
        var legend = document.createElement('div');
        legend.appendChild(closeButton);
        legend.appendChild(infoButton);
        legend.className = "legend shadow-sm p-3 my-2 bg-white";
        legend.setAttribute('id', "legend-"+indicator);
        var title = document.createElement('div');
        title.className = "title-legend mb-3 mt-3";
        title.innerHTML = indicator;
        legend.appendChild(title)

        for (let i = 0;  i < layers.length; i++) {
            var layer = layers[i];
            var color = color;
            var diam = radius[i]*2;
            var item = document.createElement('div');
            item.className = "row"
            var col1 = document.createElement('div');
            col1.className = "col d-flex justify-content-center"
            var key = document.createElement('div');
            key.className = 'legend-circle';
            key.style.backgroundColor = color;

            key.style.height = diam+"px";
            key.style.width = diam+"px";

            var col2 = document.createElement('div');
            col2.className = "col d-flex align-items-center";
            var value = document.createElement('div');
            value.innerHTML = layer;
            value.className = 'legend-value';
            item.appendChild(col1);
            col1.appendChild(key);
            item.appendChild(col2);
            col2.appendChild(value);
            legend.appendChild(item);
            legendBox.appendChild(legend);
        }
        legend.style.display = 'none';
    }

    function addLegendEquipement(indicator, equipementID, color) {
        let legendBox = document.getElementById('legend-box');
        var infoButton = document.createElement('button');
        infoButton.className = "infobtn";
        infoButton.onclick = function () {showInfo(equipementID)};
        var closeButton = document.createElement('button');
        closeButton.className = "closebtn";
        closeButton.onclick = function () {showLayer(equipementID)};
        var legend = document.createElement('div');
        legend.appendChild(closeButton);
        legend.appendChild(infoButton);
        legend.className = "legend shadow-sm p-3 my-2 bg-white";
        var legendID = "legend-"+equipementID;
        legend.setAttribute('id', legendID);

        var item = document.createElement('div');
        item.className = "row inline mt-2"
        var col1 = document.createElement('div');
        col1.className = "col-2 d-flex align-items-center"
        var key = document.createElement('img');

        key.src = color;
        key.style.height = "10px";

        var col2 = document.createElement('div');
        col2.className = "col-10 d-flex align-items-center";
        var value = document.createElement('div');
        value.innerHTML = indicator;
        value.className = 'title-legend mb-3 mt-3';
        item.appendChild(col1);
        col1.appendChild(key);
        item.appendChild(col2);
        col2.appendChild(value);
        legend.appendChild(item);
        legendBox.appendChild(legend);

        legend.style.display = 'none';
    }

    function addLegendSymbol(indicator, marker) {

        let legendBox = document.getElementById('legend-box');
        var infoButton = document.createElement('button');
        infoButton.className = "infobtn";
        infoButton.onclick = function () {showInfo(indicator)};
        var closeButton = document.createElement('button');
        closeButton.className = "closebtn";
        closeButton.onclick = function () {showLayer(indicator)};
        var legend = document.createElement('div');
        legend.appendChild(closeButton);
        legend.appendChild(infoButton);
        legend.className = "legend shadow-sm p-3 my-2 bg-white";
        legend.setAttribute('id', "legend-"+indicator);

        var color = color;
        var item = document.createElement('div');
        item.className = "row inline mt-2"
        var col1 = document.createElement('div');
        col1.className = "col-2 d-flex justify-content-center align-items-center"
        var key = document.createElement('img');
        item.appendChild(col1);
        col1.appendChild(key);
        key.src = marker;
        key.style.height = "20px";

        var col2 = document.createElement('div');
        col2.className = "col-10 d-flex align-items-center";
        var value = document.createElement('div');
        value.innerHTML = indicator;
        value.className = 'title-legend mb-3 mt-3';

        item.appendChild(col2);
        col2.appendChild(value);
        legend.appendChild(item);
        legendBox.appendChild(legend);

        legend.style.display = 'none';
    }

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
              map.addImage(`${icone}`, image);}
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

        // mapbox sources
        map.addSource('cadrage', {
            'type': 'vector',
            'url': 'mapbox://liviaribeiro.0coathhb'
        });
        map.addSource('zonage rural', {
            'type': 'vector',
            'url': 'mapbox://liviaribeiro.3u0ajjj4'
        });
        map.addSource('zonage urbain', {
            'type': 'vector',
            'url': 'mapbox://liviaribeiro.bumheafq'
        });
        map.addSource('qp', {
            'type': 'vector',
            'url': 'mapbox://liviaribeiro.82f38xhh'
        });
        map.addSource('commune_entreprises', {
                'type': 'vector',
                'url': 'mapbox://liviaribeiro.de06dydj'
        });
        map.addSource('region_entreprises', {
                'type': 'vector',
                'url': 'mapbox://liviaribeiro.79o9xcfa'
        });
        map.addSource('departement_entreprises', {
                'type': 'vector',
                'url': 'mapbox://liviaribeiro.659hkczd'
        });
        map.addSource('emploi_departement', {
                'type': 'vector',
                'url': 'mapbox://liviaribeiro.4nizq0zw'
        });
        map.addSource('emploi_region', {
                'type': 'vector',
                'url': 'mapbox://liviaribeiro.8tssesir'
        });
        map.addSource('emploi_ze', {
                'type': 'vector',
                'url': 'mapbox://liviaribeiro.9xpxb1vj'
        });
        map.addSource('depenses_region', {
                'type': 'vector',
                'url': 'mapbox://liviaribeiro.16wk8z7f'
        });
        map.addSource('depenses_departement', {
                'type': 'vector',
                'url': 'mapbox://liviaribeiro.7plleqb0'
        });
        map.addSource('depenses_epci', {
                'type': 'vector',
                'url': 'mapbox://liviaribeiro.74bpft4j'
        });
        map.addSource('depenses_commune', {
                'type': 'vector',
                'url': 'mapbox://liviaribeiro.bt8usf8p'
        });
        map.addSource('depenses_ministere_region', {
                'type': 'vector',
                'url': 'mapbox://liviaribeiro.3idctvsj'
        });
        map.addSource('depenses_ministere_departement', {
                'type': 'vector',
                'url': 'mapbox://liviaribeiro.de256tad'
        });
        map.addSource('aav', {
                'type': 'vector',
                'url': 'mapbox://liviaribeiro.06v2dhl5'
        });
        map.addSource('population', {
            'type': 'vector',
            'url': 'mapbox://liviaribeiro.1n6485zf'
        });
        map.addSource('acv', {
            'type': 'vector',
            'url': 'mapbox://liviaribeiro.8msgii19',
        });
        map.addSource('pdr', {
                'type': 'vector',
                'url': 'mapbox://liviaribeiro.2kyv2902'
        });

        const elementVariables = document.getElementById('data-variables')
        let dataVariables = elementVariables.dataset.variables
        dataVariables = dataVariables.replace(/'nom'/g,`"nom"`)
        dataVariables = dataVariables.replace(/'definition'/g,`"definition"`)
        dataVariables = dataVariables.replace(/'source'/g,`"source"`)
        dataVariables = dataVariables.replace(/'year'/g,`"year"`)
        dataVariables = dataVariables.replace(/: '/g,`: "`)
        dataVariables = dataVariables.replace(/', "/g,`", "`)
        dataVariables = dataVariables.replace(/'}, {"/g,`"}, {"`)
        dataVariables = dataVariables.replace(/'}]/g,`"}]`)

        dataVariables = JSON.parse(dataVariables);

        dataVariables.forEach((dataVariable) => {

            var indicator = dataVariable.nom;

            if (indicator == "Indice de jeunesse") {

                var layers = ['0 à 50', '50 à 80', '80 à 100', '100 à 150', 'plus de 150'];
                var colors = ['#eff3ff', '#bdd7e7', '#6baed6', '#3182bd', '#08519c'];

                addLegend(indicator, layers, colors);
                addInfo(indicator, dataVariable.nom, dataVariable.definition, dataVariable.source, dataVariable.year);

                map.addLayer(
                    {
                        'id': indicator,
                        'source': 'cadrage',
                        'source-layer': 'COMMUNE_CADRAGE_SIMPLIFIED-9qvj2o',
                        'type': 'fill',
                        'paint': {
                            'fill-color': [
                                "step",
                                ["get", "INDICEJEUNESSE17"],
                                "#ffffff",
                                0,
                                "#eff3ff",
                                50,
                                "#bdd7e7",
                                80,
                                "#6baed6",
                                100,
                                "#3182bd",
                                150,
                                "#08519c",
                                ],
                            'fill-opacity': 0.75,

                        },
                        'layout': {
                            // make layer not visible by default
                            'visibility': 'none'
                        }
                    }
                );

                map.on('click', indicator, function (e) {
                    if (e.features.length > 0) {
                        indice = e.features[0].properties.INDICEJEUNESSE17
                        if (indice == -1) {
                            indice = "Données non disponibles"
                        }
                        else {
                            indice = indice.toFixed(0)
                        }
                        popup.setLngLat(e.lngLat)
                            .setHTML('<p>'+e.features[0].properties.NOM_COM+'</p><p>Indice de jeunesse : '
                                +indice+ '</p>')
                            .addTo(map);
                        }
                });
            }

            if (indicator == "Densité de la population") {
                var layers = ['0 à 50 habitants/km²', '50 à 100 habitants/km²', '100 à 1 000 habitants/km²', '1 000 à 1 0000 habitants/km²', 'plus de 10 000 habitants/km²', 'données non disponibles'];
                var colors = ['#eff3ff', '#bdd7e7', '#6baed6', '#3182bd', '#08519c', "#d9d9d9"];

                addLegend(indicator, layers, colors);
                addInfo(indicator,dataVariable.nom, dataVariable.definition, dataVariable.source, dataVariable.year);

                map.addLayer(
                    {
                        'id': indicator,
                        'source': 'cadrage',
                        'source-layer': 'COMMUNE_CADRAGE_SIMPLIFIED-9qvj2o',
                        'type': 'fill',
                        'paint': {
                            'fill-color': [
                                "step",
                                ["get", "DENSITE17"],
                                "#d9d9d9",
                                0,
                                "#eff3ff",
                                50,
                                "#bdd7e7",
                                100,
                                "#6baed6",
                                1000,
                                "#3182bd",
                                10000,
                                "#08519c"
                                ],
                            'fill-opacity': 0.75,
                        },
                        'layout': {
                            // make layer not visible by default
                            'visibility': 'none'
                        }
                    }
                );

                map.on('click', indicator, function (e) {
                    if (e.features.length > 0) {
                        densite = e.features[0].properties.DENSITE17
                        if (densite == -1) {
                            densite = "Données non disponibles"
                        }
                        else {
                            densite = formatNumber(densite.toFixed(0))+' habitants/km² '
                        }
                        popup.setLngLat(e.lngLat)
                            .setHTML('<p>'+e.features[0].properties.NOM_COM+'</p><p>'
                                +densite+' </p>')
                            .addTo(map);
                        }
                });
            }

            if (indicator == "Taux de pauvreté") {
                var layers = ['0 à 9%', '9 à 14%', '14 à 20%', '20 à 29%', 'plus de 29%', 'données non disponibles'];
                var colors = ['#eff3ff', '#bdd7e7', '#6baed6', '#3182bd', '#08519c', "#d9d9d9"];

                addLegend(indicator, layers, colors);
                addInfo(indicator, dataVariable.nom, dataVariable.definition, dataVariable.source, dataVariable.year);

                map.addLayer(
                    {
                        'id': indicator,
                        'source': 'cadrage',
                        'source-layer': 'COMMUNE_CADRAGE_SIMPLIFIED-9qvj2o',
                        'type': 'fill',
                        'paint': {
                            'fill-color': [
                                "step",
                                ["get", "TAUXPAUVRETE17"],
                                "#d9d9d9",
                                0,
                                "#eff3ff",
                                9,
                                "#bdd7e7",
                                14,
                                "#6baed6",
                                20,
                                "#3182bd",
                                29,
                                "#08519c"
                                ],
                            'fill-opacity': 0.75,

                        },
                        'layout': {
                            // make layer not visible by default
                            'visibility': 'none'
                        }
                    }
                );

                map.on('click', indicator, function (e) {
                    if (e.features.length > 0) {
                        tauxpauvrete = e.features[0].properties.TAUXPAUVRETE17
                        if (tauxpauvrete == -1) {
                            tauxpauvrete = "Données non disponibles"
                        }
                        else {
                            tauxpauvrete = formatNumber(tauxpauvrete) + '%'
                        }
                        popup.setLngLat(e.lngLat)
                            .setHTML('<p>'+e.features[0].properties.NOM_COM+'</p><p>'
                                +tauxpauvrete+' </p>')
                            .addTo(map);
                        }
                });
            }

            if (indicator == "Évolution de la population") {
                var layers = ['Croissance totale', 'Croissance liée à un solde naturel positif', 'Croissance liée à un solde migratoire apparent positif', 'Décroissance liée à un solde naturel négatif', 'Décroissance liée à un solde migratoire apparent négatif', 'Décroissance totale'];
                var colors = ['#b2182b', '#ef8a62', '#fddbc7', '#d1e5f0', '#67a9cf','#2166ac'];

                addLegend(indicator, layers, colors);
                addInfo(indicator, dataVariable.nom, dataVariable.definition, dataVariable.source, dataVariable.year);

                map.addLayer(
                    {
                        'id': indicator,
                        'source': 'cadrage',
                        'source-layer': 'COMMUNE_CADRAGE_SIMPLIFIED-9qvj2o',
                        'type': 'fill',
                        'paint': {
                            'fill-color': [
                                "step",
                                [
                                    "get",
                                    "TYPOLOGIECODE"
                                ],
                                "#d9d9d9",
                                1,
                                "#b2182b",
                                2,
                                "#ef8a62",
                                3,
                                "#fddbc7",
                                4,
                                "#d1e5f0",
                                5,
                                "#67a9cf",
                                6,
                                "#2166ac"
                                ],
                                'fill-opacity': 0.75,
                        },
                        'layout': {
                            // make layer not visible by default
                            'visibility': 'none'
                        }
                    }
                );

                map.on('click', indicator, function (e) {
                    if (e.features.length > 0) {
                        popup.setLngLat(e.lngLat)
                            .setHTML('<p>'+e.features[0].properties.NOM_COM+'</p><p>'
                                +(e.features[0].properties.TYPOLOGIE)+'</p>')
                            .addTo(map);
                        }
                });
            }

            if (indicator == "Niveau de vie médian") {
                var layers = ['0 à 20 000 €', '20 000 à 24 000 €', '24 000 à 28 000 €', '28 000 à 34 0000 €', 'plus de 34 000 €', 'données non disponibles'];
                var colors = ['#eff3ff', '#bdd7e7', '#6baed6', '#3182bd', '#08519c', "#d9d9d9"];
                var indicator = "Niveau de vie médian";

                addLegend(indicator, layers, colors);
                addInfo(indicator, dataVariable.nom, dataVariable.definition, dataVariable.source, dataVariable.year);

                map.addLayer(
                    {
                        'id': indicator,
                        'source': 'cadrage',
                        'source-layer': 'COMMUNE_CADRAGE_SIMPLIFIED-9qvj2o',
                        'type': 'fill',
                        'paint': {
                            'fill-color': [
                                "step",
                                ["get", "NIVEAUDEVIE17"],
                                "#d9d9d9",
                                0,
                                "#eff3ff",
                                20000,
                                "#bdd7e7",
                                24000,
                                "#6baed6",
                                28000,
                                "#3182bd",
                                34000,
                                "#08519c"
                                ],
                            'fill-opacity': 0.75,

                        },
                        'layout': {
                            // make layer not visible by default
                            'visibility': 'none'
                        }
                    }
                );

                map.on('click', indicator, function (e) {
                    if (e.features.length > 0) {
                        niveaudevie = e.features[0].properties.NIVEAUDEVIE17
                        if (niveaudevie == -1) {
                            niveaudevie = "Données non disponibles"
                        }
                        else {
                            niveaudevie = formatNumber(niveaudevie) + ' euros'
                        }
                        popup.setLngLat(e.lngLat)
                            .setHTML('<p>'+e.features[0].properties.NOM_COM+'</p><p>'
                                +niveaudevie+' </p>')
                            .addTo(map);
                        }
                });
            }

            if (indicator == "Grille communale de densité") {
                var layers = ['Très dense', 'Densité intermediaire', 'Peu dense', 'Très peu dense'];
                var colors = ['#d01c8b', '#f1b6da', '#bae4b3', '#31a354'];

                addLegend(indicator, layers, colors);
                addInfo(indicator, dataVariable.nom, dataVariable.definition, dataVariable.source, dataVariable.year);

                //add zonage rural layer
                map.addLayer(
                    {
                        'id': indicator,
                        'source': 'zonage rural',
                        'source-layer': 'COMMUNE_CARTO_RURAL_SIMPLE-9f3llm',
                        'type': 'fill',
                        'paint': {
                            'fill-color':[
                                "step",
                                ["get", "ZONAGE_RURAL"],
                                "#d01c8b",
                                1.1,
                                "#f1b6da",
                                2.1,
                                '#bae4b3',
                                3.1,
                                "#31a354"
                                ],'fill-opacity': 0.75
                        },
                        'layout': {
                            // make layer visible by default
                            'visibility': 'none'
                        }
                    }
                );

                map.on('click', indicator, function (e) {
                    if (e.features.length > 0) {
                        popup.setLngLat(e.lngLat)
                            .setHTML('<p>'+e.features[0].properties.NOM_COM+'</p><p>'
                                +e.features[0].properties.ZONAGE_RURAL_NOM+' </p>')
                            .addTo(map);
                        }
                });
            }

            if (indicator == "Catégories du rural et de l’urbain") {
                var layers = ["rural sous forte influence d'un pôle", "rural sous faible influence d'un pôle", "rural autonome peu dense", "rural autonome très peu dense", "urbain dense", "urbain à densité intérmediaire"];
                var colors = ['#bae4b3', '#74c476', '#31a354', '#006d2c', '#d01c8b', '#f1b6da'];

                addLegend(indicator, layers, colors);
                addInfo(indicator, dataVariable.nom, dataVariable.definition, dataVariable.source, dataVariable.year);

                //add zonage rural layer
                map.addLayer(
                    {
                        'id': indicator,
                        'source': 'zonage urbain',
                        'source-layer': 'COMMUNE_CARTO_URBAIN_SIMPLE-cns1m3',
                        'type': 'fill',
                        'paint': {
                            'fill-color':[
                                "match",
                                ["get", "ZONAGE_URBAIN"],
                                ["rural sous forte influence d'un pôle"],
                                "#bae4b3",
                                ["rural sous faible influence d'un pôle"],
                                "#74c476",
                                ["rural autonome peu dense"],
                                "#31a354",
                                ["rural autonome très peu dense"],
                                "#006d2c",
                                ["urbain dense"],
                                "#d01c8b",
                                "#f1b6da",
                                ],'fill-opacity': 0.75
                        },
                        'layout': {
                            // make layer visible by default
                            'visibility': 'none'
                        }
                    }
                );

                map.on('click', indicator, function (e) {
                    if (e.features.length > 0) {
                        popup.setLngLat(e.lngLat)
                            .setHTML('<p>'+e.features[0].properties.NOM_COM+'</p><p>'
                                +e.features[0].properties.ZONAGE_URBAIN+' </p>')
                            .addTo(map);
                        }
                });
            }

            if (indicator == "Quartiers prioritaires de la politique de la ville") {
                var layers = ['quartier prioritaire de la politique de la ville'];
                var colors = ['#3182bd'];

                addLegend(indicator, layers, colors);
                addInfo(indicator, dataVariable.nom, dataVariable.definition, dataVariable.source, dataVariable.year);

                //add zonage quartiers prioritaires
                map.addLayer(
                    {
                        'id': indicator,
                        'source': 'qp',
                        'source-layer': 'QP',
                        'type': 'fill',
                        'paint': {
                            'fill-color': "#3182bd",
                            'fill-opacity': 0.75
                        },
                        'layout': {
                            // make layer visible by default
                            'visibility': 'none'
                        }
                    }
                );

                map.on('click', indicator, function (e) {
                    if (e.features.length > 0) {
                        popup.setLngLat(e.lngLat)
                            .setHTML('<p>'+e.features[0].properties.NOM_QP)
                            .addTo(map);
                        }
                });
            }

            if (indicator == "Entreprises culturelles du secteur marchand") {
                var layers = ['0', '0 à 2,5%', '2,5 à 5%', '5 à 7,5%', 'plus de 7,5%'];
                var colors = ['#fef0d9', '#fdcc8a', '#fc8d59', '#e34a33', '#b30000'];

                addLegend(indicator, layers, colors);
                addInfo(indicator, dataVariable.nom, dataVariable.definition, dataVariable.source, dataVariable.year);

                map.addLayer(
                    {
                        'id': 'Entreprises culturelles du secteur marchand régions',
                        'source': 'region_entreprises',
                        'source-layer': 'REGION_ENTREPRISE',
                        'type': 'fill',
                        'maxzoom': zoomThreshold,
                        'paint': {
                            'fill-color': [
                                "step",
                                ["get", "POURCENTAGEETABLISSEMENTS"],
                                "#fef0d9",
                                0.001,
                                "#fdcc8a",
                                0.025,
                                "#fc8d59",
                                0.05,
                                "#e34a33",
                                0.075,
                                "#b30000"
                                ],
                            'fill-opacity': 0.75,
                        },
                        'layout': {
                            // make layer not visible by default
                            'visibility': 'none'
                        }
                    }
                );

                map.on('click', 'Entreprises culturelles du secteur marchand régions', function (e) {
                    if (e.features.length > 0) {
                        pourcentage = e.features[0].properties.POURCENTAGEETABLISSEMENTS*100
                        nombre = e.features[0].properties.ETLABISSEMENTSCULTURE17
                        texte = '<p>'+e.features[0].properties.NOM_REG+"</p><p>Part d'entreprises culturelles du secteur marchand : "
                                +pourcentage.toFixed(0)+ "%</p><p>Nombre d'entreprises culturelles du secteur marchand : "+nombre+' </p>'
                        if (nombre == -1) {
                            texte = "Données non disponibles"
                        }
                        popup.setLngLat(e.lngLat)
                            .setHTML(texte)
                            .addTo(map);
                        }
                });

                map.addLayer(
                    {
                        'id': 'Entreprises culturelles du secteur marchand départements',
                        'source': 'departement_entreprises',
                        'source-layer': 'DEPARTEMENT_ENTREPRISE',
                        'type': 'fill',
                        'minzoom': zoomThreshold,
                        'maxzoom': zoomComThreshold,
                        'paint': {
                            'fill-color': [
                                "step",
                                ["get", "POURCENTAGEETABLISSEMENTS"],
                                "#fef0d9",
                                0.001,
                                "#fdcc8a",
                                0.025,
                                "#fc8d59",
                                0.05,
                                "#e34a33",
                                0.075,
                                "#b30000"
                                ],
                            'fill-opacity': 0.75,
                        },
                        'layout': {
                            // make layer not visible by default
                            'visibility': 'none'
                        }
                    }
                );

                map.on('click', 'Entreprises culturelles du secteur marchand départements', function (e) {
                    if (e.features.length > 0) {
                        pourcentage = e.features[0].properties.POURCENTAGEETABLISSEMENTS*100
                        nombre = e.features[0].properties.ETLABISSEMENTSCULTURE17
                        texte = '<p>'+e.features[0].properties.NOM_DEP+"</p><p>Part d'entreprises culturelles du secteur marchand : "
                                +pourcentage.toFixed(0)+ "%</p><p>Nombre d'entreprises culturelles du secteur marchand : "+nombre+' </p>'
                        if (nombre == -1) {
                            texte = "Données non disponibles"
                        }
                        popup.setLngLat(e.lngLat)
                            .setHTML(texte)
                            .addTo(map);
                        }
                });

                map.addLayer(
                    {
                        'id': 'Entreprises culturelles du secteur marchand',
                        'source': 'commune_entreprises',
                        'source-layer': 'COMMUNE_ENTREPRISE',
                        'type': 'fill',
                        'minzoom': zoomComThreshold,
                        'paint': {
                            'fill-color': [
                                "step",
                                ["get", "POURCENTAGEETABLISSEMENTS"],
                                "#fef0d9",
                                0.001,
                                "#fdcc8a",
                                0.025,
                                "#fc8d59",
                                0.05,
                                "#e34a33",
                                0.075,
                                "#b30000"
                                ],
                            'fill-opacity': 0.75,
                        },
                        'layout': {
                            // make layer not visible by default
                            'visibility': 'none'
                        }
                    }
                );

                map.on('click', 'Entreprises culturelles du secteur marchand', function (e) {
                    if (e.features.length > 0) {
                        pourcentage = e.features[0].properties.POURCENTAGEETABLISSEMENTS*100
                        nombre = e.features[0].properties.ETLABISSEMENTSCULTURE17
                        texte = '<p>'+e.features[0].properties.nom+"</p><p>Part d'entreprises culturelles du secteur marchand : "
                                +pourcentage.toFixed(0)+ "%</p><p>Nombre d'entreprises culturelles du secteur marchand : "+nombre+' </p>'
                        if (nombre == -1) {
                            texte = "Données non disponibles"
                        }
                        popup.setLngLat(e.lngLat)
                            .setHTML(texte)
                            .addTo(map);
                        }
                });
            }

            if (indicator == "Salariés actifs des secteurs culturels marchands") {
                var layers = ['0', '0 à 2,5%', '2,5 à 5%', '5 à 7,5%', 'plus de 7,5%'];
                var colors = ['#fef0d9', '#fdcc8a', '#fc8d59', '#e34a33', '#b30000'];

                addLegend(indicator, layers, colors);
                addInfo(indicator, dataVariable.nom, dataVariable.definition, dataVariable.source, dataVariable.year);

                map.addLayer(
                    {
                        'id': 'Salariés actifs des secteurs culturels marchands régions',
                        'source': 'region_entreprises',
                        'source-layer': 'REGION_ENTREPRISE',
                        'maxzoom': zoomThreshold,
                        'type': 'fill',
                        'paint': {
                            'fill-color': [
                                "step",
                                ["get", "POURCENTAGEEFFECTIFS"],
                                "#fef0d9",
                                0.001,
                                "#fdcc8a",
                                0.025,
                                "#fc8d59",
                                0.05,
                                "#e34a33",
                                0.075,
                                "#b30000"
                                ],
                            'fill-opacity': 0.75,
                        },
                        'layout': {
                            // make layer not visible by default
                            'visibility': 'none'
                        }
                    }
                );

                map.on('click', 'Salariés actifs des secteurs culturels marchands régions', function (e) {
                    if (e.features.length > 0) {
                        pourcentage = e.features[0].properties.POURCENTAGEEFFECTIFS*100
                        nombre = e.features[0].properties.EFFECTIFSCULTURE17
                        texte = '<p>'+e.features[0].properties.NOM_REG+'</p><p>Part de salariés actifs des secteurs culturels marchands : '
                                +pourcentage.toFixed(0)+ '%</p><p> Nombre de salariés actifs des secteurs culturels marchands : '+nombre+' </p>'
                        if (nombre == -1) {
                            texte = "Données non disponibles"
                        }
                        popup.setLngLat(e.lngLat)
                            .setHTML(texte)
                            .addTo(map);
                        }
                });

                map.addLayer(
                    {
                        'id': 'Salariés actifs des secteurs culturels marchands départements',
                        'source': 'departement_entreprises',
                        'source-layer': 'DEPARTEMENT_ENTREPRISE',
                        'minzoom': zoomThreshold,
                        'maxzoom': zoomComThreshold,
                        'type': 'fill',
                        'paint': {
                            'fill-color': [
                                "step",
                                ["get", "POURCENTAGEEFFECTIFS"],
                                "#fef0d9",
                                0.001,
                                "#fdcc8a",
                                0.025,
                                "#fc8d59",
                                0.05,
                                "#e34a33",
                                0.075,
                                "#b30000"
                                ],
                            'fill-opacity': 0.75,
                        },
                        'layout': {
                            // make layer not visible by default
                            'visibility': 'none'
                        }
                    }
                );

                map.on('click', 'Salariés actifs des secteurs culturels marchands départements', function (e) {
                    if (e.features.length > 0) {
                        pourcentage = e.features[0].properties.POURCENTAGEEFFECTIFS*100
                        nombre = e.features[0].properties.EFFECTIFSCULTURE17
                        texte = '<p>'+e.features[0].properties.NOM_DEP+'</p><p>Part de salariés actifs des secteurs culturels marchands : '
                                +pourcentage.toFixed(0)+ '%</p><p> Nombre de salariés actifs des secteurs culturels marchands : '+nombre+' </p>'
                        if (nombre == -1) {
                            texte = "Données non disponibles"
                        }
                        popup.setLngLat(e.lngLat)
                            .setHTML(texte)
                            .addTo(map);
                        }
                });

                map.addLayer(
                    {
                        'id': 'Salariés actifs des secteurs culturels marchands',
                        'source': 'commune_entreprises',
                        'source-layer': 'COMMUNE_ENTREPRISE',
                        'minzoom': zoomComThreshold,
                        'type': 'fill',
                        'paint': {
                            'fill-color': [
                                "step",
                                ["get", "POURCENTAGEEFFECTIFS"],
                                "#fef0d9",
                                0.001,
                                "#fdcc8a",
                                0.025,
                                "#fc8d59",
                                0.05,
                                "#e34a33",
                                0.075,
                                "#b30000"
                                ],
                            'fill-opacity': 0.75,
                        },
                        'layout': {
                            // make layer not visible by default
                            'visibility': 'none'
                        }
                    }
                );

                map.on('click', 'Salariés actifs des secteurs culturels marchands', function (e) {
                    if (e.features.length > 0) {
                        pourcentage = e.features[0].properties.POURCENTAGEEFFECTIFS*100
                        nombre = e.features[0].properties.EFFECTIFSCULTURE17
                        texte = '<p>'+e.features[0].properties.nom+'</p><p>Part de salariés actifs des secteurs culturels marchands : '
                                +pourcentage.toFixed(0)+ '%</p><p> Nombre de salariés actifs des secteurs culturels marchands : '+nombre+' </p>'
                        if (nombre == -1) {
                            texte = "Données non disponibles"
                        }
                        popup.setLngLat(e.lngLat)
                            .setHTML(texte)
                            .addTo(map);
                        }
                });
            }

            if (indicator == "Actifs exerçant une profession culturelle") {
                var layers = ['0 à 1%', '1 à 1,7%', '1,7% à 2%', '2% à 3,6%', 'plus de 3,6%'];
                var colors = ['#fef0d9', '#fdcc8a', '#fc8d59', '#e34a33', '#b30000'];

                addLegend(indicator, layers, colors);
                addInfo(indicator, dataVariable.name, dataVariable.definition, dataVariable.source,dataVariable.year);

                map.addLayer(
                    {
                        'id': 'Actifs exerçant une profession culturelle',
                        'source': 'emploi_departement',
                        'source-layer': 'EMPLOI_DEPARTEMENT',
                        'minzoom': zoomThreshold,
                        'maxzoom': zoomComThreshold-1,
                        'type': 'fill',
                        'paint': {
                            'fill-color': [
                                "step",
                                ["get", "part_profession_culturelle"],
                                "#fef0d9",
                                0.011,
                                "#fdcc8a",
                                0.017,
                                "#fc8d59",
                                0.020,
                                "#e34a33",
                                0.036,
                                "#b30000"
                                ],
                            'fill-opacity': 0.75,
                        },
                        'layout': {
                            // make layer not visible by default
                            'visibility': 'none'
                        }
                    }
                );

                map.on('click', 'Actifs exerçant une profession culturelle', function (e) {
                    if (e.features.length > 0) {
                        pourcentage = e.features[0].properties.part_profession_culturelle*100
                        nombre = e.features[0].properties.nombre_profession_culturelle
                        texte = '<p style="font-weight: bold;">'+e.features[0].properties.NOM_DEP+"</p><p>Part d'actifs exerçant une profession culturelle : "
                                +pourcentage.toFixed(0)+ "%</p><p>Nombre d'actifs exerçant une profession culturelle : "+formatNumber(Math.round( nombre / 10 ) * 10)+' </p>'
                        if (nombre == -1) {
                            texte = "Données non disponibles"
                        }
                        popup.setLngLat(e.lngLat)
                            .setHTML(texte)
                            .addTo(map);
                        }
                });

                map.addLayer(
                    {
                        'id': 'Actifs exerçant une profession culturelle région',
                        'source': 'emploi_region',
                        'source-layer': 'EMPLOI_REGION',
                        'maxzoom': zoomThreshold,
                        'type': 'fill',
                        'paint': {
                            'fill-color': [
                                "step",
                                ["get", "part_profession_culturelle"],
                                "#fef0d9",
                                0.011,
                                "#fdcc8a",
                                0.017,
                                "#fc8d59",
                                0.020,
                                "#e34a33",
                                0.036,
                                "#b30000"
                                ],
                            'fill-opacity': 0.75,
                        },
                        'layout': {
                            // make layer not visible by default
                            'visibility': 'none'
                        }
                    }
                );

                map.on('click', 'Actifs exerçant une profession culturelle région', function (e) {
                    if (e.features.length > 0) {
                        pourcentage = e.features[0].properties.part_profession_culturelle*100
                        nombre = e.features[0].properties.nombre_profession_culturelle
                        texte = '<p style="font-weight: bold;">'+e.features[0].properties.NOM_REG+"</p><p>Part d'actifs exerçant une profession culturelle : "
                                +pourcentage.toFixed(0)+ "%</p><p>Nombre d'actifs exerçant une profession culturelle : "+formatNumber(Math.round( nombre / 10 ) * 10)+' </p>'
                        if (nombre == -1) {
                            texte = "Données non disponibles"
                        }
                        popup.setLngLat(e.lngLat)
                            .setHTML(texte)
                            .addTo(map);
                        }
                });

                map.addLayer(
                    {
                        'id': 'Actifs exerçant une profession culturelle ZE',
                        'source': 'emploi_ze',
                        'source-layer': 'EMPLOI_ZE',
                        'minzoom': zoomComThreshold-1,
                        'type': 'fill',
                        'paint': {
                            'fill-color': [
                                "step",
                                ["get", "part_profession_culturelle"],
                                "#fef0d9",
                                0.011,
                                "#fdcc8a",
                                0.017,
                                "#fc8d59",
                                0.020,
                                "#e34a33",
                                0.036,
                                "#b30000"
                                ],
                            'fill-opacity': 0.75,
                        },
                        'layout': {
                            // make layer not visible by default
                            'visibility': 'none'
                        }
                    }
                );

                map.on('click', 'Actifs exerçant une profession culturelle ZE', function (e) {
                    if (e.features.length > 0) {
                        pourcentage = e.features[0].properties.part_profession_culturelle*100
                        nombre = e.features[0].properties.nombre_profession_culturelle
                        texte = '<p style="font-weight: bold;">'+"Zone d'emploi "+e.features[0].properties.libelle+"</p><p>Part d'actifs exerçant une profession culturelle : "
                                +pourcentage.toFixed(0)+ "%</p><p>Nombre d'actifs exerçant une profession culturelle : "+formatNumber(Math.round( nombre / 10 ) * 10)+' </p>'
                        if (nombre == -1) {
                            texte = "Données non disponibles"
                        }
                        popup.setLngLat(e.lngLat)
                            .setHTML(texte)
                            .addTo(map);
                        }
                });
            }
            if (indicator == "Actifs dans les secteurs culturels") {
                var layers = ['0 à 1%', '1 à 1,7%', '1,7% à 2%', '2% à 3,6%', 'plus de 3,6%'];
                var colors = ['#fef0d9', '#fdcc8a', '#fc8d59', '#e34a33', '#b30000'];

                addLegend(indicator, layers, colors);
                addInfo(indicator, dataVariable.nom, dataVariable.definition, dataVariable.source, dataVariable.year);

                map.addLayer(
                    {
                        'id': 'Actifs dans les secteurs culturels',
                        'source': 'emploi_departement',
                        'source-layer': 'EMPLOI_DEPARTEMENT',
                        'maxzoom': zoomComThreshold-1,
                        'minzoom': zoomThreshold,
                        'type': 'fill',
                        'paint': {
                            'fill-color': [
                                "step",
                                ["get", "part_secteur_culturel"],
                                "#fef0d9",
                                0.011,
                                "#fdcc8a",
                                0.017,
                                "#fc8d59",
                                0.020,
                                "#e34a33",
                                0.036,
                                "#b30000"
                                ],
                            'fill-opacity': 0.75,
                        },
                        'layout': {
                            // make layer not visible by default
                            'visibility': 'none'
                        }
                    }
                );

                map.on('click', 'Actifs dans les secteurs culturels', function (e) {
                    if (e.features.length > 0) {
                        pourcentage = e.features[0].properties.part_secteur_culturel*100
                        nombre = e.features[0].properties.nombre_secteur_culturel
                        texte = '<p style="font-weight: bold;">'+e.features[0].properties.NOM_DEP+"</p><p>Part d'actifs dans les secteurs culturels : "
                                +pourcentage.toFixed(0)+ "%</p><p>Nombre d'actifs dans les secteurs culturels : "+formatNumber(Math.round( nombre / 10 ) * 10)+' </p>'
                        if (nombre == -1) {
                            texte = "Données non disponibles"
                        }
                        popup.setLngLat(e.lngLat)
                            .setHTML(texte)
                            .addTo(map);
                        }
                });

                map.addLayer(
                    {
                        'id': 'Actifs dans les secteurs culturels région',
                        'source': 'emploi_region',
                        'source-layer': 'EMPLOI_REGION',
                        'maxzoom': zoomThreshold,
                        'type': 'fill',
                        'paint': {
                            'fill-color': [
                                "step",
                                ["get", "part_secteur_culturel"],
                                "#fef0d9",
                                0.011,
                                "#fdcc8a",
                                0.017,
                                "#fc8d59",
                                0.020,
                                "#e34a33",
                                0.036,
                                "#b30000"
                                ],
                            'fill-opacity': 0.75,
                        },
                        'layout': {
                            // make layer not visible by default
                            'visibility': 'none'
                        }
                    }
                );

                map.on('click', 'Actifs dans les secteurs culturels région', function (e) {
                    if (e.features.length > 0) {
                        pourcentage = e.features[0].properties.part_secteur_culturel*100
                        nombre = e.features[0].properties.nombre_secteur_culturel
                        texte = '<p style="font-weight: bold;">'+e.features[0].properties.NOM_REG+"</p><p>Part d'actifs dans les secteurs culturels : "
                                +pourcentage.toFixed(0)+ "%</p><p>Nombre d'actifs dans les secteurs culturels : "+formatNumber(Math.round( nombre / 10 ) * 10)+' </p>'
                        if (nombre == -1) {
                            texte = "Données non disponibles"
                        }
                        popup.setLngLat(e.lngLat)
                            .setHTML(texte)
                            .addTo(map);
                        }
                });

                map.addLayer(
                    {
                        'id': 'Actifs dans les secteurs culturels ZE',
                        'source': 'emploi_ze',
                        'source-layer': 'EMPLOI_ZE',
                        'minzoom': zoomComThreshold-1,
                        'type': 'fill',
                        'paint': {
                            'fill-color': [
                                "step",
                                ["get", "part_secteur_culturel"],
                                "#fef0d9",
                                0.011,
                                "#fdcc8a",
                                0.017,
                                "#fc8d59",
                                0.020,
                                "#e34a33",
                                0.036,
                                "#b30000"
                                ],
                            'fill-opacity': 0.75,
                        },
                        'layout': {
                            // make layer not visible by default
                            'visibility': 'none'
                        }
                    }
                );

                map.on('click', 'Actifs dans les secteurs culturels ZE', function (e) {
                    if (e.features.length > 0) {
                        pourcentage = e.features[0].properties.part_secteur_culturel*100
                        nombre = e.features[0].properties.nombre_secteur_culturel
                        texte = '<p style="font-weight: bold;">'+"Zone d'emploi "+e.features[0].properties.libelle+"</p><p>Part d'actifs dans les secteurs culturels : "
                                +pourcentage.toFixed(0)+ "%</p><p>Nombre d'actifs dans les secteurs culturels : "+formatNumber(Math.round( nombre / 10 ) * 10)+' </p>'
                        if (nombre == -1) {
                            texte = "Données non disponibles"
                        }
                        popup.setLngLat(e.lngLat)
                            .setHTML(texte)
                            .addTo(map);
                        }
                });
            }
            if (indicator == "Dépenses culturelles des régions") {
                var layers = ['0 à 9 €/habitant', '9 à 11 €/habitant', '11 à 14 €/habitant', '14 à 23 €/habitant', 'plus de 23 €/habitant', 'données non disponibles'];
                var colors = ['#edf8fb', '#b2e2e2', '#66c2a4', '#2ca25f', '#006d2c', "#d9d9d9"];

                addLegend(indicator, layers, colors);
                addInfo(indicator, dataVariable.nom, dataVariable.definition, dataVariable.source, dataVariable.year);

                map.addLayer(
                    {
                        'id': 'Dépenses culturelles des régions',
                        'source': 'depenses_region',
                        'source-layer': 'REGION_DEPENSES',
                        'type': 'fill',
                        'paint': {
                            'fill-color': [
                                "step",
                                ["get", "DEPENSESHABITANTS"],
                                "#d9d9d9",
                                0,
                                "#edf8fb",
                                9,
                                "#b2e2e2",
                                11,
                                "#66c2a4",
                                14,
                                "#2ca25f",
                                23,
                                "#006d2c"
                                ],
                            'fill-opacity': 0.75,
                        },
                        'layout': {
                            // make layer not visible by default
                            'visibility': 'none'
                        }
                    }
                );

                map.on('click', 'Dépenses culturelles des régions', function (e) {
                    if (e.features.length > 0) {
                        pourcentage = e.features[0].properties.DEPENSESHABITANTS
                        nombre = e.features[0].properties.DEPENSESTOTALES
                        texte = '<p style="font-weight: bold;">'+e.features[0].properties.NOM_REG+"</p><p>Dépenses publiques culturelles : "
                                +"<p>- "+formatNumber(nombre.toFixed(0))+" milliers d'euros</p><p>- "+pourcentage.toFixed(0)+" euros/habitant</p>"
                        if (nombre == -1) {
                            texte = "Données non disponibles"
                        }
                        popup.setLngLat(e.lngLat)
                            .setHTML(texte)
                            .addTo(map);
                        }
                });
            }

            if (indicator == "Dépenses culturelles des départements") {
                var layers = ['0 à 10 €/habitant', '10 à 13 €/habitant', '13 à 17 €/habitant', '17 à 22 €/habitant', 'plus de 22 €/habitant', 'données non disponibles'];
                var colors = ['#edf8fb', '#b2e2e2', '#66c2a4', '#2ca25f', '#006d2c', "#d9d9d9"];

                addLegend(indicator, layers, colors);
                addInfo(indicator, dataVariable.nom, dataVariable.definition, dataVariable.source, dataVariable.year);

                map.addLayer(
                    {
                        'id': indicator,
                        'source': 'depenses_departement',
                        'source-layer': 'DEPARTEMENT_DEPENSES',
                        'type': 'fill',
                        'paint': {
                            'fill-color': [
                                "step",
                                ["get", "DEPENSESHABITANTS"],
                                "#d9d9d9",
                                0,
                                "#edf8fb",
                                10,
                                "#b2e2e2",
                                13,
                                "#66c2a4",
                                17,
                                "#2ca25f",
                                22,
                                "#006d2c"
                                ],
                            'fill-opacity': 0.75,
                        },
                        'layout': {
                            // make layer not visible by default
                            'visibility': 'none'
                        }
                    }
                );

                map.on('click', indicator, function (e) {
                    if (e.features.length > 0) {
                        pourcentage = e.features[0].properties.DEPENSESHABITANTS
                        nombre = e.features[0].properties.DEPENSESTOTALES
                        texte = '<p style="font-weight: bold;">'+e.features[0].properties.NOM_DEP+"</p><p>Dépenses publiques culturelles : "
                                +"<p>- "+formatNumber(nombre.toFixed(0))+" milliers d'euros</p><p>- "+pourcentage.toFixed(0)+" euros/habitant</p>"
                        if (nombre == -1) {
                            texte = "Données non disponibles"
                        }
                        popup.setLngLat(e.lngLat)
                            .setHTML(texte)
                            .addTo(map);
                        }
                });
            }

            if (indicator == "Dépenses culturelles des intercommunalités") {
                var layers = ['0 à 5 €/habitant', '5 à 15 €/habitant', '15 à 30 €/habitant', '30 à 55 €/habitant', 'plus de 55 €/habitant', 'données non disponibles'];
                var colors = ['#edf8fb', '#b2e2e2', '#66c2a4', '#2ca25f', '#006d2c', "#d9d9d9"];

                addLegend(indicator, layers, colors);
                addInfo(indicator, dataVariable.nom, dataVariable.definition, dataVariable.source, dataVariable.year);

                map.addLayer(
                    {
                        'id': indicator,
                        'source': 'depenses_epci',
                        'source-layer': 'EPCI_DEPENSES',
                        'type': 'fill',
                        'paint': {
                            'fill-color': [
                                "step",
                                ["get", "DEPENSESHABITANTS"],
                                "#d9d9d9",
                                0,
                                "#edf8fb",
                                5,
                                "#b2e2e2",
                                15,
                                "#66c2a4",
                                30,
                                "#2ca25f",
                                55,
                                "#006d2c"
                                ],
                            'fill-opacity': 0.75,
                        },
                        'layout': {
                            // make layer not visible by default
                            'visibility': 'none'
                        }
                    }
                );

                map.on('click', indicator, function (e) {
                    if (e.features.length > 0) {
                        pourcentage = e.features[0].properties.DEPENSESHABITANTS
                        nombre = e.features[0].properties.DEPENSESTOTALES
                        texte = '<p style="font-weight: bold;">'+e.features[0].properties.NOM_EPCI+"</p><p>Dépenses publiques culturelles : "
                                +"<p>- "+formatNumber(nombre.toFixed(0))+" milliers d'euros</p><p>- "+pourcentage.toFixed(0)+" euros/habitant</p>"
                        if (nombre == -1) {
                            texte = '<p style="font-weight: bold;">'+e.features[0].properties.NOM_EPCI+"</p>Données non disponibles pour les intercommunalités de moins de 3 500 habitants"
                        }
                        popup.setLngLat(e.lngLat)
                            .setHTML(texte)
                            .addTo(map);
                        }
                });
            }

            if (indicator == "Dépenses culturelles des communes") {
                var layers = ['0 à 25 €/habitant', '25 à 55 €/habitant', '55 à 90 €/habitant', '90 à 140 €/habitant', 'plus de 140 €/habitant', 'données non disponibles'];
                var colors = ['#edf8fb', '#b2e2e2', '#66c2a4', '#2ca25f', '#006d2c', "#d9d9d9"];

                addLegend(indicator, layers, colors);
                addInfo(indicator, dataVariable.nom, dataVariable.definition, dataVariable.source, dataVariable.year);

                map.addLayer(
                    {
                        'id': 'Dépenses culturelles des communes',
                        'source': 'depenses_commune',
                        'source-layer': 'COMMUNE_DEPENSES',
                        'type': 'fill',
                        'paint': {
                            'fill-color': [
                                "step",
                                ["get", "DEPENSESHABITANTS"],
                                "#d9d9d9",
                                0,
                                "#edf8fb",
                                25,
                                "#b2e2e2",
                                55,
                                "#66c2a4",
                                90,
                                "#2ca25f",
                                140,
                                "#006d2c"
                                ],
                            'fill-opacity': 0.75,
                        },
                        'layout': {
                            // make layer not visible by default
                            'visibility': 'none'
                        }
                    }
                );

                map.on('click', 'Dépenses culturelles des communes', function (e) {
                    if (e.features.length > 0) {
                        pourcentage = e.features[0].properties.DEPENSESHABITANTS
                        nombre = e.features[0].properties.DEPENSESTOTALES
                        texte = '<p style="font-weight: bold;">'+e.features[0].properties.NOM_COM+"</p><p>Dépenses publiques culturelles : "
                                +"<p>- "+formatNumber(nombre.toFixed(0))+" milliers d'euros</p><p>- "+pourcentage.toFixed(0)+" euros/habitant</p>"
                        if (nombre == -1) {
                            texte = '<p style="font-weight: bold;">'+e.features[0].properties.NOM_COM+"</p>Données non disponibles pour les communes de moins de 3 500 habitants"
                        }
                        popup.setLngLat(e.lngLat)
                            .setHTML(texte)
                            .addTo(map);
                        }
                });
            }

            if (indicator == "Dépenses du ministère de la Culture") {
                var layers = ['0 à 35 €/habitant', '35 à 60 €/habitant', '60 à 90 €/habitant', '90 à 130 €/habitant', 'plus de 130 €/habitant', 'données non disponibles'];
                var colors = ['#edf8fb', '#b2e2e2', '#66c2a4', '#2ca25f', '#006d2c', "#d9d9d9"];

                addLegend(indicator, layers, colors);
                addInfo(indicator, dataVariable.nom, dataVariable.definition, dataVariable.source, dataVariable.year);

                map.addLayer(
                    {
                        'id': 'Dépenses du ministère de la Culture',
                        'source': 'depenses_ministere_region',
                        'source-layer': 'MINISTERE_REGION_DEPENSES',
                        'maxzoom': zoomThreshold,
                        'type': 'fill',
                        'paint': {
                            'fill-color': [
                                "step",
                                ["get", "DEPENSESHABITANTS"],
                                "#d9d9d9",
                                0,
                                "#edf8fb",
                                35,
                                "#b2e2e2",
                                60,
                                "#66c2a4",
                                90,
                                "#2ca25f",
                                130,
                                "#006d2c"
                                ],
                            'fill-opacity': 0.75,
                        },
                        'layout': {
                            // make layer not visible by default
                            'visibility': 'none'
                        }
                    }
                );

                map.on('click', 'Dépenses du ministère de la Culture', function (e) {
                    if (e.features.length > 0) {
                        pourcentage = e.features[0].properties.DEPENSESHABITANTS
                        nombre = e.features[0].properties.DEPENSESTOTALES
                        texte = '<p style="font-weight: bold;">'+e.features[0].properties.NOM_REG+"</p><p>Dépenses du ministère de la Culture : "
                                +"<p>- "+formatNumber(nombre.toFixed(0))+" euros</p><p>- "+pourcentage.toFixed(0)+" euros/habitant</p>"
                        if (nombre == -1) {
                            texte = "Données non disponibles"
                        }
                        popup.setLngLat(e.lngLat)
                            .setHTML(texte)
                            .addTo(map);
                        }
                });

                map.addLayer(
                    {
                        'id': 'Dépenses du ministère de la Culture Département',
                        'source': 'depenses_ministere_departement',
                        'source-layer': 'MINISTERE_DEPARTEMENT_DEPENSES',
                        'minzoom': zoomThreshold,
                        'type': 'fill',
                        'paint': {
                            'fill-color': [
                                "step",
                                ["get", "DEPENSESHABITANTS"],
                                "#d9d9d9",
                                0,
                                "#edf8fb",
                                35,
                                "#b2e2e2",
                                60,
                                "#66c2a4",
                                90,
                                "#2ca25f",
                                130,
                                "#006d2c"
                                ],
                            'fill-opacity': 0.75,
                        },
                        'layout': {
                            // make layer not visible by default
                            'visibility': 'none'
                        }
                    }
                );

                map.on('click', 'Dépenses du ministère de la Culture Département', function (e) {
                    if (e.features.length > 0) {
                        pourcentage = e.features[0].properties.DEPENSESHABITANTS
                        nombre = e.features[0].properties.DEPENSESTOTALES
                        texte = '<p style="font-weight: bold;">'+e.features[0].properties.NOM_DEP+"</p><p>Dépenses du ministère de la Culture : "
                                +"<p>- "+formatNumber(nombre.toFixed(0))+" milliers d'euros</p><p>- "+pourcentage.toFixed(0)+" euros/habitant</p>"
                        if (nombre == -1) {
                            texte = "Données non disponibles"
                        }
                        popup.setLngLat(e.lngLat)
                            .setHTML(texte)
                            .addTo(map);
                        }
                });
            }

            if (indicator == "Aires attraction des villes") {
                var layers = ['Aire de moins de 50 000 habitants', 'Aire de 50 000 à moins de 200 000 habitants', 'Aire de 200 000 à moins de 700 000 habitants', 'Aire de 700 000 habitants ou plus'];
                var colors = ['#fdb863', '#e66101', '#b2abd2', '#5e3c99'];
                var indicator = "Aires d'attraction des villes";

                addLegend(indicator, layers, colors);
                addInfo(indicator, dataVariable.nom, dataVariable.definition, dataVariable.source, dataVariable.year);

                map.addLayer({
                        'id': "Aires d'attraction des villes",
                        'type': 'symbol',
                        'source': 'aav',
                        'source-layer': 'AAV2020-8cjjsq',
                        'type': 'fill',
                        'paint': {
                            'fill-color': [
                                "match",
                                ["get", "TAAV2017"],
                                ["0"],
                                "#ffffff",
                                ["1"],
                                "#fdb863",
                                ["2"],
                                "#e66101",
                                ["3"],
                                "#b2abd2",
                                "#5e3c99",
                                ],
                            'fill-opacity': 0.75,
                        },
                        'layout': {
                                'visibility': 'none',
                            }
                });

                map.on('click', "Aires d'attraction des villes", function (e) {
                    if (e.features.length > 0) {
                        texte = e.features[0].properties.LIBAAV2020

                        popup.setLngLat(e.lngLat)
                            .setHTML(texte)
                            .addTo(map);
                        }
                });
            }

            if (indicator == "Population") {
                var layers = ['545 000 habitants', '2 180 000 habitants'];
                var radius = [10, 40]
                var color = 'rgba(107, 174, 214, 0.75)';

                addLegendCircle(indicator, layers, radius, color);
                addInfo(indicator, dataVariable.nom, dataVariable.definition, dataVariable.source,dataVariable.year);

                map.addLayer(
                    {
                    'id': 'Population',
                    'type': 'circle',
                    'source': 'population',
                    'source-layer': 'COMMUNE_CARTO_POINTS_CADRAGE-6p2apo',
                    'paint': {
                        'circle-radius': ['*', 40, ['/',['sqrt', ["get", "POPULATION"]],['sqrt', 2187526]]],
                        'circle-color': "#6baed6",
                        'circle-opacity': 0.75,
                        },
                        'layout': {
                            // make layer not visible by default
                            'visibility': 'none'
                        }
                });

                map.on('click', 'Population', function (e) {
                    if (e.features.length > 0) {
                        population = e.features[0].properties.POPULATION
                        if (population == -1) {
                            population = "Données non disponibles"
                        }
                        else {
                            population = formatNumber(population)
                        }
                        popup.setLngLat(e.lngLat)
                            .setHTML('<p>'+e.features[0].properties.NOM_COM+'</p><p>Population : '
                                +population+ '</p>')
                            .addTo(map);
                        }
                });
            }

            if (indicator == "Action coeur de ville") {
                let marker = 'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png';
                addLegendSymbol("Action coeur de ville", marker);
                addInfo(indicator, dataVariable.name, dataVariable.definition, dataVariable.source,dataVariable.year);

                map.addLayer({
                    'id': 'Action coeur de ville',
                    'type': 'symbol',
                    'source': 'acv',
                    'source-layer': 'COMMUNE_CARTO_POINTS_ACV-9a52rz',
                    'layout': {
                    'icon-image': "custom-marker",
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
            }

            if (indicator == "Plan de relance") {
                let marker = 'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png';
                addLegendSymbol("Plan de relance", marker);
                addInfo(indicator, dataVariable.name, dataVariable.definition, dataVariable.source,dataVariable.year);

                map.addLayer({
                        'id': "Plan de relance",
                        'type': 'symbol',
                        'source': 'pdr',
                        'source-layer': 'PDR',
                        'layout': {
                                'icon-image':
                                "custom-marker",
                                'icon-size': 0.5,
                                'visibility': 'none',
                                'icon-allow-overlap': true,
                            }
                });

                map.on('click', 'Plan de relance', function (e) {
                    var coordinates = e.features[0].geometry.coordinates.slice();
                    var name = e.features[0].properties.Lieu;
                    var adresse = e.features[0].properties.Adresse;
                    var montant = e.features[0].properties.Montant;
                    var enveloppe = e.features[0].properties.Enveloppe;
                    var operation = e.features[0].properties.Operation;

                    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                    }

                    popup.setLngLat(coordinates)
                        .setHTML('<p><b>'+name+'</b></p>'+
                        '<p>'+adresse+'</p>'+
                        '<p>Opération : '+operation+'</p>'+
                        '<p>Enveloppe du plan de relance : '+enveloppe+
                        '<p>Montant : '+formatNumber(montant)+' €</p>'
                    )
                    .addTo(map);
                });
            }

            map.on("mouseenter", indicator, () => {
                    map.getCanvas().style.cursor = "pointer";
                });
            map.on("mouseleave", indicator, () => {
                map.getCanvas().style.cursor = "";
            });
        })

        // {% for variable in variables %}


        // {% endfor %}

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

        //équipements
        // {% for domaine in domaines %}
        //     {% for equipement_type in domaine.equipementtype_set.all %}
        //     map.addSource('equipements'+'{{ equipement_type.pk }}', {
        //         'type': 'geojson',
        //         'data': "{% url 'equipements' equipement_type.pk %}",
        //     });

        //     var symbol = 'star_jauneclair';
        //     var img = '{% static 'star-of-life-solid_bleu-vert-fonce.png' %}';

        //    //Théâtres
        //     if ('{{equipement_type.name}}' == "Centre dramatique national"){
        //         symbol = 'theatre-violet';
        //         img = '{% static 'icones/theatre-violet.png' %}';
        //     }
        //     if ('{{equipement_type.name}}' == "Compagnie avec lieu"){
        //         symbol = 'theatre-rose-clair';
        //         img = '{% static 'icones/theatre-rose-clair.png' %}';
        //     }
        //     if ('{{equipement_type.name}}' == "Théâtre de ville"){
        //         symbol = 'theatre-rouge';
        //         img = '{% static 'icones/theatre-rouge.png' %}';
        //     }
        //     if ('{{equipement_type.name}}' == "Théâtre hors label"){
        //         symbol = 'theatre-orange';
        //         img = '{% static 'icones/theatre-orange.png' %}';
        //     }
        //     if ('{{equipement_type.name}}' == "Théâtre lyrique d’intérêt national"){
        //         symbol = 'theatre-jaune';
        //         img = '{% static 'icones/theatre-jaune.png' %}';
        //     }
        //     if ('{{equipement_type.name}}' == "Théâtre national"){
        //         symbol = 'theatre-vert';
        //         img = '{% static 'icones/theatre-vert.png' %}';
        //     }
        //     if ('{{equipement_type.name}}' == "Théâtre privé"){
        //         symbol = 'theatre-bleu';
        //         img = '{% static 'icones/theatre-bleu.png' %}';
        //     }
        //     //Opéra
        //     if ('{{equipement_type.name}}' == "Opéra national"){
        //         symbol = 'theatre-marron';
        //         img = '{% static 'icones/theatre-marron.png' %}';
        //     }
        //     if ('{{equipement_type.name}}' == "Opéra national en région"){
        //         symbol = 'theatre-noir';
        //         img = '{% static 'icones/theatre-noir.png' %}';
        //     }
        //     //Musique
        //     if ('{{equipement_type.name}}' == "Centre national de création musicale"){
        //         symbol = 'musique-rose-clair';
        //         img = '{% static 'icones/musique-rose-clair.png' %}';
        //     }
        //     if ('{{equipement_type.name}}' == "Scène"){
        //         symbol = 'musique-rouge';
        //         img = '{% static 'icones/musique-rouge.png' %}';
        //     }
        //     if ('{{equipement_type.name}}' == "Scène conventionnée d’intérêt national"){
        //         symbol = 'musique-orange';
        //         img = '{% static 'icones/musique-orange.png' %}';
        //     }
        //     if ('{{equipement_type.name}}' == "Scène de musiques actuelles"){
        //         symbol = 'musique-jaune';
        //         img = '{% static 'icones/musique-jaune.png' %}';
        //     }
        //     if ('{{equipement_type.name}}' == "Scène nationale"){
        //         symbol = 'musique-vert';
        //         img = '{% static 'icones/musique-vert.png' %}';
        //     }
        //     if ('{{equipement_type.name}}' == "Zénith"){
        //         symbol = 'musique-noir';
        //         img = '{% static 'icones/musique-bleu.png' %}';
        //     }
        //     //Patrimoine
        //     if ('{{equipement_type.name}}' == "Architecture contemporaine remarquable"){
        //         symbol = 'patrimoine-violet';
        //         img = '{% static 'icones/patrimoine-violet.png' %}';
        //     }
        //     if ('{{equipement_type.name}}' == "Centre culturel de rencontre"){
        //         symbol = 'patrimoine-rose';
        //         img = '{% static 'icones/patrimoine-rose.png' %}';
        //     }
        //     if ('{{equipement_type.name}}' == "Jardin remarquable"){
        //         symbol = 'patrimoine-rose-clair';
        //         img = '{% static 'icones/patrimoine-rose-clair.png' %}';
        //     }
        //     if ('{{equipement_type.name}}' == "Lieu archéologique"){
        //         symbol = 'patrimoine-rouge';
        //         img = '{% static 'icones/patrimoine-rouge.png' %}';
        //     }
        //     if ('{{equipement_type.name}}' == "Maison des Illustres"){
        //         symbol = 'patrimoine-orange';
        //         img = '{% static 'icones/patrimoine-orange.png' %}';
        //     }
        //     if ('{{equipement_type.name}}' == "Micro-folie"){
        //         symbol = 'patrimoine-jaune';
        //         img = '{% static 'icones/patrimoine-jaune.png' %}';
        //     }
        //     if ('{{equipement_type.name}}' == "Monument historique"){
        //         symbol = 'patrimoine-vert';
        //         img = '{% static 'icones/patrimoine-vert.png' %}';
        //     }
        //     if ('{{equipement_type.name}}' == "Monument national"){
        //         symbol = 'patrimoine-bleu';
        //         img = '{% static 'icones/patrimoine-bleu.png' %}';
        //     }
        //     if ('{{equipement_type.name}}' == "Musée de France"){
        //         symbol = 'patrimoine-noir';
        //         img = '{% static 'icones/patrimoine-noir.png' %}';
        //     }
        //     if ('{{equipement_type.name}}' == "Patrimoine mondial Unesco"){
        //         symbol = 'patrimoine-marron';
        //         img = '{% static 'icones/patrimoine-marron.png' %}';
        //     }
        //     //Archives
        //     if ('{{equipement_type.name}}' == "Archives communales"){
        //         symbol = 'archives-orange';
        //         img = '{% static 'icones/archives-orange.png' %}';
        //     }
        //     if ('{{equipement_type.name}}' == "Archives départementales"){
        //         symbol = 'archives-jaune';
        //         img = '{% static 'icones/archives-jaune.png' %}';
        //     }
        //     if ('{{equipement_type.name}}' == "Archives régionales"){
        //         symbol = 'archives-vert';
        //         img = '{% static 'icones/archives-vert.png' %}';
        //     }
        //     if ('{{equipement_type.name}}' == "Archives nationales"){
        //         symbol = 'archives-bleu';
        //         img = '{% static 'icones/archives-bleu.png' %}';
        //     }
        //     //Cinéma
        //     if ('{{equipement_type.name}}' == "Art et essai"){
        //         symbol = 'cinema-bleu';
        //         img = '{% static 'icones/cinema-bleu.png' %}';
        //     }
        //     if ('{{equipement_type.name}}' == "Cinéma"){
        //         symbol = 'cinema-vert';
        //         img = '{% static 'icones/cinema-vert.png' %}';
        //     }
        //     //Arts visuels
        //     if ('{{equipement_type.name}}' == "Centre d’art contemporain d’intérêt national"){
        //         symbol = 'arts-rouge';
        //         img = '{% static 'icones/arts-bleu.png' %}';
        //     }
        //     if ('{{equipement_type.name}}' == "Fonds régional d’art contemporain"){
        //         symbol = 'arts-vert';
        //         img = '{% static 'icones/arts-vert.png' %}';
        //     }
        //     //Cirque
        //     if ('{{equipement_type.name}}' == "Centre national des arts de la rue et de l’espace public"){
        //         symbol = 'cirque-vert';
        //         img = '{% static 'icones/cirque-vert.png' %}';
        //     }
        //     if ('{{equipement_type.name}}' == "Pôle national du cirque"){
        //         symbol = 'cirque-bleu';
        //         img = '{% static 'icones/cirque-bleu.png' %}';
        //     }
        //     //Danse
        //     if ('{{equipement_type.name}}' == "Centre chorégraphique national"){
        //         symbol = 'danse-vert';
        //         img = '{% static 'icones/danse-vert.png' %}';
        //     }
        //     if ('{{equipement_type.name}}' == "Centre de développement chorégraphique national"){
        //         symbol = 'danse-bleu';
        //         img = '{% static 'icones/danse-bleu.png' %}';
        //     }
        //     //Éducation, formation
        //     if ('{{equipement_type.name}}' == "Conservatoire"){
        //         symbol = 'edu-vert';
        //         img = '{% static 'icones/edu-vert.png' %}';
        //     }
        //     if ('{{equipement_type.name}}' == "Établissement d’enseignement supérieur"){
        //         symbol = 'edu-bleu';
        //         img = '{% static 'icones/edu-bleu.png' %}';
        //     }
        //     //Livre, lecture et presse
        //     if ('{{equipement_type.name}}' == "Bibliothèque"){
        //         symbol = 'livre-jaune';
        //         img = '{% static 'icones/livre-jaune.png' %}';
        //     }
        //     if ('{{equipement_type.name}}' == "LIR - Librairie indépendante de référence"){
        //         symbol = 'livre-vert';
        //         img = '{% static 'icones/livre-vert.png' %}';
        //     }
        //     if ('{{equipement_type.name}}' == "LR - Librairie de référence"){
        //         symbol = 'livre-bleu';
        //         img = '{% static 'icones/livre-bleu.png' %}';
        //     }

        //     map.addLayer({
        //         'id': '{{ equipement_type.pk}}',
        //         'type': 'symbol',
        //         'source': 'equipements'+'{{ equipement_type.pk }}',
        //         'layout': {
        //             'icon-image': symbol,
        //             'icon-size': {stops: [[6, 0.25], [9, 0.25], [16, 0.75]]},
        //             'icon-allow-overlap': true,
        //             'visibility': 'none',
        //             },
        //     });

        //     var circleColor = '#074382';

        //     addInfo('{{ equipement_type.name }}', '{{ equipement_type.pk }}', '{{ equipement_type.definition }}', '{{ equipement_type.source }}', '{{ equipement_type.year }}');
        //     addLegendEquipement('{{ equipement_type.name }}', '{{ equipement_type.pk }}', img);

        //     map.on('click', '{{ equipement_type.pk }}', function (e) {
        //         var coordinates = e.features[0].geometry.coordinates.slice();
        //         var name = e.features[0].properties.nom;
        //         var adresse = e.features[0].properties.adresse;
        //         var typology = '{{ equipement_type.name }}';

        //         while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        //             coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        //         }
        //         new mapboxgl.Popup()
        //             .setLngLat(coordinates)
        //             .setHTML('<p><i>'+typology+'</i></p>'+
        //             '<p><b>'+name+'</b></p>'+
        //             '<p>'+adresse+'</p>'
        //         )
        //         .addTo(map);
        //     });

        //     map.on("mouseenter", '{{ equipement_type.pk }}', () => {
        //         map.getCanvas().style.cursor = "pointer";
        //     });
        //     map.on("mouseleave", '{{ equipement_type.pk }}', () => {
        //         map.getCanvas().style.cursor = "";
        //         });
        //     {% endfor %}
        // {% endfor %}

    });

    showLayer(layer,map=map);
}
window.buildMap = buildMap
export { buildMap }
