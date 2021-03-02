# Generated by Django 3.1.3 on 2021-01-20 16:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('equipements', '0006_equipement_sous_domaine'),
    ]

    operations = [
        migrations.CreateModel(
            name='Function',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.AddField(
            model_name='equipement',
            name='main_function',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='equipements.function'),
        ),
        migrations.AddField(
            model_name='equipement',
            name='secondary_function',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='secondary_function', to='equipements.function'),
        ),
    ]