from django.shortcuts import render
from rest_framework import status, viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator


@method_decorator(csrf_protect, name='dispatch')
class CreateUserView(APIView):
    permission_classes = [permissions.AllowAny, ]

    def post(self, request, format=None):
        data = request.data

        username = data['username']
        password = data['password']
        email = data['email']

        if User.objects.filter(username=username).exists():
            return Response({ 'error': 'Username already exists'})
        
        else:
            if len(password) < 8:
                return Response({ 'error': 'Password must be at least 8 characters, including letters and digits.'})
            
            else:
                user = User.objects.create_user(username=username, password=password)
                user.email = email
                user.save()
                return Response({ 'success': 'User created successfully.'})


@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = [permissions.AllowAny, ]

    def get(self, request, format=None):
        return Response({ 'success': 'CSRF cookie set'})

