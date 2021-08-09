from django.urls import include, path

from . import views

urlpatterns = [
    path('', views.homepage, name='homepage'),
    path('', include('admindivisions.urls')),
    path('accessibilite', views.accessibilite, name='accessibilite'),
    path('legal', views.legal, name='legal'),
    path('privacy', views.privacy, name='privacy'),
    path('apropos', views.about, name='about'),
    path('region/<str:code_region>/',views.portrait_region, name='portrait_region'),
    path('portraits', views.portraits, name='portraits'),
    path('contact', views.contact, name='contact'),
]