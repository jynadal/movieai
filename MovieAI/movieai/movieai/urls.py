from django.urls import path, include
from django.contrib import admin

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',include('core.urls')),
    path('landing/',include('landing.urls'))
    #  path('vdvore/',include('vdvore.urls'))
]