from rest_framework import viewsets
from setup.api import serializers
from setup import models

class SetupViewSets(viewsets.ModelViewSet):
    serializer_class = serializers.SetupSerializer
    queryset         = models.Setup.objects.all()