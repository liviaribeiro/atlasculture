import json
import pandas as pd 
from django.core.management.base import BaseCommand
from admindivisions.models import Commune, ZonageRural
from django.contrib.gis.geos import MultiPolygon, Polygon
import os
from atlasculture.settings import BASE_DIR

"""
source : https://www.insee.fr/fr/statistiques/5040030
page 65
"""

class Command(BaseCommand):

    def handle(self, *args, **options):

        excel_file = os.path.join(BASE_DIR, 'data/base_comm_ruralGeo2020.xlsx')
      
        df = pd.read_excel(excel_file)
        
        with open('admindivisions/data/COMMUNE_CARTO_SIMPLIFIED.json') as f:
            data = json.load(f)

        for feature in data['features']: 
            codeinsee = feature['properties']['INSEE_COM']
            print(codeinsee)
            zonage_urbain = df[df["CODGEO"]==codeinsee]["TYPO2020"].values[0]
            feature["properties"].update({"ZONAGE_URBAIN":zonage_urbain})
        
        with open('admindivisions/data/COMMUNE_CARTO_URBAIN_SIMPLE.json', 'w') as f:
            json.dump(data, f)

        