const depensesCulturellesDesRegion = (indicator,dataVariable) => {
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
              let pourcentage = e.features[0].properties.DEPENSESHABITANTS
              let nombre = e.features[0].properties.DEPENSESTOTALES
              let texte = '<p style="font-weight: bold;">'+e.features[0].properties.NOM_REG+"</p><p>Dépenses publiques culturelles : "
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
}
export { depensesCulturellesDesRegion }
