from django.core import serializers
from equipements.models import Equipement
import json
from django.core.management.base import BaseCommand


class Command(BaseCommand):

    def handle(self, *args, **options):

        with open('equipements/data/EQUIPEMENTS4.json', "w") as out:
            serializers.serialize('geojson', Equipement.objects.filter(domaine=6), 
                geometry_field='gps', 
                fields=('nom','domaine','adresse','source_name','commune_name',),
                use_natural_foreign_keys=True,
                stream=out)