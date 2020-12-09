from django.contrib.gis.db import models
from admindivisions.models import Commune

# Create your models here.

class Label(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name

class Equipement_Type(models.Model):
    name = models.CharField(max_length=100)
    code_DEPS = models.CharField(max_length=10)
    def __str__(self):
        return self.name

class Discipline_Equipement(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name

class Source(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name

class Cinema(models.Model):
    cinema_type = models.CharField(max_length=10, null=True)
    number_chairs = models.IntegerField(null=True)
    number_rooms = models.IntegerField(null=True)
    rooms_3d = models.BooleanField(null=True)

class Bibliotheque(models.Model):
    typology = models.CharField(max_length=2, null=True)
    surface = models.IntegerField(null=True)
    surface_network = models.IntegerField(null=True)

class Monument_Historique(models.Model):
    owner = models.CharField(max_length=200, null=True)

class Equipement(models.Model):
    id_DEPS = models.CharField(max_length=20, null=True)
    source = models.ForeignKey(Source, on_delete=models.CASCADE, null=True)
    discipline = models.ForeignKey(Discipline_Equipement, on_delete=models.CASCADE, null=True)
    equipement_type = models.ForeignKey(Equipement_Type, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=300)
    address = models.CharField(max_length=300, null=True)
    formatted_address = models.CharField(max_length=300, null=True)
    complement_address = models.CharField(max_length=300, null=True)
    postal_code = models.CharField(max_length=20, null=True)
    codeinsee = models.CharField(max_length=300, null=True)
    codeinsee_arrondt = models.CharField(max_length=300, null=True)
    commune = models.ForeignKey(Commune, on_delete=models.CASCADE, null=True)
    cinema = models.ForeignKey(Cinema, on_delete=models.CASCADE, null=True)
    mh = models.ForeignKey(Monument_Historique, on_delete=models.CASCADE, null=True)
    bibliotheque = models.ForeignKey(Bibliotheque, on_delete=models.CASCADE, null=True)
    city = models.CharField(max_length=300, null=True)
    labels = models.ManyToManyField(Label)
    id_origin = models.CharField(max_length=20, null=True)
    gps = models.PointField(null=True)
    def __str__(self):
        return self.name