from django.shortcuts import render
from django.http import HttpResponse
from django.core.serializers import serialize
from .models import Region, Commune
from equipements.models import Equipement, Domaine
from django.contrib.gis.geos import GEOSGeometry

# Create your views here.
def map(request):
    communes = Commune.objects.all() 
    domaines = Domaine.objects.all()
    context = {'communes': communes, 'domaines': domaines}
    return render(request, 'admindivisions/map.html', context)

