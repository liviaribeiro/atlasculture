const actionCoeurDeVille = (indicator,dataVariable) => {
    if (indicator == "Action coeur de ville") {
      let marker = 'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png';
      addLegendSymbol("Action coeur de ville", marker);
      addInfo(indicator, dataVariable.nom, dataVariable.definition, dataVariable.source__nom,dataVariable.year);

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
}

export { actionCoeurDeVille }
