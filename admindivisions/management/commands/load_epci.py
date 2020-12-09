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
        

        #load EPCI
        csv_file = os.path.join(BASE_DIR, 'admindivisions/data/epci2020.csv')

        df = pd.read_csv(csv_file)

        for i in df.index:
            epci_type = EpciType.objects.get(acronym=df['NATURE_EPCI'][i])  
            codesiren = df['EPCI'][i]
            name = df['LIBEPCI'][i]
            Epci.objects.get_or_create(codesiren=codesiren,
            name = name,
            epci_type=epci_type
            )
        """
        
        #load zonage
        
        with open(options['json_file']) as f:
            data_list = json.load(f)
        
        for data in data_list['features']:
           
            type_geom = data['geometry']['type']
            codesiren=data['properties']['CODE_EPCI']
            epci = Epci.objects.get(codesiren=codesiren)
            print(epci)
            
            if type_geom == 'Polygon':
                
                poly = data['geometry']['coordinates']
                if len(poly) > 1 :
                    ext_coords = poly[0]
                    int_coords = []
                    for i in range(1,len(poly)):
                        int_coords.append(poly[i])
                    epci.geom = MultiPolygon([Polygon(ext_coords, int_coords[0])])
                else :
                    epci.geom = MultiPolygon([Polygon(poly[0])])

            else :
                multipoly = []
                for poly in data['geometry']['coordinates']: 
                    if len(poly) > 1 :
                        ext_coords = poly[0]
                        int_coords = []
                        for i in range(1,len(poly)):
                            int_coords.append(poly[i])
                        
                        multipoly.append(Polygon(ext_coords, int_coords[0]))
                    else:
                        multipoly.append(Polygon(poly[0]))
                    
                epci.geom = MultiPolygon(multipoly)

            epci.save()
        """