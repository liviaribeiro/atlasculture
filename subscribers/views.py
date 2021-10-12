from subscribers.models import Portrait
from django.shortcuts import get_object_or_404, redirect, render
from .forms import SubscriberForm
from django.contrib import messages
from admindivisions.models import Region

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
    if request.method == "POST" and "selected_region" in request.POST:
        selected_region = request.POST.get("selected_region")
        if selected_region == "00":
            return redirect('portraits')
        return redirect('portrait_region', selected_region)

    if request.method == "POST" and "subscribers" in request.POST:
        form = SubscriberForm(request.POST)
        if form.is_valid():
            form.save(request.user)
            messages.success(request, "Votre inscription a bien été validée, merci.")
        else:
            messages.error(request, "Cette adresse e-mail n'est pas valide, désolé.")
    else:
        form = SubscriberForm()
        
    regions = Region.objects.all().order_by('standard_name') 
    context = {'regions': regions, 'form': form}
    return render(request, 'subscribers/homepage.html', context)

def portrait_region(request, code_region):
    region = get_object_or_404(Region, codeinsee=code_region)
    portrait = Portrait.objects.get(region=region)
    return render(request, 'subscribers/portrait_region.html', {'portrait': portrait})

def portraits(request):
    regions = Region.objects.all().order_by('standard_name') 

    return render(request, 'subscribers/portraits.html', {'regions': regions})

def about(request):
    return render(request, 'subscribers/about.html')

def contact(request):
    return render(request, 'subscribers/contact.html')

def accessibilite(request):
    return render(request, 'subscribers/accessibilite.html')

def legal(request):
    return render(request, 'subscribers/legal.html')

def privacy(request):
    return render(request, 'subscribers/privacy.html')