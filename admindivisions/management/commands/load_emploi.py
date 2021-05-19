import json
import pandas as pd 
from django.core.management.base import BaseCommand
from admindivisions.models import ZoneEmploi, Commune, ZoneEmploi, Emploi_ZE, Departement, Emploi_Departement, Emploi_Region, Region
from django.contrib.gis.geos import MultiPolygon, Polygon
from django.contrib.gis.geos import GEOSGeometry
import os
from atlasculture.settings import BASE_DIR

class Command(BaseCommand):

    def handle(self, *args, **options): 

        """
        csv_file = os.path.join(BASE_DIR, 'admindivisions/data/emploi_departement.xlsx')

        df = pd.read_excel(csv_file, dtype={'No_Departement': str})

        for i in df.index:
            code = df['No_Departement'][i]
            print(code)
            nombre_actifs = int(df["Nombre d'actifs"][i])
            nombre_profession_culturelle = int(df["Nombre d'actifs exerçant une profession culturelle"][i])
            nombre_secteur_culturel = int(df["Nombre d'actifs dans les secteurs culturels"][i])

            departement = Departement.objects.get(codeinsee=code)
            Emploi_Departement.objects.get_or_create(departement=departement, nombre_actifs=nombre_actifs, nombre_profession_culturelle=nombre_profession_culturelle, nombre_secteur_culturel=nombre_secteur_culturel)
        
        """
        """
        csv_file = os.path.join(BASE_DIR, 'admindivisions/data/emploi.xlsx')

        df = pd.read_excel(csv_file, dtype={'ID_ZE2010': str})

        for i in df.index:
            code = df['ID_ZE2010'][i]
            print(code)
            nombre_actifs = int(df["Nombre d'actifs"][i])
            nombre_profession_culturelle = int(df["Nombre d'actifs exerçant une profession culturelle"][i])
            nombre_secteur_culturel = int(df["Nombre d'actifs dans les secteurs culturels"][i])

            zone_emploi = ZoneEmploi.objects.get(code=code, annee="2010")
            Emploi_ZE.objects.get_or_create(zone_emploi=zone_emploi, nombre_actifs=nombre_actifs, nombre_profession_culturelle=nombre_profession_culturelle, nombre_secteur_culturel=nombre_secteur_culturel)
        """

        csv_file = os.path.join(BASE_DIR, 'admindivisions/data/Emploi_REGIONS.xlsx')

        df = pd.read_excel(csv_file, dtype={'ID_REGION': str})

        for i in df.index:
            code = df['ID_REGION'][i]
            print(code)
            nombre_actifs = int(df["Nombre d'actifs"][i])
            nombre_profession_culturelle = int(df["Nombre d'actifs exerçant une profession culturelle"][i])
            nombre_secteur_culturel = int(df["Nombre d'actifs dans les secteurs culturels"][i])

            region = Region.objects.get(codeinsee=code)
            Emploi_Region.objects.get_or_create(region=region, nombre_actifs=nombre_actifs, nombre_profession_culturelle=nombre_profession_culturelle, nombre_secteur_culturel=nombre_secteur_culturel)
