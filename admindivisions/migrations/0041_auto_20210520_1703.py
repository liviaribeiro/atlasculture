# Generated by Django 3.1.3 on 2021-05-20 17:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('admindivisions', '0040_depensescommunes_population'),
    ]

    operations = [
        migrations.AlterField(
            model_name='depensescommunes',
            name='population',
            field=models.FloatField(null=True),
        ),
    ]