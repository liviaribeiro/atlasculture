# Generated by Django 3.1.3 on 2021-01-13 19:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('admindivisions', '0008_cadrage_commune'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cadrage',
            name='livingstandard',
            field=models.IntegerField(null=True),
        ),
    ]