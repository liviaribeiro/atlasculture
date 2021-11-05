import { layerDataVariables } from '../layer/dataVariables/layer.js'
const dataVariables = (zoomThreshold,zoomComThreshold) => {
  const elementVariables = document.getElementById('data-variables')
  let dataVariables = elementVariables.dataset.variables
  dataVariables = dataVariables.replace(/'nom'/g,`"nom"`)
  dataVariables = dataVariables.replace(/'definition'/g,`"definition"`)
  dataVariables = dataVariables.replace(/'source'/g,`"source"`)
  dataVariables = dataVariables.replace(/'year'/g,`"year"`)
  dataVariables = dataVariables.replace(/: '/g,`: "`)
  dataVariables = dataVariables.replace(/', "/g,`", "`)
  dataVariables = dataVariables.replace(/'}, {"/g,`"}, {"`)
  dataVariables = dataVariables.replace(/'}]/g,`"}]`)

  dataVariables = JSON.parse(dataVariables);

  dataVariables.forEach((dataVariable) => {

      var indicator = dataVariable.nom;

      if (indicator == "Indice de jeunesse") {

          var layers = ['0 à 50', '50 à 80', '80 à 100', '100 à 150', 'plus de 150'];
          var colors = ['#eff3ff', '#bdd7e7', '#6baed6', '#3182bd', '#08519c'];

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
                          ["get", "INDICEJEUNESSE17"],
                          "#ffffff",
                          0,
                          "#eff3ff",
                          50,
                          "#bdd7e7",
                          80,
                          "#6baed6",
                          100,
                          "#3182bd",
                          150,
                          "#08519c",
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
                  indice = e.features[0].properties.INDICEJEUNESSE17
                  if (indice == -1) {
                      indice = "Données non disponibles"
                  }
                  else {
                      indice = indice.toFixed(0)
                  }
                  popup.setLngLat(e.lngLat)
                      .setHTML('<p>'+e.features[0].properties.NOM_COM+'</p><p>Indice de jeunesse : '
                          +indice+ '</p>')
                      .addTo(map);
                  }
          });
      }

      layerDataVariables(indicator,dataVariable);

      map.on("mouseenter", indicator, () => {
              map.getCanvas().style.cursor = "pointer";
          });
      map.on("mouseleave", indicator, () => {
          map.getCanvas().style.cursor = "";
      });
  })
}

export { dataVariables }
