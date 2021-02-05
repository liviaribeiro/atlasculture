from django.contrib.gis.db import models
from admindivisions.models import Commune

# Create your models here.


class Source(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name

class Domaine(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name

    def get_by_natural_key(self):
        return self.name

class Function(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name

class Equipement_Type(models.Model):
    name = models.CharField(max_length=100)
    code_DEPS = models.CharField(max_length=10)
    def __str__(self):
        return self.name

class Label(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name

class Equipement(models.Model):
    id_DEPS = models.CharField(max_length=20, null=True)
    source = models.ForeignKey(Source, on_delete=models.CASCADE, null=True)
    domaine = models.ForeignKey(Domaine, on_delete=models.CASCADE, null=True)
    sous_domaine = models.ForeignKey(Domaine, on_delete=models.CASCADE, null=True, related_name='sous_domaine')
    fonction = models.ForeignKey(Function, on_delete=models.CASCADE, null=True)
    fonction_secondaire = models.ForeignKey(Function, on_delete=models.CASCADE, null=True, related_name='secondary_function')
    equipement_type = models.ForeignKey(Equipement_Type, on_delete=models.CASCADE, null=True)
    nom = models.CharField(max_length=300)
    adresse = models.CharField(max_length=300, null=True)
    complement_adresse = models.CharField(max_length=300, null=True)
    codeinsee_arrondt = models.CharField(max_length=300, null=True)
    commune = models.ForeignKey(Commune, on_delete=models.CASCADE, null=True)
    communes_secondaire = models.ManyToManyField(Commune, through = 'Equipement_Commune', related_name = 'communes_secondaires')
    labels = models.ManyToManyField(Label, through = 'Equipement_Label')
    id_origine = models.CharField(max_length=20, null=True)
    gps = models.PointField(null=True)
    def __str__(self):
        return self.nom

class Equipement_Commune(models.Model):
    equipement = models.ForeignKey(Equipement, on_delete=models.CASCADE)
    commune = models.ForeignKey(Commune, on_delete=models.CASCADE)

    def __str__(self):
        return self.equipement.nom + ", " + self.commune.name

class Equipement_Label(models.Model):
    equipement = models.ForeignKey(Equipement, on_delete=models.CASCADE)
    label = models.ForeignKey(Label, on_delete=models.CASCADE)

class Cinema(models.Model):
    equipement = models.OneToOneField(Equipement,on_delete=models.CASCADE,primary_key=True)
    cinema_type = models.CharField(max_length=10, null=True)
    number_chairs = models.IntegerField(null=True)
    number_rooms = models.IntegerField(null=True)
    rooms_3d = models.BooleanField(null=True)

    def __str__(self):
        return self.equipement.nom

class Bibliotheque(models.Model):
    equipement = models.OneToOneField(Equipement,on_delete=models.CASCADE,primary_key=True)
    typology = models.CharField(max_length=2, null=True)
    surface = models.IntegerField(null=True)
    surface_network = models.IntegerField(null=True)
    code_bib = models.CharField(max_length=10, null=True)
    code_ua = models.CharField(max_length=10, null=True)

    def __str__(self):
        return self.equipement.nom

class Librairie(models.Model):
    equipement = models.OneToOneField(Equipement,on_delete=models.CASCADE,primary_key=True)
    typology = models.CharField(max_length=2, null=True)
    label_year = models.IntegerField(null=True)

    def __str__(self):
        return self.equipement.nom

class Architecture(models.Model):
    equipement = models.OneToOneField(Equipement,on_delete=models.CASCADE,primary_key=True)
    precision = models.CharField(max_length=200, null=True)

    def __str__(self):
        return self.equipement.nom

class Monument_Historique(models.Model):
    equipement = models.OneToOneField(Equipement,on_delete=models.CASCADE,primary_key=True)
    proprietaire = models.CharField(max_length=200, null=True)

    def __str__(self):
        return self.equipement.nom

class Unesco(models.Model):
    equipement = models.OneToOneField(Equipement,on_delete=models.CASCADE,primary_key=True)
    precision = models.CharField(max_length=200, null=True)
    pays = models.CharField(max_length=200, null=True)

    def __str__(self):
        return self.equipement.nom