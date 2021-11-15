const population = (indicator,dataVariable) => {
    if (indicator == "Population") {
      var layers = ['545 000 habitants', '2 180 000 habitants'];
      var radius = [10, 40]
      var color = 'rgba(107, 174, 214, 0.75)';

      addLegendCircle(indicator, layers, radius, color);
      addInfo(indicator, dataVariable.nom, dataVariable.definition, dataVariable.source__nom,dataVariable.year);

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
}

export { population }
