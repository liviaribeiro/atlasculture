# Generated by Django 3.1.3 on 2021-04-27 16:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('admindivisions', '0033_emploi_departement'),
    ]

    operations = [
        migrations.CreateModel(
            name='DepensesDepartement',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('depenses_fonctionnement', models.FloatField(null=True)),
                ('depenses_investissement', models.FloatField(null=True)),
                ('depenses_totales', models.FloatField(null=True)),
                ('annee', models.CharField(max_length=4, null=True)),
                ('departement', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='admindivisions.departement')),
                ('secteur', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='admindivisions.secteur')),
            ],
        ),
    ]