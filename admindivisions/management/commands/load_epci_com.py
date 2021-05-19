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
        csv_file = os.path.join(BASE_DIR, 'admindivisions/data/epcicom2019.xlsx')
      
        df = pd.read_excel(csv_file)

        for i in df.index:
            print(df['EPCI'][i])
            epci = Epci.objects.get(codesiren=df['EPCI'][i], annee="2019")  
            com = Commune.objects.get(codeinsee=df['CODGEO'][i], year="2019")
            com.epci = epci
            com.save()
        
        