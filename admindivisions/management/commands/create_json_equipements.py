from django.core import serializers
from equipements.models import Equipement
import json
from django.core.management.base import BaseCommand
import pandas as pd 

class Command(BaseCommand):

    def handle(self, *args, **options):

        with open('equipements/data/EQUIPEMENTS_BASILIC.json', "w") as out:
            serializers.serialize('geojson', Equipement.objects.all(), 
                geometry_field='gps', 
                fields=('nom','domaine','equipement_type','adresse','source_name','commune_name',),
                use_natural_foreign_keys=True,
                stream=out)
        