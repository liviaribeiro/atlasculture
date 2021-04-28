import json
import pandas as pd 
from django.core.management.base import BaseCommand
from admindivisions.models import Commune, Departement, Region, Entreprises_communes, Entreprises_departements, Entreprises_regions
from django.contrib.gis.geos import MultiPolygon, Polygon
from django.contrib.gis.geos import GEOSGeometry
import os
from atlasculture.settings import BASE_DIR


class Command(BaseCommand):

    def handle(self, *args, **options):
        """
        csv_file = os.path.join(BASE_DIR, 'admindivisions/data/Etablissements culturels par commune.xlsx')

        df = pd.read_excel(csv_file)
        print(df)
        
        #Communes
        for i in df.index:
            codeinsee = str(df['DC'][i])
            if len(codeinsee) == 4:
                codeinsee = "0"+codeinsee
            effectifs_total = df["Effectifs salariés en équivalent temps plein de l'ensemble des secteurs marchands"][i]
            effectifs_culture = df["Effectifs salariés en équivalent temps plein des secteurs culturels marchands"][i]
            try:
                commune = Commune.objects.get(codeinsee=codeinsee, year=2017)
            except:
                print(codeinsee)
                continue
            Entreprises_communes.objects.get_or_create(commune=commune, effectifs_total=effectifs_total, effectifs_culture=effectifs_culture)
        
        for i in df.index:
            codeinsee = str(df['DC'][i])
            if len(codeinsee) == 4:
                codeinsee = "0"+codeinsee
            etablissements_total = df["nb_etab_march"][i]
            etablissements_culture = df["n_cult"][i]
            try:
                commune = Commune.objects.get(codeinsee=codeinsee, year=2017)
            except:
                print(codeinsee)
                continue
            entreprise_com = Entreprises_communes.objects.get(commune=commune) 
            entreprise_com.etablissements_total=etablissements_total
            entreprise_com.etablissements_culture=etablissements_culture
            entreprise_com.save()
        
        """
        """
        #Régions
        for i in df.index:
            codeinsee = str(df['Code région'][i])
            effectifs_total = df["Effectifs salariés de l'ensemble des secteurs marchands en ETP (unités)"][i]
            effectifs_culture = df["Effectifs salariés en ETP des secteurs culturels"][i]
            print(codeinsee)
            region = Region.objects.get(codeinsee=codeinsee)
            Entreprises_regions.objects.get_or_create(region=region, effectifs_total=effectifs_total, effectifs_culture=effectifs_culture)
        

        for i in df.index:
            codeinsee = str(df['Code région'][i])
            etablissements_total = df["Nombre d'établissements marchands"][i]
            etablissements_culture = df["Nombre d'établissements culturels marchands"][i]
            print(codeinsee)
            region = Region.objects.get(codeinsee=codeinsee)
            entreprise_region = Entreprises_regions.objects.get(region=region) 
            entreprise_region.etablissements_total=etablissements_total
            entreprise_region.etablissements_culture=etablissements_culture
            entreprise_region.save()
        """
        """
        #Départements
        for i in df.index:
            codeinsee = str(df['Département'][i])
            if len(codeinsee) == 1:
                codeinsee = "0"+codeinsee
            effectifs_total = df["Effectifs salariés en équivalent temps plein de l'ensemble du secteur marchand"][i]
            effectifs_culture = df["Effectifs salariés en équivalent temps plein du secteur culturel marchand"][i]
            print(codeinsee)
            departement = Departement.objects.get(codeinsee=codeinsee)
            Entreprises_departements.objects.get_or_create(departement=departement, effectifs_total=effectifs_total, effectifs_culture=effectifs_culture)
        
        
        for i in df.index:
            codeinsee = str(df['Département'][i])
            if len(codeinsee) == 1:
                codeinsee = "0"+codeinsee
            etablissements_total = df["Nombre d'Établissements marchands"][i]
            etablissements_culture = df["Nombre d'Établissements culturels marchands"][i]
            print(codeinsee)
            departement = Departement.objects.get(codeinsee=codeinsee)
            entreprise_departement = Entreprises_departements.objects.get(departement=departement) 
            entreprise_departement.etablissements_total=int(etablissements_total.replace(" ",""))
            entreprise_departement.etablissements_culture=etablissements_culture
            entreprise_departement.save()
        """
        with open('admindivisions/data/COMMUNE-2017.json') as f:
            data = json.load(f)

        for feature in data['features']: 
            try:
                com = Commune.objects.get(codeinsee=feature['properties']['insee'], year="2017")
            except:
                print(feature['properties']['insee'])
                print("commune ne pas trouvé")
                continue
            try:
                entreprise = Entreprises_communes.objects.get(commune=com)
         
            except:
                effectifs_total = -1
                effectifs_culture = -1
                etablissements_total = -1
                etablissements_culture = -1
                pourcentage_effectifs = -1
                pourcentage_etablissements = -1
                feature["properties"].update({'EFFECTIFSTOAL17': effectifs_total, 'EFFECTIFSCULTURE17': effectifs_culture, 
                "POURCENTAGEEFFECTIFS": pourcentage_effectifs, 'ETABLISSEMENTSTOTAL17': etablissements_total, 
                "ETLABISSEMENTSCULTURE17":etablissements_culture, "POURCENTAGEETABLISSEMENTS":pourcentage_etablissements})
                continue

            effectifs_total = entreprise.effectifs_total
            effectifs_culture = entreprise.effectifs_culture
            etablissements_total = entreprise.etablissements_total
            print(entreprise.etablissements_culture)

            etablissements_culture = entreprise.etablissements_culture
            if effectifs_total == 0:
                pourcentage_effectifs = 0
            else: 
                pourcentage_effectifs = effectifs_culture/effectifs_total
            if etablissements_total == 0:
                pourcentage_etablissements = 0
            else: 
                pourcentage_etablissements = etablissements_culture/etablissements_total
            print(pourcentage_etablissements)
    
            feature["properties"].update({'EFFECTIFSTOAL17': effectifs_total, 'EFFECTIFSCULTURE17': effectifs_culture, 
            "POURCENTAGEEFFECTIFS": pourcentage_effectifs, 'ETABLISSEMENTSTOTAL17': etablissements_total, 
            "ETLABISSEMENTSCULTURE17":etablissements_culture, "POURCENTAGEETABLISSEMENTS":pourcentage_etablissements})
                                                                                            
        with open('admindivisions/data/COMMUNE_ENTREPRISE.json', 'w') as f:
            json.dump(data, f)
        
        """
        #Départements
        with open('admindivisions/data/DEPARTEMENT_SIMPLIFIED.json') as f:
            data = json.load(f)

        for feature in data['features']: 
            dep = Departement.objects.get(codeinsee=feature['properties']['INSEE_DEP'])
            try: 
                entreprise = Entreprises_departements.objects.get(departement=dep)
            except:
                print(dep.codeinsee)
                print("pas de données d'entreprise")
                effectifs_total = -1
                effectifs_culture = -1
                etablissements_total = -1
                etablissements_culture = -1
                pourcentage_effectifs = -1
                pourcentage_etablissements = -1
                feature["properties"].update({'EFFECTIFSTOAL17': effectifs_total, 'EFFECTIFSCULTURE17': effectifs_culture, 
                "POURCENTAGEEFFECTIFS": pourcentage_effectifs, 'ETABLISSEMENTSTOTAL17': etablissements_total, 
                "ETLABISSEMENTSCULTURE17":etablissements_culture, "POURCENTAGEETABLISSEMENTS":pourcentage_etablissements})
                continue
            
            effectifs_total = entreprise.effectifs_total
            effectifs_culture = entreprise.effectifs_culture
            etablissements_total = entreprise.etablissements_total
            etablissements_culture = entreprise.etablissements_culture
            if effectifs_total == 0:
                pourcentage_effectifs = 0
            else: pourcentage_effectifs = effectifs_culture/effectifs_total
            if etablissements_total == 0:
                pourcentage_etablissements = 0
            else: pourcentage_etablissements = etablissements_culture/etablissements_total
    
            feature["properties"].update({'EFFECTIFSTOAL17': effectifs_total, 'EFFECTIFSCULTURE17': effectifs_culture, 
            "POURCENTAGEEFFECTIFS": pourcentage_effectifs, 'ETABLISSEMENTSTOTAL17': etablissements_total, 
            "ETLABISSEMENTSCULTURE17":etablissements_culture, "POURCENTAGEETABLISSEMENTS":pourcentage_etablissements})
                                                                                            
        with open('admindivisions/data/DEPARTEMENT_ENTREPRISE.json', 'w') as f:
            json.dump(data, f)
        """
        """
        with open('admindivisions/data/REGION_SIMPLIFIED.json') as f:
            data = json.load(f)

        for feature in data['features']: 
            print(feature['properties']['INSEE_REG'])
            reg = Region.objects.get(codeinsee=feature['properties']['INSEE_REG'])
            try: 
                entreprise = Entreprises_regions.objects.get(region=reg)
            except:
                print(reg.codeinsee)
                print("pas de données d'entreprise")
                effectifs_total = -1
                effectifs_culture = -1
                etablissements_total = -1
                etablissements_culture = -1
                pourcentage_effectifs = -1
                pourcentage_etablissements = -1
                feature["properties"].update({'EFFECTIFSTOAL17': effectifs_total, 'EFFECTIFSCULTURE17': effectifs_culture, 
                "POURCENTAGEEFFECTIFS": pourcentage_effectifs, 'ETABLISSEMENTSTOTAL17': etablissements_total, 
                "ETLABISSEMENTSCULTURE17":etablissements_culture, "POURCENTAGEETABLISSEMENTS":pourcentage_etablissements})
                continue
            
            effectifs_total = entreprise.effectifs_total
            effectifs_culture = entreprise.effectifs_culture
            etablissements_total = entreprise.etablissements_total
            etablissements_culture = entreprise.etablissements_culture
            if effectifs_total == 0:
                pourcentage_effectifs = 0
            else: pourcentage_effectifs = effectifs_culture/effectifs_total
            if etablissements_total == 0:
                pourcentage_etablissements = 0
            else: pourcentage_etablissements = etablissements_culture/etablissements_total
    
            feature["properties"].update({'EFFECTIFSTOAL17': effectifs_total, 'EFFECTIFSCULTURE17': effectifs_culture, 
            "POURCENTAGEEFFECTIFS": pourcentage_effectifs, 'ETABLISSEMENTSTOTAL17': etablissements_total, 
            "ETLABISSEMENTSCULTURE17":etablissements_culture, "POURCENTAGEETABLISSEMENTS":pourcentage_etablissements})
                                                                                            
        with open('admindivisions/data/REGION_ENTREPRISE.json', 'w') as f:
            json.dump(data, f)

        """
        
        