const grilleCommunaleDeDensite = (indicator,dataVariable) => {
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
}

export { grilleCommunaleDeDensite }
