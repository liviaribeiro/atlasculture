import pandas as pd 
import requests
import math
from equipements.models import (Equipement_Type, Label, Discipline_Equipement, Source,
 Equipement, Cinema, Bibliotheque, Monument_Historique)
from admindivisions.models import Commune
from django.core.management.base import BaseCommand
from django.contrib.gis.geos import Point
from atlasculture.settings import BASE_DIR
import os


class Command(BaseCommand):

    def handle(self, *args, **options):

        """
        equipements = Equipement.objects.all()
        df = pd.DataFrame(columns=('Source', 'Discipline', 'Equipement', 'Nom', 'Adresse', 'Adresse Normalisée',
            "Complement d'adresse", "Code Postal", "Commune", "Commune Normalisée", "Code_INSEE", "Code_INSEE_Arrondt",
            "Labels", "Type_Cinema", "Nombre_de_fauteuils_de_cinema", "Nombre_de_salles_de_cinema", "Ecrans_3D",
            "Typologie_Bibliotheque", "Surface_Bibliotheque", "Surface_Reseau_Biblio", "Proprietaire_Monument_historique",
            "Identifiant_origine", "Coordonnées GPS"))

        for eq in equipements:
            if eq.equipement_type.name == "Cinéma":
                type_cinema = eq.cinema.cinema_type
                number_chairs = eq.cinema.number_chairs
                number_rooms = eq.cinema.number_rooms
                rooms_3d = eq.cinema.rooms_3d
            else:
                type_cinema = ""
                number_chairs = ""
                number_rooms = ""
                rooms_3d = ""
                
            if eq.equipement_type.name == "Bibliotheque":
                typologie_biblio = eq.bibliotheque.typology
                surface_biblio = eq.bibliotheque.surface
                surface_network_biblio = eq.bibliotheque.surface_network
            else:
                typologie_biblio = ""
                surface_biblio = ""
                surface_network_biblio = ""

            if eq.equipement_type.name == "Monument Historique":
                owner_MH = df.monument_historique.owner
            else:
                owner_MH = ""

            if eq.commune is None:
                commune = ""
                codeinsee = ""
            else:
                commune = eq.commune
                codeinsee = eq.commune.codeinsee

            df.append({'Source': eq.source, 'Discipline':eq.discipline, 'Equipement':eq.equipement_type, 'Nom':eq.name,
            'Adresse':eq.address, 'Adresse Normalisée':eq.formatted_address, "Complement d'adresse":eq.complement_address,
            "Code Postal":eq.postal_code, "Commune":commune, "Commune Normalisée":eq.city, "Code_INSEE":codeinsee,
            "Code_INSEE_Arrondt":eq.codeinsee_arrondt, "Labels":eq.labels, "Type_Cinema":type_cinema,
            "Nombre_de_fauteuils_de_cinema":number_chairs, "Nombre_de_salles_de_cinema":number_rooms, "Ecrans_3D":rooms_3d,
            "Typologie_Bibliotheque":typologie_biblio, "Surface_Bibliotheque":surface_biblio, 
            "Surface_Reseau_Biblio":surface_network_biblio, "Proprietaire_Monument_historique":owner_MH,
            "Identifiant_origine":eq.id_origin, "Coordonnées GPS":eq.gps}, ignore_index=True)
            
        print(df)
        #df.to_excel('export.xlsx')
        """


        # pour les MH : prendre le premier code insee de la liste
        
        file_path = os.path.join(BASE_DIR, 'data/Base Equipements DEPS_last_fix_address cinema.xlsx')

        df = pd.read_excel(file_path)

        print("OK")

        for i in df.index: 
            print(i)
            source = df['Source'][i]
            discipline = df['Discipline'][i]
            equipement_type = df['Equipement'][i]
            name = df['Nom'][i]
            address = df['Adresse'][i]
            formatted_address = df['Adresse corrigé'][i]
            complement_address = df["Complement d'adresse"][i]
            postal_code = str(df['Code_Postal'][i])
            city = df['Ville corrigé'][i]
            codeinsee = str(df['Code_Insee'][i])
            codeinsee_arrondt = str(df['Code_Insee_Arrondt'][i])
            label1 = df['Nom_Label'][i]
            label2 = df['Label_2'][i]
            cinema_type = df['Type_Cinema'][i]
            number_chairs =df['Nombre_de_fauteuils_de_cinema'][i]
            number_rooms = df['Nombre_de_salles_de_cinema'][i]
            rooms_3d = df['Ecrans_3D'][i]
            typology_biblio = df['Typologie_Bibliotheque'][i]
            surface_biblio = df['Surface_Bibliotheque'][i]
            surface_network_biblio = df['Surface_Reseau_Biblio'][i]
            owner_MH = df["Proprietaire_Monument_historique"][i]
            id_origin = df["Identifiant_origine"][i]
            gps = df["Coordonnées GPS"][i]

            discipline = Discipline_Equipement.objects.get(name__iexact=discipline)
            source = Source.objects.get(name__iexact=source)
            equipement_type = Equipement_Type.objects.get(name__iexact=equipement_type)
            print(name)

            if type(address) == float:
                address = None

            if type(city) == float:
                city = None

            if type(formatted_address) == float:
                formatted_address = None
            
            if type(complement_address) == float:
                complement_address = None

            if type(postal_code) == float:
                postal_code = None

            if type(codeinsee) == float:
                codeinsee = None

            if type(codeinsee_arrondt) == float:
                codeinsee_arrondt = None
            
            if gps == " " or type(gps) == float :
                gps = None
            else:
                gps = gps[1:-1].split(",")
                gps = Point(float(gps[1]), float(gps[0]))

            if type(id_origin) == float:
                id_origin = None

            if type(cinema_type) == float:
                cinema_type = None

            if type(number_chairs) == float:
                number_chairs = None

            if type(number_rooms) == float:
                number_rooms = None

            if type(rooms_3d) == float:
                rooms_3d = None

            if type(typology_biblio) == float:
                typology_biblio = None

            if type(surface_biblio) == float:
                surface = None

            if type(surface_network_biblio) == float:
                surface_network = None

            if type(owner_MH) == float:
                owner_MH = None            

            try: 
                commune = Commune.objects.get(codeinsee=codeinsee)
            except Commune.DoesNotExist:
                commune = None

            print("********")
            print(equipement_type)

            if equipement_type == "Cinéma":
                cinema, created = Cinema.objects.get_or_create(source=source, discipline=discipline, equipement_type=equipement_type, name=name,
                address=address,formatted_address=formatted_address, complement_address=complement_address, postal_code=postal_code,
                codeinsee_arrondt=codeinsee_arrondt, commune=commune, id_origin=id_origin, gps=gps, cinema_type=cinema_type,
                number_chairs=number_chairs,number_rooms=number_rooms,rooms_3d=rooms_3d, city=city, codeinsee=codeinsee)
                print(cinema)
                if created == False:
                    print('doublon')
                
                if (type(label1) == str and label1 != "Non renseigné") and type(label2) == str:
                    label1 = Label.objects.get(name__iexact=label1.strip())
                    label2 = Label.objects.get(name__iexact=label2.strip())
                    cinema.labels.add(label1.pk, label2.pk)
                
                if (type(label1) == str and label1 != "Non renseigné") and type(label2) != str: 
                    label1 = Label.objects.get(name__iexact=label1.strip())
                    cinema.labels.add(label1.pk)

            if equipement_type == "Bibliotheque":
                bibliotheque, created = Bibliotheque.objects.get_or_create(source=source, discipline=discipline, equipement_type=equipement_type, name=name,
                address=address,formatted_address=formatted_address, complement_address=complement_address, postal_code=postal_code,
                codeinsee_arrondt=codeinsee_arrondt, commune=commune, id_origin=id_origin, gps=gps, typology=typology_biblio, surface=surface_biblio,
                surface_network=surface_network_biblio, city=city, codeinsee=codeinsee)         
                
                if (type(label1) == str and label1 != "Non renseigné") and type(label2) == str:
                    label1 = Label.objects.get(name__iexact=label1.strip())
                    label2 = Label.objects.get(name__iexact=label2.strip())
                    bibliotheque.labels.add(label1.pk, label2.pk)
                
                if (type(label1) == str and label1 != "Non renseigné") and type(label2) != str: 
                    label1 = Label.objects.get(name__iexact=label1.strip())
                    bibliotheque.labels.add(label1.pk)

            if equipement_type == "Monument Historique":
                mh, created = Bibliotheque.objects.get_or_create(source=source, discipline=discipline, equipement_type=equipement_type, name=name,
                address=address,formatted_address=formatted_address, complement_address=complement_address, postal_code=postal_code,
                codeinsee_arrondt=codeinsee_arrondt, commune=commune, id_origin=id_origin, gps=gps, owner=owner_MH, city=city, codeinsee=codeinsee)

                if (type(label1) == str and label1 != "Non renseigné") and type(label2) == str:
                    label1 = Label.objects.get(name__iexact=label1.strip())
                    label2 = Label.objects.get(name__iexact=label2.strip())
                    mh.labels.add(label1.pk, label2.pk)
                
                if (type(label1) == str and label1 != "Non renseigné") and type(label2) != str: 
                    label1 = Label.objects.get(name__iexact=label1.strip())
                    mh.labels.add(label1.pk)

            else:
                eq, created = Equipement.objects.get_or_create(source=source, discipline=discipline, equipement_type=equipement_type, name=name,
                address=address,formatted_address=formatted_address, complement_address=complement_address, postal_code=postal_code,
                codeinsee_arrondt=codeinsee_arrondt, commune=commune, id_origin=id_origin, gps=gps, city=city, codeinsee=codeinsee)

                if (type(label1) == str and label1 != "Non renseigné") and type(label2) == str:
                    label1 = Label.objects.get(name__iexact=label1.strip())
                    label2 = Label.objects.get(name__iexact=label2.strip())
                    eq.labels.add(label1.pk, label2.pk)
                
                if (type(label1) == str and label1 != "Non renseigné") and type(label2) != str: 
                    label1 = Label.objects.get(name__iexact=label1.strip())
                    eq.labels.add(label1.pk)
                
            
"""
sources =  ["Artcena"
        "CNC",
        "France Archives",
        "Ministère de la Culture",
        "Ministère de la Culture - Deps",
        "Ministère de la Culture - DGCA",
        "Ministère de la Culture - DGMIC",
        "Ministère de la Culture - DGP",
        "Ministère de la Culture - DPPDGPAT",
        "Ministère de la Culture -DGCA",
        "Ministère de la Culture- Centre National du Livre",
        "Unesco"]

for source in sources :
    Source.objects.create(name=source)

"""
"""
total = {
            "Bibliotheque":{},
            "Centre chorégraphique national":{},
            "Centre D'Art Contemporain":{},
            "Centre de développement chorégraphique national":{},
            "Centre Dramatique National":{},
            "Centre Dramatique Régional":{},
            "Centre national de création musicale":{},
            "Centre national des arts de la rue":{},
            "Cinéma":{},
            "Conservatoire":{},
            "Enseignement superieur":{},
            "Fonds Régional D'Art Contemporain":{},
            "Jardin Remarquable":{},
            "Librairie labellisée LIR ou LR":{},
            "Maison des Illustres":{},
            "Monument Historique":{},
            "Monument national":{},
            "MuseeDeFrance":{},
            "Opéra national en région":{},
            "Orchestre national en région":{},
            "Patrimoine Mondial Unesco":{},
            "Pôle national des arts du cirque":{},
            "Scène Conventionnée":{},
            "Scène Conventionnée mention Art et création":{},
            "Scène de musiques actuelles":{},
            "Scène Nationale":{},
            "Service d'archives":{},
            "Théâtre de ville":{},
            "Théâtre lyrique d'intérêt national":{},
            "Théâtre national":{},
            "Théâtre privé":{},
            "Zénith":{}
        }
"""