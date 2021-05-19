import json
import pandas as pd 
from django.core.management.base import BaseCommand
from admindivisions.models import Departement, Region, Epci, EpciType
from django.contrib.gis.geos import MultiPolygon, Polygon
from atlasculture.settings import BASE_DIR
import os

"""
source : https://www.insee.fr/fr/information/2510634
"""

class Command(BaseCommand):

    def handle(self, *args, **options):

        #load EPCI types
        """
        epci_types = [
            {"acronym": "CA", "name": "Communauté d'agglomération"},
            {"acronym": "CC", "name": "Communauté de communes"},
            {"acronym": "CU", "name": "Communauté urbaine"},
            {"acronym": "ME", "name": "Métropole"},
        ]
        for et in epci_types:
            entry, return_code = EpciType.objects.get_or_create(
                acronym=et["acronym"], name=et["name"]
            )
        """
        

        #load EPCI
        csv_file = os.path.join(BASE_DIR, 'admindivisions/data/epci2019.xlsx')

        df = pd.read_excel(csv_file)

        for i in df.index:
            print(df['EPCI'][i])

            epci_type = EpciType.objects.get(acronym=df['NATURE_EPCI'][i])  
            codesiren = df['EPCI'][i]
            name = df['LIBEPCI'][i]

            Epci.objects.get_or_create(codesiren=codesiren,
            name = name,
            annee = "2019",
            epci_type=epci_type
            )
    