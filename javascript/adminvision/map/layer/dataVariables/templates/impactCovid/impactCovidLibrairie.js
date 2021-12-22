const impactCovidLibrairie = (indicator, dataVariable) => {
  if (indicator  == 'impact-covid-librairie') {
    map.addLayer(
        {
            'id': 'impact-of-librairie',
            'source': 'impact_covid_librairie',
            'source-layer': 'recipe_tileset_librairie',
            'type': 'fill',
            'paint': {
                'fill-color': [
                    "step",
                    ["get", "metrique"],"#fef0d9",
                    -25.6,"#fdd49e",
                    -15.5,"#fdbb84",
                    -9.9,"#fc8d59",
                    -5.8,"#e34a33",
                    -2.8,"#b30000",
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


export { impactCovidLibrairie }
