from django.shortcuts import render
from .forms import SubscriberForm
from django.contrib import messages


# Create your views here.

def index(request):
    if request.method == "POST":
        form = SubscriberForm(request.POST)
        if form.is_valid():
            subscriber = form.save(request.user)
            messages.success(request, "Merci ! Vous êtes bien inscrit à la liste de diffusion.")
            return render(request, 'subscribers/index.html', {'form': form})
        else:
            messages.error(request, "Saisissez une adresse de courriel valide.")
    else:
        form = SubscriberForm()
    return render(request, 'subscribers/index.html', {'form': form})

def homepage(request):
    return render(request, 'subscribers/homepage.html')

def about(request):
    return render(request, 'subscribers/about.html')

def accessibilite(request):
    return render(request, 'subscribers/accessibilite.html')

def legal(request):
    return render(request, 'subscribers/legal.html')

def privacy(request):
    return render(request, 'subscribers/privacy.html')