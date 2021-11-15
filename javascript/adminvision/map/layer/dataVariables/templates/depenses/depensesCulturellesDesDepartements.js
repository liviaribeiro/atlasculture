const depensesCulturellesDesDepartements = (indicator,dataVariable) => {
    if (indicator == "Dépenses culturelles des départements") {
      var layers = ['0 à 10 €/habitant', '10 à 13 €/habitant', '13 à 17 €/habitant', '17 à 22 €/habitant', 'plus de 22 €/habitant', 'données non disponibles'];
      var colors = ['#edf8fb', '#b2e2e2', '#66c2a4', '#2ca25f', '#006d2c', "#d9d9d9"];

      // addLegend(indicator, layers, colors);
      // addInfo(indicator, dataVariable.nom, dataVariable.definition, dataVariable.source, dataVariable.year);

      map.addLayer(
          {
              'id': indicator,
              'source': 'depenses_departement',
              'source-layer': 'DEPARTEMENT_DEPENSES',
              'type': 'fill',
              'paint': {
                  'fill-color': [
                      "step",
                      ["get", "DEPENSESHABITANTS"],
                      "#d9d9d9",
                      0,
                      "#edf8fb",
                      10,
                      "#b2e2e2",
                      13,
                      "#66c2a4",
                      17,
                      "#2ca25f",
                      22,
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

      map.on('click', indicator, function (e) {
          if (e.features.length > 0) {
              pourcentage = e.features[0].properties.DEPENSESHABITANTS
              nombre = e.features[0].properties.DEPENSESTOTALES
              texte = '<p style="font-weight: bold;">'+e.features[0].properties.NOM_DEP+"</p><p>Dépenses publiques culturelles : "
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

export { depensesCulturellesDesDepartements }
