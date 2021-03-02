import pandas as pd 
import requests
import math
from equipements.models import (Equipement_Type, Label, Source, Domaine,
 Equipement, Cinema, Bibliotheque, Librairie, Architecture, Monument_Historique, Unesco)
from admindivisions.models import Commune
from django.core.management.base import BaseCommand
from django.contrib.gis.geos import Point
from atlasculture.settings import BASE_DIR
import os

class Command(BaseCommand):

    def handle(self, *args, **options):

        excel_file = os.path.join(BASE_DIR, 'equipements/data/Basilic - Base des lieux culturels (18022021).xlsx')

        df = pd.read_excel(excel_file)
        #df = df.head(50)
        df = df.fillna("")

        coords = []

        for i in df.index:
            id_DEPS = df['Identifiant_Deps'][i]
            nom = df['Nom'][i]
            print(id_DEPS)

            try:
                eq = Equipement.objects.get(id_DEPS=id_DEPS)
                lon = eq.gps.x
                lat = eq.gps.y
                gps = [lat,lon]
                coords.append(gps)
            except:
                coords.append("")
     

        df["Coordonnées GPS [lat,lon]"] = coords
        df.to_excel('Basilic - Base des lieux culturels (22022021).xlsx') 