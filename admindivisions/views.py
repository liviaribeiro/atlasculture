from django.shortcuts import render
from django.http import HttpResponse
from django.core.serializers import serialize
from .models import Region, Commune
from equipements.models import Equipement, Domaine
from django.contrib.gis.geos import GEOSGeometry
from atlasculture.settings import BASE_DIR
import os

# Create your views here.
def map(request):
    communes = Commune.objects.all() 
    domaines = Domaine.objects.all()
    context = {'communes': communes, 'domaines': domaines}
    return render(request, 'admindivisions/map.html', context)


def equipements(request):
    path = os.path.join(BASE_DIR, 'equipements/data/EQUIPEMENTS.JSON')
    with open(path , 'r') as myfile:
        data=myfile.read()
    response = HttpResponse(content=data)
    response['Content-Type'] = 'application/json'
    return response