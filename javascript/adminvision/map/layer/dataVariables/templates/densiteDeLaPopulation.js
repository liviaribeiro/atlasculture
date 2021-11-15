const densiteDeLaPopulation = (indicator,dataVariable) => {
    if (indicator == "Densité de la population") {
      var layers = ['0 à 50 habitants/km²', '50 à 100 habitants/km²', '100 à 1 000 habitants/km²', '1 000 à 1 0000 habitants/km²', 'plus de 10 000 habitants/km²', 'données non disponibles'];
      var colors = ['#eff3ff', '#bdd7e7', '#6baed6', '#3182bd', '#08519c', "#d9d9d9"];

      // addLegend(indicator, layers, colors);
      // addInfo(indicator,dataVariable.nom, dataVariable.definition, dataVariable.source, dataVariable.year);

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
}

export { densiteDeLaPopulation }
