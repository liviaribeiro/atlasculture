function goToRegion(region) {
    let center = ''
    if (region == "Guadeloupe") {
        center = [-61.687126, 16.2305103]
    }
    if (region == "Guyane") {
        center = [-52.999998, 4.0039882]
    }
    if (region == "La Réunion") {
        center = [55.5364801, -21.1307379]
    }
    if (region == "Martinique") {
        center = [-61.0158269, 14.6367927]
    }
    if (region == "Mayotte") {
        center = [45.1486261, -12.8253862,]
    }
    map.flyTo({
        center: center, zoom: 8
    });
}

window.goToRegion = goToRegion
export { goToRegion }
