const depensesCulturellesDesCommunes = (indicator,dataVariable) => {
  if (indicator == "Dépenses culturelles des communes") {
      var layers = ['0 à 25 €/habitant', '25 à 55 €/habitant', '55 à 90 €/habitant', '90 à 140 €/habitant', 'plus de 140 €/habitant', 'données non disponibles'];
      var colors = ['#edf8fb', '#b2e2e2', '#66c2a4', '#2ca25f', '#006d2c', "#d9d9d9"];

      addLegend(indicator, layers, colors);
      addInfo(indicator, dataVariable.nom, dataVariable.definition, dataVariable.source, dataVariable.year);

      map.addLayer(
          {
              'id': 'Dépenses culturelles des communes',
              'source': 'depenses_commune',
              'source-layer': 'COMMUNE_DEPENSES',
              'type': 'fill',
              'paint': {
                  'fill-color': [
                      "step",
                      ["get", "DEPENSESHABITANTS"],
                      "#d9d9d9",
                      0,
                      "#edf8fb",
                      25,
                      "#b2e2e2",
                      55,
                      "#66c2a4",
                      90,
                      "#2ca25f",
                      140,
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

      map.on('click', 'Dépenses culturelles des communes', function (e) {
          if (e.features.length > 0) {
              pourcentage = e.features[0].properties.DEPENSESHABITANTS
              nombre = e.features[0].properties.DEPENSESTOTALES
              texte = '<p style="font-weight: bold;">'+e.features[0].properties.NOM_COM+"</p><p>Dépenses publiques culturelles : "
                      +"<p>- "+formatNumber(nombre.toFixed(0))+" milliers d'euros</p><p>- "+pourcentage.toFixed(0)+" euros/habitant</p>"
              if (nombre == -1) {
                  texte = '<p style="font-weight: bold;">'+e.features[0].properties.NOM_COM+"</p>Données non disponibles pour les communes de moins de 3 500 habitants"
              }
              popup.setLngLat(e.lngLat)
                  .setHTML(texte)
                  .addTo(map);
              }
      });
  }
}

export { depensesCulturellesDesCommunes }
