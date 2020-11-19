import json
import pandas as pd 
from django.core.management.base import BaseCommand
from admindivisions.models import Commune, Epci
from django.contrib.gis.geos import MultiPolygon, Polygon

"""
source : https://www.collectivites-locales.gouv.fr/liste-et-composition-2020
"""

class Command(BaseCommand):

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str)

    def handle(self, *args, **options):


        #load EPCI into communes
      
        df = pd.read_csv(options['csv_file'])

        for i in df.index:
            epci = Epci.objects.get(codesiren=df['siren'][i])  
            com = Commune.objects.get(codeinsee=df['insee'][i])
            com.epci = epci
            com.save()
        
        