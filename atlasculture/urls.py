from django.contrib.gis import admin
from django.urls import include, path
from django.conf.urls.static import static
from django.conf import settings


urlpatterns = [
    path('', include('admindivisions.urls')),
    path('', include('subscribers.urls')),
    path('admin/', admin.site.urls),
]


if settings.DEBUG: 
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)