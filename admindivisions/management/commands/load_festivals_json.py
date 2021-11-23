import json
import pandas as pd 
from django.core.management.base import BaseCommand
from admindivisions.models import Commune, Cadrage, TypologieEvolution
from django.contrib.gis.geos import MultiPolygon, Polygon
from django.contrib.gis.geos import GEOSGeometry
import os
from atlasculture.settings import BASE_DIR
import math


class Command(BaseCommand):

    def handle(self, *args, **options):

        with open('admindivisions/data/communes-20210101.json') as f:
            data = json.load(f)

        csv_file = os.path.join(BASE_DIR, 'admindivisions/data/festivals par commune.xlsx')

        df = pd.read_excel(csv_file, dtype="string")

        for feature in data['features']: 

            codeinsee=feature['properties']['insee']

            nombre_festivals = df[df['Code INSEE']==codeinsee]['Nombre de festivals'].values
            
            try:
                nombre_festivals = int(nombre_festivals[0])
                print(codeinsee)
                print(nombre_festivals)

            except:
                nombre_festivals = 0
                  
            feature["properties"].update({'NOMBREFESTIVALS': nombre_festivals})
                                                                                      
        with open('admindivisions/data/COMMUNES-FESTIVALS.json', 'w') as f:
            json.dump(data, f)
        
        
