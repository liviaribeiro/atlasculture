# Generated by Django 3.1.3 on 2021-02-01 17:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('equipements', '0018_equipement_unesco'),
    ]

    operations = [
        migrations.RenameField(
            model_name='equipement',
            old_name='id_origin',
            new_name='id_origine',
        ),
    ]