const indiceDeJeunesse = (indicator,dataVariable) => {
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
              let indice = e.features[0].properties.INDICEJEUNESSE17
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


}

export { indiceDeJeunesse }