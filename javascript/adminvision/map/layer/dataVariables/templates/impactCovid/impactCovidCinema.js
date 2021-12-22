const impactCovidCinema = (indicator, dataVariable) => {
    if (indicator == 'impact-covid-cinema') {
      map.addLayer(
          {
              'id': 'impact-of-cinema',
              'source': 'impact_covid_cinema',
              'source-layer': 'recipe_tileset_cinema',
              'type': 'fill',
              'paint': {
                  'fill-color': [
                      "step",

                      ["get", "metrique"],"#fef0d9",
                      -73.2,"#fdd49e",
                      -69.5,"#fdbb84",
                      -66.8,"#fc8d59",
                      -62.0,"#e34a33",
                      -53.2,"#b30000"
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

"#fef0d9",
                      0.011,
                      "#fdcc8a",
                      0.017,
                      "#fc8d59",
                      0.020,
                      "#e34a33",
                      0.036,
                      "#b30000"
export { impactCovidCinema }
