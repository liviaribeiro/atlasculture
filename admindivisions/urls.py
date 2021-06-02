from django.urls import path

from . import views

urlpatterns = [
    path('carto', views.map, name='map'),
    path('equipements/<int:domaine>', views.equipements, name='equipements'),
    path('pdr', views.pdr, name='pdr')
]