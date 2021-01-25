from django.shortcuts import render
from rest_framework import views
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializers import CreateRoomSerializer


class CreateRoomView(views.APIView):
    serializer_class = CreateRoomSerializer

    def post(self, request, format=None):
        serializer = request.serializer_class(data=request.data)