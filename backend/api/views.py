from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note
import requests
from django.http import JsonResponse
from django.conf import settings
from rest_framework.views import APIView

class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


def get_avatars(request):
    url = "https://api.heygen.com/v1/avatar.list"
    api_key = settings.HEYGEN_API_KEY
    headers = {
        "accept": "application/json",
        "x-api-key": api_key  # Replace with your actual HeyGen API key
    }

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Raise an exception for 4xx/5xx status codes
        data = response.json()
        return JsonResponse(data)  # Return the response from HeyGen to the frontend
    except requests.exceptions.RequestException as e:
        return JsonResponse({'error': str(e)}, status=500)