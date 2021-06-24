import json
import pandas as pd 
from django.core.management.base import BaseCommand
from admindivisions.models import Commune, Cadrage, TypologieEvolution
from django.contrib.gis.geos import MultiPolygon, Polygon
from django.contrib.gis.geos import GEOSGeometry
import os
from atlasculture.settings import BASE_DIR
import math


class Command(BaseCommand):

    def handle(self, *args, **options):

        """
        communes = Commune.objects.filter(year="2020")

        for commune in communes:
            cad = Cadrage.objects.get(commune=commune, year="2017")

            if cad.surface == 0 or cad.surface == None or cad.population == 0 or cad.population == None:
                density = None
            else:
                density = cad.population/cad.surface

            if cad.evolution == None or cad.soldenaturel == None or cad.soldeapparent == None:
                typologie_evol = -1

            else :   
                if cad.evolution >= 0:
                    typologie_evol = 1
                    if cad.soldenaturel > 0 and cad.soldeapparent <= 0:
                        typologie_evol = 2
                    if cad.soldenaturel <= 0 and cad.soldeapparent > 0:
                        typologie_evol = 3
                if cad.evolution < 0:
                    typologie_evol = 6
                    if cad.soldenaturel < 0 and cad.soldeapparent >= 0:
                        typologie_evol = 4
                    if cad.soldenaturel >= 0 and cad.soldeapparent < 0:
                        typologie_evol = 5

            youthindex = -1
            if cad.less25 == None or cad.plus65 == None:
               youthindex = -1

            if cad.less25 <= 0 or cad.plus65 <= 0:
               youthindex = -1

            else:
                youthindex = cad.less25*100/cad.plus65

            cad.density = density   
            cad.youthindex = youthindex
            cad.typologie_evol = typologie_evol
            cad.save()

        """
        """
        csv_file = os.path.join(BASE_DIR, 'admindivisions/data/Cadrage2017.xlsx')

        df = pd.read_excel(csv_file)
        print(df.head())

        for i in df.index:
            codeinsee = df['CODGEO'][i]
            print(codeinsee)
            #population = df['P17_POP'][i]
            #births = df['NAIS1217'][i]
            #deaths = df['DECE1217'][i] 
            #livingstandard = df['MED17'][i]
            #surface = df['SUPERF'][i]
            tauxpauvrete = df['TP6017'][i]

            if math.isnan(tauxpauvrete):
                tauxpauvrete = None

            #evolution = df['EVOLANMOYENNE1217'][i]
            #soldeapparent = df['SOLDEAP1217'][i]
            #soldenaturel = df['SOLDENAT1217'][i]

            #if math.isnan(livingstandard):
            #   livingstandard = None

            #if type(evolution) == str or type(soldeapparent) == str or type(soldenaturel) == str:
            #    evolution = None
            #    soldeapparent = None
            #    soldenaturel = None

            commune = Commune.objects.get(codeinsee=codeinsee, year="2020")
          
            cad = Cadrage.objects.get(commune=commune, year="2017")

            

            #cadrage.evolution = evolution
            #cadrage.soldeapparent = soldeapparent
            #cadrage.soldenaturel = soldenaturel
            cad.tauxpauvrete = tauxpauvrete

            cad.save()
        """
        
        with open('admindivisions/data/COMMUNE_CADRAGE_SIMPLIFIED.json') as f:
            data = json.load(f)

        for feature in data['features']: 
            com = Commune.objects.get(codeinsee=feature['properties']['INSEE_COM'], year="2020")
            print(com.codeinsee)
            try:
                cad = Cadrage.objects.get(commune=com, year="2017")
            #Mayotte pas inclus
            except:
                print("pas de données de cadrage")
        
            tauxpauvrete = cad.tauxpauvrete
            if tauxpauvrete is None:
                tauxpauvrete = -1
            
            """
            #densité
            density = cad.density
            if density is None:
                density = -1

            #niveau de vie
            livingstandard = cad.livingstandard
            if livingstandard is None or livingstandard == 0:
                livingstandard = -1

            #Indice de jeunesse
            youthindex = cad.youthindex
            if youthindex is None:
               youthindex = -1

            #typologie de l'évolution
            typologie_code = cad.typologie_evol
            
        
            if typologie_code == -1:
                typologie_nom = "Données non disponibles"
            else:
                typologie = TypologieEvolution.objects.get(code=typologie_code)
                typologie_nom = typologie.typologie
            """
        
            feature["properties"].update({'TAUXPAUVRETE17': tauxpauvrete})
                                                                                      
        with open('admindivisions/data/COMMUNE_CADRAGE_SIMPLIFIED.json', 'w') as f:
            json.dump(data, f)
        
