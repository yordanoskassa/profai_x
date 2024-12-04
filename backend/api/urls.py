from django.urls import path
from . import views
from .views import get_avatars
from .views import get_voices
from .views import generate_script
from .views import save_api
from .views import get_csrf_token
from .views import generate_video
#from .views import heygen_webhook
#from .views import register_webhook
from .views import get_video_link
from .views import get_user_profile
from .views import generate_slide_structure

urlpatterns = [
    path('get_avatars/', get_avatars, name='get_avatars'),
    path('generate_script/', generate_script, name='generate_script'),
    path('get_voices/', get_voices, name='get_voices'),
    path('save_api/', save_api, name='save_api'),
    path('get_csrf_token/', get_csrf_token, name='get_csrf_token'),
    path('generate_video/', generate_video, name='generate_video'),
    path('get_video_link/', get_video_link, name='get_video_link'),
    path('get_user_profile/', get_user_profile, name='get_user_profile'),
    path('generate_slide_structure/', generate_slide_structure, name='generate_slide_structure'),


    #path("save_api/", APIKeyListCreateView.as_view(), name="save_api"),
    #path("delete_api/<int:pk>/", APIKeyDeleteView.as_view(), name="delete_api"),
    #path('heygen_webhook/', heygen_webhook, name='heygen_webhook'),
    # path('register_webhook/', register_webhook, name='register_webhook'),
]
