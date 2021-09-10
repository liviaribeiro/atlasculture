import pandas as pd 
import requests
from equipements.models import (EquipementType, Label, Source, Domaine,
 Equipement, Cinema, Bibliotheque, Librairie, Architecture, MonumentHistorique, Unesco, Function)
from admindivisions.models import Commune
from django.core.management.base import BaseCommand
from django.contrib.gis.geos import Point
from atlasculture.settings import BASE_DIR
import os

class Command(BaseCommand):

    def handle(self, *args, **options):

        excel_file = os.path.join(BASE_DIR, 'equipements/data/Equipements_ajouter.xlsx')

        df = pd.read_excel(excel_file)
        #df = df.head(50)
        df = df.fillna("")
        
        for i in df.index:
            id_DEPS = df['Identifiant_Deps'][i]
            
            codeinsee = df['Code_Insee'][i]

            print(id_DEPS)

            source = df['Source'][i]
            domaine = df['Domaine'][i]
            #sous_domaine = df['Sous_domaines'][i]
            fonction1 = df['Fonction_1'][i]
            fonction2 = df['Fonction_2'][i]
            equipement_type = df['Filtre_atlas'][i]
            nom = df['Nom'][i]
            adresse = df['Adresse_postale'][i]
            complement_adresse = df['Complement_Adresse'][i]

            codeinsee_arrondt = df['Code_Insee_Arrondt'][i]
            gps = df['Coordonnées gps'][i]

            gps = gps[1:-1].split(",")
            try:
                lat = float(gps[0])
                lon = float(gps[1])
                gps = Point(lon,lat)
            except:
                gps=None

            try:
                source = Source.objects.get(name__iexact=source)
            except:
                source = None
            
            try:
                domaine = Domaine.objects.get(name__iexact=domaine)
            except:
                domaine = None
                continue

            try:
                equipement_type = EquipementType.objects.get(name__iexact=equipement_type)
            except:
                equipement_type = None
                continue
            
            try:
                fonction = Function.objects.get(name__iexact=fonction1)
            except:
                fonction = None
            
            try:
                fonction_secondaire = Function.objects.get(name__iexact=fonction2)
            except:
                fonction_secondaire = None

            try:
                commune = Commune.objects.get(codeinsee=codeinsee, year="2021")
            except:
                print(codeinsee)
                continue

            equipement, created = Equipement.objects.get_or_create(id_DEPS=id_DEPS,
                source=source,
                domaine=domaine,
                fonction=fonction,
                fonction_secondaire=fonction_secondaire,
                equipement_type=equipement_type,
                nom=nom,
                adresse=adresse,
                complement_adresse=complement_adresse,
                codeinsee_arrondt=codeinsee_arrondt,
                commune=commune,
                gps=gps
                )        