from django.db import models
from django.core.validators import FileExtensionValidator

# Create your models here.

class Setup(models.Model):
    
    file = models.FileField(upload_to='', blank=True, validators=[FileExtensionValidator(['mp4', 'mp3', 'wmv', 'm4a', 'wav'], 'extensao invalida')])
    