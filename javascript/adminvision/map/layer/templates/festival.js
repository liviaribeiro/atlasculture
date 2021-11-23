const festival = () => {

    var layers = ['72 festivals', '290 festivals'];
    var radius = [7.5, 30]
    var color = 'rgba(222, 45, 38, 0.75)';

    addLegendCircle("Festivals", layers, radius, color);
    addInfo("Festivals", "Festivals", "Sont considérés comme festivals les événements durant plus d'une journée, comptant au moins cinq représentations, concerts ou rencontres, et ayant connu au moins deux éditions.", "France Festivals", "2021");

    map.addLayer(
            {
            'id': 'Festivals',
            'type': 'circle',
            'source': 'festivals',
            'source-layer': 'COMMUNES-FESTIVALS-0l97cc',
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
