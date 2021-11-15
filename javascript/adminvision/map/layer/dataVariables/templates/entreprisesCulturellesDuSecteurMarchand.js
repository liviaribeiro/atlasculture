const entreprisesCulturellesDuSecteurMarchand = (indicator,dataVariable) => {
  if (indicator == "Entreprises culturelles du secteur marchand") {
      var layers = ['0', '0 à 2,5%', '2,5 à 5%', '5 à 7,5%', 'plus de 7,5%'];
      var colors = ['#fef0d9', '#fdcc8a', '#fc8d59', '#e34a33', '#b30000'];

      addLegend(indicator, layers, colors);
      addInfo(indicator, dataVariable.nom, dataVariable.definition, dataVariable.source__nom, dataVariable.year);

      map.addLayer(
          {
              'id': 'Entreprises culturelles du secteur marchand régions',
              'source': 'region_entreprises',
              'source-layer': 'REGION_ENTREPRISE',
              'type': 'fill',
              'maxzoom': zoomThreshold,
              'paint': {
                  'fill-color': [
                      "step",
                      ["get", "POURCENTAGEETABLISSEMENTS"],
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

      map.on('click', 'Entreprises culturelles du secteur marchand régions', function (e) {
          if (e.features.length > 0) {
              let pourcentage = e.features[0].properties.POURCENTAGEETABLISSEMENTS*100
              let nombre = e.features[0].properties.ETLABISSEMENTSCULTURE17
              let texte = '<p>'+e.features[0].properties.NOM_REG+"</p><p>Part d'entreprises culturelles du secteur marchand : "
                      +pourcentage.toFixed(0)+ "%</p><p>Nombre d'entreprises culturelles du secteur marchand : "+nombre+' </p>'
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
              'id': 'Entreprises culturelles du secteur marchand départements',
              'source': 'departement_entreprises',
              'source-layer': 'DEPARTEMENT_ENTREPRISE',
              'type': 'fill',
              'minzoom': zoomThreshold,
              'maxzoom': zoomComThreshold,
              'paint': {
                  'fill-color': [
                      "step",
                      ["get", "POURCENTAGEETABLISSEMENTS"],
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

      map.on('click', 'Entreprises culturelles du secteur marchand départements', function (e) {
          if (e.features.length > 0) {
              let pourcentage = e.features[0].properties.POURCENTAGEETABLISSEMENTS*100
              let nombre = e.features[0].properties.ETLABISSEMENTSCULTURE17
              let texte = '<p>'+e.features[0].properties.NOM_DEP+"</p><p>Part d'entreprises culturelles du secteur marchand : "
                      +pourcentage.toFixed(0)+ "%</p><p>Nombre d'entreprises culturelles du secteur marchand : "+nombre+' </p>'
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
              'id': 'Entreprises culturelles du secteur marchand',
              'source': 'commune_entreprises',
              'source-layer': 'COMMUNE_ENTREPRISE',
              'type': 'fill',
              'minzoom': zoomComThreshold,
              'paint': {
                  'fill-color': [
                      "step",
                      ["get", "POURCENTAGEETABLISSEMENTS"],
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

      map.on('click', 'Entreprises culturelles du secteur marchand', function (e) {
          if (e.features.length > 0) {
              let pourcentage = e.features[0].properties.POURCENTAGEETABLISSEMENTS*100
              let nombre = e.features[0].properties.ETLABISSEMENTSCULTURE17
              let texte = '<p>'+e.features[0].properties.nom+"</p><p>Part d'entreprises culturelles du secteur marchand : "
                      +pourcentage.toFixed(0)+ "%</p><p>Nombre d'entreprises culturelles du secteur marchand : "+nombre+' </p>'
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

export { entreprisesCulturellesDuSecteurMarchand }
