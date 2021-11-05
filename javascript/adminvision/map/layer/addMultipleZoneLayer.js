import { addZoneLayer } from './addZoneLayer.js';
const addMultipleZoneLayer = () => {

  const regionLayer = "region";
  const regionURL = 'mapbox://liviaribeiro.3qf6fysf';
  const regionSourceLayer = 'REGION_SIMPLIFIED';
  const regionMaxZoom = zoomThreshold;
  const regionMinZoom = 4;
  const departementLayer = "departement";
  const departementURL = 'mapbox://liviaribeiro.76ba45w7';
  const departementSourceLayer = 'DEPARTEMENT_SIMPLIFIED';
  const departementMaxZoom = zoomComThreshold;
  const departementMinZoom = zoomThreshold;
  const communeLayer = "commune";
  const communeURL = 'mapbox://liviaribeiro.1d5mkyd4';
  const communeSourceLayer = 'COMMUNE_SIMPLIFIED';
  const communeMaxZoom = 12;
  const communeMinZoom = zoomComThreshold;

  addZoneLayer(regionLayer, regionURL, regionSourceLayer, regionMaxZoom, regionMinZoom);
  addZoneLayer(departementLayer, departementURL, departementSourceLayer, departementMaxZoom, departementMinZoom);
  addZoneLayer(communeLayer, communeURL, communeSourceLayer, communeMaxZoom, communeMinZoom);
}

export { addMultipleZoneLayer }
