from rest_framework import serializers
from setup import models

class SetupSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Setup
        fields = '__all__'