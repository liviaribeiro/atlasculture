const salarieActifsDesSecteursCulturelsMarchand = (indicator,dataVariable) => {
  if (indicator == "Salariés actifs des secteurs culturels marchands") {
      var layers = ['0', '0 à 2,5%', '2,5 à 5%', '5 à 7,5%', 'plus de 7,5%'];
      var colors = ['#fef0d9', '#fdcc8a', '#fc8d59', '#e34a33', '#b30000'];

      addLegend(indicator, layers, colors);
      addInfo(indicator, dataVariable.nom, dataVariable.definition, dataVariable.source__nom, dataVariable.year);

      map.addLayer(
          {
              'id': 'Salariés actifs des secteurs culturels marchands régions',
              'source': 'region_entreprises',
              'source-layer': 'REGION_ENTREPRISE',
              'maxzoom': zoomThreshold,
              'type': 'fill',
              'paint': {
                  'fill-color': [
                      "step",
                      ["get", "POURCENTAGEEFFECTIFS"],
                      "#fef0d9",
                      0.001,
                      "#fdcc8a",
                      0.025,
                      "#fc8d59",
                      0.05,
                      "#e34a33",
                      0.075,
                      "#b30000"
                      ],
                  'fill-opacity': 0.75,
              },
              'layout': {
                  // make layer not visible by default
                  'visibility': 'none'
              }
          }
      );

      map.on('click', 'Salariés actifs des secteurs culturels marchands régions', function (e) {
          if (e.features.length > 0) {
              let pourcentage = e.features[0].properties.POURCENTAGEEFFECTIFS*100
              let nombre = e.features[0].properties.EFFECTIFSCULTURE17
              let texte = '<p>'+e.features[0].properties.NOM_REG+'</p><p>Part de salariés actifs des secteurs culturels marchands : '
                      +pourcentage.toFixed(1)+ '%</p><p> Nombre de salariés actifs des secteurs culturels marchands : '+nombre+' </p>'
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
              'id': 'Salariés actifs des secteurs culturels marchands départements',
              'source': 'departement_entreprises',
              'source-layer': 'DEPARTEMENT_ENTREPRISE',
              'minzoom': zoomThreshold,
              'maxzoom': zoomComThreshold,
              'type': 'fill',
              'paint': {
                  'fill-color': [
                      "step",
                      ["get", "POURCENTAGEEFFECTIFS"],
                      "#fef0d9",
                      0.001,
                      "#fdcc8a",
                      0.025,
                      "#fc8d59",
                      0.05,
                      "#e34a33",
                      0.075,
                      "#b30000"
                      ],
                  'fill-opacity': 0.75,
              },
              'layout': {
                  // make layer not visible by default
                  'visibility': 'none'
              }
          }
      );

      map.on('click', 'Salariés actifs des secteurs culturels marchands départements', function (e) {
          if (e.features.length > 0) {
              let pourcentage = e.features[0].properties.POURCENTAGEEFFECTIFS*100
              let nombre = e.features[0].properties.EFFECTIFSCULTURE17
              let texte = '<p>'+e.features[0].properties.NOM_DEP+'</p><p>Part de salariés actifs des secteurs culturels marchands : '
                      +pourcentage.toFixed(1)+ '%</p><p> Nombre de salariés actifs des secteurs culturels marchands : '+nombre+' </p>'
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
              'id': 'Salariés actifs des secteurs culturels marchands',
              'source': 'commune_entreprises',
              'source-layer': 'COMMUNE_ENTREPRISE',
              'minzoom': zoomComThreshold,
              'type': 'fill',
              'paint': {
                  'fill-color': [
                      "step",
                      ["get", "POURCENTAGEEFFECTIFS"],
                      "#fef0d9",
                      0.001,
                      "#fdcc8a",
                      0.025,
                      "#fc8d59",
                      0.05,
                      "#e34a33",
                      0.075,
                      "#b30000"
                      ],
                  'fill-opacity': 0.75,
              },
              'layout': {
                  // make layer not visible by default
                  'visibility': 'none'
              }
          }
      );

      map.on('click', 'Salariés actifs des secteurs culturels marchands', function (e) {
          if (e.features.length > 0) {
              let pourcentage = e.features[0].properties.POURCENTAGEEFFECTIFS*100
              let nombre = e.features[0].properties.EFFECTIFSCULTURE17
              let texte = '<p>'+e.features[0].properties.nom+'</p><p>Part de salariés actifs des secteurs culturels marchands : '
                      +pourcentage.toFixed(1)+ '%</p><p> Nombre de salariés actifs des secteurs culturels marchands : '+nombre+' </p>'
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

export { salarieActifsDesSecteursCulturelsMarchand }
