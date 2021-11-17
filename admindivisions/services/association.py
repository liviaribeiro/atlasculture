from admindivisions.models import Variable

def ressource_equipement_type(domaines):
    data_equipement_type_rich = []
    for domaine in domaines:
        for equipement_type in domaine.equipementtype_set.all():
            info_dict = build_dict_equipement(equipement_type)
            i = 0
            list_cr = []

            if len(equipement_type.complementaryressource_set.all()) > 0:
                for cr in equipement_type.complementaryressource_set.all():
                    list_cr.append(build_dict_cr(cr=cr))
                    i = i + 1
            else:
                list_cr.append(build_dict_cr(cr=''))

            info_dict["complementary_ressource"] = list_cr
            data_equipement_type_rich.append(info_dict)

    return data_equipement_type_rich

def ressource_variable():
    data_variables = []
    for variable in Variable.objects.all():
        info_dict = build_dict_variable(variable)
        i = 0
        list_cr = []
        if len(variable.complementaryressource_set.all()) > 0:
            for cr in variable.complementaryressource_set.all():
                list_cr.append(build_dict_cr(cr=cr))
                i = i + 1
        else:
            list_cr.append(build_dict_cr(cr=''))

        info_dict["complementary_ressource"] = list_cr
        data_variables.append(info_dict)
    return data_variables

def build_dict_cr(cr=""):
    dict_cr = {
    "link": cr.link if cr != "" else "",
    "logo": cr.logo if cr != "" else "",
    "name": cr.name if cr != "" else ""
    }
    return dict_cr

def build_dict_variable(variable):
    variable_dict = {"variable" : {
                        "nom": variable.nom,
                        "definition": variable.definition,
                        "source": variable.source,
                        "year": variable.year
                        },
                        "complementary_ressource":"[]"
                    }
    return variable_dict

def build_dict_equipement(equipement_type):

    equipement_dict = {"equipement_type" : {
                        "name": equipement_type.name,
                        "code_DEPS": equipement_type.code_DEPS,
                        "domaine_id": equipement_type.domaine_id,
                        "sous_domaine_id": equipement_type.sous_domaine_id,
                        "definition":equipement_type.definition,
                        "source_id":equipement_type.source_id,
                        "year":equipement_type.year
                        },
                        "complementary_ressource":"[]"
                    }
    return equipement_dict
