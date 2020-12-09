from django.contrib.gis import admin
from django.urls import include, path

urlpatterns = [
    path('admindivisions/', include('admindivisions.urls')),
    path('', include('subscribers.urls')),
    path('admin/', admin.site.urls),
]
