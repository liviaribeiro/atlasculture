import json
import pandas as pd 
from django.core.management.base import BaseCommand
from admindivisions.models import Region
from django.contrib.gis.geos import MultiPolygon, Polygon


class Command(BaseCommand):

    def add_arguments(self, parser):
        parser.add_argument('json_file', type=str)

    def handle(self, *args, **options):
        
        """
        df = pd.read_csv(options['csv_file'])

        for i in df.index:
            codeinsee = df['reg'][i]
            name = df['libelle'][i]
            Region.objects.get_or_create(codeinsee=codeinsee,
            name = name)

        """
        with open(options['json_file']) as f:
            data_list = json.load(f)

        for data in data_list['features']:
           
            type_geom = data['geometry']['type']
            codeinsee=data['properties']['INSEE_REG']
            region = Region.objects.get(codeinsee=codeinsee)
            print(region)
            
            if type_geom == 'Polygon':
                
                poly = data['geometry']['coordinates']
                if len(poly) > 1 :
                    ext_coords = poly[0]
                    int_coords = []
                    for i in range(1,len(poly)):
                        int_coords.append(poly[i])
                    region.geom = MultiPolygon([Polygon(ext_coords, int_coords[0])])
                else :
                    region.geom = MultiPolygon([Polygon(poly[0])])

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
                    
                region.geom = MultiPolygon(multipoly)

            region.save()