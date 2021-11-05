const actifExercantUneProfessionCulturelle = (indicator,dataVariable) => {
  if (indicator == "Actifs exerçant une profession culturelle") {
      var layers = ['0 à 1%', '1 à 1,7%', '1,7% à 2%', '2% à 3,6%', 'plus de 3,6%'];
      var colors = ['#fef0d9', '#fdcc8a', '#fc8d59', '#e34a33', '#b30000'];

      addLegend(indicator, layers, colors);
      addInfo(indicator, dataVariable.name, dataVariable.definition, dataVariable.source,dataVariable.year);

      map.addLayer(
          {
              'id': 'Actifs exerçant une profession culturelle',
              'source': 'emploi_departement',
              'source-layer': 'EMPLOI_DEPARTEMENT',
              'minzoom': zoomThreshold,
              'maxzoom': zoomComThreshold-1,
              'type': 'fill',
              'paint': {
                  'fill-color': [
                      "step",
                      ["get", "part_profession_culturelle"],
                      "#fef0d9",
                      0.011,
                      "#fdcc8a",
                      0.017,
                      "#fc8d59",
                      0.020,
                      "#e34a33",
                      0.036,
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

      map.on('click', 'Actifs exerçant une profession culturelle', function (e) {
          if (e.features.length > 0) {
              pourcentage = e.features[0].properties.part_profession_culturelle*100
              nombre = e.features[0].properties.nombre_profession_culturelle
              texte = '<p style="font-weight: bold;">'+e.features[0].properties.NOM_DEP+"</p><p>Part d'actifs exerçant une profession culturelle : "
                      +pourcentage.toFixed(0)+ "%</p><p>Nombre d'actifs exerçant une profession culturelle : "+formatNumber(Math.round( nombre / 10 ) * 10)+' </p>'
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
              'id': 'Actifs exerçant une profession culturelle région',
              'source': 'emploi_region',
              'source-layer': 'EMPLOI_REGION',
              'maxzoom': zoomThreshold,
              'type': 'fill',
              'paint': {
                  'fill-color': [
                      "step",
                      ["get", "part_profession_culturelle"],
                      "#fef0d9",
                      0.011,
                      "#fdcc8a",
                      0.017,
                      "#fc8d59",
                      0.020,
                      "#e34a33",
                      0.036,
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

      map.on('click', 'Actifs exerçant une profession culturelle région', function (e) {
          if (e.features.length > 0) {
              pourcentage = e.features[0].properties.part_profession_culturelle*100
              nombre = e.features[0].properties.nombre_profession_culturelle
              texte = '<p style="font-weight: bold;">'+e.features[0].properties.NOM_REG+"</p><p>Part d'actifs exerçant une profession culturelle : "
                      +pourcentage.toFixed(0)+ "%</p><p>Nombre d'actifs exerçant une profession culturelle : "+formatNumber(Math.round( nombre / 10 ) * 10)+' </p>'
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
              'id': 'Actifs exerçant une profession culturelle ZE',
              'source': 'emploi_ze',
              'source-layer': 'EMPLOI_ZE',
              'minzoom': zoomComThreshold-1,
              'type': 'fill',
              'paint': {
                  'fill-color': [
                      "step",
                      ["get", "part_profession_culturelle"],
                      "#fef0d9",
                      0.011,
                      "#fdcc8a",
                      0.017,
                      "#fc8d59",
                      0.020,
                      "#e34a33",
                      0.036,
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

      map.on('click', 'Actifs exerçant une profession culturelle ZE', function (e) {
          if (e.features.length > 0) {
              pourcentage = e.features[0].properties.part_profession_culturelle*100
              nombre = e.features[0].properties.nombre_profession_culturelle
              texte = '<p style="font-weight: bold;">'+"Zone d'emploi "+e.features[0].properties.libelle+"</p><p>Part d'actifs exerçant une profession culturelle : "
                      +pourcentage.toFixed(0)+ "%</p><p>Nombre d'actifs exerçant une profession culturelle : "+formatNumber(Math.round( nombre / 10 ) * 10)+' </p>'
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

export { actifExercantUneProfessionCulturelle }
