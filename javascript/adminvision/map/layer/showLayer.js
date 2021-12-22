

const showLayer = (layer) => {

    const aplats = ['Indice de jeunesse', 'Densité de la population', 'Évolution de la population', 'Niveau de vie médian', 'Taux de pauvreté',
    'Grille communale de densité', "Aires d'attraction des villes", "Catégories du rural et de l’urbain", "Entreprises culturelles du secteur marchand", "Entreprises culturelles du secteur marchand départements", "Entreprises culturelles du secteur marchand régions",
    'Salariés actifs des secteurs culturels marchands', "Salariés actifs des secteurs culturels marchands départements", "Salariés actifs des secteurs culturels marchands régions",
    'Actifs exerçant une profession culturelle', "Actifs exerçant une profession culturelle ZE", "Actifs exerçant une profession culturelle région",
    'Actifs dans les secteurs culturels', "Actifs dans les secteurs culturels ZE", "Actifs dans les secteurs culturels région",
    'Dépenses culturelles des régions', 'Dépenses culturelles des départements', 'Dépenses culturelles des intercommunalités',
    'Dépenses culturelles des communes', 'Dépenses du ministère de la Culture', "Dépenses du ministère de la Culture Département",'impact-of-cinema','impact-of-librairie','impact-of-spectacle']
    // "Part des cadres et professions intellectuelles supérieures", "Zones de revitalisation rurale"

    const btnLayer = document.getElementById(layer);
    // useCaseParticulars.includes(layer)

    var visibility = map.getLayoutProperty(layer, 'visibility');

    let other_layer = ''
    if (visibility == 'none') {
        if (aplats.includes(layer)) {
            for (var i = 0; i < aplats.length; i++){
                other_layer = aplats[i];
                var otherLayerVisibility = map.getLayoutProperty(other_layer, 'visibility');
                if (otherLayerVisibility == 'visible') {

                    map.setLayoutProperty(other_layer, 'visibility', 'none');
                    try {

                        var legendOtherLayer = document.getElementById("legend-"+other_layer);
                        legendOtherLayer.style.display = "none";
                        var infoOtherLayer = document.getElementById("info-"+other_layer);


                        infoOtherLayer.style.display = "none";
                        const btnOtherLayer = document.getElementById(other_layer);
                        btnOtherLayer.className = btnOtherLayer.className.replace(/\bactive\b/g, "");
                    }
                    catch (TypeError){
                    }
                }
            }
        }
        if (layer == "Entreprises culturelles du secteur marchand"){
            map.setLayoutProperty("Entreprises culturelles du secteur marchand départements", 'visibility', 'visible');
            map.setLayoutProperty("Entreprises culturelles du secteur marchand régions", 'visibility', 'visible');
        }
        if (layer == 'Salariés actifs des secteurs culturels marchands'){
            map.setLayoutProperty("Salariés actifs des secteurs culturels marchands départements", 'visibility', 'visible');
            map.setLayoutProperty("Salariés actifs des secteurs culturels marchands régions", 'visibility', 'visible');
        }
        if (layer == 'Actifs exerçant une profession culturelle'){
            map.setLayoutProperty("Actifs exerçant une profession culturelle ZE", 'visibility', 'visible');
            map.setLayoutProperty("Actifs exerçant une profession culturelle région", 'visibility', 'visible');
        }
        if (layer == 'Actifs dans les secteurs culturels'){
            map.setLayoutProperty("Actifs dans les secteurs culturels ZE", 'visibility', 'visible');
            map.setLayoutProperty("Actifs dans les secteurs culturels région", 'visibility', 'visible');
        }
        if (layer == 'Dépenses du ministère de la Culture'){
            map.setLayoutProperty("Dépenses du ministère de la Culture Département", 'visibility', 'visible');
        }

        btnLayer.className += ' active';
        map.setLayoutProperty(layer, 'visibility', 'visible');
        map.setLayoutProperty("regionLayer", 'visibility', 'none');
        map.setLayoutProperty("regionLine", 'visibility', 'none');
        map.setLayoutProperty("departementLayer", 'visibility', 'none');
        map.setLayoutProperty("departementLine", 'visibility', 'none');
        map.setLayoutProperty("communeLayer", 'visibility', 'none');
        map.setLayoutProperty("communeLine", 'visibility', 'none');
        map.moveLayer("settlement-subdivision-label");
        map.moveLayer("settlement-label");
        map.moveLayer("state-label");
        map.moveLayer("country-label");

        var legend = document.getElementById("legend-"+layer);
        if (legend) {
          legend.style.display = "block";
          console.log(map.getStyle().layers)

        }
    }
    if (visibility == 'visible') {
        if (layer == "Entreprises culturelles du secteur marchand"){
            map.setLayoutProperty("Entreprises culturelles du secteur marchand départements", 'visibility', 'none');
            map.setLayoutProperty("Entreprises culturelles du secteur marchand régions", 'visibility', 'none');
        }
        if (layer == 'Salariés actifs des secteurs culturels marchands'){
            map.setLayoutProperty("Salariés actifs des secteurs culturels marchands départements", 'visibility', 'none');
            map.setLayoutProperty("Salariés actifs des secteurs culturels marchands régions", 'visibility', 'none');
        }
        if (layer== 'Actifs exerçant une profession culturelle'){
            map.setLayoutProperty("Actifs exerçant une profession culturelle ZE", 'visibility', 'none');
            map.setLayoutProperty("Actifs exerçant une profession culturelle région", 'visibility', 'none');
        }
        if (layer == 'Actifs dans les secteurs culturels'){
            map.setLayoutProperty("Actifs dans les secteurs culturels ZE", 'visibility', 'none');
            map.setLayoutProperty("Actifs dans les secteurs culturels région", 'visibility', 'none');
        }
        if (layer == 'Dépenses du ministère de la Culture'){
            map.setLayoutProperty("Dépenses du ministère de la Culture Département", 'visibility', 'none');
        }

        btnLayer.className = btnLayer.className.replace(/\bactive\b/g, "");
        map.setLayoutProperty(layer, 'visibility', 'none');

        var legend = document.getElementById("legend-"+layer);
        if (legend) {
          legend.style.display = "none";
          var info = document.getElementById("info-"+layer);
          info.style.display = "none";

        }
    }

}
window.showLayer = showLayer;

export { showLayer }
