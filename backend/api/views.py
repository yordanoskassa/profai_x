from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.views.decorators.csrf import csrf_exempt
from .models import Note
import requests
from django.http import JsonResponse
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

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
    url = "https://api.heygen.com/v2/avatars"
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
    
def get_avatar_name(request):
    name = ''
    return name

def get_voices(request):
    url = "https://api.heygen.com/v2/voices"
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
    
def retrieve_video_status(request):
    pass

def get_video_link(request, vid_id='82e7bdd0c15e4aca875c90c45f3083f2'):
    url = f"https://api.heygen.com/v1/video_status.get?video_id={vid_id}"
    api_key = settings.HEYGEN_API_KEY

    headers = {
        "accept": "application/json",
        "x-api-key": api_key
    }

    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        response_json = response.json()
        print("Full Response:", response_json)  # Debugging: view the entire response

        # Check if the video is ready and retrieve the URL
        status = response_json.get("data", {}).get("status")
        if status == "completed":
            return response_json.get("data", {}).get("video_url")
        else:
            print("Video is not yet ready. Status:", status)
    else:
        print(f"Error: {response.status_code} - {response.text}")
    return None

@api_view(['POST'])
@permission_classes([AllowAny])  # Adjust permissions as needed
def generate_script(request):
    print("POST request received in generate_script")
    
    if request.method == 'POST':
        # Access the posted data
        data = request.data
        avatar_name = data.get("selectedAvatar")
        content_prompt = data.get("contentPrompt")
        
        # Process the data or generate your script here
        # For now, let's respond with the received data as a placeholder
        response_data = {
            "message": "Script generated successfully",
            "avatar_name": avatar_name,
            "content_prompt": content_prompt,
        }
        return JsonResponse(response_data, status=200)
    else:
        return JsonResponse({"error": "Only POST method is allowed"}, status=405)
