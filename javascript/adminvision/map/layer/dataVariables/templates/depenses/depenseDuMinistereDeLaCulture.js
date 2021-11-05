const depenseDuMinistereDeLaCulture = (indicator,dataVariable) => {
    if (indicator == "Dépenses du ministère de la Culture") {
      var layers = ['0 à 35 €/habitant', '35 à 60 €/habitant', '60 à 90 €/habitant', '90 à 130 €/habitant', 'plus de 130 €/habitant', 'données non disponibles'];
      var colors = ['#edf8fb', '#b2e2e2', '#66c2a4', '#2ca25f', '#006d2c', "#d9d9d9"];

      addLegend(indicator, layers, colors);
      addInfo(indicator, dataVariable.nom, dataVariable.definition, dataVariable.source, dataVariable.year);

      map.addLayer(
          {
              'id': 'Dépenses du ministère de la Culture',
              'source': 'depenses_ministere_region',
              'source-layer': 'MINISTERE_REGION_DEPENSES',
              'maxzoom': zoomThreshold,
              'type': 'fill',
              'paint': {
                  'fill-color': [
                      "step",
                      ["get", "DEPENSESHABITANTS"],
                      "#d9d9d9",
                      0,
                      "#edf8fb",
                      35,
                      "#b2e2e2",
                      60,
                      "#66c2a4",
                      90,
                      "#2ca25f",
                      130,
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

      map.on('click', 'Dépenses du ministère de la Culture', function (e) {
          if (e.features.length > 0) {
              pourcentage = e.features[0].properties.DEPENSESHABITANTS
              nombre = e.features[0].properties.DEPENSESTOTALES
              texte = '<p style="font-weight: bold;">'+e.features[0].properties.NOM_REG+"</p><p>Dépenses du ministère de la Culture : "
                      +"<p>- "+formatNumber(nombre.toFixed(0))+" euros</p><p>- "+pourcentage.toFixed(0)+" euros/habitant</p>"
              if (nombre == -1) {
                  texte = "Données non disponibles"
              }
              popup.setLngLat(e.lngLat)
                  .setHTML(texte)
                  .addTo(map);
              }
      });

      map.addLayer(
          {
              'id': 'Dépenses du ministère de la Culture Département',
              'source': 'depenses_ministere_departement',
              'source-layer': 'MINISTERE_DEPARTEMENT_DEPENSES',
              'minzoom': zoomThreshold,
              'type': 'fill',
              'paint': {
                  'fill-color': [
                      "step",
                      ["get", "DEPENSESHABITANTS"],
                      "#d9d9d9",
                      0,
                      "#edf8fb",
                      35,
                      "#b2e2e2",
                      60,
                      "#66c2a4",
                      90,
                      "#2ca25f",
                      130,
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

      map.on('click', 'Dépenses du ministère de la Culture Département', function (e) {
          if (e.features.length > 0) {
              pourcentage = e.features[0].properties.DEPENSESHABITANTS
              nombre = e.features[0].properties.DEPENSESTOTALES
              texte = '<p style="font-weight: bold;">'+e.features[0].properties.NOM_DEP+"</p><p>Dépenses du ministère de la Culture : "
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
export { depenseDuMinistereDeLaCulture }
