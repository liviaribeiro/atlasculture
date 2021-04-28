import json
import pandas as pd 
from django.core.management.base import BaseCommand
from admindivisions.models import ZoneEmploi, Commune
from django.contrib.gis.geos import MultiPolygon, Polygon
from django.contrib.gis.geos import GEOSGeometry
import os
from atlasculture.settings import BASE_DIR

class Command(BaseCommand):

    def handle(self, *args, **options):     
        csv_file = os.path.join(BASE_DIR, 'admindivisions/data/zoneemploi2010.xlsx')

        df = pd.read_excel(csv_file, dtype = str)
        print(df.head())

        for i in df.index:
            code = df['ZE2010'][i]
            name = df['LIBZE2010'][i]

            ZoneEmploi.objects.get_or_create(code=code, name=name, annee=2010)

        """
        csv_file = os.path.join(BASE_DIR, 'admindivisions/data/zoneemploi_com.csv')

        df = pd.read_csv(csv_file, dtype = str)
        print(df.head())

        for i in df.index:
            code = df['ZE2010'][i]
            codeinsee = df['CODGEO'][i]
            name = df['LIBZE2010'][i]
            
            print(codeinsee)
            print(name)

            try:
                commune = Commune.objects.get(codeinsee=codeinsee, year=2020)
           
                zone_emploi = ZoneEmploi.objects.get(code=code)
                commune.zone_emploi = zone_emploi
                commune.save()

            except:
                continue
        """
