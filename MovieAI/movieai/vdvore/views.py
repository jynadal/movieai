from django.shortcuts import render

# Create your views here.
def login(request):
    return render(request,"Vdvore/login.html")

def add_vdvore(request):
    return render(request,"Vdvore/add-vdvore.html")

def vdvore_list(request):
    return render(request,"Vdvore/vdvore-list.html")

def edit_vdvore(request):
    return render(request,"Vdvore/edit-vdvore.html")

def view_vdvore(request):
    return render(request,"Vdvore/view-vdvore.html")

