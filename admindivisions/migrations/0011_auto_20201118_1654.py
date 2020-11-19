# Generated by Django 3.1.3 on 2020-11-18 16:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('admindivisions', '0010_epci_epcitype'),
    ]

    operations = [
        migrations.AddField(
            model_name='commune',
            name='epci',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='admindivisions.epci'),
        ),
        migrations.AddField(
            model_name='epci',
            name='epci_type',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='admindivisions.epcitype'),
        ),
    ]
