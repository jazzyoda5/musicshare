from django.shortcuts import render
from rest_framework import views
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import CreateRoomSerializer
from .models import Room
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator


@method_decorator(csrf_protect, name='dispatch')
class CreateRoomView(views.APIView):
    permission_classes = [IsAuthenticated, ]
    serializer_class = CreateRoomSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        user = request.user

        if serializer.is_valid():
            name = serializer.data['name']
            access = serializer.data['access']

            room = Room(name=name, access=access, creator=user)
            room.save()
            
            response_data = { 
                'success': 'Room created successfully',
                'room_id': room.room_id
            }
            return Response(response_data)
        
        return Response({ 'error': 'Something went wrong.' })


@method_decorator(csrf_protect, name='dispatch')
class GetRoomDataView(views.APIView):
    permission_classes = [IsAuthenticated, ]

    def post(self, request, format=None):
        room_id = request.data['room_id']
        room = Room.objects.get(room_id=room_id)
        name = room.name
        creator = room.creator.username
        response_data = { 
                'success': 'Room data recieved',
                'room_name': name,
                'room_creator': creator
            }
        return Response(response_data)