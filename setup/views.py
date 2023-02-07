from django.shortcuts import render
from django.shortcuts import redirect
from django.conf import settings
from rest_framework.response import Response
from rest_framework.views import APIView
import speech_recognition 
import subprocess

# Create your views here.
def getUploadFile(request):
    return render(request, 'upload.html')

# Open a File
def open_file(request):
    file_path = f"{settings.MEDIA_ROOT}/"+"file.txt"
    subprocess.run(["start", "notepad.exe", file_path], shell=True)
    return redirect('/')

# view api
class AudioToTextConvert(APIView):

    def post(self, request, *args, **kwargs):
        r = speech_recognition.Recognizer()

        file = request.data.get('filename')
        values = file.split('/')
        song = values[len(values) - 1]
        filename = f"{settings.MEDIA_ROOT}/"+song

        file_audio = speech_recognition.AudioFile(filename)

        try:
            with file_audio as source:
                audio_text = r.record(source)
        except:
            return Response({'message':'system failed to read audio'})
            
        try:
            text = r.recognize_google(audio_text, language="pt-BR")
            
            txtFile = open(f"{settings.MEDIA_ROOT}/"+"file.txt", "w")
            txtFile.write(text)
            txtFile.close()
            return Response({'message':'audio successfull transcribed','text':text})
        except:
            return Response({'message':'system failed to transcribe audio'})