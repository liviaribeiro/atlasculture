from django.contrib.gis import admin
from admindivisions.models import (Region, Departement, Commune, EpciType, Epci, ZonageRural, 
                                    ActionCoeurVille, ZoneEmploi, Cadrage, Entreprises_communes, 
                                    Entreprises_departements, Entreprises_regions, TypologieEvolution,
                                    Domaine, Secteur, DepensesRegion)
# Register your models here.

class RegionAdmin(admin.OSMGeoAdmin):
    list_display = ('codeinsee', 'name')

class DepartementAdmin(admin.OSMGeoAdmin):
    list_display = ('codeinsee', 'name', 'region')

class CommuneAdmin(admin.OSMGeoAdmin):
    list_display = ('codeinsee', 'name', 'departement')

class ActionCoeurVilleAdmin(admin.OSMGeoAdmin):
    list_display = ('code_acv',)

class ZoneEmploiAdmin(admin.OSMGeoAdmin):
    list_display = ('code','name')

class CadrageAdmin(admin.OSMGeoAdmin):
    list_display = ('commune','population')

admin.site.register(Region, RegionAdmin)
admin.site.register(Departement, DepartementAdmin)
admin.site.register(Commune, CommuneAdmin)
admin.site.register(EpciType, admin.OSMGeoAdmin)
admin.site.register(Epci, admin.OSMGeoAdmin)
admin.site.register(ZonageRural)
admin.site.register(ActionCoeurVille, ActionCoeurVilleAdmin)
admin.site.register(ZoneEmploi, ZoneEmploiAdmin)
admin.site.register(Cadrage, CadrageAdmin)
admin.site.register(Entreprises_communes)
admin.site.register(Entreprises_regions)
admin.site.register(Entreprises_departements)
admin.site.register(TypologieEvolution)
admin.site.register(Domaine)
admin.site.register(Secteur)
admin.site.register(DepensesRegion)





