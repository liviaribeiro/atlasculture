from django.contrib.gis import admin

from equipements.models import (Equipement_Type, Source, Equipement, Domaine, Function,
Cinema, Bibliotheque, Librairie, Architecture, Monument_Historique, Unesco,
Equipement_Commune)

# Register your models here.

admin.site.register(Equipement_Type)
admin.site.register(Source)
admin.site.register(Equipement, admin.OSMGeoAdmin)
admin.site.register(Domaine)
admin.site.register(Function)
admin.site.register(Cinema)
admin.site.register(Bibliotheque)
admin.site.register(Architecture)
admin.site.register(Monument_Historique)
admin.site.register(Unesco)
admin.site.register(Librairie)
admin.site.register(Equipement_Commune)