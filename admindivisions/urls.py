from django.urls import path

from . import views

urlpatterns = [
    path('carto', views.map, name='map'),
    path('equipements/<int:domaine>', views.equipements, name='equipements'),
    path('pdr', views.pdr, name='pdr'),
    path('festivals', views.festivals, name='festivals'),
    path('aav', views.aav, name='aav'),
    path('download', views.download, name='download'),
    path('export/csv/', views.export_equipements_csv, name='export_equipements_csv'),
    path('export/variable/', views.export_variable_excel, name='export_variable_csv'),
    path('list/equipements/', views.list_equipements, name='list_equipements'),
    path('list/variables/', views.list_variables, name='list_variables'),
]
