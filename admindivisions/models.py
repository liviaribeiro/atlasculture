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

class Commune(models.Model):
    name = name = models.CharField(max_length=100)
    codeinsee = models.CharField(max_length=5)
    departement = models.ForeignKey(Departement, on_delete=models.CASCADE)
    geom = models.MultiPolygonField(null=True)
    def __str__(self):
        return self.codeinsee

