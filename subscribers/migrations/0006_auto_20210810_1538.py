# Generated by Django 3.1.3 on 2021-08-10 15:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('subscribers', '0005_portrait'),
    ]

    operations = [
        migrations.AddField(
            model_name='portrait',
            name='chiffres_cle',
            field=models.FileField(null=True, upload_to='documents/'),
        ),
        migrations.AddField(
            model_name='portrait',
            name='fiche',
            field=models.FileField(null=True, upload_to='documents/'),
        ),
    ]