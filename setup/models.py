from django.db import models
from django.core.validators import FileExtensionValidator
from django.core.exceptions import ValidationError

# Create your models here.

def validate_file_size(value):
    fileSize = (value.size / (1024 * 1024))

    if fileSize > 100:  # 500KB
        raise ValidationError('File size exceeds the maximum limit of 100MB')

class Setup(models.Model):
    
    file = models.FileField(upload_to='', blank=True, validators=[validate_file_size, FileExtensionValidator(['mp4', 'mp3', 'wmv', 'm4a', 'wav'], 'extensao invalida')])
    