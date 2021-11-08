import { layerDataVariables } from '../layer/dataVariables/layer.js'
import { loadDataVariables } from './loadDataVariables.js';
const dataVariables = (zoomThreshold,zoomComThreshold) => {
  const dataVariables = loadDataVariables();

  dataVariables.forEach((dataVariable) => {

      var indicator = dataVariable.nom;

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
