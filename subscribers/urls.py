from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('accessibilite', views.accessibilite, name='accessibilite')
]