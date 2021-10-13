import json
import pandas as pd 
from django.core.management.base import BaseCommand
from admindivisions.models import ActionCoeurVille, Commune
from django.contrib.gis.geos import MultiPolygon, Polygon
from django.contrib.gis.geos import GEOSGeometry
import os
from atlasculture.settings import BASE_DIR

class Command(BaseCommand):

    def handle(self, *args, **options):
        """
        csv_file = os.path.join(BASE_DIR, 'admindivisions/data/acv.csv')

        df = pd.read_csv(csv_file)
        print(df.head())

        for i in df.index:
            codeinsee = df['codgeo'][i]
            code_acv = df['acv'][i]

            if type(code_acv) == str:
                print(code_acv)
                acv, created = ActionCoeurVille.objects.get_or_create(code_acv=code_acv)
                commune = Commune.objects.get(codeinsee=codeinsee, year="2019")
                commune.acv = acv
                commune.save()
                
        """

        with open('admindivisions/data/COMMUNE_CARTO_2019_POINTS.json') as f:
            data = json.load(f)

        data['features'] = [feature for feature in data['features'] if not feature['properties']['STATUT'] == "Arrondissement municipal"]

        for feature in data['features']: 
            print(feature['properties']['INSEE_COM'])
            com = Commune.objects.get(codeinsee=feature['properties']['INSEE_COM'], year="2019")
            acv = com.acv
            code_acv = "000000"
            if acv != None:
                code_acv = acv.code_acv
            feature["properties"].update({"ACV":code_acv})
        
        data['features'] = [feature for feature in data['features'] if not feature['properties']['ACV'] == "000000"]
                                                                           
        with open('admindivisions/data/COMMUNE_CARTO_POINTS_ACV.json', 'w') as f:
            json.dump(data, f)
        