from django import forms
from django.forms import ModelForm
from .models import Setup

class UploadFileForm(ModelForm):
    class Meta:
        model = Setup
        fields = ('image',)
