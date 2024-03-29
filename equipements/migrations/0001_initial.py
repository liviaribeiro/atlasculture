# Generated by Django 3.1.3 on 2021-11-16 15:34

import django.contrib.gis.db.models.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('admindivisions', '0060_complementaryressource_variables'),
    ]

    operations = [
        migrations.CreateModel(
            name='Domaine',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='DomaineAtlas',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Equipement',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('id_DEPS', models.CharField(max_length=20, null=True)),
                ('nom', models.CharField(max_length=300)),
                ('adresse', models.CharField(max_length=300, null=True)),
                ('complement_adresse', models.CharField(max_length=300, null=True)),
                ('codeinsee_arrondt', models.CharField(max_length=300, null=True)),
                ('id_origine', models.CharField(max_length=20, null=True)),
                ('gps', django.contrib.gis.db.models.fields.PointField(null=True, srid=4326)),
                ('commune', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='admindivisions.commune')),
            ],
        ),
        migrations.CreateModel(
            name='Function',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Label',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Source',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Architecture',
            fields=[
                ('equipement', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='equipements.equipement')),
                ('precision', models.CharField(max_length=200, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Bibliotheque',
            fields=[
                ('equipement', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='equipements.equipement')),
                ('typology', models.CharField(max_length=2, null=True)),
                ('surface', models.IntegerField(null=True)),
                ('surface_network', models.IntegerField(null=True)),
                ('code_bib', models.CharField(max_length=10, null=True)),
                ('code_ua', models.CharField(max_length=10, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Cinema',
            fields=[
                ('equipement', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='equipements.equipement')),
                ('cinema_type', models.CharField(max_length=10, null=True)),
                ('number_chairs', models.IntegerField(null=True)),
                ('number_rooms', models.IntegerField(null=True)),
                ('rooms_3d', models.BooleanField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Librairie',
            fields=[
                ('equipement', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='equipements.equipement')),
                ('typology', models.CharField(max_length=2, null=True)),
                ('label_year', models.IntegerField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='MonumentHistorique',
            fields=[
                ('equipement', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='equipements.equipement')),
                ('proprietaire', models.CharField(max_length=200, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Unesco',
            fields=[
                ('equipement', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='equipements.equipement')),
                ('precision', models.CharField(max_length=200, null=True)),
                ('pays', models.CharField(max_length=200, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='TypologieLieux',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('domaine', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='equipements.domaineatlas')),
            ],
        ),
        migrations.CreateModel(
            name='SousDomaine',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('domaine', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='equipements.domaine')),
            ],
            options={
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='EquipementType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('code_DEPS', models.CharField(max_length=10)),
                ('definition', models.CharField(max_length=1000, null=True)),
                ('year', models.CharField(blank=True, max_length=4, null=True)),
                ('domaine', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='equipements.domaine')),
                ('source', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='equipements.source')),
                ('sous_domaine', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='equipements.sousdomaine')),
            ],
            options={
                'ordering': ('name',),
            },
        ),
        migrations.CreateModel(
            name='EquipementLabel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('equipement', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='equipements.equipement')),
                ('label', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='equipements.label')),
            ],
        ),
        migrations.CreateModel(
            name='EquipementCommune',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('commune', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='admindivisions.commune')),
                ('equipement', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='equipements.equipement')),
            ],
        ),
        migrations.AddField(
            model_name='equipement',
            name='communes_secondaire',
            field=models.ManyToManyField(related_name='communes_secondaires', through='equipements.EquipementCommune', to='admindivisions.Commune'),
        ),
        migrations.AddField(
            model_name='equipement',
            name='equipement_type',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='equipements.equipementtype'),
        ),
        migrations.AddField(
            model_name='equipement',
            name='fonction',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='equipements.function'),
        ),
        migrations.AddField(
            model_name='equipement',
            name='fonction_secondaire',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='secondary_function', to='equipements.function'),
        ),
        migrations.AddField(
            model_name='equipement',
            name='labels',
            field=models.ManyToManyField(through='equipements.EquipementLabel', to='equipements.Label'),
        ),
        migrations.AddField(
            model_name='equipement',
            name='source',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='equipements.source'),
        ),
        migrations.CreateModel(
            name='DetailLieux',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('typologie', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='equipements.typologielieux')),
            ],
        ),
    ]
