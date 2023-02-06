from django.urls import path
from . import views
from .views import AudioToTextConvert

urlpatterns = [
    path('', views.getUploadFile, name='form-upload'),
    path('transcribe/', AudioToTextConvert.as_view(), name='audio-transcribe'),
    path('openfile/', views.open_file, name='open_file'),
]
