# Generated by Django 3.1.3 on 2021-11-08 15:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('admindivisions', '0058_auto_20211020_1628'),
    ]

    operations = [
        migrations.CreateModel(
            name='ComplementaryRessource',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('link', models.CharField(max_length=100)),
                ('name', models.CharField(max_length=100)),
                ('logo', models.CharField(max_length=100)),
            ],
        ),
    ]
