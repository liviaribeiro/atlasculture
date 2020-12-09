import json
import pandas as pd 
from django.core.management.base import BaseCommand
from admindivisions.models import Commune, Epci
from django.contrib.gis.geos import MultiPolygon, Polygon
import os
from atlasculture.settings import BASE_DIR


"""
source : https://www.collectivites-locales.gouv.fr/liste-et-composition-2020
"""

class Command(BaseCommand):

    def handle(self, *args, **options):

        #load EPCI into communes
        csv_file = os.path.join(BASE_DIR, 'admindivisions/data/epcicom2020.csv')
      
        df = pd.read_csv(csv_file)

        for i in df.index:
            epci = Epci.objects.get(codesiren=df['siren'][i])  
            com = Commune.objects.get(codeinsee=df['insee'][i])
            com.epci = epci
            com.save()
        
        