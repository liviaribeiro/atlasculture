# Generated by Django 3.1.3 on 2021-01-20 23:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('admindivisions', '0013_auto_20210120_1636'),
    ]

    operations = [
        migrations.AddField(
            model_name='cadrage',
            name='youthindex',
            field=models.IntegerField(null=True),
        ),
    ]