import json
import os
import pandas as pd 
from django.core.management.base import BaseCommand
from admindivisions.models import Commune, Departement, Region, DepensesRegion, Secteur, Cadrage, DepensesDepartement, Epci, DepensesEPCI, DepensesCommunes
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
        """
        with open('admindivisions/data/REGION_SIMPLIFIED.json') as f:
            data = json.load(f)

            for feature in data['features']: 
                print(feature['properties']['INSEE_REG'])
                reg = Region.objects.get(codeinsee=feature['properties']['INSEE_REG'])
                deps = Departement.objects.filter(region=reg)
                coms = Commune.objects.filter(departement__in=deps, year="2020")
                cads = Cadrage.objects.filter(commune__in=coms)
                populations = [0 if cad.population is None else cad.population for cad in cads]
                population = sum(populations)
                depenses = DepensesRegion.objects.filter(region=reg, annee="2019")

                if len(depenses) == 0:
                    feature["properties"].update({'DEPENSESTOTALES': -1, 'POPULATION': population, "DEPENSESHABITANTS": -1})
                else:
                    depenses_totales = 0
                    for dep in depenses:                
                        depenses_totales += dep.depenses_totales
                    depenseshabitants=depenses_totales*1000/population
                    feature["properties"].update({'DEPENSESTOTALES': depenses_totales, 'POPULATION': population, "DEPENSESHABITANTS": depenseshabitants})
                                                                                             
            with open('admindivisions/data/REGION_DEPENSES.json', 'w') as f:
                json.dump(data, f)
          """  
        """
        source_file = os.path.join(BASE_DIR, 'admindivisions/data/Base_Depenses_Departements_2019.xlsx')

        df = pd.read_excel(source_file, dtype={'Departement':'string'})

        for i in df.index:
            codeinsee = df['Departement'][i]
            nom_secteur = df['Secteur'][i]
            depenses_fonctionnement = df['Depenses_Fonctionnement'][i]
            depenses_investissement = df['Depenses_Investissement'][i]
            depenses_totales = depenses_fonctionnement + depenses_investissement
            secteur = Secteur.objects.get(nom=nom_secteur)
            departement = Departement.objects.get(codeinsee=codeinsee)
            annee = "2019"
            
            DepensesDepartement.objects.get_or_create(departement=departement, secteur=secteur, depenses_fonctionnement=depenses_fonctionnement,
            depenses_investissement=depenses_investissement, depenses_totales=depenses_totales, annee=annee)
        """
        """
        with open('admindivisions/data/DEPARTEMENT_SIMPLIFIED.json') as f:
            data = json.load(f)

            for feature in data['features']: 
                print(feature['properties']['INSEE_DEP'])
                dep = Departement.objects.get(codeinsee=feature['properties']['INSEE_DEP'])
                coms = Commune.objects.filter(departement=dep, year="2020")
                cads = Cadrage.objects.filter(commune__in=coms)
                populations = [0 if cad.population is None else cad.population for cad in cads]
                population = sum(populations)
                depenses = DepensesDepartement.objects.filter(departement=dep, annee="2019")

                if len(depenses) == 0 or population==0:
                    print("********")
                    feature["properties"].update({'DEPENSESTOTALES': -1, 'POPULATION': population, "DEPENSESHABITANTS": -1})
                else:
                    depenses_totales = 0
                    for dep in depenses:                
                        depenses_totales += dep.depenses_totales
                    depenseshabitants=depenses_totales*1000/population
                    feature["properties"].update({'DEPENSESTOTALES': depenses_totales, 'POPULATION': population, "DEPENSESHABITANTS": depenseshabitants})
                                                                                             
            with open('admindivisions/data/DEPARTEMENT_DEPENSES.json', 'w') as f:
                json.dump(data, f)
        

        source_file = os.path.join(BASE_DIR, 'admindivisions/data/Base_Depenses_Communes_2019.xlsx')

        df = pd.read_excel(source_file, dtype={'Departement':'string'})

        for i in df.index:
            codeinsee = df['Departement'][i]
            nom_secteur = df['Secteur'][i]
            depenses_fonctionnement = df['Depenses_Fonctionnement'][i]
            depenses_investissement = df['Depenses_Investissement'][i]
            depenses_totales = depenses_fonctionnement + depenses_investissement
            secteur = Secteur.objects.get(nom=nom_secteur)
            departement = Departement.objects.get(codeinsee=codeinsee)
            annee = "2019"
            
            DepensesDepartement.objects.get_or_create(departement=departement, secteur=secteur, depenses_fonctionnement=depenses_fonctionnement,
            depenses_investissement=depenses_investissement, depenses_totales=depenses_totales, annee=annee)
        
        """
        
        source_file = os.path.join(BASE_DIR, 'admindivisions/data/Base_Depenses_EPCI_2019.xlsx')

        df = pd.read_excel(source_file, dtype={'Id_EPCI':'string'})

        for i in df.index:
            codeinsee = df['Epci'][i]
            print(codeinsee)
            population = df['Population_EPCI'][i]
            nom_secteur = df['Secteur'][i]
            depenses_fonctionnement = df['Depenses_Fonctionnement'][i]
            depenses_investissement = df['Depenses_Investissement'][i]
            depenses_totales = depenses_fonctionnement + depenses_investissement
            secteur = Secteur.objects.get(nom=nom_secteur)
            epci = Epci.objects.get(codesiren=codeinsee, annee="2019")
            annee = "2019"
            
            DepensesEPCI.objects.get_or_create(epci=epci, secteur=secteur, depenses_fonctionnement=depenses_fonctionnement,
            depenses_investissement=depenses_investissement, depenses_totales=depenses_totales, annee=annee, population=population)
        
        """
        source_file = os.path.join(BASE_DIR, 'admindivisions/data/Depenses_communes_2019.xlsx')

        df = pd.read_excel(source_file, dtype={'INSEE_COM':'string'})

        for i in df.index:
            codeinsee = df['INSEE_COM'][i]
            print(codeinsee)
            population = df['Population_municipale'][i]
            nom_secteur = df['Secteur'][i]
            depenses_fonctionnement = df['Depenses_Fonctionnement'][i]
            depenses_investissement = df['Depenses_Investissement'][i]
            depenses_totales = depenses_fonctionnement + depenses_investissement
            secteur = Secteur.objects.get(nom=nom_secteur)
            commune = Commune.objects.get(codeinsee=codeinsee, year="2019")
            annee = "2019"
            
            DepensesCommunes.objects.get_or_create(commune=commune, secteur=secteur, depenses_fonctionnement=depenses_fonctionnement,
            depenses_investissement=depenses_investissement, depenses_totales=depenses_totales, annee=annee, population=population)
        """
        """
        with open('admindivisions/data/COMMUNES_2019.json') as f:
            data = json.load(f)

            for feature in data['features']: 
                print(feature['properties']['INSEE_COM'])
                commune = Commune.objects.get(codeinsee=feature['properties']['INSEE_COM'], year="2019")

                depenses = DepensesCommunes.objects.filter(commune=commune, annee="2019")

                if len(depenses) == 0:
                    feature["properties"].update({'DEPENSESTOTALES': -1, 'POPULATION': -1, "DEPENSESHABITANTS": -1})
                else:
                    population = depenses[0].population
                    depenses_totales = 0
                    for dep in depenses:                
                        depenses_totales += dep.depenses_totales
                    depenseshabitants=depenses_totales*1000/population
                    feature["properties"].update({'DEPENSESTOTALES': depenses_totales, 'POPULATION': population, "DEPENSESHABITANTS": depenseshabitants})
                                                                                             
            with open('admindivisions/data/COMMUNE_DEPENSES.json', 'w') as f:
                json.dump(data, f)
 """

        """
        path = os.path.join(BASE_DIR, 'admindivisions/data/COMMUNE_CARTO_2019_SIMPLIFIED.json')

        with open(path) as f:
            data = json.load(f)
         
        filtered_data = [feature for feature in data["features"] if feature['properties']['STATUT'] != "Arrondissement municipal"]
        data["features"] = filtered_data

        with open('admindivisions/data/COMMUNES_2019.json', 'w') as f:
            json.dump(data, f)
        """