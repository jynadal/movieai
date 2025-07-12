from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index-2'),
    path('movies/', views.movies, name='movies'),
    path('moviedetails/', views.moviedetails, name='moviedetails'),

    path('tvshows/', views.tvshows, name='tvshows'),
    path('tvshowsdetails/', views.tvshows, name='tvshowsdetails'),

    path('webseries/', views.webseries, name='webseries'),
     path('webseriesdetails/', views.webseries, name='webseriesdetails'),
    path('about/', views.about, name='about'),

    path('news/', views.news, name='news'),
    path('newsdetails/', views.news, name='newsdetails'),

    
    # path('contact/', views.contact, name='contact'),
]