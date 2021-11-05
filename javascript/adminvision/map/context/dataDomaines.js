const dataDomaines = () => {
  const dataDomainesElements = document.querySelectorAll('.datas-equipements-types')
  dataDomainesElements.forEach((dataDomainesElement) => {

    const equipementType = dataDomainesElement.dataset.equipementType
    const equipementTypePk = dataDomainesElement.dataset.equipementTypePk
    const equipementTypeDefinition = dataDomainesElement.dataset.equipementTypeDefinition
    const equipementTypeSource = dataDomainesElement.dataset.equipementTypeSource
    const equipementTypeYear = dataDomainesElement.dataset.equipementTypeYear
    const equipementTypeName = dataDomainesElement.dataset.equipementTypeName
    const equipementTypePkUrl = dataDomainesElement.dataset.equipementTypePkUrl

    map.addSource('equipements'+`${equipementTypePk}`, {
          'type': 'geojson',
          'data': `${equipementTypePkUrl}`,
      });
    var symbol = 'star_jauneclair';
    var img = dataDomainesElement.dataset.img;
    // Théâtres
    if (`${equipementTypeName}` == "Centre dramatique national"){
        symbol = 'theatre-violet';
        img = `/static/icones/${symbol}.png`;
    }
    if (`${equipementTypeName}` == "Compagnie avec lieu"){
        symbol = 'theatre-rose-clair';
        img = `/static/icones/${symbol}.png`;
    }
    if (`${equipementTypeName}` == "Théâtre de ville"){
        symbol = 'theatre-rouge';
        img = `/static/icones/${symbol}.png`;
    }
    if (`${equipementTypeName}` == "Théâtre hors label"){
        symbol = 'theatre-orange';
        img = `/static/icones/${symbol}.png`;
    }
    if (`${equipementTypeName}` == "Théâtre lyrique d’intérêt national"){
        symbol = 'theatre-jaune';
        img = `/static/icones/${symbol}.png`;
    }
    if (`${equipementTypeName}` == "Théâtre national"){
        symbol = 'theatre-vert';
        img = `/static/icones/${symbol}.png`;
    }
    if (`${equipementTypeName}` == "Théâtre privé"){
        symbol = 'theatre-bleu';
        img = `/static/icones/${symbol}.png`;
    }
    //Opéra
    if (`${equipementTypeName}` == "Opéra national"){
        symbol = 'theatre-marron';
        img = `/static/icones/${symbol}.png`;
    }
    if (`${equipementTypeName}` == "Opéra national en région"){
        symbol = 'theatre-noir';
        img = `/static/icones/${symbol}.png`;
    }
    //Musique
    if (`${equipementTypeName}` == "Centre national de création musicale"){
        symbol = 'musique-rose-clair';
        img = `/static/icones/${symbol}.png`;
    }
    if (`${equipementTypeName}` == "Scène"){
        symbol = 'musique-rouge';
        img = `/static/icones/${symbol}.png`;
    }
    if (`${equipementTypeName}` == "Scène conventionnée d’intérêt national"){
        symbol = 'musique-orange';
        img = `/static/icones/${symbol}.png`;
    }
    if (`${equipementTypeName}` == "Scène de musiques actuelles"){
        symbol = 'musique-jaune';
        img = `/static/icones/${symbol}.png`;
    }
    if (`${equipementTypeName}` == "Scène nationale"){
        symbol = 'musique-vert';
        img = `/static/icones/${symbol}.png`;
    }
    if (`${equipementTypeName}` == "Zénith"){
        symbol = 'musique-noir';
        img = `/static/icones/${symbol}.png`;
    }
    //Patrimoine
    if (`${equipementTypeName}` == "Architecture contemporaine remarquable"){
        symbol = 'patrimoine-violet';
        img = `/static/icones/${symbol}.png`;
    }
    if (`${equipementTypeName}` == "Centre culturel de rencontre"){
        symbol = 'patrimoine-rose';
        img = `/static/icones/${symbol}.png`;
    }
    if (`${equipementTypeName}` == "Jardin remarquable"){
        symbol = 'patrimoine-rose-clair';
        img = `/static/icones/${symbol}.png`;
    }
    if (`${equipementTypeName}` == "Lieu archéologique"){
        symbol = 'patrimoine-rouge';
        img = `/static/icones/${symbol}.png`;
    }
    if (`${equipementTypeName}` == "Maison des Illustres"){
        symbol = 'patrimoine-orange';
        img = `/static/icones/${symbol}.png`;
    }
    if (`${equipementTypeName}` == "Micro-folie"){
        symbol = 'patrimoine-jaune';
        img = `/static/icones/${symbol}.png`;
    }
    if (`${equipementTypeName}` == "Monument historique"){
        symbol = 'patrimoine-vert';
        img = `/static/icones/${symbol}.png`;
    }
    if (`${equipementTypeName}` == "Monument national"){
        symbol = 'patrimoine-bleu';
        img = `/static/icones/${symbol}.png`;
    }
    if (`${equipementTypeName}` == "Musée de France"){
        symbol = 'patrimoine-noir';
        img = `/static/icones/${symbol}.png`;
    }
    if (`${equipementTypeName}` == "Patrimoine mondial Unesco"){
        symbol = 'patrimoine-marron';
        img = `/static/icones/${symbol}.png`;
    }
    //Archives
    if (`${equipementTypeName}` == "Archives communales"){
        symbol = 'archives-orange';
        img = `/static/icones/${symbol}.png`;
    }
    if (`${equipementTypeName}` == "Archives départementales"){
        symbol = 'archives-jaune';
        img = `/static/icones/${symbol}.png`;
    }
    if (`${equipementTypeName}` == "Archives régionales"){
        symbol = 'archives-vert';
        img = `/static/icones/${symbol}.png`;
    }
    if (`${equipementTypeName}` == "Archives nationales"){
        symbol = 'archives-bleu';
        img = `/static/icones/${symbol}.png`;
    }
    //Cinéma
    if (`${equipementTypeName}` == "Art et essai"){
        symbol = 'cinema-bleu';
        img = `/static/icones/${symbol}.png`;
    }
    if (`${equipementTypeName}` == "Cinéma"){
        symbol = 'cinema-vert';
        img = `/static/icones/${symbol}.png`;
    }
    //Arts visuels
    if (`${equipementTypeName}` == "Centre d’art contemporain d’intérêt national"){
        symbol = 'arts-bleu';
        img = `/static/icones/${symbol}.png`;
    }
    if (`${equipementTypeName}` == "Fonds régional d’art contemporain"){
        symbol = 'arts-vert';
        img = `/static/icones/${symbol}.png`;
    }
    //Cirque
    if (`${equipementTypeName}` == "Centre national des arts de la rue et de l’espace public"){
        symbol = 'cirque-vert';
        img = `/static/icones/${symbol}.png`;
    }
    if (`${equipementTypeName}` == "Pôle national du cirque"){
        symbol = 'cirque-bleu';
        img = `/static/icones/${symbol}.png`;
    }
    //Danse
    if (`${equipementTypeName}` == "Centre chorégraphique national"){
        symbol = 'danse-vert';
        img = `/static/icones/${symbol}.png`;
    }
    if (`${equipementTypeName}` == "Centre de développement chorégraphique national"){
        symbol = 'danse-bleu';
        img = `/static/icones/${symbol}.png`;
    }
    //Éducation, formation
    if (`${equipementTypeName}` == "Conservatoire"){
        symbol = 'edu-vert';
        img = `/static/icones/${symbol}.png`;
    }
    if (`${equipementTypeName}` == "Établissement d’enseignement supérieur"){
        symbol = 'edu-bleu';
        img = `/static/icones/${symbol}.png`;
    }
    //Livre, lecture et presse
    if (`${equipementTypeName}` == "Bibliothèque"){
        symbol = 'livre-jaune';
        img = `/static/icones/${symbol}.png`;
    }
    if (`${equipementTypeName}` == "LIR - Librairie indépendante de référence"){
        symbol = 'livre-vert';
        img = `/static/icones/${symbol}.png`;
    }
    if (`${equipementTypeName}` == "LR - Librairie de référence"){
        symbol = 'livre-bleu';
        img = `/static/icones/${symbol}.png`;
    }

    map.addLayer({
      'id': `${equipementTypePk}`,
      'type': 'symbol',
      'source': 'equipements'+`${equipementTypePk}`,
      'layout': {
          'icon-image': symbol,
          'icon-size': {stops: [[6, 0.25], [9, 0.25], [16, 0.75]]},
          'icon-allow-overlap': true,
          'visibility': 'none',
          },
      });

      var circleColor = '#074382';

      addInfo(`${equipementTypeName}`, `${equipementTypePk}`, `${equipementTypeDefinition}`, `${equipementTypeSource}`, `${equipementTypeYear}`);
      addLegendEquipement(`${equipementTypeName}`, `${equipementTypePk}`, img);

      map.on('click', `${equipementTypePk}`, function (e) {
          var coordinates = e.features[0].geometry.coordinates.slice();
          var name = e.features[0].properties.nom;
          var adresse = e.features[0].properties.adresse;
          var typology = `${equipementTypeName}`;

          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
              coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }
          new mapboxgl.Popup()
              .setLngLat(coordinates)
              .setHTML('<p><i>'+typology+'</i></p>'+
              '<p><b>'+name+'</b></p>'+
              '<p>'+adresse+'</p>'
          )
          .addTo(map);
      });

      map.on("mouseenter", `${equipementTypePk}`, () => {
          map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", `${equipementTypePk}`, () => {
          map.getCanvas().style.cursor = "";
          });
  })
}

export { dataDomaines }
