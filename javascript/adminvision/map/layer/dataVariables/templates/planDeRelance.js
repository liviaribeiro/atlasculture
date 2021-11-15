const planDeRelance = (indicator,dataVariable) => {
  if (indicator == "Plan de relance") {
      let marker = 'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png';
      addLegendSymbol("Plan de relance", marker);
      addInfo(indicator, dataVariable.name, dataVariable.definition, dataVariable.source__nom,dataVariable.year);

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

export { planDeRelance }
