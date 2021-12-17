import json
import pandas as pd 
from django.core.management.base import BaseCommand
from admindivisions.models import Commune, ZonageRural
from django.contrib.gis.geos import MultiPolygon, Polygon
import os
from atlasculture.settings import BASE_DIR

class Command(BaseCommand):

    def handle(self, *args, **options):
        
        excel_file = os.path.join(BASE_DIR, 'admindivisions/data/Part_CS3_par_commune_RP2018.xlsx')
      
        df = pd.read_excel(excel_file)
        print(df.head(10))

        with open('admindivisions/data/COMMUNE_CARTO_SIMPLIFIED_2021.json') as f:
            data = json.load(f)

        for feature in data['features']: 
            codeinsee = feature['properties']['INSEE_COM']
            part_des_cadres = df['Part'][df['Code']==codeinsee].values[0]
            if part_des_cadres == "N/A - division par 0":
                print(part_des_cadres)
                print(codeinsee)
                part_des_cadres = -1
            com = Commune.objects.get(codeinsee=codeinsee, year="2021")
            feature["properties"].update({"PARTDESCADRES":part_des_cadres})
        
        with open('admindivisions/data/COMMUNE_CARTO_PART_DES_CADRES.json', 'w') as f:
            json.dump(data, f)
        