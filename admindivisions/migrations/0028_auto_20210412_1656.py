# Generated by Django 3.1.3 on 2021-04-12 16:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('admindivisions', '0027_auto_20210412_1653'),
    ]

    operations = [
        migrations.CreateModel(
            name='TypologieAAV',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.IntegerField(null=True)),
                ('description', models.CharField(max_length=300)),
            ],
        ),
        migrations.AddField(
            model_name='commune_aav',
            name='typologie',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='admindivisions.typologieaav'),
        ),
    ]