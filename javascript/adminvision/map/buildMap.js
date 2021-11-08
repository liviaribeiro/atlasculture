import { addLegend, hideLegend,openCloseLegend, openLegend, addLegendCircle,addLegendEquipement, addLegendSymbol } from './legend/legends.js';
import { showInfo, hideInfo, addInfo } from './legend/info.js';
import { addSource } from './sources/addSource.js';
import { dataVariables } from './context/dataVariables.js';
import { dataDomaines } from './context/dataDomaines.js';
import { addZoneLayer } from './layer/addZoneLayer.js';
import { addMultipleZoneLayer } from './layer/addMultipleZoneLayer.js'
const buildMap = () => {


  map.on('load', function () {

      map.loadImage(
          'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
          function (error, image) {
          if (error) throw error;
          map.addImage('custom-marker', image);}
      )
      const listIcones = ['patrimoine-rouge.png', 'theatre-rose.png', 'archives-orange.png', 'patrimoine-rose.png', 'livre-bleu.png', 'arts-bleu.png', 'cinema-bleu.png', 'musique-jaune.png', 'edu-vert.png', 'archives-jaune.png', 'patrimoine-jaune.png', 'cinema-vert.png', 'musique-rouge.png', 'patrimoine-marron.png', 'edu-bleu.png', 'theatre-orange.png', 'livre-vert.png', 'arts-vert.png', 'theatre-rose-clair.png', 'theatre-violet.png', 'danse-bleu.png', 'musique-bleu.png', 'patrimoine-violet.png', 'theatre-noir.png', 'patrimoine-vert.png', 'patrimoine-orange.png', 'theatre-marron.png', 'archives-vert.png', 'theatre-vert.png', 'patrimoine-rose-clair.png', 'patrimoine-noir.png', 'cirque-vert.png', 'theatre-jaune.png', 'musique-orange.png', 'archives-bleu.png', 'danse-vert.png', 'musique-vert.png', 'patrimoine-bleu.png', 'theatre-rouge.png', 'cirque-bleu.png', 'musique-rose-clair.png', 'livre-jaune.png', 'theatre-bleu.png']
      listIcones.forEach((icone) => {
        map.loadImage(
            `/static/icones/${icone}`,
            function (error, image) {
            if (error) throw error;
            map.addImage(`${icone.split('.')[0]}`, image);}
        )
      })


      map.setLayoutProperty('country-label', 'text-field', ['get', 'name_fr']);
      map.setLayoutProperty('state-label', 'text-field', ['get', 'name_fr']);
      //map.setLayoutProperty('settlement-label', 'text-field', ['get', 'name_fr']);
      //map.setLayoutProperty('settlement-subdivision-label', 'text-field', ['get', 'name_fr']);
      //map.setLayoutProperty('road-label', 'text-field', ['get', 'name_fr']);
      //map.setLayoutProperty('waterway-label', 'text-field', ['get', 'name_fr']);
      //map.setLayoutProperty('natural-line-label', 'text-field', ['get', 'name_fr']);
      //map.setLayoutProperty('natural-point-label', 'text-field', ['get', 'name_fr']);
      map.setLayoutProperty('water-line-label', 'text-field', ['get', 'name_fr']);
      //map.setLayoutProperty('water-point-label', 'text-field', ['get', 'name_fr']);
      //map.setLayoutProperty('poi-label', 'text-field', ['get', 'name_fr']);
      //map.setLayoutProperty('airport-label', 'text-field', ['get', 'name_fr']);

      map.setPaintProperty("water", 'fill-color', "#a8e0f5");
      map.setPaintProperty("national-park", 'fill-color', "#b4e49b");



      function formatNumber(num) {
          return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
          }


      addMultipleZoneLayer();
      addSource();

      dataVariables(zoomThreshold,zoomComThreshold);
      dataDomaines();

      //Festivals
      map.addSource('festivals', {
          'type': 'vector',
          'url': "mapbox://liviaribeiro.d49j0q6z"
      });

      map.addLayer(
          {
          'id': 'Festivals',
          'type': 'circle',
          'source': 'festivals',
          'source-layer': 'COMMUNE_FESTIVALS-91tdqh',
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
              var commune = e.features[0].properties.NOM_COM;

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


  });

}
window.buildMap = buildMap
export { buildMap }
