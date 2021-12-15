from admindivisions.models import (DepensesCommunes, DepensesDepartement, DepensesMinistereDepartement, DepensesRegion, DepensesEPCI, DepensesMinistereRegion,
Commune_AAV, Region, Commune, Cadrage, Departement, Entreprises_regions, Entreprises_departements, Entreprises_communes, Variable,
Emploi_Region, Emploi_Departement, Emploi_ZE)
import xlwt
from django.core.management.base import BaseCommand

def addMetadata(sheet, variable):
    sheet.write(0, 0, 'Definition')
    sheet.write(0, 1, variable.definition)
    sheet.write(1, 0, 'Source')
    sheet.write(1, 1, variable.source.nom)
    sheet.write(2, 0, 'Année')
    sheet.write(2, 1, variable.year)

def create_excel(variable='',writer=''):
    variable_name = variable.nom
    
    #Données de contexte
    if variable_name=="Population":
        sheet = writer.add_sheet("Population")
        sheet_1 = writer.add_sheet("Meta")
        row_num = 0
        font_style = xlwt.XFStyle()
        font_style2 = xlwt.XFStyle()
        font_style.font.bold = True
        columns = ['Commune', 'Code Insee', 'Population totale']
        for col_num in range(len(columns)):
            sheet.write(row_num, col_num, columns[col_num], font_style)
        cadrages = Cadrage.objects.filter(year="2017").values_list('commune__name', 'commune__codeinsee', 'population')
        for cadrage in cadrages:
            row_num += 1
            for col_num in range(len(cadrage)):
                sheet.write(row_num, col_num, cadrage[col_num], font_style2)
        addMetadata(sheet_1, variable)

    if variable_name=="Indice de jeunesse":
        sheet = writer.add_sheet("Indice de jeunesse")
        sheet_1 = writer.add_sheet("Meta")
        row_num = 0
        font_style = xlwt.XFStyle()
        font_style2 = xlwt.XFStyle()
        font_style.font.bold = True
        columns = ['Commune', 'Code Insee', 'Indice de Jeunesse']
        for col_num in range(len(columns)):
            sheet.write(row_num, col_num, columns[col_num], font_style)
        cadrages = Cadrage.objects.filter(year="2017").values_list('commune__name', 'commune__codeinsee', 'youthindex')
        for cadrage in cadrages:
            row_num += 1
            for col_num in range(len(cadrage)):
                sheet.write(row_num, col_num, cadrage[col_num], font_style2)
        addMetadata(sheet_1, variable)

    if variable_name=="Densité de la population":
        sheet = writer.add_sheet("Densité de la population")
        sheet_1 = writer.add_sheet("Meta")
        row_num = 0
        font_style = xlwt.XFStyle()
        font_style2 = xlwt.XFStyle()
        font_style.font.bold = True
        columns = ['Commune', 'Code Insee', 'Densité de la population']
        for col_num in range(len(columns)):
            sheet.write(row_num, col_num, columns[col_num], font_style)
        cadrages = Cadrage.objects.filter(year="2017").values_list('commune__name', 'commune__codeinsee', 'density')
        for cadrage in cadrages:
            row_num += 1
            for col_num in range(len(cadrage)):
                sheet.write(row_num, col_num, cadrage[col_num], font_style2)
        addMetadata(sheet_1, variable)
    
    if variable_name=="Évolution de la population":
        sheet = writer.add_sheet("Évolution de la population")
        sheet_1 = writer.add_sheet("Meta")
        row_num = 0
        font_style = xlwt.XFStyle()
        font_style2 = xlwt.XFStyle()
        font_style.font.bold = True
        columns = ['Commune', 'Code Insee', 'Évolution de la population']
        for col_num in range(len(columns)):
            sheet.write(row_num, col_num, columns[col_num], font_style)
        cadrages = Cadrage.objects.filter(year="2017").values_list('commune__name', 'commune__codeinsee', 'evolution')
        for cadrage in cadrages:
            row_num += 1
            for col_num in range(len(cadrage)):
                sheet.write(row_num, col_num, cadrage[col_num], font_style2)
        addMetadata(sheet_1, variable)

    if variable_name=="Niveau de vie médian":
        sheet = writer.add_sheet("Niveau de vie médian")
        sheet_1 = writer.add_sheet("Meta")
        row_num = 0
        font_style = xlwt.XFStyle()
        font_style2 = xlwt.XFStyle()
        font_style.font.bold = True
        columns = ['Commune', 'Code Insee', 'Niveau de vie médian']
        for col_num in range(len(columns)):
            sheet.write(row_num, col_num, columns[col_num], font_style)
        cadrages = Cadrage.objects.filter(year="2017").values_list('commune__name', 'commune__codeinsee', 'livingstandard')
        for cadrage in cadrages:
            row_num += 1
            for col_num in range(len(cadrage)):
                sheet.write(row_num, col_num, cadrage[col_num], font_style2)
        addMetadata(sheet_1, variable)

    if variable_name=="Taux de pauvreté":
        sheet = writer.add_sheet("Taux de pauvreté")
        sheet_1 = writer.add_sheet("Meta")
        row_num = 0
        font_style = xlwt.XFStyle()
        font_style2 = xlwt.XFStyle()
        font_style.font.bold = True
        columns = ['Commune', 'Code Insee', 'Taux de pauvreté']
        for col_num in range(len(columns)):
            sheet.write(row_num, col_num, columns[col_num], font_style)
        cadrages = Cadrage.objects.filter(year="2017").values_list('commune__name', 'commune__codeinsee', 'tauxpauvrete')
        for cadrage in cadrages:
            row_num += 1
            for col_num in range(len(cadrage)):
                sheet.write(row_num, col_num, cadrage[col_num], font_style2)
        addMetadata(sheet_1, variable)

    if variable_name=="Action coeur de ville":
        sheet = writer.add_sheet("Action Coeur de Ville")
        sheet_1 = writer.add_sheet("Meta")
        row_num = 0
        font_style = xlwt.XFStyle()
        font_style2 = xlwt.XFStyle()
        font_style.font.bold = True
        columns = ['Commune', 'Code Insee', 'Action Coeur de Ville']
        for col_num in range(len(columns)):
            sheet.write(row_num, col_num, columns[col_num], font_style)
        communes = Commune.objects.filter(year="2019").values_list('name', 'codeinsee', 'acv__code_acv')
        for commune in communes:
            row_num += 1
            for col_num in range(len(commune)):
                sheet.write(row_num, col_num, commune[col_num], font_style2)
        addMetadata(sheet_1, variable)

    if variable_name=="Grille communale de densité":
        sheet = writer.add_sheet("Grille communale de densité")
        sheet_1 = writer.add_sheet("Meta")
        row_num = 0
        font_style = xlwt.XFStyle()
        font_style2 = xlwt.XFStyle()
        font_style.font.bold = True
        columns = ['Commune', 'Code Insee', 'Grille communale de densité']
        for col_num in range(len(columns)):
            sheet.write(row_num, col_num, columns[col_num], font_style)
        communes = Commune.objects.filter(year="2020").values_list('name', 'codeinsee', 'zonage_rural__name')
        for commune in communes:
            row_num += 1
            for col_num in range(len(commune)):
                sheet.write(row_num, col_num, commune[col_num], font_style2)
        addMetadata(sheet_1, variable)

    if variable_name=="Aires d'attraction des villes":
        sheet = writer.add_sheet("Aires d'attraction des villes")
        sheet_1 = writer.add_sheet("Meta")
        row_num = 0
        font_style = xlwt.XFStyle()
        font_style2 = xlwt.XFStyle()
        font_style.font.bold = True
        columns = ['Commune', 'Code Insee', "Aires d'attraction des villes", "Typologie"]
        for col_num in range(len(columns)):
            sheet.write(row_num, col_num, columns[col_num], font_style)
        communes = Commune_AAV.objects.all().values_list('commune__name', 'commune__codeinsee', 'AAV__nom', 'typologie__description')
        for commune in communes:
            row_num += 1
            for col_num in range(len(commune)):
                sheet.write(row_num, col_num, commune[col_num], font_style2)
        addMetadata(sheet_1, variable)

    #Dépenses
    if variable_name=="Dépenses culturelles des régions":
        sheet = writer.add_sheet("Dépenses culturelles")
        sheet_1 = writer.add_sheet("Meta")
        row_num = 0
        font_style = xlwt.XFStyle()
        font_style2 = xlwt.XFStyle()
        font_style.font.bold = True
        columns = ['Code INSEE', 'Région', "Secteur", "Fonctionnement", "Investissement", "Total", "Population"]
        for col_num in range(len(columns)):
            sheet.write(row_num, col_num, columns[col_num], font_style)
        depenses = DepensesRegion.objects.filter(annee="2019")
        for depense in depenses:
            row_num += 1
            reg = depense.region
            deps = Departement.objects.filter(region=reg)
            coms = Commune.objects.filter(departement__in=deps, year="2020")
            cads = Cadrage.objects.filter(commune__in=coms)
            populations = [0 if cad.population is None else cad.population for cad in cads]
            population = sum(populations)
            values = reg.codeinsee, reg.name, depense.secteur.nom, depense.depenses_fonctionnement, depense.depenses_investissement, depense.depenses_totales, population
            for col_num in range(len(values)):
                sheet.write(row_num, col_num, values[col_num], font_style2)
        addMetadata(sheet_1, variable)

    
    if variable_name=="Dépenses culturelles des départements":
        sheet = writer.add_sheet("Dépenses culturelles")
        sheet_1 = writer.add_sheet("Meta")
        row_num = 0
        font_style = xlwt.XFStyle()
        font_style2 = xlwt.XFStyle()
        font_style.font.bold = True
        columns = ['Code INSEE', 'Département', "Secteur", "Fonctionnement", "Investissement", "Total", "Population"]
        for col_num in range(len(columns)):
            sheet.write(row_num, col_num, columns[col_num], font_style)
        depenses = DepensesDepartement.objects.filter(annee="2019")
        for depense in depenses:
            row_num += 1
            dep = depense.departement
            coms = Commune.objects.filter(departement=dep, year="2020")
            cads = Cadrage.objects.filter(commune__in=coms)
            populations = [0 if cad.population is None else cad.population for cad in cads]
            population = sum(populations)
            values = dep.codeinsee, dep.name, depense.secteur.nom, depense.depenses_fonctionnement, depense.depenses_investissement, depense.depenses_totales, population
            for col_num in range(len(values)):
                sheet.write(row_num, col_num, values[col_num], font_style2)
        addMetadata(sheet_1, variable)

    if variable_name=="Dépenses culturelles des communes":
        sheet = writer.add_sheet("Dépenses culturelles")
        sheet_1 = writer.add_sheet("Meta")
        row_num = 0
        font_style = xlwt.XFStyle()
        font_style2 = xlwt.XFStyle()
        font_style.font.bold = True
        columns = ['Code INSEE', 'Commune', "Secteur", "Fonctionnement", "Investissement", "Total", "Population"]
        for col_num in range(len(columns)):
            sheet.write(row_num, col_num, columns[col_num], font_style)
        depenses = DepensesCommunes.objects.filter(annee="2019")
        for depense in depenses:
            row_num += 1
            values = depense.commune.codeinsee, depense.commune.name, depense.secteur.nom, depense.depenses_fonctionnement, depense.depenses_investissement, depense.depenses_totales, depense.population
            for col_num in range(len(values)):
                sheet.write(row_num, col_num, values[col_num], font_style2)
        addMetadata(sheet_1, variable)

    if variable_name=="Dépenses culturelles des intercommunalités":
        sheet = writer.add_sheet("Dépenses culturelles")
        sheet_1 = writer.add_sheet("Meta")
        row_num = 0
        font_style = xlwt.XFStyle()
        font_style2 = xlwt.XFStyle()
        font_style.font.bold = True
        columns = ['Code SIREN', 'EPCI', "Secteur", "Fonctionnement", "Investissement", "Total", "Population"]
        for col_num in range(len(columns)):
            sheet.write(row_num, col_num, columns[col_num], font_style)
        depenses = DepensesEPCI.objects.filter(annee="2019")
        for depense in depenses:
            row_num += 1
            values = depense.epci.codesiren, depense.epci.name, depense.secteur.nom, depense.depenses_fonctionnement, depense.depenses_investissement, depense.depenses_totales, depense.population
            for col_num in range(len(values)):
                sheet.write(row_num, col_num, values[col_num], font_style2)
        addMetadata(sheet_1, variable)

    if variable_name=="Dépenses du ministère de la Culture":
        sheet = writer.add_sheet("Région")
        sheet_1 = writer.add_sheet("Département")
        sheet_2 = writer.add_sheet("Meta")
        font_style = xlwt.XFStyle()
        font_style2 = xlwt.XFStyle()

        #Niveau région
        row_num = 0
        columns_reg = ['Région', 'Dépénses Fonctionnement', 'Dépénses Investissement', 'Dépénses totales', 'Population']
        font_style.font.bold = True
        for col_num in range(len(columns_reg)):
            sheet.write(row_num, col_num, columns_reg[col_num], font_style)
        depenses_reg = DepensesMinistereRegion.objects.filter(annee="2019")
        for depense in depenses_reg:
            row_num += 1
            reg = depense.region
            deps = Departement.objects.filter(region=reg)
            coms = Commune.objects.filter(departement__in=deps, year="2020")
            cads = Cadrage.objects.filter(commune__in=coms)
            populations = [0 if cad.population is None else cad.population for cad in cads]
            population = sum(populations)
            values = [reg.name, depense.depenses_fonctionnement, depense.depenses_investissement, depense.depenses_totales, population]
            for col_num in range(len(values)):
                sheet.write(row_num, col_num, values[col_num], font_style2)
        
        #Niveau département
        row_num = 0
        columns_dep = ['Département', 'Dépénses Fonctionnement', 'Dépénses Investissement', 'Dépénses totales', 'Population']
        font_style.font.bold = True
        for col_num in range(len(columns_dep)):
            sheet_1.write(row_num, col_num, columns_dep[col_num], font_style)
        depenses_dep = DepensesMinistereDepartement.objects.filter(annee="2019")
        for depense in depenses_dep:
            row_num += 1
            dep = depense.departement
            coms = Commune.objects.filter(departement=dep, year="2020")
            cads = Cadrage.objects.filter(commune__in=coms)
            populations = [0 if cad.population is None else cad.population for cad in cads]
            population = sum(populations)
            values = [dep.name, depense.depenses_fonctionnement, depense.depenses_investissement, depense.depenses_totales, population]
            for col_num in range(len(values)):
                sheet_1.write(row_num, col_num, values[col_num], font_style2)

        addMetadata(sheet_2, variable)

    if variable_name=="Entreprises culturelles du secteur marchand":
        sheet = writer.add_sheet("Région")
        sheet_1 = writer.add_sheet("Département")
        sheet_2 = writer.add_sheet("Commune")
        sheet_3 = writer.add_sheet("Meta")
        font_style = xlwt.XFStyle()
        font_style2 = xlwt.XFStyle()

        #Niveau région
        row_num = 0
        columns_reg = ['Région', "Code Insee", "Nombre d'entreprises culturelles du secteur marchand", "Nombre total d'entreprises du secteur marchand"]
        font_style.font.bold = True
        for col_num in range(len(columns_reg)):
            sheet.write(row_num, col_num, columns_reg[col_num], font_style)
        entreprises_reg = Entreprises_regions.objects.all()
        for entreprise in entreprises_reg:
            row_num += 1
            values = [entreprise.region.name, entreprise.region.codeinsee, entreprise.etablissements_culture, entreprise.etablissements_total]
            for col_num in range(len(values)):
                sheet.write(row_num, col_num, values[col_num], font_style2)
        
        #Niveau département
        row_num = 0
        columns_dep = ['Département', "Code Insee", "Nombre d'entreprises culturelles du secteur marchand", "Nombre total d'entreprises du secteur marchand"]
        font_style.font.bold = True
        for col_num in range(len(columns_dep)):
            sheet_1.write(row_num, col_num, columns_dep[col_num], font_style)
        entreprises_dep = Entreprises_departements.objects.all()
        for entreprise in entreprises_dep:
            row_num += 1
            values = [entreprise.departement.name, entreprise.departement.codeinsee, entreprise.etablissements_culture, entreprise.etablissements_total]
            for col_num in range(len(values)):
                sheet_1.write(row_num, col_num, values[col_num], font_style2)

        #Niveau commune
        row_num = 0
        columns_com = ['Commune', "Code Insee", "Nombre d'entreprises culturelles du secteur marchand", "Nombre total d'entreprises du secteur marchand"]
        font_style.font.bold = True
        for col_num in range(len(columns_com)):
            sheet_2.write(row_num, col_num, columns_com[col_num], font_style)
        entreprises_com = Entreprises_communes.objects.all()
        for entreprise in entreprises_com:
            row_num += 1
            values = [entreprise.commune.name, entreprise.commune.codeinsee, entreprise.effectifs_culture, entreprise.etablissements_total]
            for col_num in range(len(values)):
                sheet_2.write(row_num, col_num, values[col_num], font_style2)

        addMetadata(sheet_3, variable)
    
    if variable_name=="Salariés actifs des secteurs culturels marchands":
        sheet = writer.add_sheet("Région")
        sheet_1 = writer.add_sheet("Département")
        sheet_2 = writer.add_sheet("Commune")
        sheet_3 = writer.add_sheet("Meta")
        font_style = xlwt.XFStyle()
        font_style2 = xlwt.XFStyle()

        #Niveau région
        row_num = 0
        columns_reg = ['Région', "Code Insee", "Nombre de salariés actifs des secteurs culturels marchands", 'Nombre total de salariés actifs des secteur marchands']
        font_style.font.bold = True
        for col_num in range(len(columns_reg)):
            sheet.write(row_num, col_num, columns_reg[col_num], font_style)
        entreprises_reg = Entreprises_regions.objects.all()
        for entreprise in entreprises_reg:
            row_num += 1
            values = [entreprise.region.name, entreprise.region.codeinsee, entreprise.effectifs_culture, entreprise.effectifs_total]
            for col_num in range(len(values)):
                sheet.write(row_num, col_num, values[col_num], font_style2)
        
        #Niveau département
        row_num = 0
        columns_dep = ['Département', "Code Insee", "Nombre de salariés actifs des secteurs culturels marchands", 'Nombre total de salariés actifs des secteur marchands']
        font_style.font.bold = True
        for col_num in range(len(columns_dep)):
            sheet_1.write(row_num, col_num, columns_dep[col_num], font_style)
        entreprises_dep = Entreprises_departements.objects.all()
        for entreprise in entreprises_dep:
            row_num += 1
            values = [entreprise.departement.name, entreprise.departement.codeinsee, entreprise.effectifs_culture, entreprise.effectifs_total]
            for col_num in range(len(values)):
                sheet_1.write(row_num, col_num, values[col_num], font_style2)

        #Niveau commune
        row_num = 0
        columns_com = ['Commune', "Code Insee", "Nombre de salariés actifs des secteurs culturels marchands", 'Nombre total de salariés actifs des secteur marchands']
        font_style.font.bold = True
        for col_num in range(len(columns_com)):
            sheet_2.write(row_num, col_num, columns_com[col_num], font_style)
        entreprises_com = Entreprises_communes.objects.all()
        for entreprise in entreprises_com:
            row_num += 1
            values = [entreprise.commune.name, entreprise.commune.codeinsee, entreprise.effectifs_culture, entreprise.effectifs_total]
            for col_num in range(len(values)):
                sheet_2.write(row_num, col_num, values[col_num], font_style2)

        addMetadata(sheet_3, variable)

    if variable_name=="Actifs exerçant une profession culturelle":
        sheet = writer.add_sheet("Région")
        sheet_1 = writer.add_sheet("Département")
        sheet_2 = writer.add_sheet("Zone d'emploi")
        sheet_3 = writer.add_sheet("Meta")
        font_style = xlwt.XFStyle()
        font_style2 = xlwt.XFStyle()

        #Niveau région
        row_num = 0
        columns_reg = ['Région', "Code Insee", "Nombre d'actifs exerçant une profession culturelle", "Nombre total d'actifs"]
        font_style.font.bold = True
        for col_num in range(len(columns_reg)):
            sheet.write(row_num, col_num, columns_reg[col_num], font_style)
        emploi_reg = Emploi_Region.objects.all()
        for emploi in emploi_reg:
            row_num += 1
            values = [emploi.region.name, emploi.region.codeinsee, emploi.nombre_profession_culturelle, emploi.nombre_actifs]
            for col_num in range(len(values)):
                sheet.write(row_num, col_num, values[col_num], font_style2)
        
        #Niveau département
        row_num = 0
        columns_dep = ['Département', "Code Insee", "Nombre d'actifs exerçant une profession culturelle", "Nombre total d'actifs"]
        font_style.font.bold = True
        for col_num in range(len(columns_dep)):
            sheet_1.write(row_num, col_num, columns_dep[col_num], font_style)
        emploi_dep = Emploi_Departement.objects.all()
        for emploi in emploi_dep:
            row_num += 1
            values = [emploi.departement.name, emploi.departement.codeinsee, emploi.nombre_profession_culturelle, emploi.nombre_actifs]
            for col_num in range(len(values)):
                sheet_1.write(row_num, col_num, values[col_num], font_style2)

        #Niveau commune
        row_num = 0
        columns_ze = ["Zone d'emploi", "Code Insee", "Nombre d'actifs exerçant une profession culturelle", "Nombre total d'actifs"]
        font_style.font.bold = True
        for col_num in range(len(columns_ze)):
            sheet_2.write(row_num, col_num, columns_ze[col_num], font_style)
        emploi_ze = Emploi_ZE.objects.all()
        for emploi in emploi_ze:
            row_num += 1
            values = [emploi.zone_emploi.name, emploi.zone_emploi.code, emploi.nombre_profession_culturelle, emploi.nombre_actifs]
            for col_num in range(len(values)):
                sheet_2.write(row_num, col_num, values[col_num], font_style2)

        addMetadata(sheet_3, variable)

    if variable_name=="Actifs dans les secteurs culturels":
        sheet = writer.add_sheet("Région")
        sheet_1 = writer.add_sheet("Département")
        sheet_2 = writer.add_sheet("Zone d'emploi")
        sheet_3 = writer.add_sheet("Meta")
        font_style = xlwt.XFStyle()
        font_style2 = xlwt.XFStyle()

        #Niveau région
        row_num = 0
        columns_reg = ['Région', "Code Insee", "Nombre d'actifs dans les secteurs culturels", "Nombre total d'actifs"]
        font_style.font.bold = True
        for col_num in range(len(columns_reg)):
            sheet.write(row_num, col_num, columns_reg[col_num], font_style)
        emploi_reg = Emploi_Region.objects.all()
        for emploi in emploi_reg:
            row_num += 1
            values = [emploi.region.name, emploi.region.codeinsee, emploi.nombre_secteur_culturel, emploi.nombre_actifs]
            for col_num in range(len(values)):
                sheet.write(row_num, col_num, values[col_num], font_style2)
        
        #Niveau département
        row_num = 0
        columns_dep = ['Département', "Code Insee", "Nombre d'actifs dans les secteurs culturels", "Nombre total d'actifs"]
        font_style.font.bold = True
        for col_num in range(len(columns_dep)):
            sheet_1.write(row_num, col_num, columns_dep[col_num], font_style)
        emploi_dep = Emploi_Departement.objects.all()
        for emploi in emploi_dep:
            row_num += 1
            values = [emploi.departement.name, emploi.departement.codeinsee, emploi.nombre_secteur_culturel, emploi.nombre_actifs]
            for col_num in range(len(values)):
                sheet_1.write(row_num, col_num, values[col_num], font_style2)

        #Niveau commune
        row_num = 0
        columns_ze = ["Zone d'emploi", "Code Insee", "Nombre d'actifs dans les secteurs culturels", "Nombre total d'actifs"]
        font_style.font.bold = True
        for col_num in range(len(columns_ze)):
            sheet_2.write(row_num, col_num, columns_ze[col_num], font_style)
        emploi_ze = Emploi_ZE.objects.all()
        for emploi in emploi_ze:
            row_num += 1
            values = [emploi.zone_emploi.name, emploi.zone_emploi.code, emploi.nombre_secteur_culturel, emploi.nombre_actifs]
            for col_num in range(len(values)):
                sheet_2.write(row_num, col_num, values[col_num], font_style2)

        addMetadata(sheet_3, variable)

    return writer

class Command(BaseCommand):

    def handle(self, *args, **options):
        writer = xlwt.Workbook(encoding='utf-8')
        variable = Variable.objects.get(nom="Dépenses culturelles des départements")
        create_excel(variable, writer)
        writer.save("excel_files/"+variable.nom+".xls")