# Generated by Django 3.1.3 on 2021-03-08 15:09

import django.contrib.gis.db.models.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('admindivisions', '0020_auto_20210303_2005'),
    ]

    operations = [
        migrations.AlterField(
            model_name='region',
            name='geom',
            field=django.contrib.gis.db.models.fields.MultiPolygonField(blank=True, null=True, srid=4326),
        ),
    ]