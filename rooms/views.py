from django.shortcuts import render
from rest_framework import views
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import CreateRoomSerializer
from .models import Room
from accounts.models import SavedRoom
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

            # Automatically add the room to user's saved rooms
            saved_room = SavedRoom(user=user, room=room)
            saved_room.save
            
            response_data = { 
                'success': 'Room created successfully',
                'room_id': room.room_id
            }
            return Response(response_data)
        
        return Response({ 'error': 'Something went wrong.' })


class GetYourRooms(views.APIView):
    permission_classes = [IsAuthenticated, ]

    def get(self, request, format=None):
        user = request.user
        saved_rooms = SavedRoom.objects.filter(user=user)
        saved_rooms_list = []

        for room in saved_rooms:
            dict1 = {}
            dict1['room_id'] = room.room_id
            dict1['room_name'] = room.name
            saved_rooms_list.append(dict1)

        users_rooms = Room.objects.filter(creator=user)
        users_rooms_list = []

        for room in users_rooms:
            dict1 = {}
            dict1['room_id'] = room.room_id
            dict1['room_name'] = room.name
            users_rooms_list.append(dict1)

        response_data = {
            'success': 'Recieved room data.',
            'saved_rooms': saved_rooms_list,
            'users_rooms': users_rooms_list
        }
        return Response(response_data)


