from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Key


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user


class APIKeySerializer(serializers.ModelSerializer):
    class Meta:
        model = Key
        fields = ["key", "author"]
        extra_kwargs = {
            "author": {"read_only": True, "required": False},
        }

    def validate_key(self, value):
        if not value or len(value.strip()) == 0:
            raise serializers.ValidationError("Key cannot be empty.")
        return value

