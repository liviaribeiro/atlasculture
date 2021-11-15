const tauxDePauvrete = (indicator,dataVariable) => {
    if (indicator == "Taux de pauvreté") {
      var layers = ['0 à 9%', '9 à 14%', '14 à 20%', '20 à 29%', 'plus de 29%', 'données non disponibles'];
      var colors = ['#eff3ff', '#bdd7e7', '#6baed6', '#3182bd', '#08519c', "#d9d9d9"];

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
}

export { tauxDePauvrete }
