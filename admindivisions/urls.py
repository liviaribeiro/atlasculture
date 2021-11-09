from django.urls import path

from . import views

urlpatterns = [
    path('carto', views.map, name='map'),
    path('equipements/<int:domaine>', views.equipements, name='equipements'),
    path('pdr', views.pdr, name='pdr'),
    path('festivals', views.festivals, name='festivals'),
    path('aav', views.aav, name='aav'),
    path('download', views.download, name='download'),
    path('export/csv/<int:equipement_type>', views.export_equipements_csv, name='export_equipements_csv'),
]
