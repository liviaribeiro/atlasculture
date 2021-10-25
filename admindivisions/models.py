from django.contrib.gis.db import models
from django.utils import timezone

# Create your models here.

class Region(models.Model):
    name = models.CharField(max_length=100)
    standard_name = models.CharField(max_length=100, null=True)
    codeinsee = models.CharField(max_length=2)
    geom = models.MultiPolygonField(null=True, blank=True)
    image_line = models.ImageField(upload_to='portraits/', null=True)
    image_carte = models.ImageField(upload_to='portraits/', null=True)

    #geom_simplified = models.MultiPolygonField(null=True)
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
    annee = models.CharField(max_length=4)
    codesiren = models.CharField(max_length=9)
    geom = models.MultiPolygonField(null=True)
    epci_type = models.ForeignKey(EpciType, on_delete=models.CASCADE, null=True)
    def __str__(self):
        return self.codesiren

class ZonageRural(models.Model):
    name = models.CharField(max_length=100)
    gridens = models.IntegerField()
    def __str__(self):
        return self.name

class ZoneEmploi(models.Model):
    code = models.CharField(max_length=4)
    name = models.CharField(max_length=100)
    annee = models.CharField(max_length=4)

class ActionCoeurVille(models.Model):
    code_acv = models.CharField(max_length=6)

class TypologieEvolution(models.Model):
    code = models.IntegerField(null=True)
    typologie = models.CharField(max_length=200)

class Commune(models.Model):
    name = models.CharField(max_length=100)
    codeinsee = models.CharField(max_length=5)
    departement = models.ForeignKey(Departement, on_delete=models.CASCADE)
    epci = models.ForeignKey(Epci, on_delete=models.CASCADE, null=True)
    geom = models.MultiPolygonField(null=True)
    geom_simplified = models.MultiPolygonField(null=True)
    zonage_rural = models.ForeignKey(ZonageRural, on_delete=models.CASCADE, null=True)
    year = models.CharField(max_length=4, null=True)
    zone_emploi = models.ForeignKey(ZoneEmploi, on_delete=models.CASCADE, null=True)
    acv = models.ForeignKey(ActionCoeurVille, on_delete=models.CASCADE, null=True)
    def __str__(self):
        return self.name

class Cadrage(models.Model):
    year = models.CharField(max_length=4, null=True)
    population = models.IntegerField(null=True)
    #5 years period
    births = models.IntegerField(null=True)
    #5 years period
    deaths = models.IntegerField(null=True)
    livingstandard = models.IntegerField(null=True)
    commune = models.ForeignKey(Commune, on_delete=models.CASCADE, null=True)
    surface = models.FloatField(null=True)
    density = models.FloatField(null=True)
    plus65 = models.IntegerField(null=True)
    less25 = models.IntegerField(null=True)
    youthindex = models.FloatField(null=True)
    soldenaturel = models.FloatField(null=True)
    soldeapparent = models.FloatField(null=True)
    evolution = models.FloatField(null=True)
    typologie_evol = models.IntegerField(null=True)
    tauxpauvrete = models.FloatField(null=True)
    #householdshare = models.FloatField(null=True)
    #activepopulation = models.IntegerField(null=True)

class Entreprises_communes(models.Model):
    commune = models.ForeignKey(Commune, on_delete=models.CASCADE, null=True)
    #Effectifs salariés en équivalent temps plein de l'ensemble des secteurs marchands
    effectifs_total = models.IntegerField(null=True)
    #Effectifs salariés en équivalent temps plein des secteurs culturels marchands
    effectifs_culture = models.IntegerField(null=True)
    #Nombre d'établissements marchands
    etablissements_total = models.IntegerField(null=True)
    #Nombre d'établissements culturels marchands
    etablissements_culture = models.IntegerField(null=True)
    annee = models.CharField(max_length=4, null=True, default="2017")
    date_ajout = models.DateTimeField(default=timezone.now)

class Entreprises_departements(models.Model):
    departement = models.ForeignKey(Departement, on_delete=models.CASCADE, null=True)
    #Effectifs salariés en équivalent temps plein de l'ensemble des secteurs marchands
    effectifs_total = models.IntegerField(null=True)
    #Effectifs salariés en équivalent temps plein des secteurs culturels marchands
    effectifs_culture = models.IntegerField(null=True)
    #Nombre d'établissements marchands
    etablissements_total = models.IntegerField(null=True)
    #Nombre d'établissements culturels marchands
    etablissements_culture = models.IntegerField(null=True)

class Entreprises_regions(models.Model):
    region = models.ForeignKey(Region, on_delete=models.CASCADE, null=True)
    #Effectifs salariés en équivalent temps plein de l'ensemble des secteurs marchands
    effectifs_total = models.IntegerField(null=True)
    #Effectifs salariés en équivalent temps plein des secteurs culturels marchands
    effectifs_culture = models.IntegerField(null=True)
    #Nombre d'établissements marchands
    etablissements_total = models.IntegerField(null=True)
    #Nombre d'établissements culturels marchands
    etablissements_culture = models.IntegerField(null=True)

class Emploi_ZE(models.Model):
    zone_emploi = models.ForeignKey(ZoneEmploi, on_delete=models.CASCADE, null=True)
    nombre_actifs = models.IntegerField(null=True)
    nombre_profession_culturelle = models.IntegerField(null=True)
    nombre_secteur_culturel = models.IntegerField(null=True)

class Emploi_Departement(models.Model):
    departement = models.ForeignKey(Departement, on_delete=models.CASCADE, null=True)
    nombre_actifs = models.IntegerField(null=True)
    nombre_profession_culturelle = models.IntegerField(null=True)
    nombre_secteur_culturel = models.IntegerField(null=True)

class Emploi_Region(models.Model):
    region = models.ForeignKey(Region, on_delete=models.CASCADE, null=True)
    nombre_actifs = models.IntegerField(null=True)
    nombre_profession_culturelle = models.IntegerField(null=True)
    nombre_secteur_culturel = models.IntegerField(null=True)

class Domaine(models.Model):
    nom = models.CharField(max_length=200)
    def __str__(self):
        return self.nom

class Secteur(models.Model):
    domaine = models.ForeignKey(Domaine, on_delete=models.CASCADE, null=True)
    nom = models.CharField(max_length=200)
    def __str__(self):
        return self.nom + ' (' + self.domaine.nom + ')'

class DepensesMinistereRegion(models.Model):
    region = models.ForeignKey(Region,on_delete=models.CASCADE, null=True)
    depenses_fonctionnement = models.FloatField(null=True)
    depenses_investissement = models.FloatField(null=True)
    depenses_totales = models.FloatField(null=True)
    annee = models.CharField(max_length=4, null=True)

class DepensesMinistereDepartement(models.Model):
    departement = models.ForeignKey(Departement,on_delete=models.CASCADE, null=True)
    depenses_fonctionnement = models.FloatField(null=True)
    depenses_investissement = models.FloatField(null=True)
    depenses_totales = models.FloatField(null=True)
    annee = models.CharField(max_length=4, null=True)

class DepensesRegion(models.Model):
    region = models.ForeignKey(Region,on_delete=models.CASCADE, null=True)
    secteur = models.ForeignKey(Secteur, on_delete=models.CASCADE, null=True)
    depenses_fonctionnement = models.FloatField(null=True)
    depenses_investissement = models.FloatField(null=True)
    depenses_totales = models.FloatField(null=True)
    annee = models.CharField(max_length=4, null=True)

class DepensesDepartement(models.Model):
    departement = models.ForeignKey(Departement,on_delete=models.CASCADE, null=True)
    secteur = models.ForeignKey(Secteur, on_delete=models.CASCADE, null=True)
    depenses_fonctionnement = models.FloatField(null=True)
    depenses_investissement = models.FloatField(null=True)
    depenses_totales = models.FloatField(null=True)
    annee = models.CharField(max_length=4, null=True)

class DepensesEPCI(models.Model):
    epci = models.ForeignKey(Epci,on_delete=models.CASCADE, null=True)
    secteur = models.ForeignKey(Secteur, on_delete=models.CASCADE, null=True)
    depenses_fonctionnement = models.FloatField(null=True)
    depenses_investissement = models.FloatField(null=True)
    depenses_totales = models.FloatField(null=True)
    population = models.FloatField(null=True)
    annee = models.CharField(max_length=4, null=True)

class DepensesCommunes(models.Model):
    commune = models.ForeignKey(Commune,on_delete=models.CASCADE, null=True)
    secteur = models.ForeignKey(Secteur, on_delete=models.CASCADE, null=True)
    depenses_fonctionnement = models.FloatField(null=True)
    depenses_investissement = models.FloatField(null=True)
    depenses_totales = models.FloatField(null=True)
    population = models.FloatField(null=True)
    annee = models.CharField(max_length=4, null=True)

class TypologieAAV(models.Model):
    code = models.IntegerField(null=True)
    description = models.CharField(max_length=300)
    def __str__(self):
        return str(self.code)

class AireAttractionVille(models.Model):
    nom = models.CharField(max_length=200)
    codeinsee = models.CharField(max_length=3, null=True)
    tranche_population = models.IntegerField(null=True)
    def __str__(self):
        return self.nom

class Commune_AAV(models.Model):
    commune = models.ForeignKey(Commune, on_delete=models.CASCADE)
    AAV = models.ForeignKey(AireAttractionVille, on_delete=models.CASCADE)
    pole = models.BooleanField(null=True)
    typologie = models.ForeignKey(TypologieAAV, on_delete=models.CASCADE, null=True)
    def __str__(self):
        return self.AAV.nom + " " + self.commune.name

class Source(models.Model):
    nom = models.CharField(max_length=200)
    def __str__(self):
        return self.nom

class Variable(models.Model):
    nom = models.CharField(max_length=200)
    definition = models.CharField(max_length=1000)
    source = models.ForeignKey(Source, on_delete=models.CASCADE, null=True, blank=True)
    year = models.CharField(max_length=4, null=True, blank=True)
    position = models.IntegerField(null=True)
    file = models.FileField(upload_to='documents/', null=True)
    def __str__(self):
        return self.nom
    class Meta:
        ordering = ('position',)
