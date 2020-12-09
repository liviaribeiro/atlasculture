from django.contrib.gis import admin
from admindivisions.models import Region, Departement, Commune, EpciType, Epci, ZonageRural
from equipements.models import Label, Equipement_Type, Source, Equipement, Cinema, Bibliotheque, Discipline_Equipement

# Register your models here.

class RegionAdmin(admin.OSMGeoAdmin):
    list_display = ('codeinsee', 'name')

class DepartementAdmin(admin.OSMGeoAdmin):
    list_display = ('codeinsee', 'name', 'region')

class CommuneAdmin(admin.OSMGeoAdmin):
    list_display = ('codeinsee', 'name', 'departement')

class EquipementTypeAdmin(admin.OSMGeoAdmin):
    list_display = ('name','code_DEPS')

class EquipementAdmin(admin.OSMGeoAdmin):
    list_display = ('name','source', 'discipline', 'equipement_type')

admin.site.register(Region, RegionAdmin)
admin.site.register(Departement, DepartementAdmin)
admin.site.register(Commune, CommuneAdmin)
admin.site.register(EpciType, admin.OSMGeoAdmin)
admin.site.register(Epci, admin.OSMGeoAdmin)
admin.site.register(Label)
admin.site.register(Equipement_Type, EquipementTypeAdmin)
admin.site.register(Source)
admin.site.register(Equipement, EquipementAdmin)
admin.site.register(Cinema)
admin.site.register(Bibliotheque)
admin.site.register(Discipline_Equipement)
admin.site.register(ZonageRural)




