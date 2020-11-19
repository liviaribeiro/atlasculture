from django.contrib.gis.db import models

# Create your models here.

class Region(models.Model):
    name = models.CharField(max_length=100)
    codeinsee = models.CharField(max_length=2)
    geom = models.MultiPolygonField(null=True)
    def __str__(self):
        return self.codeinsee

class Departement(models.Model):
    name = models.CharField(max_length=100)
    codeinsee = models.CharField(max_length=3)
    region = models.ForeignKey(Region, on_delete=models.CASCADE)
    geom = models.MultiPolygonField(null=True)
    def __str__(self):
        return self.codeinsee

class EpciType(models.Model):
    name = models.CharField(max_length=100)
    acronym = models.CharField(max_length=10)
    def __str__(self):
        return f"{self.name} ({self.acronym})"
        
class Epci(models.Model):
    name = models.CharField(max_length=100)
    codesiren = models.CharField(max_length=9)
    geom = models.MultiPolygonField(null=True)
    epci_type = models.ForeignKey(EpciType, on_delete=models.CASCADE, null=True)
    def __str__(self):
        return self.codesiren

class Commune(models.Model):
    name = models.CharField(max_length=100)
    codeinsee = models.CharField(max_length=5)
    departement = models.ForeignKey(Departement, on_delete=models.CASCADE)
    epci = models.ForeignKey(Epci, on_delete=models.CASCADE, null=True)
    geom = models.MultiPolygonField(null=True)
    def __str__(self):
        return self.codeinsee


