const evolutionDeLaPopulation = (indicator,dataVariable) => {
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
}

export { evolutionDeLaPopulation }
