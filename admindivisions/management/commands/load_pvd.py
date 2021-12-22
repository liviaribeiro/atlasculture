import json
import pandas as pd 
from django.core.management.base import BaseCommand
from admindivisions.models import PetitesVillesDeDemain, Commune
from django.contrib.gis.geos import MultiPolygon, Polygon
from django.contrib.gis.geos import GEOSGeometry
import os
from atlasculture.settings import BASE_DIR

class Command(BaseCommand):

    def handle(self, *args, **options):
        """
        csv_file = os.path.join(BASE_DIR, 'admindivisions/data/liste-pvd-com2021-20211213.csv')

        df = pd.read_csv(csv_file)
        print(df.head())

        for i in df.index:
            codeinsee = df['insee_com'][i]
            code_pvd = df['id_pvd'][i]

            if type(code_pvd) == str:
                print(code_pvd)
                pvd, created = PetitesVillesDeDemain.objects.get_or_create(code_pvd=code_pvd)
                commune = Commune.objects.get(codeinsee=codeinsee, year="2021")
                commune.pvd = pvd
                commune.save()
                
        

        """
        with open('admindivisions/data/COMMUNE_CARTO_2021_POINTS.json') as f:
            data = json.load(f)

        data['features'] = [feature for feature in data['features'] if not feature['properties']['STATUT'] == "Arrondissement municipal"]

        for feature in data['features']: 
            print(feature['properties']['INSEE_COM'])
            com = Commune.objects.get(codeinsee=feature['properties']['INSEE_COM'], year="2021")
            pvd = com.pvd
            code_pvd = "000000"
            if pvd != None:
                code_pvd = pvd.code_pvd
            feature["properties"].update({"PVD":code_pvd})
        
        data['features'] = [feature for feature in data['features'] if not feature['properties']['PVD'] == "000000"]
                                                                           
        with open('admindivisions/data/COMMUNE_CARTO_POINTS_PVD.json', 'w') as f:
            json.dump(data, f)
        