from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path("", views.login, name="login"),
    path("add_vdvore/",views.add_vdvore, name="add_vdvore"),
    path("vdvore_list", views.vdvore_list, name="vdvore_list"),
    #  path("add_vdvore/",views.add_vdvore, name="add_vdvore"),
    # path("vdvore_list", views.vdvore_list, name="vdvore_list"),

   
]