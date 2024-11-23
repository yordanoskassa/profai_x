from django.urls import path
from . import views
from .views import get_avatars
from .views import get_voices
from .views import generate_script

#from .views import APIKeyListCreateView, APIKeyDeleteView

urlpatterns = [
    path('get_avatars/', get_avatars, name='get_avatars'),
    path('generate_script/', generate_script, name='generate_script'),
    path('get_voices/', get_voices, name='get_voices'),

    path('save_api/', views.APIKeyCreate.as_view(), name='save_api'),

    #path("save_api/", APIKeyListCreateView.as_view(), name="save_api"),
    #path("delete_api/<int:pk>/", APIKeyDeleteView.as_view(), name="delete_api"),
]

