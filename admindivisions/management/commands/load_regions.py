import json
import pandas as pd 
from django.core.management.base import BaseCommand
from admindivisions.models import Region
from django.contrib.gis.geos import MultiPolygon, Polygon
from django.contrib.gis.geos import GEOSGeometry
import os
from atlasculture.settings import BASE_DIR


class Command(BaseCommand):

    def handle(self, *args, **options):
        
        csv_file = os.path.join(BASE_DIR, 'admindivisions/data/region2020.csv')

        df = pd.read_csv(csv_file)

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
            
            geo_simplified = GEOSGeometry.simplify(region.geom, tolerance=0.02)
            
            if isinstance(geo_simplified, Polygon):
                geo_simplified = MultiPolygon(geo_simplified)

            region.geom_simplified = geo_simplified

            region.save()
            """