from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, APIKeySerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.views.decorators.csrf import csrf_exempt
from .models import Key
import requests
from openai import OpenAI
from django.http import JsonResponse
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
import hashlib
from django.contrib.auth.decorators import login_required
from rest_framework.parsers import JSONParser
from django.middleware.csrf import get_token
from rest_framework.exceptions import ParseError
import json
from pptx import Presentation
from rest_framework.response import Response


def get_csrf_token(request):
    token = get_token(request)
    return JsonResponse({'csrfToken': token})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def save_api(request):
    if request.method == 'POST':
        try:
            data = JSONParser().parse(request)
            print("Request data received on backend:", data)
        except ParseError:
            return JsonResponse({'error': 'Invalid JSON data.'}, status=400)

        serializer = APIKeySerializer(data=data)
        if serializer.is_valid():
            if request.user.is_authenticated:
                api_key = serializer.save(author=request.user)
                return JsonResponse(
                    {
                        'message': 'API Key created successfully.',
                        'api_key': api_key.key
                    },
                    status=201
                )
            else:
                return JsonResponse({'error': 'User not authenticated.'}, status=401)
        return JsonResponse({'error': 'Invalid data.', 'details': serializer.errors}, status=400)
    return JsonResponse({'error': 'Invalid HTTP method.'}, status=405)

class APIKeyDelete(generics.DestroyAPIView):
    serializer_class = APIKeySerializer
    permission_classes = [IsAuthenticated]  # Only authenticated users

    def get_queryset(self):
        return Key.objects.filter(author=self.request.user)


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]  # Allow anyone to register


    """ 
    try:
        user_key = Key.objects.get(author=request.user)
        api_key = user_key.key
    except Key.DoesNotExist:
        return JsonResponse({'error': 'API key not found for the user.'}, status=404) """


@api_view(['GET'])
@permission_classes([IsAuthenticated])  # Enforce authentication
def get_avatars(request):
    print("get avatars starting in views")

    api_key = settings.HEYGEN_API_KEY
    url = "https://api.heygen.com/v2/avatars"
    headers = {"accept": "application/json", "x-api-key": api_key}

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        return JsonResponse(response.json(), status=200)
    except requests.exceptions.RequestException as e:
        return JsonResponse({'error': str(e)}, status=500)
    
    

@api_view(['GET'])
@permission_classes([AllowAny])  # Allow access without authentication
def get_voices(request):
    url = "https://api.heygen.com/v2/voices"
    api_key = settings.HEYGEN_API_KEY
    headers = {"accept": "application/json", "x-api-key": api_key}

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        return JsonResponse(response.json(), status=200)
    except requests.exceptions.RequestException as e:
        return JsonResponse({'error': str(e)}, status=500)


@api_view(['POST'])
@permission_classes([IsAuthenticated])  # Enforce authentication
def generate_script(request):
    client = OpenAI(api_key=settings.CHATGPT_API_KEY)
    data = request.data
    avatar_name = data.get("selectedAvatar")
    content_prompt = data.get("contentPrompt") or "Provide a default prompt here."

    pre_prompt = (
        "You are a university-level instructional designer. Use the following content " + 
        "prompt to create an educational video script that adheres to sound instructional " +
        "design principles, and only includes text only. Please just have raw text, no headers of text at all. " + 
        "Do not have any indicators on who is speaking (no [Instructor]: label anywhere please, just the raw text).  "
    )
    messages = [
        {"role": "system", "content": f"Generating a script with text only."},
        {"role": "user", "content": pre_prompt + content_prompt},
    ]

    try:
        completion = client.chat.completions.create(model="gpt-3.5-turbo", messages=messages)
        generated_script = completion.choices[0].message.content
        return JsonResponse(
            {
                "message": "Script generated successfully",
                "avatar_name": avatar_name,
                "generated_script": generated_script,
            },
            status=200,
        )
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)



@api_view(['POST'])
@permission_classes([IsAuthenticated])  # Enforce authentication
def generate_slide_structure(request):
    client = OpenAI(api_key=settings.CHATGPT_API_KEY)
    data = request.data
    content_prompt = data.get("contentPrompt") or "Provide a default prompt here."

    prompt_structure = ("[Title of Slide],bullet point one,bullet point two, bullet point three,bullet point four")
    pre_prompt = (
        "You are a university-level instructional designer. Use the following script " + 
        " to create a set of slides for a powerpoint presentation that is structures with the title of the " + 
        "presentation followed by a comma, then each bullet point, separated by a comma. Here is an example.   " +
        prompt_structure
    )
    
    messages = [
        {"role": "system", "content": f"Generating a slideshow with a rigorous structure. "},
        {"role": "user", "content": pre_prompt + content_prompt},
    ]

    try:
        completion = client.chat.completions.create(model="gpt-3.5-turbo", messages=messages)
        generated_slides = completion.choices[0].message.content
        return JsonResponse(
            {
                "message": "Slides generated successfully",
                "generated_slides": generated_slides,
            },
            status=200,
        )
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

@api_view(['POST'])
@permission_classes([IsAuthenticated])  # Enforce authentication
def get_video_link(request):
    print("getting video id")
    video_id = request.data.get('video_id')
    if not video_id:
        print("no video id")
        return JsonResponse({'error': 'video_id is required'}, status=400)

    # Simulate fetching the video status and URL using the video_id
    # Replace this with actual logic to get the video status and URL
    url = f"https://api.heygen.com/v1/video_status.get?video_id={video_id}"

    api_key = settings.HEYGEN_API_KEY
    headers = {
        "accept": "application/json",
        "x-api-key": api_key
    }

    try:
        print(f"sending request to heygen with URL: {url}")  # Log the full URL
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        print(f"Received response from heygen: {response.status_code}, {response.text}")  # Log the full response

        response_json = response.json()
        print(f"Response JSON: {response_json}")  # Log the JSON response

        status = response_json.get("data", {}).get("status")
        video_url = response_json.get("data", {}).get("video_url")

        if status == "completed":
            print(f"Video completed, URL: {video_url}")
            return JsonResponse({'video_url': video_url}, status=200)
        else:
            print(f"Video not ready, status: {status}")
            return JsonResponse({'status': status, 'message': 'Video is not ready yet'}, status=202)

    except requests.exceptions.RequestException as e:
        print(f"Request error: {str(e)}")  # Log the exception error
        return JsonResponse({'error': str(e)}, status=500)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    user = request.user  # The currently authenticated user
    user_data = {
        'username': user.username,  # Return only the username (no password)
    }
    return Response(user_data)

'''
@api_view(['POST'])
@permission_classes([IsAuthenticated])  # Enforce authentication
def generate_video(request):
    print("Simulating video generation")

    # Simulated response
    simulated_response = {
        "error": None,
        "data": {
            "video_id": "13d4782ca70a4dff9d8fae36e64cfcd0"
        }
    }

    print("Returning simulated response:", simulated_response)
    return JsonResponse(simulated_response, status=200)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_slide_from_json(request):
    # Parse the JSON data
    data = json.loads(request)
    title = data.get("title", "")
    bullet_points = data.get("bullet_points", [])

    # Create a presentation object
    prs = Presentation()

    # Add a slide with a title and content layout
    slide_layout = prs.slide_layouts[1]
    slide = prs.slides.add_slide(slide_layout)

    # Set the title
    title_placeholder = slide.shapes.title
    title_placeholder.text = title

    # Add bullet points
    content_placeholder = slide.placeholders[1]
    for point in bullet_points:
        p = content_placeholder.text_frame.add_paragraph()
        p.text = point

    # Save the presentation
    prs.save('output.pptx')
'''



@api_view(['POST'])
@permission_classes([IsAuthenticated])  # Enforce authentication
def generate_video(request):
    print("starting video generation")
    url = "https://api.heygen.com/v2/video/generate"
    api_key = settings.HEYGEN_API_KEY
    script = request.data.get("script")
    title = request.data.get("title")
    avatar = request.data.get("selectedAvatar")
    voice = request.data.get("selectedVoice")


    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "x-api-key": api_key
    }

    # Extract data from the request
    script = request.data.get("script")
    title = request.data.get("title")
    avatar = request.data.get("selectedAvatar")
    voice = request.data.get("selectedVoice")

    print("Avatar Voice ID: " + str(voice))
    print("Avatar ID: " + str(avatar))

    payload = {
        "caption": False,
        "dimension": {"width": 1280, "height": 720},
        "title": title,
        "video_inputs": [
            {
                "character": {
                    "type": "avatar",
                    "avatar_id": avatar,
                    "scale": 1.0
                },
                "voice": {
                    "type": "text",
                    "voice_id": voice,  # Replace with actual voice ID
                    "input_text": script
                }
            }
        ]
    }

    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "x-api-key": api_key
    }

    response = requests.post(url, json=payload, headers=headers)
    print(response.text)

    try:
        print("parsing responce")
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()

        response_json = response.json()
        return JsonResponse(response_json, status=response.status_code)
    except requests.exceptions.RequestException as e:
        return JsonResponse({'error': str(e)}, status=500)






#### For when we have a real website domain, we can use webhooks to notify our 
# browser when a video is done generating as opposed to having a 
# user click a button over and over. 

#@csrf_exempt
#@require_POST
#def heygen_webhook(request):
#    data = request.json()
#    video_id = data.get('video_id')
#    status = data.get('status')
#    video_url = data.get('video_url')
#
#    if status == 'completed':
#        # Handle the completed video, e.g., save the video URL to the database
#        print(f"Video {video_id} is ready at {video_url}")
#        # You can also update the frontend via WebSocket or other means
#
#    return JsonResponse({'message': 'Webhook received'}, status=200)


#@api_view(['POST'])
#@permission_classes([IsAuthenticated])  # Enforce authentication
#def register_webhook(request):
#    url = "https://api.heygen.com/v2/webhooks"
#    api_key = settings.HEYGEN_API_KEY
#    headers = {
#        "accept": "application/json",
#        "content-type": "application/json",
#        "x-api-key": api_key
#    }
#    payload = {
#        "url": "http://127.0.0.1:8000/api/heygen_webhook/",
#        "event": "video.completed"
#    }
#
#    try:
#        response = requests.post(url, json=payload, headers=headers)
#        response.raise_for_status()
#        return JsonResponse({'message': 'Webhook registered successfully'}, status=200)
#    except requests.exceptions.RequestException as e:
#        return JsonResponse({'error': str(e)}, status=500)