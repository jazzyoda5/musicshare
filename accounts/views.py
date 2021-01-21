from django.shortcuts import render
from rest_framework import status, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserLoginSerializer
from django.contrib.auth.models import User
from django.http import HttpResponse


# Create your views here.
class LoginView(APIView):
    serializer_class = UserLoginSerializer

    def post(self, request, format=None):

        #Serializer
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            # Get data
            username = serializer.data.get('username')
            password = serializer.data.get('password')



            return Response()

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
