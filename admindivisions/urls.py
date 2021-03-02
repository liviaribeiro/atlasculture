from django.urls import path

from . import views

urlpatterns = [
    path('carto', views.map, name='map'),
    path('equipements', views.equipements, name='equipements')
]