# Generated by Django 4.1.5 on 2023-02-03 11:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('setup', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='setup',
            old_name='image',
            new_name='file',
        ),
    ]
