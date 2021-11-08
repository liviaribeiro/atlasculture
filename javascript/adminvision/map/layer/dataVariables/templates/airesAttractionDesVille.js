const airesAttractionDesVille = (indicator,dataVariable) => {
    if (indicator == "Aires d'attraction des villes") {
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
}

export { airesAttractionDesVille }
