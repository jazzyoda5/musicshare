from djoser.serializers import UserCreateSerializer
from django.contrib.auth.models import User
from .models import SavedRoom
from rest_framework import serializers


class SaveRoomSerializer(serializers.Serializer):
    username = serializers.CharField(required=True, max_length=100)
    roomId = serializers.CharField(required=True, max_length=8)


class DeleteSavedRoomSerializer(serializers.Serializer):
    room_id = serializers.CharField(required=True, max_length=8)


