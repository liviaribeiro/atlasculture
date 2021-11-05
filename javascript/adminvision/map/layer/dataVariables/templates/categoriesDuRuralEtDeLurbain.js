const categoriesDuRuralEtDeLurbain = (indicator,dataVariable) => {
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
}

export { categoriesDuRuralEtDeLurbain }
