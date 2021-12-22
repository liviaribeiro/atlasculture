const petitesVillesDeDemain = (indicator,dataVariable) => {
    if (indicator == "Petites villes de demain") {
      let marker = 'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png';
      addLegendSymbol("Petites villes de demain", marker);
      addInfo(indicator, dataVariable.nom, dataVariable.definition, dataVariable.source__nom,dataVariable.year);

      map.addLayer({
          'id': 'Petites villes de demain',
          'type': 'symbol',
          'source': 'pvd',
          'source-layer': 'COMMUNE_CARTO_POINTS_PVD-589x4t',
          'layout': {
          'icon-image': "custom-marker",
          'icon-size': 0.5,
          'visibility': 'none',
          'icon-allow-overlap': true
          },
      });

      map.on('click', "Petites villes de demain", function (e) {
          new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(e.features[0].properties.NOM_COM)
          .addTo(map);
      });
  }
}

export { petitesVillesDeDemain }
