# Generated by Django 3.1.3 on 2021-08-31 13:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('admindivisions', '0055_auto_20210831_1344'),
    ]

    operations = [
        migrations.RenameField(
            model_name='region',
            old_name='image_portrait',
            new_name='image_line',
        ),
    ]
