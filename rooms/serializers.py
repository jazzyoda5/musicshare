from rest_framework import serializers
from .models import Room


class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('name', 'access')


class DeleteRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['room_id']


