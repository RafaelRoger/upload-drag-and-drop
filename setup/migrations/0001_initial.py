# Generated by Django 4.1.5 on 2023-02-02 17:36

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Setup',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.FileField(blank=True, upload_to='', validators=[django.core.validators.FileExtensionValidator(['mp4', 'mp3', 'wmv', 'm4a'], 'extensao invalida')])),
            ],
        ),
    ]