from django.shortcuts import render
from rest_framework import status, viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib import auth
from django.http import HttpResponse
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator
from django.db.models import Q


@method_decorator(csrf_protect, name='dispatch')
class CreateUserView(APIView):
    permission_classes = [permissions.AllowAny, ]

    def post(self, request, format=None):
        data = request.data

        username = data['username']
        password = data['password']
        email = data['email']

        if User.objects.filter(username=username).exists() or User.objects.filter(email=email).exists():
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


@method_decorator(csrf_protect, name='dispatch')
class LoginView(APIView):
    permission_classes = [permissions.AllowAny, ]

    def post(self, request, format=None):
        data = self.request.data

        username = data['username']
        password = data['password']

        try:
            user = auth.authenticate(username=username, password=password)

            if user is not None:
                auth.login(request, user)
                print('[LOGIN] User authenticated.')
                response_data = {
                    'success': 'User authenticated',
                    'username': username
                }
                return Response(response_data)
            
            else:
                print('[LOGIN] Not authenticated.')
                return Response({ 'error': 'Error authenticating' })
        
        except:
            print('[LOGIN] Something went wrong..')
            return Response({ 'error': 'Something went wrong' })


class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated, ]
    def post(self, request, format=None):
        try:
            auth.logout(request)
            print('[LOGOUT] Success.')
            return Response({ 'success': 'Logged out.' })
        except:
            print('[LOGOUT] Fail.')
            return Response({ 'error': 'Logout failed.' })


class LoadUserView(APIView):
    permission_classes = [permissions.IsAuthenticated, ]

    def get(self, request, format=None):
        user = self.request.user
        print('[LOADING USER] User: ', user)

        if user:
            return Response({ 'success': 'User loaded successfully', 'username': str(user) })



@method_decorator(csrf_protect, name='dispatch')
class CheckAuthenticated(APIView):
    def get(self, request, format=None):
        user = self.request.user

        try:
            isAuthenticated = user.is_authenticated

            if isAuthenticated:
                return Response({ 'isAuthenticated': 'success' })
            else:
                return Response({ 'isAuthenticated': 'error' })
        except:
            return Response({ 'error': 'Something went wrong when checking authentication status' })


class FindUser(APIView):
    permission_classes = [permissions.IsAuthenticated, ]

    def get(self, request, format=None):
        username = request.query_params['username']

        list_of_usernames = [] 
        users = User.objects.filter(
            Q(username__icontains=username)
        )
        for user in users:
            list_of_usernames.append(user.username)

        return Response({ 'success': 'success', 'users': list_of_usernames })