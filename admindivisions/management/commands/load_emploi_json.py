import json
import os
import pandas as pd 
from django.core.management.base import BaseCommand
from admindivisions.models import ZoneEmploi, Emploi_ZE, Emploi_Departement, Departement
from atlasculture.settings import BASE_DIR

class Command(BaseCommand):

    def handle(self, *args, **options):
        
        with open('admindivisions/data/DEPARTEMENT_SIMPLIFIED.json') as f:
            data = json.load(f)

            for feature in data['features']: 
                print(feature['properties']['INSEE_DEP'])
                departement = Departement.objects.get(codeinsee=feature['properties']['INSEE_DEP'])
                emploi = Emploi_Departement.objects.get(departement=departement)
                nombre_actifs = emploi.nombre_actifs
                nombre_profession_culturelle = emploi.nombre_profession_culturelle
                nombre_secteur_culturel = emploi.nombre_secteur_culturel
                part_profession_culturelle = nombre_profession_culturelle/nombre_actifs
                part_secteur_culturel = nombre_secteur_culturel/nombre_actifs

                feature["properties"].update({'nombre_actifs': nombre_actifs, "nombre_profession_culturelle": nombre_profession_culturelle, "nombre_secteur_culturel": nombre_secteur_culturel,
                "part_profession_culturelle": part_profession_culturelle, "part_secteur_culturel":part_secteur_culturel})
                                                                     
            with open('admindivisions/data/EMPLOI_DEPARTEMENT.json', 'w') as f:
                json.dump(data, f)