import pandas as pd 
import requests
import math
from equipements.models import (EquipementType, Label, Source, Domaine,
 Equipement, Cinema, Bibliotheque, Librairie, Architecture, MonumentHistorique, Unesco, Function)
from admindivisions.models import Commune
from django.core.management.base import BaseCommand
from django.contrib.gis.geos import Point
from atlasculture.settings import BASE_DIR
import os

class Command(BaseCommand):

    def handle(self, *args, **options):

        excel_file = os.path.join(BASE_DIR, 'equipements/data/Basilic_Base des lieux et équipements culturels.xlsx')

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

            #id_origine = df['Identifiant_origine'][i]
            gps = df['Coordonnées gps'][i]

            gps = gps[1:-1].split(",")
            try:
                lat = float(gps[0])
                lon = float(gps[1])
                gps = Point(lon,lat)
            except:
                gps=None

            """
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
            """

            try:
                source = Source.objects.get(name__iexact=source)
            except:
                source = None
            
            try:
                domaine = Domaine.objects.get(name__iexact=domaine)
            except:
                domaine = None
                continue
            """
            try:
                sous_domaine = Domaine.objects.get(name__iexact=sous_domaine)
            except:
                sous_domaine = None
            """

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

            """
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
                mh, created = MonumentHistorique.objects.get_or_create(quipement=equipement,owner=owner)
            
            if equipement_type == "Patrimoine mondial Unesco":
                unesco, created = Unesco.objects.get_or_create(quipement=equipement,precision_unesco=precision_unesco,
                    pays=pays)

            """