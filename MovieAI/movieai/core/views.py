from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request,"Core/index-2.html")

def movies(request):
    return render(request,"Core/movie.html")

def tvshows(request):
    return render(request,"Core/tvshows.html")

def tvshowsdetails(request):
    return render(request,"Core/tv-shows-details.html")

def webseries(request):
    return render(request,"Core/webseries.html")

def webseriesdetails(request):
    return render(request,"Core/web-series-details.html")

def news(request):
    return render(request,"Core/news.html")

def newsdetails(request):
    return render(request,"Core/news-details.html")

def about(request):
    return render(request,"Core/about.html")

def moviedetails(request):
    return render(request,"Core/movie-details.html")