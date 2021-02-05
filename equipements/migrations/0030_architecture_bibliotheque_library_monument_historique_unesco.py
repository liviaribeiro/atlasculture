# Generated by Django 3.1.3 on 2021-02-01 19:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('equipements', '0029_auto_20210201_1915'),
    ]

    operations = [
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
            name='Library',
            fields=[
                ('equipement', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='equipements.equipement')),
                ('typology', models.CharField(max_length=2, null=True)),
                ('label_year', models.IntegerField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Monument_Historique',
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
    ]
