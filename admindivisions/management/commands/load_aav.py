import json
import pandas as pd 
from django.core.management.base import BaseCommand
from admindivisions.models import Commune, AireAttractionVille
from django.contrib.gis.geos import MultiPolygon, Polygon
from django.contrib.gis.geos import GEOSGeometry
import os
from atlasculture.settings import BASE_DIR


class Command(BaseCommand):

    def handle(self, *args, **options):

        data_file = os.path.join(BASE_DIR, 'admindivisions/data/aav.xlsx')
        df = pd.read_excel(data_file)


        for i in df.index:
            codeinsee = str(df['AAV2020'][i])
            nom = df['LIBAAV2020'][i]
            tranche_population = df['TAAV2017'][i]

            AireAttractionVille.objects.get_or_create(codeinsee=codeinsee, nom=nom, tranche_population=tranche_population)