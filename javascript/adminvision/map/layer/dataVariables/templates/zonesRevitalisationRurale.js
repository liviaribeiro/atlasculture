const zonesRevitalisationRurale = (indicator,dataVariable) => {
    if (indicator == "Zones de Revitalisation Rurale") {
      var layers = ['Classée en ZRR', 'Classée en ZRR au titre de la baisse de population depuis 40 ans', 'Partiellement classée en ZRR', 'Sortante en 2017 classée en zone de montagne continuant de bénéficier des effets du classement depuis 2017', 'Sortante en 2017 continuant de bénéficier des effets du classement depuis 2018', 'Non classée'];
      var colors = ['#4dac26', '#b8e186', '#2c7bb6', '#a6611a', '#f1b6da', '#ffffff'];

      addLegend(indicator, layers, colors);
      addInfo(indicator, dataVariable.nom, dataVariable.definition, dataVariable.source__nom, dataVariable.year);

      //add zonage rural layer
      map.addLayer(
          {
              'id': indicator,
              'source': 'zrr',
              'source-layer': 'COMMUNE_CARTO_ZRR-67jfyd',
              'type': 'fill',
              'paint': {
                  'fill-color':[
                    "match",
                    ["get", "ZRR"],
                    [
                      "C - Commune classée en ZRR"
                    ],
                    "#4dac26",
                    [
                      "D - Commune classée en ZRR au titre de la baisse de population depuis 40 ans"
                    ],
                    "#b8e186",
                    [
                      "P - Commune partiellement classée en ZRR"
                    ],
                    "#2c7bb6",
                    [
                      "PA - Commune fusionnée bénéficiant partiellement des effets du classement depuis 2018"
                    ],
                    "#2c7bb6",
                    [
                      "PM - Commune fusionnée bénéficiant partiellement des effets du classement car partiellement classée en zone de montagne"
                    ],
                    "#2c7bb6",
                    [
                      "CM - Commune fusionnée bénéficiant en totalité des effets du classement car classée en zone de montagne"
                    ],
                    "#4dac26",
                    [
                      "M - Commune sortante en 2017 classée en zone de montagne continuant de bénéficier des effets du classement depuis 2017"
                    ],
                    "#a6611a",
                    [
                      "A - Commune sortante en 2017 continuant de bénéficier des effets du classement depuis 2018"
                    ],
                    "#f1b6da",
                    "#ffffff"],'fill-opacity': 0.75
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
                      +e.features[0].properties.ZRR+' </p>')
                  .addTo(map);
              }
      });
  }
}

export { zonesRevitalisationRurale }
