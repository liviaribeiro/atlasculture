import json
import pandas as pd 
from django.core.management.base import BaseCommand
from admindivisions.models import Departement, Commune
from django.contrib.gis.geos import MultiPolygon, Polygon

class Command(BaseCommand):

    def add_arguments(self, parser):
        parser.add_argument('json_file', type=str)

    def handle(self, *args, **options):
        """
        df = pd.read_csv(options['csv_file'])

        for i in df.index:
            codeinsee = df['com'][i]
            name = df['libelle'][i]
            dep = df['dep'][i]
            typecom = df['typecom'][i]

            if typecom == "COM":
                departement = Departement.objects.get(codeinsee=dep)

                Commune.objects.get_or_create(codeinsee=codeinsee,
                name = name,
                departement=departement
                )
        """

        with open(options['json_file']) as f:
            data_list = json.load(f)

        for data in data_list['features']:
           
            type_geom = data['geometry']['type']
            codeinsee=data['properties']['INSEE_COM']
            com = Commune.objects.get(codeinsee=codeinsee)
            print(com)
            
            if type_geom == 'Polygon':
                
                poly = data['geometry']['coordinates']
                if len(poly) > 1 :
                    ext_coords = poly[0]
                    int_coords = []
                    for i in range(1,len(poly)):
                        int_coords.append(poly[i])
                    com.geom = MultiPolygon([Polygon(ext_coords, int_coords[0])])
                else :
                    com.geom = MultiPolygon([Polygon(poly[0])])

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
                    
                com.geom = MultiPolygon(multipoly)

            com.save()
