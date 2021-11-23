const festival = () => {
  map.addLayer(
        {
        'id': 'Festivals',
        'type': 'circle',
        'source': 'festivals',
        'source-layer': 'COMMUNES-FESTIVALS-0tfiyw',
        'paint': {
         'circle-radius': ['*', 30, ['/',['sqrt', ["get", "NOMBREFESTIVALS"]],['sqrt', 290]]],
         'circle-color': "#de2d26",
         'circle-opacity': 0.75,
         },
         'layout': {
                // make layer not visible by default
          'visibility': 'none'
          }
   });

  map.on('click', 'Festivals', function (e) {
          var coordinates = e.features[0].geometry.coordinates.slice();
          var nombre = e.features[0].properties.NOMBREFESTIVALS;
          var commune = e.features[0].properties.nom;

          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
              coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          popup.setLngLat(coordinates)
              .setHTML('<p><b>'+commune+'</b></p>'+
              '<p>'+nombre+' festival(s)</p>'
          )
          .addTo(map);
      });

  map.on("mouseenter", 'Festivals', () => {
      map.getCanvas().style.cursor = "pointer";
  });
  map.on("mouseleave", 'Festivals', () => {
      map.getCanvas().style.cursor = "";
  });
}

export { festival }
