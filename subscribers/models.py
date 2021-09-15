from django.db import models
from admindivisions.models import Region
from django.utils import timezone


# Create your models here.

class Subscriber(models.Model):
    email = models.EmailField(max_length=254)
    def __str__(self):
        return self.email

class Portrait(models.Model):
    region = models.ForeignKey(Region, on_delete=models.CASCADE)
    date_added = models.DateTimeField()
    last_updated = models.DateTimeField(default=timezone.now)
    introduction = models.TextField(null=True)
    geographie = models.TextField(null=True)
    demographie = models.TextField(null=True)
    niveaudevie = models.TextField(null=True)
    economie = models.TextField(null=True)
    travail = models.TextField(null=True)
    education = models.TextField(null=True)
    qualitedevie = models.TextField(null=True)
    offre = models.TextField(null=True)
    emploi = models.TextField(null=True)
    entreprise = models.TextField(null=True)
    depenses = models.TextField(null=True)
    fiche = models.FileField(upload_to='documents/', null=True)
    donneescontexte = models.FileField(upload_to='documents/', null=True)
    donneesculturelles = models.FileField(upload_to='documents/', null=True)






