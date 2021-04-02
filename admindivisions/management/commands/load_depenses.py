import json
import os
import pandas as pd 
from django.core.management.base import BaseCommand
from admindivisions.models import Commune, Departement, Region, DepensesRegion, Secteur
from atlasculture.settings import BASE_DIR

class Command(BaseCommand):

    def handle(self, *args, **options):
        """
        source_file = os.path.join(BASE_DIR, 'admindivisions/data/Base_Depenses_Regions_2019.xlsx')

        df = pd.read_excel(source_file, dtype={'NREG':'string'})

        for i in df.index:
            codeinsee = df['NREG'][i]
            nom_secteur = df['Secteur'][i]
            depenses_fonctionnement = df['Depenses_Fonctionnement'][i]
            depenses_investissement = df['Depenses_Investissement'][i]
            depenses_totales = depenses_fonctionnement + depenses_investissement
            secteur = Secteur.objects.get(nom=nom_secteur)
            region = Region.objects.get(codeinsee=codeinsee)
            annee = "2019"
            
            DepensesRegion.objects.get_or_create(region=region, secteur=secteur, depenses_fonctionnement=depenses_fonctionnement,
            depenses_investissement=depenses_investissement, depenses_totales=depenses_totales, annee=annee)
        """
        with open('admindivisions/data/REGION_SIMPLIFIED.json') as f:
            data = json.load(f)

            for feature in data['features']: 
                print(feature['properties']['INSEE_REG'])
                reg = Region.objects.get(codeinsee=feature['properties']['INSEE_REG'])
                depenses = DepensesRegion.objects.filter(region=reg, annee="2019")
                if len(depenses) == 0:
                    print(reg.codeinsee)
                    print("pas de données dépenses")
                    depenses_fonctionnement = -1
                    depenses_investissement = -1
                    depenses_totales = -1
                    secteur = -1
                    feature["properties"].update({'depenses': {'Patrimoines': {'DEPENSESFONCTIONNEMENT': depenses_fonctionnement, 'DEPENSESFINVESTISSEMENT': depenses_investissement, "DEPENSESTOTALES": depenses_totales}}})
                else:
                    for dep in depenses:                
                        depenses_fonctionnement = dep.depenses_fonctionnement
                        depenses_investissement = dep.depenses_investissement
                        depenses_totales = dep.depenses_totales
                        secteur = dep.secteur.nom
                        try:
                            feature["properties"]['depenses'].update({secteur: {'DEPENSESFONCTIONNEMENT': depenses_fonctionnement, 'DEPENSESFINVESTISSEMENT': depenses_investissement, "DEPENSESTOTALES": depenses_totales}})
                        except:
                            feature["properties"].update({'depenses': {secteur: {'DEPENSESFONCTIONNEMENT': depenses_fonctionnement, 'DEPENSESFINVESTISSEMENT': depenses_investissement, "DEPENSESTOTALES": depenses_totales}}})
                                                                     
            with open('admindivisions/data/REGION_DEPENSES.json', 'w') as f:
                json.dump(data, f)
