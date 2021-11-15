const depenseCulturellesDesIntercommunalites = (indicator,dataVariable) => {
  if (indicator == "Dépenses culturelles des intercommunalités") {
      var layers = ['0 à 5 €/habitant', '5 à 15 €/habitant', '15 à 30 €/habitant', '30 à 55 €/habitant', 'plus de 55 €/habitant', 'données non disponibles'];
      var colors = ['#edf8fb', '#b2e2e2', '#66c2a4', '#2ca25f', '#006d2c', "#d9d9d9"];

      // addLegend(indicator, layers, colors);
      // addInfo(indicator, dataVariable.nom, dataVariable.definition, dataVariable.source, dataVariable.year);

      map.addLayer(
          {
              'id': indicator,
              'source': 'depenses_epci',
              'source-layer': 'EPCI_DEPENSES',
              'type': 'fill',
              'paint': {
                  'fill-color': [
                      "step",
                      ["get", "DEPENSESHABITANTS"],
                      "#d9d9d9",
                      0,
                      "#edf8fb",
                      5,
                      "#b2e2e2",
                      15,
                      "#66c2a4",
                      30,
                      "#2ca25f",
                      55,
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
              const pourcentage = e.features[0].properties.DEPENSESHABITANTS
              const nombre = e.features[0].properties.DEPENSESTOTALES
              let texte = '<p style="font-weight: bold;">'+e.features[0].properties.NOM_EPCI+"</p><p>Dépenses publiques culturelles : "
                      +"<p>- "+formatNumber(nombre.toFixed(0))+" milliers d'euros</p><p>- "+pourcentage.toFixed(0)+" euros/habitant</p>"
              if (nombre == -1) {
                texte = '<p style="font-weight: bold;">'+e.features[0].properties.NOM_EPCI+"</p>Données non disponibles pour les intercommunalités de moins de 3 500 habitants"
              }
              popup.setLngLat(e.lngLat)
                  .setHTML(texte)
                  .addTo(map);
              }
      });
  }
}
export { depenseCulturellesDesIntercommunalites }
