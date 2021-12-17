const partDesCadres = (indicator,dataVariable) => {
    if (indicator == "Part des cadres et professions intellectuelles supérieures") {
        var layers = ['0 à 1', '1 à 5', '5 à 10', '10 à 20', '20 à 100', 'Données non disponibles'];
        var colors = ['#eff3ff', '#bdd7e7', '#6baed6', '#3182bd', '#08519c', '#d9d9d9'];
  
        addLegend(indicator, layers, colors);
        addInfo(indicator, dataVariable.nom, dataVariable.definition, dataVariable.source__nom, dataVariable.year);
  
        map.addLayer(
            {
                'id': 'Part des cadres et professions intellectuelles supérieures',
                'source': 'part_des_cadres',
                'source-layer': 'COMMUNE_CARTO_PART_DES_CADRES-3htpl8',
                'type': 'fill',
                'paint': {
                    'fill-color': [
                        "step",
                        ["get", "PARTDESCADRES"],
                        "#d9d9d9",
                        0,
                        "#eff3ff",
                        1,
                        "#bdd7e7",
                        5,
                        "#6baed6",
                        10,
                        "#3182bd",
                        20,
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
  
        map.on('click', 'Part des cadres et professions intellectuelles supérieures', function (e) {
            if (e.features.length > 0) {
                let pourcentage = e.features[0].properties.PARTDESCADRES
                let texte = '<p>'+e.features[0].properties.NOM_COM+"</p><p>Part des cadres et professions intellectuelles supérieures dans la population : "+pourcentage
                if (pourcentage == -1) {
                    texte = "<p>Données non disponibles</p>"
                }
                popup.setLngLat(e.lngLat)
                    .setHTML(texte)
                    .addTo(map);
                }
        });
  
    }
  }
  
  export { partDesCadres }
  