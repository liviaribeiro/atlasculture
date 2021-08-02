from django.urls import include, path
from admindivisions.views import map

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('', include('admindivisions.urls')),
    path('accueil', views.homepage, name='homepage'),
    path('accessibilite', views.accessibilite, name='accessibilite'),
    path('legal', views.legal, name='legal'),
    path('privacy', views.privacy, name='privacy'),
    path('apropos', views.about, name='about')
]