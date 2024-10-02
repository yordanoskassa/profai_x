# https://chatgpt.com/share/66fca461-6aac-8000-9f31-a137f8004f40
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from django.shortcuts import render, redirect

User = get_user_model()

from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)
    
    if user is not None:
        # Login successful, you can return a token or user info here
        return Response({'message': 'Login successful!'}, status=status.HTTP_200_OK)
    else:
        # Login failed
        return Response({'message': 'Invalid credentials!'}, status=status.HTTP_401_UNAUTHORIZED)


