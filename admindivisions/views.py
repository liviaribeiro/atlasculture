from django.shortcuts import render
from django.http import HttpResponse
from django.core.serializers import serialize
from admindivisions.models import ZonageRural,ComplementaryRessource
from .models import DepensesRegion, Region, Commune, Variable, Cadrage, Departement
from equipements.models import Equipement, EquipementType, Domaine
from django.contrib.gis.geos import GEOSGeometry
from atlasculture.settings import BASE_DIR
import os
import json
from django.http import JsonResponse
import csv
import xlwt
from admindivisions.services import association, export_csv, export_excel, view_list

# Create your views here.
def map(request):
    communes = Commune.objects.all()
    domaines = Domaine.objects.all().order_by('name')
    zonagerural = ZonageRural.objects.all()
    variables = Variable.objects.all()
    data_variables_rich = association.ressource_variable()
    data_variables = []
    for variable in variables:
        if variable.file:
            data_variables.append({'nom': variable.nom, 'definition': variable.definition, 'source__nom': variable.source.nom, 'year': variable.year, 'pk': variable.pk, 'file': variable.file.url})
        else:
            data_variables.append({'nom': variable.nom, 'source__nom': variable.source.nom, 'pk': variable.pk, 'file': "none"})

    data_equipement_type_rich = association.ressource_equipement_type(domaines)

    context = {'communes': communes,
    'domaines': domaines,
    'zonagerural': zonagerural,
    'variables': variables,
    'data_variables': data_variables,
    'data_variables_rich': data_variables_rich,
    'data_equipement_type_rich': data_equipement_type_rich,
    'data_domaines': domaines
    }

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

def list_equipements(request):
    equipement_id = int(request.GET.get('equipement_id'))
    equipement_type = EquipementType.objects.get(pk=equipement_id)
    equipements = Equipement.objects.filter(equipement_type=equipement_type)
    context = {'equipements': equipements, 'equipement_type': equipement_type}
    return render(request,'admindivisions/equipements_list.html', context)

def list_variables(request):
    variable_name= request.GET.get('variable_name')
    variable = Variable.objects.get(nom=variable_name)
    context = view_list.variables(variable)
    return render(request,'admindivisions/variables_list.html', context)

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

def export_variable_csv(request):
    variable_id = int(request.GET.get('variable_id'))
    variable = Variable.objects.get(pk=variable_id)
    variable_name=variable.nom
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="'+variable_name+'.csv"'
    writer = csv.writer(response)
    writer = export_csv.variables(variable=variable,response=response,writer=writer)
    return response

def export_variable_excel(request):
    variable_id = int(request.GET.get('variable_id'))
    variable = Variable.objects.get(pk=variable_id)
    variable_name=variable.nom
    response = HttpResponse(content_type='text/csv')

    response = HttpResponse(content_type='application/ms-excel')
    response['Content-Disposition'] = 'attachment; filename="'+variable_name+'.xls"'

    writer = xlwt.Workbook(encoding='utf-8')
    writer = export_excel.variables(variable=variable,response=response,writer=writer)
    writer.save(response)
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

