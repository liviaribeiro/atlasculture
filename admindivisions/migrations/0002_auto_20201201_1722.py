# Generated by Django 3.1.3 on 2020-12-01 17:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('admindivisions', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ZonageRural',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('gridens', models.IntegerField()),
            ],
        ),
        migrations.AddField(
            model_name='commune',
            name='zonage_rural',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='admindivisions.zonagerural'),
        ),
    ]
