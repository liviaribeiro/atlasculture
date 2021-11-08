const zoneLayers = (zoneLayerID,zoneLayer,zoneSourceLayer,minZoom,maxZoom) => {
    map.addLayer(
  {
      'id': zoneLayerID,
      'source': zoneLayer,
      'source-layer': zoneSourceLayer,
      'minzoom': minZoom,
      'maxzoom': maxZoom,
      'type': 'fill',
      'paint': {
          'fill-color': "#627BC1",
          'fill-opacity': [
              'case',
              ['boolean', ['feature-state', 'hover'], false],
              0.25,
              0
              ]
      },
      'layout': {
          'visibility': 'visible'
      }
  }
  );

}

const zoneLayersLine = (zoneLineID,zoneLayer,zoneSourceLayer,minZoom,lineWidth) => {
  map.addLayer({
  'id': zoneLineID,
  'type': 'line',
  'source': zoneLayer,
  'source-layer': zoneSourceLayer,
  'minzoom': minZoom,
  'layout': {
      'visibility': 'visible'
  },
  'paint': {
      'line-color': '#ffffff',
      'line-width': lineWidth
  }
  });
}

export { zoneLayers, zoneLayersLine }
