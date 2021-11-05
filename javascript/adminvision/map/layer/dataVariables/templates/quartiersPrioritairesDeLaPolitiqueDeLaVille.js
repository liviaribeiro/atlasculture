const quartiersPrioritairesDeLaPolitiqueDeLaVille = (indicator,dataVariable) => {
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
}

export { quartiersPrioritairesDeLaPolitiqueDeLaVille }
