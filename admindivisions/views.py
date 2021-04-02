from django.shortcuts import render
from django.http import HttpResponse
from django.core.serializers import serialize
from .models import Region, Commune
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
    context = {'communes': communes, 'domaines': domaines}
    return render(request, 'admindivisions/map.html', context)


def equipements(request, domaine):
    path = os.path.join(BASE_DIR, 'equipements/data/EQUIPEMENTS_ALL.JSON')

    with open(path) as f:
        data = json.load(f)

    if domaine == 'all':
        response = JsonResponse(data, safe=False)    
    
    else:        
        filtered_data = [feature for feature in data["features"] if feature['properties']['equipement_type'] == domaine]
        data["features"] = filtered_data

        response = JsonResponse(data, safe=False)

    return response