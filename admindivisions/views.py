from django.shortcuts import render
from django.http import HttpResponse
from django.core.serializers import serialize
from .models import Region, Commune, Variable
from admindivisions.models import ZonageRural
from equipements.models import Equipement, EquipementType, Domaine
from django.contrib.gis.geos import GEOSGeometry
from atlasculture.settings import BASE_DIR
import os
import json
from django.http import JsonResponse
import csv

# Create your views here.
def map(request):
    communes = Commune.objects.all()
    domaines = Domaine.objects.all().order_by('name')
    zonagerural = ZonageRural.objects.all()
    variables = Variable.objects.all()
    # import ipdb; ipdb.set_trace()
    context = {'communes': communes,
    'domaines': domaines,
    'zonagerural': zonagerural,
    'variables': variables,
    'data_variables': [variable for variable in Variable.objects.values('nom','definition','source','year')],
    'data_domaines': domaines
    }
# 'data_domaines': [equipement_type for equipement_type in domaine.equipementtype_set.all for domaine in domaines]

#  [variable for variable in Variable.objects.values('nom','definition','source','year')]
    return render(request, 'admindivisions/map.html', context)

def download(request, layers):
    variables = Variable.objects.filter(layers)
    context = {'variables': variables}
    return render(request, 'admindivisions/download.html', context)

def equipements(request, domaine):
    path = os.path.join(BASE_DIR, 'static/data/EQUIPEMENTS_BASILIC.json')
    with open(path) as f:
        data = json.load(f)
    if domaine == 'all':
        response = JsonResponse(data, safe=False)
    else:
        filtered_data = [feature for feature in data["features"] if feature['properties']['equipement_type'] == domaine]
        data["features"] = filtered_data
        response = JsonResponse(data, safe=False)
    return response

def export_equipements_csv(request):
    response = HttpResponse(content_type='text/csv')
    pks_list = request.GET.get('pks_list', 'default').split(',')
    pks_list = [int(x) for x in pks_list]
    response['Content-Disposition'] = 'attachment; filename="equipements.csv"'
    writer = csv.writer(response)
    writer.writerow(['ID Deps', 'Equipement', 'Domaine', 'Adresse', 'Commune', 'Source'])
    equipement_type = EquipementType.objects.filter(pk__in=pks_list)
    equipements = Equipement.objects.filter(equipement_type__in=equipement_type).values_list('id_DEPS', 'nom', 'equipement_type__name', 'adresse', 'commune__name', 'source__name')

    for equipement in equipements:
        writer.writerow(equipement)
    return response

def pdr(request):
    path = os.path.join(BASE_DIR, 'static/data/PDR.json')
    with open(path) as f:
        data = json.load(f)
        response = JsonResponse(data, safe=False)
    return response

def festivals(request):
    path = os.path.join(BASE_DIR, 'static/data/COMMUNE_FESTIVALS.json')
    with open(path) as f:
        data = json.load(f)
        response = JsonResponse(data, safe=False)
    return response


def aav(request):
    path = os.path.join(BASE_DIR, 'static/data/AAV2020.json')
    with open(path) as f:
        data = json.load(f)
        response = JsonResponse(data, safe=False)
    return response
