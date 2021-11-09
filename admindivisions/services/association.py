from admindivisions.models import Variable
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
            list_cr.append(build_dict_cr(cr=cr))

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

