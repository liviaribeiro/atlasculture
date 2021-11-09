from admindivisions.models import Variable
def ressource_variable():
    # Variable.objects.values('nom','definition','source','year')
    data_variables = []
    info_dict = {}
    for variable in Variable.objects.all():

        info_dict['variable'] = {
                'nom': variable.nom,
                'definition' : variable.definition,
                'source': variable.source,
                'year': variable.year }
        if len(variable.complementaryressource_set.all()) > 0:
            for cr in variable.complementaryressource_set.all():
                 info_dict['complementaryressource'] = {
                 'link': cr.link,
                 'logo': cr.logo,
                 'name': cr.name
                 }
        else:
            info_dict['complementaryressource'] = {
                 'link': '',
                 'logo': '',
                 'name': ''
                 }
        data_variables.append(info_dict)

    return 'coco'
