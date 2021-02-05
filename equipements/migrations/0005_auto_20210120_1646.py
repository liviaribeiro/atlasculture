# Generated by Django 3.1.3 on 2021-01-20 16:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('equipements', '0004_auto_20210120_1645'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='equipement',
            name='domaine',
        ),
        migrations.AddField(
            model_name='equipement',
            name='domaine',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='equipements.domaine'),
        ),
        migrations.DeleteModel(
            name='Equipement_Domaine',
        ),
    ]
