from django.contrib.gis.db import models
from admindivisions.models import Commune

# Create your models here.

class Source(models.Model):
    name = models.CharField(max_length=200)
    def __str__(self):
        return self.name

class Domaine(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name

    def get_by_natural_key(self):
        return self.name

class SousDomaine(models.Model):
    name = models.CharField(max_length=100)
    domaine = models.ForeignKey(Domaine, on_delete=models.CASCADE, null=True)
    def __str__(self):
        return self.name


class DomaineAtlas(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name

class TypologieLieux(models.Model):
    name = models.CharField(max_length=100)
    domaine = models.ForeignKey(DomaineAtlas, on_delete=models.CASCADE, null=True)
    def __str__(self):
        return self.name
        
class DetailLieux(models.Model):
    name = models.CharField(max_length=100)
    typologie = models.ForeignKey(TypologieLieux, on_delete=models.CASCADE, null=True)
    def __str__(self):
        return self.name

class Function(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name

class EquipementType(models.Model):
    name = models.CharField(max_length=100)
    code_DEPS = models.CharField(max_length=10)
    domaine = models.ForeignKey(Domaine, on_delete=models.CASCADE, null=True)
    sous_domaine = models.ForeignKey(SousDomaine, on_delete=models.CASCADE, null=True)
    definition = models.CharField(max_length=1000, null=True)
    source = models.ForeignKey(Source, on_delete=models.CASCADE, null=True, blank=True)
    year = models.CharField(max_length=4, null=True, blank=True)
    def __str__(self):
        return self.name
    
    class Meta:
        ordering = ('name',)

class Label(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name

class Equipement(models.Model):
    id_DEPS = models.CharField(max_length=20, null=True)
    source = models.ForeignKey(Source, on_delete=models.CASCADE, null=True)
    fonction = models.ForeignKey(Function, on_delete=models.CASCADE, null=True)
    fonction_secondaire = models.ForeignKey(Function, on_delete=models.CASCADE, null=True, related_name='secondary_function')
    equipement_type = models.ForeignKey(EquipementType, on_delete=models.CASCADE, null=True)
    nom = models.CharField(max_length=300)
    adresse = models.CharField(max_length=300, null=True)
    complement_adresse = models.CharField(max_length=300, null=True)
    codeinsee_arrondt = models.CharField(max_length=300, null=True)
    commune = models.ForeignKey(Commune, on_delete=models.CASCADE, null=True)
    communes_secondaire = models.ManyToManyField(Commune, through = 'EquipementCommune', related_name = 'communes_secondaires')
    labels = models.ManyToManyField(Label, through = 'EquipementLabel')
    id_origine = models.CharField(max_length=20, null=True)
    gps = models.PointField(null=True)
    def __str__(self):
        return self.nom

class EquipementCommune(models.Model):
    equipement = models.ForeignKey(Equipement, on_delete=models.CASCADE)
    commune = models.ForeignKey(Commune, on_delete=models.CASCADE)

    def __str__(self):
        return self.equipement.nom + ", " + self.commune.name

class EquipementLabel(models.Model):
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

class MonumentHistorique(models.Model):
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