from django.shortcuts import render
from rest_framework import views
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import CreateRoomSerializer, DeleteRoomSerializer
from accounts.serializers import SaveRoomSerializer, DeleteSavedRoomSerializer
from .models import Room
from accounts.models import SavedRoom, Invitation
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator
from django.contrib.auth.models import User

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
            dict1['room_id'] = room.room.room_id
            dict1['room_name'] = room.room.name
            saved_rooms_list.append(dict1)

        users_rooms = Room.objects.filter(creator=user)
        users_rooms_list = []

        for room in users_rooms:
            dict1 = {}
            dict1['room_id'] = room.room_id
            dict1['room_name'] = room.name
            users_rooms_list.append(dict1)

        invitations = Invitation.objects.filter(reciever=user)
        invitations_list = []

        for invite in invitations:
            dict1 = {}
            dict1['sender'] = invite.sender.username
            dict1['room_name'] = invite.room.name
            dict1['room_id'] = invite.room.room_id
            dict1['invite_id'] = invite.id
            invitations_list.append(dict1)

        response_data = {
            'success': 'Recieved room data.',
            'saved_rooms': saved_rooms_list,
            'users_rooms': users_rooms_list,
            'invitations': invitations_list
        }
        return Response(response_data)


@method_decorator(csrf_protect, name='dispatch')
class SaveThisRoom(views.APIView):
    permission_classes = [IsAuthenticated, ]
    serializer_class = SaveRoomSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        # Check if data is valid
        if serializer.is_valid():
            try:
                user = User.objects.get(username=serializer.data['username'])
                room = Room.objects.get(room_id=serializer.data['roomId'])

                sr_instance = SavedRoom(user=user, room=room)
                sr_instance.save()

                response_data = {
                    'success': 'Room saved successfully',
                }
                return Response(response_data)

            except:
                return Response({ 'error': 'Something went wrong.' })

        else: 
            print('Data not valid')
            return Response({ 'error': 'Something went wrong.' })


@method_decorator(csrf_protect, name='dispatch')
class DeleteRoom(views.APIView):
    permission_classes = [IsAuthenticated, ]
    serializer_class = DeleteRoomSerializer  

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            user = request.user
            room = Room.objects.get(room_id=serializer.data['room_id'])

            if user == room.creator:
                room.delete()
                response_data = {
                    'success': 'Room saved successfully',
                }
                return Response(response_data)

        return Response({ 'error': 'Something went wrong.' })


@method_decorator(csrf_protect, name='dispatch')
class DeleteSavedRoom(views.APIView):
    permission_classes = [IsAuthenticated, ]
    serializer_class = DeleteSavedRoomSerializer  

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            user = request.user
            room = Room.objects.get(room_id=serializer.data['room_id'])
            sr_instance = SavedRoom.objects.get(user=user, room=room)

            if user == sr_instance.user:
                sr_instance.delete()
                response_data = {
                    'success': 'Link deleted successfully',
                }
                return Response(response_data)

        return Response({ 'error': 'Something went wrong.' })


# Get last 10 public rooms
class GetPublicRooms(views.APIView):
    permission_classes = [IsAuthenticated, ]

    def get(self, request, format=None):

        rooms = Room.objects.filter(access="Public").order_by("date_created")[:10]
        data = []
        print(rooms)
        for room in rooms:
            obj = {}
            obj['name'] = room.name
            obj['room_id'] = room.room_id
            obj['creator'] = room.creator.username
            data.append(obj)


        return Response({
            'success': 'Successful request.',
            'rooms': data
        })


