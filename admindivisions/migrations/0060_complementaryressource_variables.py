# Generated by Django 3.1.3 on 2021-11-08 17:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('admindivisions', '0059_complementaryressource'),
    ]

    operations = [
        migrations.AddField(
            model_name='complementaryressource',
            name='variables',
            field=models.ManyToManyField(to='admindivisions.Variable'),
        ),
    ]
