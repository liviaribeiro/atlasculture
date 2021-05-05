from django.shortcuts import render
from django.http import HttpResponse
from django.core.serializers import serialize
from .models import Region, Commune
from admindivisions.models import ZonageRural
from equipements.models import Equipement, EquipementType, Domaine
from django.contrib.gis.geos import GEOSGeometry
from atlasculture.settings import BASE_DIR
import os
import json
from django.http import JsonResponse


# Create your views here.
def map(request):
    communes = Commune.objects.all() 
    domaines = Domaine.objects.all()
    zonagerural = ZonageRural.objects.all()
    context = {'communes': communes, 'domaines': domaines, 'zonagerural': zonagerural}
    return render(request, 'admindivisions/map.html', context)


def equipements(request, domaine):
    path = os.path.join(BASE_DIR, 'static/data/EQUIPEMENTS_ALL.json')

    with open(path) as f:
        data = json.load(f)

    if domaine == 'all':
        response = JsonResponse(data, safe=False)    
    
    else:        
        filtered_data = [feature for feature in data["features"] if feature['properties']['equipement_type'] == domaine]
        data["features"] = filtered_data

        response = JsonResponse(data, safe=False)

    return response