const addSourceZoneLayer = (zoneLayer,zoneLayerURL) => {
  map.addSource(zoneLayer, {
    'type': 'vector',
    'url': zoneLayerURL
  });
}
const addSource = () => {

        // impact COVID
        map.addSource('impact_covid_spectacle', {
          'type': 'vector',
          'url': 'mapbox://liviaribeiro.tileset_spectacle'
        });
        map.addSource('impact_covid_cinema', {
          'type': 'vector',
          'url': 'mapbox://liviaribeiro.tileset_cinema'
        });
        map.addSource('impact_covid_librairie', {
          'type': 'vector',
          'url': 'mapbox://liviaribeiro.tileset_librairie'
        });
          // mapbox sources
        map.addSource('cadrage', {
            'type': 'vector',
            'url': 'mapbox://liviaribeiro.0coathhb'
        });
        map.addSource('part_des_cadres', {
                'type': 'vector',
                'url': 'mapbox://liviaribeiro.6fjdlgng'
            });
        map.addSource('zonage rural', {
            'type': 'vector',
            'url': 'mapbox://liviaribeiro.3u0ajjj4'
        });
        map.addSource('zonage urbain', {
            'type': 'vector',
            'url': 'mapbox://liviaribeiro.bumheafq'
        });
        map.addSource('zrr', {
                'type': 'vector',
                'url': 'mapbox://liviaribeiro.7ujhx5s1'
        });
        map.addSource('qp', {
            'type': 'vector',
            'url': 'mapbox://liviaribeiro.82f38xhh'
        });
        map.addSource('commune_entreprises', {
                'type': 'vector',
                'url': 'mapbox://liviaribeiro.de06dydj'
        });
        map.addSource('region_entreprises', {
                'type': 'vector',
                'url': 'mapbox://liviaribeiro.79o9xcfa'
        });
        map.addSource('departement_entreprises', {
                'type': 'vector',
                'url': 'mapbox://liviaribeiro.659hkczd'
        });
        map.addSource('emploi_departement', {
                'type': 'vector',
                'url': 'mapbox://liviaribeiro.4nizq0zw'
        });
        map.addSource('emploi_region', {
                'type': 'vector',
                'url': 'mapbox://liviaribeiro.8tssesir'
        });
        map.addSource('emploi_ze', {
                'type': 'vector',
                'url': 'mapbox://liviaribeiro.9xpxb1vj'
        });
        map.addSource('depenses_region', {
                'type': 'vector',
                'url': 'mapbox://liviaribeiro.16wk8z7f'
        });
        map.addSource('depenses_departement', {
                'type': 'vector',
                'url': 'mapbox://liviaribeiro.7plleqb0'
        });
        map.addSource('depenses_epci', {
                'type': 'vector',
                'url': 'mapbox://liviaribeiro.74bpft4j'
        });
        map.addSource('depenses_commune', {
                'type': 'vector',
                'url': 'mapbox://liviaribeiro.bt8usf8p'
        });
        map.addSource('depenses_ministere_region', {
                'type': 'vector',
                'url': 'mapbox://liviaribeiro.3idctvsj'
        });
        map.addSource('depenses_ministere_departement', {
                'type': 'vector',
                'url': 'mapbox://liviaribeiro.de256tad'
        });
        map.addSource('aav', {
                'type': 'vector',
                'url': 'mapbox://liviaribeiro.06v2dhl5'
        });
        map.addSource('population', {
            'type': 'vector',
            'url': 'mapbox://liviaribeiro.1n6485zf'
        });
        map.addSource('acv', {
            'type': 'vector',
            'url': 'mapbox://liviaribeiro.8msgii19',
        });
        map.addSource('pvd', {
                'type': 'vector',
                'url': 'mapbox://liviaribeiro.6v0osget',
            });
        map.addSource('pdr', {
                'type': 'vector',
                'url': 'mapbox://liviaribeiro.2kyv2902'
        });

        //Festivals
        map.addSource('festivals', {
                'type': 'vector',
                'url': "mapbox://liviaribeiro.1t2bgtcf"
        });

}

export { addSource, addSourceZoneLayer}
