import json
import pandas as pd 
from django.core.management.base import BaseCommand
from admindivisions.models import Commune, ZonageRural
from django.contrib.gis.geos import MultiPolygon, Polygon
import os
from atlasculture.settings import BASE_DIR


"""
source : https://www.collectivites-locales.gouv.fr/liste-et-composition-2020
"""

class Command(BaseCommand):

    def handle(self, *args, **options):
        """
        #load EPCI into communes
        excel_file = os.path.join(BASE_DIR, 'data/zonage_rural.xlsx')
      
        df = pd.read_excel(excel_file)

        for i in df.index:
            com = Commune.objects.get(codeinsee=df['codgeo'][i])
            zonage_rural = ZonageRural.objects.get(gridens=df['gridens'][i])
            com.zonage_rural = zonage_rural
            com.save()
        """

        with open('admindivisions/data/COMMUNE_CARTO_SIMPLIFIED.json') as f:
            data = json.load(f)

        for feature in data['features']: 
            com = Commune.objects.get(codeinsee=feature['properties']['INSEE_COM'], year="2020")
            feature["properties"].update({"ZONAGE_RURAL":int(com.zonage_rural.gridens)})
        
        with open('admindivisions/data/COMMUNE_CARTO_RURAL_SIMPLE.json', 'w') as f:
            json.dump(data, f)
        