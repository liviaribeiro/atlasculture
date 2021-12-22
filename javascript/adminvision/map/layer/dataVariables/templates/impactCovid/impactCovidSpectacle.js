const impactCovidSpectacle = (indicator, dataVariable) => {
  if (indicator  == 'impact-covid-spectacle') {
    map.addLayer(
        {
            'id': 'impact-of-spectacle',
            'source': 'impact_covid_spectacle',
            'source-layer': 'recipe_tileset_spectacle',
            'type': 'fill',
            'paint': {
                'fill-color': [
                    "step",
                    ["get", "metrique"],"#fef0d9",
                    -68.2,"#fdd49e",
                    -60.8,"#fdbb84",
                    -56.7,"#fc8d59",
                    -50.8,"#e34a33",
                    -36.3,"#b30000",
                    ],
                'fill-opacity': 0.75,
            },
            'layout': {
                // make layer not visible by default
                'visibility': 'none'
            }
        }
    );
  }
}

export { impactCovidSpectacle }
