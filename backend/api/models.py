from django.db import models
from django.contrib.auth.models import User



class Key(models.Model):
    key = models.CharField(max_length=255, unique=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f"Heygen key: {self.key}"