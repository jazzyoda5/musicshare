from rest_framework import serializers
from django.contrib.auth.models import User

# Validating login data
class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'id')