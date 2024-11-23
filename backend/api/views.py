from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, APIKeySerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.views.decorators.csrf import csrf_exempt
from .models import Key
import requests
from openai import OpenAI
import json
from django.http import JsonResponse
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

import hashlib

class APIKeyCreate(generics.ListCreateAPIView):
    serializer_class = APIKeySerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user = self.request.user
        return Key.objects.filter(author=user)
    
# Secure storage in perform_create
    def perform_create(self, serializer):

        key = serializer.validated_data["key"]
        
        # Simple encryption using SHA256 hashing
        #hashed_key = hashlib.sha256(key.encode()).hexdigest()

        # Save the hashed key to the database
        serializer.save(author=self.request.user, key=key)



class APIKeyDelete(generics.DestroyAPIView):
    serializer_class = APIKeySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Key.objects.filter(author=user)

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]



def get_avatars(request):
    # Ensure the user is authenticated
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'User is not authenticated.'}, status=401)

    # Retrieve the API key from the database for the current user
    try:
        user_key = Key.objects.get(author=request.user)  # Adjust query based on your model structure
        api_key = user_key.key
    except Key.DoesNotExist:
        return JsonResponse({'error': 'API key not found for the user.'}, status=404)

    # HeyGen API request
    url = "https://api.heygen.com/v2/avatars"
    headers = {
        "accept": "application/json",
        "x-api-key": api_key,  # Use the retrieved key
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
@csrf_exempt
@permission_classes([AllowAny])  # Adjust permissions as needed
def generate_script(request):
    print("POST request received in generate_script")
    client = OpenAI(api_key=settings.CHATGPT_API_KEY)
    # Set your OpenAI API key
    #OpenAI.api_key = settings.CHATGPT_API_KEY
    chatgpt_key = settings.CHATGPT_API_KEY
    if request.method == 'POST':
        # Access the posted data
        data = request.data
        avatar_name = data.get("selectedAvatar")
        content_prompt = data.get("contentPrompt")
        
        if content_prompt is None:
            content_prompt = "Make a video indicating that the test did not work, and that this program in first person is failing, and that I need to check my code. "  # or provide a default value

        pre_prompt = 'You are a university level instructional designer. Use the following content prompt as reference to create an educational video script that covers all the material int he prompt. The video should be at least 1 minute, and should not exceed 7 minutes. The script will be read by the presenter once. Make sure hte script is conversational and follows sound instructional design principles, and includes an overview at the beginning that highlights the goals and learning objectives of the video:  '
        # Construct prompt or system message based on avatar_name and content_prompt
        messages = [
            {"role": "system", "content": f"You are generating a script at the college level for a person named {avatar_name}, and the script will be 2-5 minutes long, with transitional words for each part of the verbal presentation."},
            {"role": "user", "content": pre_prompt + content_prompt}
        ]

        try:
            # Call OpenAI API
            completion = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=messages
            )

            # Get the generated response from the completion object
            generated_script = completion.choices[0].message.content
            print("Generated Script:", generated_script)

            # Prepare and send the JSON response
            response_data = {
                "message": "Script generated successfully",
                "avatar_name": avatar_name,
                "content_prompt": content_prompt,
                "generated_script": generated_script,
            }
            # print(response_data["generated_script"])
            return JsonResponse(response_data, status=200)

        except Exception as e:
            print("Error generating script:", str(e))
            return JsonResponse({"error": "Failed to generate script"}, status=500)
    else:
        return JsonResponse({"error": "Only POST method is allowed"}, status=405)



'''
ERROR OCCURRING IN FUNCTION


##@api_view(['POST'])
@csrf_exempt
@permission_classes([AllowAny])
def generate_script(request):
        print("generating script....")
        try:
            data = json.loads(request.body)
            #data = json.parse(request)
            print("loading json")
            contentPrompt = data.get('contentPrompt')
            OPENAI_API_KEY = settings.CHATGPT_API_KEY
           
            if not contentPrompt:
                return JsonResponse({'error': 'Content prompt is required'}, status=400)
            print("calling API")
            # Call the ChatGPT API
            response = requests.post(
                'https://api.openai.com/v1/chat/completions',
                headers={
                    'Authorization': f'Bearer {OPENAI_API_KEY}',
                    'Content-Type': 'application/json'
                },
                json={
                    'prompt': contentPrompt,
                    'max_tokens': 150
                }
            )
            print("CALLED API")
            if response.status_code != 200:
                return JsonResponse({'error': 'Failed to generate script'}, status=response.status_code)
            print("raw response: " + response)
            response_data = response.json()
            print("response here: " + response_data)
            script = response_data.get('choices', [{}])[0].get('text', '')
            print("script here: " + script)
            return JsonResponse({'script': script})

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    
    #return JsonResponse({'error': 'Invalid request method'}, status=405)
'''