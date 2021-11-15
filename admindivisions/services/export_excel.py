from admindivisions.models import (DepensesCommunes, DepensesDepartement, DepensesMinistereDepartement, DepensesRegion, DepensesEPCI, DepensesMinistereRegion,
Commune_AAV, Region, Commune, Cadrage, Departement, Entreprises_regions, Entreprises_departements, Entreprises_communes)
import xlwt

def variables(variable='',response='',writer=''):
    variable_name = variable.nom
    
    #Données de contexte
    if variable_name=="Population":
        sheet = writer.add_sheet("Population")
        sheet_1 = writer.add_sheet("Population_1")
        row_num = 0
        font_style = xlwt.XFStyle()
        columns = ['Commune', 'Population totale']
        for col_num in range(len(columns)):
            sheet.write(row_num, col_num, columns[col_num], font_style)
        cadrages = Cadrage.objects.filter(year="2017").values_list('commune__name', 'population')
        for cadrage in cadrages:
            row_num += 1
            for col_num in range(len(cadrage)):
                sheet.write(row_num, col_num, cadrage[col_num], font_style)

    if variable_name=="Indice de jeunesse":
        writer.writerow(['Commune', 'Indice de Jeunesse'])
        cadrages = Cadrage.objects.filter(year="2017").values_list('commune__name', 'youthindex')
        for cadrage in cadrages:
            writer.writerow(cadrage)

    if variable_name=="Densité de la population":
        writer.writerow(['Commune', 'Densité de la population'])
        cadrages = Cadrage.objects.filter(year="2017").values_list('commune__name', 'density')
        for cadrage in cadrages:
            writer.writerow(cadrage)
    
    if variable_name=="Évolution de la population":
        writer.writerow(['Commune', 'Évolution de la population'])
        cadrages = Cadrage.objects.filter(year="2017").values_list('commune__name', 'evolution')
        for cadrage in cadrages:
            writer.writerow(cadrage)

    if variable_name=="Niveau de vie médian":
        writer.writerow(['Commune', 'Niveau de vie médian'])
        cadrages = Cadrage.objects.filter(year="2017").values_list('commune__name', 'livingstandard')
        for cadrage in cadrages:
            writer.writerow(cadrage)

    if variable_name=="Taux de pauvreté":
        writer.writerow(['Commune', 'Taux de pauvreté'])
        cadrages = Cadrage.objects.filter(year="2017").values_list('commune__name', 'tauxpauvrete')
        for cadrage in cadrages:
            writer.writerow(cadrage)

    if variable_name=="Action coeur de ville":
        writer.writerow(['Commune', 'Action Coeur de Ville'])
        communes = Commune.objects.filter(year="2019").values_list('name', 'acv__code_acv')
        for commune in communes:
            writer.writerow(commune)

    #Dépenses
    if variable_name=="Dépenses culturelles des régions":
        writer.writerow(['Région', 'Secteur', 'Dépénses totales', 'Population'])
        depenses = DepensesRegion.objects.filter(annee="2019")
        for depense in depenses:
            reg = depense.region
            deps = Departement.objects.filter(region=reg)
            coms = Commune.objects.filter(departement__in=deps, year="2020")
            cads = Cadrage.objects.filter(commune__in=coms)
            populations = [0 if cad.population is None else cad.population for cad in cads]
            population = sum(populations)
            depense_line = (reg.name, depense.secteur.nom, depense.depenses_totales, population)
            writer.writerow(depense_line)
    
    if variable_name=="Dépenses culturelles des départements":
        writer.writerow(['Département', 'Secteur', 'Dépénses totales', 'Population'])
        depenses = DepensesDepartement.objects.filter(annee="2019")
        for depense in depenses:
            dep = depense.departement
            coms = Commune.objects.filter(departement=dep, year="2020")
            cads = Cadrage.objects.filter(commune__in=coms)
            populations = [0 if cad.population is None else cad.population for cad in cads]
            population = sum(populations)
            depense_line = (dep.name, depense.secteur.nom, depense.depenses_totales, population)
            writer.writerow(depense_line)

    if variable_name=="Dépenses culturelles des communes":
        writer.writerow(['Commune', 'Secteur', 'Dépénses totales', 'Population'])
        depenses = DepensesCommunes.objects.filter(annee="2019")
        for depense in depenses:
            depense_line = (depense.commune.name, depense.secteur.nom, depense.depenses_totales, depense.population)
            writer.writerow(depense_line)

    if variable_name=="Dépenses culturelles des intercommunalités":
        writer.writerow(['Commune', 'Secteur', 'Dépénses totales', 'Population'])
        depenses = DepensesEPCI.objects.filter(annee="2019")
        for depense in depenses:
            depense_line = (depense.epci.name, depense.secteur.nom, depense.depenses_totales, depense.population)
            writer.writerow(depense_line)

    if variable_name=="Dépenses du ministère de la Culture":
        sheet = writer.add_sheet("Région")
        sheet_1 = writer.add_sheet("Département")
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

    if variable_name=="Entreprises culturelles du secteur marchand":
        sheet = writer.add_sheet("Région")
        sheet_1 = writer.add_sheet("Département")
        sheet_2 = writer.add_sheet("Commune")
        font_style = xlwt.XFStyle()
        font_style2 = xlwt.XFStyle()

        #Niveau région
        row_num = 0
        columns_reg = ['Région', "Code Insee", "Nombre d'entreprises du secteur marchand", 'Nombre total entreprises du secteur marchand']
        font_style.font.bold = True
        for col_num in range(len(columns_reg)):
            sheet.write(row_num, col_num, columns_reg[col_num], font_style)
        entreprises_reg = Entreprises_regions.objects.all()
        print(entreprises_reg)
        for entreprise in entreprises_reg:
            row_num += 1
            values = [entreprise.region.name, entreprise.region.codeinsee, entreprise.effectifs_culture, entreprise.effectifs_total]
            for col_num in range(len(values)):
                sheet.write(row_num, col_num, values[col_num], font_style2)
        
        #Niveau département
        row_num = 0
        columns_dep = ['Département', "Code Insee", "Nombre d'entreprises du secteur marchand", 'Nombre total entreprises du secteur marchand']
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
        columns_com = ['Commune', "Code Insee", "Nombre d'entreprises du secteur marchand", 'Nombre total entreprises du secteur marchand']
        font_style.font.bold = True
        for col_num in range(len(columns_com)):
            sheet_2.write(row_num, col_num, columns_dep[col_num], font_style)
        entreprises_com = Entreprises_communes.objects.all()
        for entreprise in entreprises_com:
            row_num += 1
            values = [entreprise.commune.name, entreprise.commune.codeinsee, entreprise.effectifs_culture, entreprise.effectifs_total]
            for col_num in range(len(values)):
                sheet_2.write(row_num, col_num, values[col_num], font_style2)

    if variable_name=="Grille communale de densité":
        writer.writerow(['Commune', 'Grille communale de densité'])
        communes = Commune.objects.filter(year="2020").values_list('name', 'zonage_rural__name')
        for commune in communes:
            writer.writerow(commune)

    if variable_name=="Aires d'attraction des villes":
        writer.writerow(['Commune', "Aires d'attraction des villes", "Typologie"])
        communes = Commune_AAV.objects.all().values_list('commune__name', 'AAV__nom', 'typologie__description')
        for commune in communes:
            writer.writerow(commune)


    return writer



