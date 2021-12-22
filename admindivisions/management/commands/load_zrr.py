import json
import pandas as pd 
from django.core.management.base import BaseCommand
from admindivisions.models import Commune, ZonageRural
from django.contrib.gis.geos import MultiPolygon, Polygon
import os
from atlasculture.settings import BASE_DIR

class Command(BaseCommand):

    def handle(self, *args, **options):
        
        excel_file = os.path.join(BASE_DIR, 'admindivisions/data/Diffusion-zonages-ZRR-cog2021.xlsx')
      
        df = pd.read_excel(excel_file)
        print(df.head(10))

        with open('admindivisions/data/COMMUNE_CARTO_SIMPLIFIED_2021.json') as f:
            data = json.load(f)

        for feature in data['features']: 
            codeinsee = feature['properties']['INSEE_COM']
            zrr = df['ZONAGE_ZRR'][df['CODGEO']==codeinsee].values[0]
            com = Commune.objects.get(codeinsee=codeinsee, year="2021")
            print(com.codeinsee)
            feature["properties"].update({"ZRR":zrr})
        
        with open('admindivisions/data/COMMUNE_CARTO_ZRR.json', 'w') as f:
            json.dump(data, f)
        