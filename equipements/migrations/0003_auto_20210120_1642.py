# Generated by Django 3.1.3 on 2021-01-20 16:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('equipements', '0002_auto_20210120_1636'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Discipline_Equipement',
            new_name='Domaine',
        ),
        migrations.RenameField(
            model_name='equipement',
            old_name='discipline',
            new_name='domaine',
        ),
    ]
