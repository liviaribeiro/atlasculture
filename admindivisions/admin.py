from django.contrib.gis import admin
from admindivisions.models import Region, Departement, Commune, EpciType, Epci

# Register your models here.

class RegionAdmin(admin.OSMGeoAdmin):
    list_display = ('codeinsee', 'name')

class DepartementAdmin(admin.OSMGeoAdmin):
    list_display = ('codeinsee', 'name', 'region')

class CommuneAdmin(admin.OSMGeoAdmin):
    list_display = ('codeinsee', 'name', 'departement')

admin.site.register(Region, RegionAdmin)
admin.site.register(Departement, DepartementAdmin)
admin.site.register(Commune, CommuneAdmin)
admin.site.register(EpciType, admin.OSMGeoAdmin)
admin.site.register(Epci, admin.OSMGeoAdmin)
