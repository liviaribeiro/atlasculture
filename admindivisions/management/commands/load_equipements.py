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

        excel_file = os.path.join(BASE_DIR, 'equipements/data/Geoloc Biblios.xlsx')

        df = pd.read_excel(excel_file)
        #df = df.head(50)
        df = df.fillna("")
        
        for i in df.index:
            id_DEPS = df['Identifiant_Deps'][i]
            codeinsee = df['Code_Insee'][i]

            if df['Region'][i] == "Collectivité d'outre mer":
                print(id_DEPS, codeinsee)
                continue
            
            if df['Region'][i] == "Etranger":
                print(id_DEPS, codeinsee)
                continue

            source = df['Source'][i]
            domaine = df['Domaine'][i]
            sous_domaine = df['Sous_domaine'][i]
            fonction1 = df['Fonction_01'][i]
            fonction2 = df['Fonction_02'][i]
            equipement_type = df['Equipement'][i]
            nom = df['Nom'][i]
            adresse = df['Adresse'][i]
            complement_adresse = df['Complement_Adresse'][i]
            
            codeinsee_secondaires = []
            
            codeinsee2 = df['Code_Insee_02'][i]
            codeinsee3 = df['Code_Insee_03'][i]
            codeinsee4 = df['Code_Insee_04'][i]
            codeinsee5 = df['Code_Insee_05'][i]
            codeinsee6 = df['Code_Insee_06'][i]
            codeinsee7 = df['Code_Insee_07'][i]
            codeinsee8 = df['Code_Insee_08'][i]
            codeinsee9 = df['Code_Insee_09'][i]
            codeinsee10 = df['Code_Insee_10'][i]
            codeinsee11 = df['Code_Insee_11'][i]
            codeinsee12 = df['Code_Insee_12'][i]
            codeinsee13 = df['Code_Insee_13'][i]
            codeinsee14 = df['Code_Insee_14'][i]
            codeinsee15 = df['Code_Insee_15'][i]

            if codeinsee2 != "":   
                codeinsee_secondaires.append(codeinsee2)
            if codeinsee3 != "":  
                codeinsee_secondaires.append(codeinsee3)
            if codeinsee4 != "": 
                codeinsee_secondaires.append(codeinsee4)
            if codeinsee5 != "": 
                codeinsee_secondaires.append(codeinsee5)
            if codeinsee6 != "":   
                codeinsee_secondaires.append(codeinsee6)
            if codeinsee7 != "":   
                codeinsee_secondaires.append(codeinsee7)
            if codeinsee8 != "":   
                codeinsee_secondaires.append(codeinsee8)
            if codeinsee9 != "":   
                codeinsee_secondaires.append(codeinsee9)
            if codeinsee10 != "":   
                codeinsee_secondaires.append(codeinsee10)
            if codeinsee11 != "":   
                codeinsee_secondaires.append(codeinsee11)
            if codeinsee12 != "":  
                codeinsee_secondaires.append(codeinsee12)
            if codeinsee13 != "":   
                codeinsee_secondaires.append(codeinsee13)
            if codeinsee14 != "":   
                codeinsee_secondaires.append(codeinsee14)
            if codeinsee15 != "":   
                codeinsee_secondaires.append(codeinsee15)

            codeinsee_arrondt = df['Code_Insee_Arrondt'][i]
            
            #cinema
            cinema_type = df['Type_Cinema'][i]
            number_chairs = df['Nombre_de_fauteuils_de_cinema'][i]
            number_rooms = df['Nombre_de_salles_de_cinema'][i]
            rooms_3d = df['Ecrans_3D'][i]
            #mh
            owner = df['Proprietaire_Monument_historique'][i]
            #bibliotheque
            typology = df['Typologie_Bibliotheque'][i]
            surface = df['Surface_Bibliotheque'][i]
            surface_network = df['Surface_Reseau_Biblio'][i]
            code_bib = df['code_bib'][i]
            code_ua = df['code_ua'][i]
            #library
            typology = df['Type_Librairie'][i]
            label_year = df['Annee_Label_Librairie'][i]
            #architecture = 
            precision_architecture = df['Precision_Architecture'][i]
            #unesco
            precision_unesco = df['Precision_site_Unesco'][i]
            pays = df['Pays_Monument_Unesco'][i]
        
            id_origine = df['Identifiant_origine'][i]
            gps = df['Coordonnées GPS [lat,lon]'][i]

            gps = gps[1:-1].split(",")
            lat = float(gps[0])
            lon = float(gps[1])
            gps = Point(lon,lat)

            try:
                source = Source.objects.get(name__iexact=source)
            except:
                source = None
            
            try:
                domaine = Domaine.objects.get(name__iexact=domaine)
            except:
                domaine = None
            
            try:
                sous_domaine = Domaine.objects.get(name__iexact=sous_domaine)
            except:
                sous_domaine = None

            try:
                equipement_type = Equipement_Type.objects.get(name__iexact=equipement_type)
            except:
                equipement_type = None
            
            try:
                fonction = Function.objects.get(name__iexact=fonction1)
            except:
                fonction = None
            
            try:
                fonction_secondaire = Function.objects.get(name__iexact=fonction2)
            except:
                fonction_secondaire = None

            commune = Commune.objects.get(codeinsee=codeinsee, year="2020")

            communes_secondaires = []

            for code in codeinsee_secondaires:
                com = Commune.objects.get(codeinsee=codeinsee, year="2020")
                communes_secondaires.append(com)

            equipement, created = Equipement.objects.get_or_create(id_DEPS=id_DEPS,
                source=source,
                domaine=domaine,
                sous_domaine=sous_domaine,
                fonction=fonction,
                fonction_secondaire=fonction_secondaire,
                equipement_type=equipement_type,
                nom=nom,
                adresse=adresse,
                complement_adresse=complement_adresse,
                codeinsee_arrondt=codeinsee_arrondt,
                commune=commune,
                id_origine=id_origine,
                gps=gps
                )

            equipement.save()

            for com in communes_secondaires:
                equipement.communes_secondaire.add(com)

            equipement.save()

            if equipement_type == "Cinéma":
                cinema, created = Cinema.objects.get_or_create(equipement=equipement,cinema_type=cinema_type,
                        number_chairs=number_chairs,
                        number_rooms=number_rooms,
                        rooms_3d=rooms_3d)

            if equipement_type == "Biliothèque municipale":
                biblio, created = Bibliotheuqe.objects.get_or_create(equipement=equipement,typology=typology,
                    surface=surface,
                    surface_network=surface_network,
                    code_bib=code_bib,
                    code_ua=code_ua)
                    
            if equipement_type == "Librairie labellisée":
                lib, created = Librairie.objects.get_or_create(equipement=equipement,typology=typology,
                    label_year=label_year)

            if equipement_type == "Architecture contemporaine remarquable":
                archi, created = Architecture.objects.get_or_create(quipement=equipement,precision_architecture=precision_architecture)
            
            if equipement_type == "Monument historique":
                mh, created = Monument_Historique.objects.get_or_create(quipement=equipement,owner=owner)
            
            if equipement_type == "Patrimoine mondial Unesco":
                unesco, created = Unesco.objects.get_or_create(quipement=equipement,precision_unesco=precision_unesco,
                    pays=pays)