# Generated by Django 3.1.3 on 2021-02-01 19:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('equipements', '0028_auto_20210201_1915'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Architecture',
        ),
        migrations.DeleteModel(
            name='Bibliotheque',
        ),
        migrations.DeleteModel(
            name='Library',
        ),
        migrations.DeleteModel(
            name='Monument_Historique',
        ),
        migrations.DeleteModel(
            name='Unesco',
        ),
    ]
