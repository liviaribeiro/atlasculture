import { addSourceZoneLayer } from '../sources/addSource.js';
import { zoneLayers,zoneLayersLine } from './templates/zoneLayers.js';
const addZoneLayer = (zoneLayer, zoneLayerURL, zoneSourceLayer, maxZoom, minZoom) => {

  var lineWidth = 1;
  if (zoneLayer == "region") {
  lineWidth = 2.5;
  }
  var zoneLayerID = zoneLayer + 'Layer';
  var zoneLineID = zoneLayer + 'Line';

  addSourceZoneLayer(zoneLayer,zoneLayerURL)


  zoneLayers(zoneLayerID,zoneLayer,zoneSourceLayer,minZoom,maxZoom)
  zoneLayersLine(zoneLineID,zoneLayer,zoneSourceLayer,minZoom,lineWidth)

  map.on('click', zoneLayerID, function (e) {
  var polygon = e.features[0].geometry.coordinates;
  var fit = new L.Polygon(polygon).getBounds();
  var southWest = new mapboxgl.LngLat(fit['_southWest']['lat'], fit['_southWest']['lng']);
  var northEast = new mapboxgl.LngLat(fit['_northEast']['lat'], fit['_northEast']['lng']);
  var center = new mapboxgl.LngLatBounds(southWest, northEast).getCenter();
  map.flyTo({
      center: center, zoom:maxZoom+1
  });
  });

  map.on('mousemove', zoneLayerID, function (e) {
  if (e.features.length > 0) {
      if (hoveredStateId) {
          map.setFeatureState(
          { source: zoneLayer, sourceLayer: zoneSourceLayer, id: hoveredStateId },
              { hover: false }
          );
      }

      hoveredStateId = e.features[0].id;

      map.setFeatureState(
          { source: zoneLayer, sourceLayer: zoneSourceLayer, id: hoveredStateId },
          { hover: true }
          );
      }
  });

  map.on('mouseleave', zoneLayerID, function () {
  if (hoveredStateId) {
      map.setFeatureState(
          { source: zoneLayer, sourceLayer: zoneSourceLayer, id: hoveredStateId },
          { hover: false }
          );
      }
      hoveredStateId = null;
  });

}



export { addZoneLayer }
