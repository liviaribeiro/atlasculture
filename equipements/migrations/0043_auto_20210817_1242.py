# Generated by Django 3.1.3 on 2021-08-17 12:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('equipements', '0042_auto_20210817_1231'),
    ]

    operations = [
        migrations.AlterField(
            model_name='metadata',
            name='definition',
            field=models.CharField(max_length=1000, null=True),
        ),
        migrations.AlterField(
            model_name='metadata',
            name='millesime',
            field=models.CharField(blank=True, max_length=4, null=True),
        ),
        migrations.AlterField(
            model_name='metadata',
            name='source',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='equipements.source'),
        ),
    ]