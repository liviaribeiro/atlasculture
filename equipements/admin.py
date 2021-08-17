from django.contrib.gis import admin

from equipements.models import (EquipementType, Source, Equipement, Domaine, DomaineAtlas, Function,
Cinema, Bibliotheque, Librairie, Architecture, MonumentHistorique, Unesco,
EquipementCommune, EquipementLabel, TypologieLieux, DetailLieux)

# Register your models here.

admin.site.register(EquipementType)
admin.site.register(Source)
admin.site.register(Equipement, admin.OSMGeoAdmin)
admin.site.register(Domaine)
admin.site.register(Function)
admin.site.register(Cinema)
admin.site.register(Bibliotheque)
admin.site.register(Architecture)
admin.site.register(MonumentHistorique)
admin.site.register(Unesco)
admin.site.register(Librairie)
admin.site.register(EquipementCommune)
admin.site.register(EquipementLabel)
admin.site.register(DomaineAtlas)
admin.site.register(TypologieLieux)
admin.site.register(DetailLieux)

