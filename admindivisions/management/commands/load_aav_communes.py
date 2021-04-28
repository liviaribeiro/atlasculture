import json
import pandas as pd 
from django.core.management.base import BaseCommand
from admindivisions.models import Commune, AireAttractionVille, Commune_AAV, TypologieAAV
from django.contrib.gis.geos import MultiPolygon, Polygon
from django.contrib.gis.geos import GEOSGeometry
import os
from atlasculture.settings import BASE_DIR


class Command(BaseCommand):

    def handle(self, *args, **options):

        data_file = os.path.join(BASE_DIR, 'admindivisions/data/aav_communes_paris.xlsx')
        df = pd.read_excel(data_file, dtype=str)


        for i in df.index:
            commune_codeinsee = str(df['CODGEO'][i])
            aav_codeinsee = df['AAV2020'][i]
            cat_aav = df['CATEAAV2020'][i]
            print(aav_codeinsee)
            commune = Commune.objects.get(codeinsee=commune_codeinsee, year=2021)
            aav = AireAttractionVille.objects.get(codeinsee=aav_codeinsee)
            pole = True
            codetypologie = 0

            #commune de la couronne ou hors pôle
            if cat_aav == "20" or cat_aav == "30":
                pole = False
            #moins de 50 000 habitants
            if aav.tranche_population == 1:
                if pole == True : codetypologie = 11
                if pole == False : codetypologie = 10
            #entre 50 000 et 200 000
            if aav.tranche_population == 2:
                if pole == True : codetypologie = 21
                if pole == False : codetypologie = 20
            #moins de 200 000 et 700 000 habitants
            if aav.tranche_population == 3:
                if pole == True : codetypologie = 31
                if pole == False : codetypologie = 30
            #plus de 700 000 habitants
            if aav.tranche_population == 4 or aav.tranche_population == 5:
                if pole == True : codetypologie = 41
                if pole == False : codetypologie = 40

            typologie=TypologieAAV.objects.get(code=codetypologie)
            print(commune_codeinsee)
            Commune_AAV.objects.get_or_create(AAV=aav, commune=commune, pole=pole, typologie=typologie)