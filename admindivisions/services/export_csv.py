import csv
from admindivisions.models import DepensesRegion, Region, Commune, Variable, Cadrage, Departement

def variables(variable_name=''):
    if variable_name=="Indice de jeunesse":
        writer = csv.writer(response)
        writer.writerow(['Commune', 'Indice de Jeunesse'])
        cadrages = Cadrage.objects.filter(year="2017").values_list('commune__name', 'youthindex')
        for cadrage in cadrages:
            writer.writerow(cadrage)
    if variable_name=="Population totale":
        writer = csv.writer(response)
        writer.writerow(['Commune', 'Population totale'])
        cadrages = Cadrage.objects.filter(year="2017").values_list('commune__name', 'population')
        for cadrage in cadrages:
            writer.writerow(cadrage)
    if variable_name=="Dépenses culturelles des régions":
        writer = csv.writer(response)
        writer.writerow(['Région', 'Secteur', 'Dépénses totales'])

        depenses = DepensesRegion.objects.filter(year="2017").values_list('region__name', 'secteur', 'depenses_totales')
        for depense in depenses:
            reg = Region.objects.get(codeinsee=feature['properties']['INSEE_REG'])
            deps = Departement.objects.filter(region=reg)
            coms = Commune.objects.filter(departement__in=deps, year="2020")
            cads = Cadrage.objects.filter(commune__in=coms)
            writer.writerow(depense)
    return writer
