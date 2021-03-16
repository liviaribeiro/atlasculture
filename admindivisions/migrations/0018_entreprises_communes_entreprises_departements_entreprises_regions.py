# Generated by Django 3.1.3 on 2021-03-03 19:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('admindivisions', '0017_cadrage_typologie_evol'),
    ]

    operations = [
        migrations.CreateModel(
            name='Entreprises_regions',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('etablissements_total', models.IntegerField(null=True)),
                ('etablissements_culture', models.IntegerField(null=True)),
                ('commune', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='admindivisions.commune')),
            ],
        ),
        migrations.CreateModel(
            name='Entreprises_departements',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('etablissements_total', models.IntegerField(null=True)),
                ('etablissements_culture', models.IntegerField(null=True)),
                ('commune', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='admindivisions.commune')),
            ],
        ),
        migrations.CreateModel(
            name='Entreprises_communes',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('etablissements_total', models.IntegerField(null=True)),
                ('etablissements_culture', models.IntegerField(null=True)),
                ('commune', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='admindivisions.commune')),
            ],
        ),
    ]
