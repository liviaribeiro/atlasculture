# Generated by Django 3.1.3 on 2021-01-06 20:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('admindivisions', '0004_actioncoeurville'),
    ]

    operations = [
        migrations.CreateModel(
            name='ZoneEmploi',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=4)),
                ('name', models.CharField(max_length=100)),
            ],
        ),
    ]
