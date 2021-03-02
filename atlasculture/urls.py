from django.contrib.gis import admin
from django.urls import include, path

urlpatterns = [
    path('', include('admindivisions.urls')),
    path('', include('subscribers.urls')),
    path('admin/', admin.site.urls),
]
