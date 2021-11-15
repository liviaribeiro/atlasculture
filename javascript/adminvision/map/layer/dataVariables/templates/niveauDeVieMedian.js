const niveauDeVieMedian = (indicator,dataVariable) => {
    if (indicator == "Niveau de vie médian") {
      var layers = ['0 à 20 000 €', '20 000 à 24 000 €', '24 000 à 28 000 €', '28 000 à 34 0000 €', 'plus de 34 000 €', 'données non disponibles'];
      var colors = ['#eff3ff', '#bdd7e7', '#6baed6', '#3182bd', '#08519c', "#d9d9d9"];
      var indicator = "Niveau de vie médian";

      addLegend(indicator, layers, colors);
      addInfo(indicator, dataVariable.nom, dataVariable.definition, dataVariable.source__nom, dataVariable.year);

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
              let niveaudevie = e.features[0].properties.NIVEAUDEVIE17
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
}

export { niveauDeVieMedian }
