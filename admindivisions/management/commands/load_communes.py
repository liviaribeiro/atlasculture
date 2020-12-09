import json
import pandas as pd 
from django.core.management.base import BaseCommand
from admindivisions.models import Departement, Commune
from django.contrib.gis.geos import MultiPolygon, Polygon
from django.contrib.gis.geos import GEOSGeometry
import os
from atlasculture.settings import BASE_DIR

class Command(BaseCommand):

    def handle(self, *args, **options):
        
    
        csv_file = os.path.join(BASE_DIR, 'admindivisions/data/communes2019.csv')

        df = pd.read_csv(csv_file)
        for i in df.index:
            codeinsee = df['com'][i]
            name = df['libelle'][i]
            dep = df['dep'][i]
            typecom = df['typecom'][i]

            if typecom == "COM":
                departement = Departement.objects.get(codeinsee=dep)

                Commune.objects.get_or_create(codeinsee=codeinsee,
                name = name,
                departement=departement,
                year=2019
                )
        
        """

        with open(options['json_file']) as f:
            data_list = json.load(f)

        for data in data_list['features']:
           
            type_geom = data['geometry']['type']
            codeinsee=data['properties']['INSEE_COM']
            com = Commune.objects.get(codeinsee=codeinsee)
            print(com)
            
            geo_simplified = GEOSGeometry.simplify(com.geom, tolerance=0.02)
            
            if isinstance(geo_simplified, Polygon):
                geo_simplified = MultiPolygon(geo_simplified)

            com.geom_simplified = geo_simplified

            com.save()
        """
