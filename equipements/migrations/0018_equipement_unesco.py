# Generated by Django 3.1.3 on 2021-02-01 17:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('equipements', '0017_auto_20210201_1734'),
    ]

    operations = [
        migrations.AddField(
            model_name='equipement',
            name='unesco',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='equipements.unesco'),
        ),
    ]
