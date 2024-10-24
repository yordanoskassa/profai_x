from django.urls import path
from . import views
from .views import get_avatars

urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),
    path('get_avatars/', get_avatars, name='get_avatars'),
]
