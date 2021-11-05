const layerDataVariables = (indicator,dataVariable) => {


  if (indicator == "Densité de la population") {
      var layers = ['0 à 50 habitants/km²', '50 à 100 habitants/km²', '100 à 1 000 habitants/km²', '1 000 à 1 0000 habitants/km²', 'plus de 10 000 habitants/km²', 'données non disponibles'];
      var colors = ['#eff3ff', '#bdd7e7', '#6baed6', '#3182bd', '#08519c', "#d9d9d9"];

      addLegend(indicator, layers, colors);
      addInfo(indicator,dataVariable.nom, dataVariable.definition, dataVariable.source, dataVariable.year);

      map.addLayer(
          {
              'id': indicator,
              'source': 'cadrage',
              'source-layer': 'COMMUNE_CADRAGE_SIMPLIFIED-9qvj2o',
              'type': 'fill',
              'paint': {
                  'fill-color': [
                      "step",
                      ["get", "DENSITE17"],
                      "#d9d9d9",
                      0,
                      "#eff3ff",
                      50,
                      "#bdd7e7",
                      100,
                      "#6baed6",
                      1000,
                      "#3182bd",
                      10000,
                      "#08519c"
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
              densite = e.features[0].properties.DENSITE17
              if (densite == -1) {
                  densite = "Données non disponibles"
              }
              else {
                  densite = formatNumber(densite.toFixed(0))+' habitants/km² '
              }
              popup.setLngLat(e.lngLat)
                  .setHTML('<p>'+e.features[0].properties.NOM_COM+'</p><p>'
                      +densite+' </p>')
                  .addTo(map);
              }
      });
  }

  if (indicator == "Taux de pauvreté") {
      var layers = ['0 à 9%', '9 à 14%', '14 à 20%', '20 à 29%', 'plus de 29%', 'données non disponibles'];
      var colors = ['#eff3ff', '#bdd7e7', '#6baed6', '#3182bd', '#08519c', "#d9d9d9"];

      addLegend(indicator, layers, colors);
      addInfo(indicator, dataVariable.nom, dataVariable.definition, dataVariable.source, dataVariable.year);

      map.addLayer(
          {
              'id': indicator,
              'source': 'cadrage',
              'source-layer': 'COMMUNE_CADRAGE_SIMPLIFIED-9qvj2o',
              'type': 'fill',
              'paint': {
                  'fill-color': [
                      "step",
                      ["get", "TAUXPAUVRETE17"],
                      "#d9d9d9",
                      0,
                      "#eff3ff",
                      9,
                      "#bdd7e7",
                      14,
                      "#6baed6",
                      20,
                      "#3182bd",
                      29,
                      "#08519c"
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
              tauxpauvrete = e.features[0].properties.TAUXPAUVRETE17
              if (tauxpauvrete == -1) {
                  tauxpauvrete = "Données non disponibles"
              }
              else {
                  tauxpauvrete = formatNumber(tauxpauvrete) + '%'
              }
              popup.setLngLat(e.lngLat)
                  .setHTML('<p>'+e.features[0].properties.NOM_COM+'</p><p>'
                      +tauxpauvrete+' </p>')
                  .addTo(map);
              }
      });
  }

  if (indicator == "Évolution de la population") {
      var layers = ['Croissance totale', 'Croissance liée à un solde naturel positif', 'Croissance liée à un solde migratoire apparent positif', 'Décroissance liée à un solde naturel négatif', 'Décroissance liée à un solde migratoire apparent négatif', 'Décroissance totale'];
      var colors = ['#b2182b', '#ef8a62', '#fddbc7', '#d1e5f0', '#67a9cf','#2166ac'];

      addLegend(indicator, layers, colors);
      addInfo(indicator, dataVariable.nom, dataVariable.definition, dataVariable.source, dataVariable.year);

      map.addLayer(
          {
              'id': indicator,
              'source': 'cadrage',
              'source-layer': 'COMMUNE_CADRAGE_SIMPLIFIED-9qvj2o',
              'type': 'fill',
              'paint': {
                  'fill-color': [
                      "step",
                      [
                          "get",
                          "TYPOLOGIECODE"
                      ],
                      "#d9d9d9",
                      1,
                      "#b2182b",
                      2,
                      "#ef8a62",
                      3,
                      "#fddbc7",
                      4,
                      "#d1e5f0",
                      5,
                      "#67a9cf",
                      6,
                      "#2166ac"
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
              popup.setLngLat(e.lngLat)
                  .setHTML('<p>'+e.features[0].properties.NOM_COM+'</p><p>'
                      +(e.features[0].properties.TYPOLOGIE)+'</p>')
                  .addTo(map);
              }
      });
  }

  if (indicator == "Niveau de vie médian") {
      var layers = ['0 à 20 000 €', '20 000 à 24 000 €', '24 000 à 28 000 €', '28 000 à 34 0000 €', 'plus de 34 000 €', 'données non disponibles'];
      var colors = ['#eff3ff', '#bdd7e7', '#6baed6', '#3182bd', '#08519c', "#d9d9d9"];
      var indicator = "Niveau de vie médian";

      addLegend(indicator, layers, colors);
      addInfo(indicator, dataVariable.nom, dataVariable.definition, dataVariable.source, dataVariable.year);

      map.addLayer(
          {
              'id': indicator,
              'source': 'cadrage',
              'source-layer': 'COMMUNE_CADRAGE_SIMPLIFIED-9qvj2o',
              'type': 'fill',
              'paint': {
                  'fill-color': [
                      "step",
                      ["get", "NIVEAUDEVIE17"],
                      "#d9d9d9",
                      0,
                      "#eff3ff",
                      20000,
                      "#bdd7e7",
                      24000,
                      "#6baed6",
                      28000,
                      "#3182bd",
                      34000,
                      "#08519c"
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
              niveaudevie = e.features[0].properties.NIVEAUDEVIE17
              if (niveaudevie == -1) {
                  niveaudevie = "Données non disponibles"
              }
              else {
                  niveaudevie = formatNumber(niveaudevie) + ' euros'
              }
              popup.setLngLat(e.lngLat)
                  .setHTML('<p>'+e.features[0].properties.NOM_COM+'</p><p>'
                      +niveaudevie+' </p>')
                  .addTo(map);
              }
      });
  }

  if (indicator == "Grille communale de densité") {
      var layers = ['Très dense', 'Densité intermediaire', 'Peu dense', 'Très peu dense'];
      var colors = ['#d01c8b', '#f1b6da', '#bae4b3', '#31a354'];

      addLegend(indicator, layers, colors);
      addInfo(indicator, dataVariable.nom, dataVariable.definition, dataVariable.source, dataVariable.year);

      //add zonage rural layer
      map.addLayer(
          {
              'id': indicator,
              'source': 'zonage rural',
              'source-layer': 'COMMUNE_CARTO_RURAL_SIMPLE-9f3llm',
              'type': 'fill',
              'paint': {
                  'fill-color':[
                      "step",
                      ["get", "ZONAGE_RURAL"],
                      "#d01c8b",
                      1.1,
                      "#f1b6da",
                      2.1,
                      '#bae4b3',
                      3.1,
                      "#31a354"
                      ],'fill-opacity': 0.75
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
                  .setHTML('<p>'+e.features[0].properties.NOM_COM+'</p><p>'
                      +e.features[0].properties.ZONAGE_RURAL_NOM+' </p>')
                  .addTo(map);
              }
      });
  }

  if (indicator == "Catégories du rural et de l’urbain") {
      var layers = ["rural sous forte influence d'un pôle", "rural sous faible influence d'un pôle", "rural autonome peu dense", "rural autonome très peu dense", "urbain dense", "urbain à densité intérmediaire"];
      var colors = ['#bae4b3', '#74c476', '#31a354', '#006d2c', '#d01c8b', '#f1b6da'];

      addLegend(indicator, layers, colors);
      addInfo(indicator, dataVariable.nom, dataVariable.definition, dataVariable.source, dataVariable.year);

      //add zonage rural layer
      map.addLayer(
          {
              'id': indicator,
              'source': 'zonage urbain',
              'source-layer': 'COMMUNE_CARTO_URBAIN_SIMPLE-cns1m3',
              'type': 'fill',
              'paint': {
                  'fill-color':[
                      "match",
                      ["get", "ZONAGE_URBAIN"],
                      ["rural sous forte influence d'un pôle"],
                      "#bae4b3",
                      ["rural sous faible influence d'un pôle"],
                      "#74c476",
                      ["rural autonome peu dense"],
                      "#31a354",
                      ["rural autonome très peu dense"],
                      "#006d2c",
                      ["urbain dense"],
                      "#d01c8b",
                      "#f1b6da",
                      ],'fill-opacity': 0.75
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
                  .setHTML('<p>'+e.features[0].properties.NOM_COM+'</p><p>'
                      +e.features[0].properties.ZONAGE_URBAIN+' </p>')
                  .addTo(map);
              }
      });
  }

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

  if (indicator == "Entreprises culturelles du secteur marchand") {
      var layers = ['0', '0 à 2,5%', '2,5 à 5%', '5 à 7,5%', 'plus de 7,5%'];
      var colors = ['#fef0d9', '#fdcc8a', '#fc8d59', '#e34a33', '#b30000'];

      addLegend(indicator, layers, colors);
      addInfo(indicator, dataVariable.nom, dataVariable.definition, dataVariable.source, dataVariable.year);

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
              pourcentage = e.features[0].properties.POURCENTAGEETABLISSEMENTS*100
              nombre = e.features[0].properties.ETLABISSEMENTSCULTURE17
              texte = '<p>'+e.features[0].properties.NOM_REG+"</p><p>Part d'entreprises culturelles du secteur marchand : "
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
              pourcentage = e.features[0].properties.POURCENTAGEETABLISSEMENTS*100
              nombre = e.features[0].properties.ETLABISSEMENTSCULTURE17
              texte = '<p>'+e.features[0].properties.NOM_DEP+"</p><p>Part d'entreprises culturelles du secteur marchand : "
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
              pourcentage = e.features[0].properties.POURCENTAGEETABLISSEMENTS*100
              nombre = e.features[0].properties.ETLABISSEMENTSCULTURE17
              texte = '<p>'+e.features[0].properties.nom+"</p><p>Part d'entreprises culturelles du secteur marchand : "
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

  if (indicator == "Salariés actifs des secteurs culturels marchands") {
      var layers = ['0', '0 à 2,5%', '2,5 à 5%', '5 à 7,5%', 'plus de 7,5%'];
      var colors = ['#fef0d9', '#fdcc8a', '#fc8d59', '#e34a33', '#b30000'];

      addLegend(indicator, layers, colors);
      addInfo(indicator, dataVariable.nom, dataVariable.definition, dataVariable.source, dataVariable.year);

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
              pourcentage = e.features[0].properties.POURCENTAGEEFFECTIFS*100
              nombre = e.features[0].properties.EFFECTIFSCULTURE17
              texte = '<p>'+e.features[0].properties.NOM_REG+'</p><p>Part de salariés actifs des secteurs culturels marchands : '
                      +pourcentage.toFixed(0)+ '%</p><p> Nombre de salariés actifs des secteurs culturels marchands : '+nombre+' </p>'
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
              pourcentage = e.features[0].properties.POURCENTAGEEFFECTIFS*100
              nombre = e.features[0].properties.EFFECTIFSCULTURE17
              texte = '<p>'+e.features[0].properties.NOM_DEP+'</p><p>Part de salariés actifs des secteurs culturels marchands : '
                      +pourcentage.toFixed(0)+ '%</p><p> Nombre de salariés actifs des secteurs culturels marchands : '+nombre+' </p>'
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
              pourcentage = e.features[0].properties.POURCENTAGEEFFECTIFS*100
              nombre = e.features[0].properties.EFFECTIFSCULTURE17
              texte = '<p>'+e.features[0].properties.nom+'</p><p>Part de salariés actifs des secteurs culturels marchands : '
                      +pourcentage.toFixed(0)+ '%</p><p> Nombre de salariés actifs des secteurs culturels marchands : '+nombre+' </p>'
              if (nombre == -1) {
                  texte = "Données non disponibles"
              }
              popup.setLngLat(e.lngLat)
                  .setHTML(texte)
                  .addTo(map);
              }
      });
  }

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
  if (indicator == "Actifs dans les secteurs culturels") {
      var layers = ['0 à 1%', '1 à 1,7%', '1,7% à 2%', '2% à 3,6%', 'plus de 3,6%'];
      var colors = ['#fef0d9', '#fdcc8a', '#fc8d59', '#e34a33', '#b30000'];

      addLegend(indicator, layers, colors);
      addInfo(indicator, dataVariable.nom, dataVariable.definition, dataVariable.source, dataVariable.year);

      map.addLayer(
          {
              'id': 'Actifs dans les secteurs culturels',
              'source': 'emploi_departement',
              'source-layer': 'EMPLOI_DEPARTEMENT',
              'maxzoom': zoomComThreshold-1,
              'minzoom': zoomThreshold,
              'type': 'fill',
              'paint': {
                  'fill-color': [
                      "step",
                      ["get", "part_secteur_culturel"],
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

      map.on('click', 'Actifs dans les secteurs culturels', function (e) {
          if (e.features.length > 0) {
              pourcentage = e.features[0].properties.part_secteur_culturel*100
              nombre = e.features[0].properties.nombre_secteur_culturel
              texte = '<p style="font-weight: bold;">'+e.features[0].properties.NOM_DEP+"</p><p>Part d'actifs dans les secteurs culturels : "
                      +pourcentage.toFixed(0)+ "%</p><p>Nombre d'actifs dans les secteurs culturels : "+formatNumber(Math.round( nombre / 10 ) * 10)+' </p>'
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
              'id': 'Actifs dans les secteurs culturels région',
              'source': 'emploi_region',
              'source-layer': 'EMPLOI_REGION',
              'maxzoom': zoomThreshold,
              'type': 'fill',
              'paint': {
                  'fill-color': [
                      "step",
                      ["get", "part_secteur_culturel"],
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

      map.on('click', 'Actifs dans les secteurs culturels région', function (e) {
          if (e.features.length > 0) {
              pourcentage = e.features[0].properties.part_secteur_culturel*100
              nombre = e.features[0].properties.nombre_secteur_culturel
              texte = '<p style="font-weight: bold;">'+e.features[0].properties.NOM_REG+"</p><p>Part d'actifs dans les secteurs culturels : "
                      +pourcentage.toFixed(0)+ "%</p><p>Nombre d'actifs dans les secteurs culturels : "+formatNumber(Math.round( nombre / 10 ) * 10)+' </p>'
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
              'id': 'Actifs dans les secteurs culturels ZE',
              'source': 'emploi_ze',
              'source-layer': 'EMPLOI_ZE',
              'minzoom': zoomComThreshold-1,
              'type': 'fill',
              'paint': {
                  'fill-color': [
                      "step",
                      ["get", "part_secteur_culturel"],
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

      map.on('click', 'Actifs dans les secteurs culturels ZE', function (e) {
          if (e.features.length > 0) {
              pourcentage = e.features[0].properties.part_secteur_culturel*100
              nombre = e.features[0].properties.nombre_secteur_culturel
              texte = '<p style="font-weight: bold;">'+"Zone d'emploi "+e.features[0].properties.libelle+"</p><p>Part d'actifs dans les secteurs culturels : "
                      +pourcentage.toFixed(0)+ "%</p><p>Nombre d'actifs dans les secteurs culturels : "+formatNumber(Math.round( nombre / 10 ) * 10)+' </p>'
              if (nombre == -1) {
                  texte = "Données non disponibles"
              }
              popup.setLngLat(e.lngLat)
                  .setHTML(texte)
                  .addTo(map);
              }
      });
  }
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
              pourcentage = e.features[0].properties.DEPENSESHABITANTS
              nombre = e.features[0].properties.DEPENSESTOTALES
              texte = '<p style="font-weight: bold;">'+e.features[0].properties.NOM_REG+"</p><p>Dépenses publiques culturelles : "
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

  if (indicator == "Dépenses culturelles des départements") {
      var layers = ['0 à 10 €/habitant', '10 à 13 €/habitant', '13 à 17 €/habitant', '17 à 22 €/habitant', 'plus de 22 €/habitant', 'données non disponibles'];
      var colors = ['#edf8fb', '#b2e2e2', '#66c2a4', '#2ca25f', '#006d2c', "#d9d9d9"];

      addLegend(indicator, layers, colors);
      addInfo(indicator, dataVariable.nom, dataVariable.definition, dataVariable.source, dataVariable.year);

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

  if (indicator == "Dépenses culturelles des intercommunalités") {
      var layers = ['0 à 5 €/habitant', '5 à 15 €/habitant', '15 à 30 €/habitant', '30 à 55 €/habitant', 'plus de 55 €/habitant', 'données non disponibles'];
      var colors = ['#edf8fb', '#b2e2e2', '#66c2a4', '#2ca25f', '#006d2c', "#d9d9d9"];

      addLegend(indicator, layers, colors);
      addInfo(indicator, dataVariable.nom, dataVariable.definition, dataVariable.source, dataVariable.year);

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
              pourcentage = e.features[0].properties.DEPENSESHABITANTS
              nombre = e.features[0].properties.DEPENSESTOTALES
              texte = '<p style="font-weight: bold;">'+e.features[0].properties.NOM_EPCI+"</p><p>Dépenses publiques culturelles : "
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

  if (indicator == "Aires attraction des villes") {
      var layers = ['Aire de moins de 50 000 habitants', 'Aire de 50 000 à moins de 200 000 habitants', 'Aire de 200 000 à moins de 700 000 habitants', 'Aire de 700 000 habitants ou plus'];
      var colors = ['#fdb863', '#e66101', '#b2abd2', '#5e3c99'];
      var indicator = "Aires d'attraction des villes";

      addLegend(indicator, layers, colors);
      addInfo(indicator, dataVariable.nom, dataVariable.definition, dataVariable.source, dataVariable.year);

      map.addLayer({
              'id': "Aires d'attraction des villes",
              'type': 'symbol',
              'source': 'aav',
              'source-layer': 'AAV2020-8cjjsq',
              'type': 'fill',
              'paint': {
                  'fill-color': [
                      "match",
                      ["get", "TAAV2017"],
                      ["0"],
                      "#ffffff",
                      ["1"],
                      "#fdb863",
                      ["2"],
                      "#e66101",
                      ["3"],
                      "#b2abd2",
                      "#5e3c99",
                      ],
                  'fill-opacity': 0.75,
              },
              'layout': {
                      'visibility': 'none',
                  }
      });

      map.on('click', "Aires d'attraction des villes", function (e) {
          if (e.features.length > 0) {
              texte = e.features[0].properties.LIBAAV2020

              popup.setLngLat(e.lngLat)
                  .setHTML(texte)
                  .addTo(map);
              }
      });
  }

  if (indicator == "Population") {
      var layers = ['545 000 habitants', '2 180 000 habitants'];
      var radius = [10, 40]
      var color = 'rgba(107, 174, 214, 0.75)';

      addLegendCircle(indicator, layers, radius, color);
      addInfo(indicator, dataVariable.nom, dataVariable.definition, dataVariable.source,dataVariable.year);

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

  if (indicator == "Action coeur de ville") {
      let marker = 'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png';
      addLegendSymbol("Action coeur de ville", marker);
      addInfo(indicator, dataVariable.name, dataVariable.definition, dataVariable.source,dataVariable.year);

      map.addLayer({
          'id': 'Action coeur de ville',
          'type': 'symbol',
          'source': 'acv',
          'source-layer': 'COMMUNE_CARTO_POINTS_ACV-9a52rz',
          'layout': {
          'icon-image': "custom-marker",
          'icon-size': 0.5,
          'visibility': 'none',
          'icon-allow-overlap': true
          },
      });

      map.on('click', "Action coeur de ville", function (e) {
          new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(e.features[0].properties.NOM_COM)
          .addTo(map);
      });
  }

  if (indicator == "Plan de relance") {
      let marker = 'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png';
      addLegendSymbol("Plan de relance", marker);
      addInfo(indicator, dataVariable.name, dataVariable.definition, dataVariable.source,dataVariable.year);

      map.addLayer({
              'id': "Plan de relance",
              'type': 'symbol',
              'source': 'pdr',
              'source-layer': 'PDR',
              'layout': {
                      'icon-image':
                      "custom-marker",
                      'icon-size': 0.5,
                      'visibility': 'none',
                      'icon-allow-overlap': true,
                  }
      });

      map.on('click', 'Plan de relance', function (e) {
          var coordinates = e.features[0].geometry.coordinates.slice();
          var name = e.features[0].properties.Lieu;
          var adresse = e.features[0].properties.Adresse;
          var montant = e.features[0].properties.Montant;
          var enveloppe = e.features[0].properties.Enveloppe;
          var operation = e.features[0].properties.Operation;

          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
              coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          popup.setLngLat(coordinates)
              .setHTML('<p><b>'+name+'</b></p>'+
              '<p>'+adresse+'</p>'+
              '<p>Opération : '+operation+'</p>'+
              '<p>Enveloppe du plan de relance : '+enveloppe+
              '<p>Montant : '+formatNumber(montant)+' €</p>'
          )
          .addTo(map);
      });
  }
}

export { layerDataVariables }
