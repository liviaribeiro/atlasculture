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
    introduction = models.TextField()
    contexte = models.TextField()
    culture = models.TextField()
    fiche = models.FileField(upload_to='documents/', null=True)
    chiffres_cle = models.FileField(upload_to='documents/', null=True)





