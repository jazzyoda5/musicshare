import json
from channels.generic.websocket import WebsocketConsumer
from .models import ActiveUserPublic, Room, RoomAccessPermission
from accounts.models import SavedRoom
from django.contrib.auth.models import User
from asgiref.sync import async_to_sync


class RoomConsumer(WebsocketConsumer):
    def connect(self):
        self.room_id = self.scope['url_route']['kwargs']['room_id']
        self.room_group_name = 'chat_%s' % self.room_id
        room = Room.objects.get(room_id=self.room_id)
        user = self.scope['user']

        # Check if user has access to this room
        if room.access == 'Private':
            access_permission = RoomAccessPermission.objects.filter(user=user, room=room)

            if len(access_permission) < 1:
                self.accept()
                self.send(text_data=json.dumps({
                    'message': {
                        'type': 'access_error',
                        'content': 'Room access denied.'
                    }
                }))
                self.close()
                return

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

        # Get all current participants
        participants_objs = ActiveUserPublic.objects.filter(room=room)
        participants = []

        for obj in participants_objs:
            participants.append(obj.user.username)

        
        # Send the user data about the room
        try:
            sr_instance = SavedRoom.objects.get(user=user, room=room)
            room_saved = True
        except SavedRoom.DoesNotExist:
            room_saved = False

        self.send(text_data=json.dumps({
            'message': {
                'type': 'get_room_data',
                'content': {
                    'room_name': room.name,
                    'room_creator': room.creator.username, 
                    'participants': participants,
                    'is_room_saved': room_saved
                }
            }
        }))

        # Mark as active user in DB
        au_instance = ActiveUserPublic.objects.filter(user=user, room=room)
        print(len(au_instance))

        if len(au_instance) == 1:
            # Do nothing
            pass
        
        elif len(au_instance) < 1:
            au_instance = ActiveUserPublic(user=user, room=room)
            au_instance.save()
        
        # In case there is more that one active user instances
        elif len(au_instance) > 1:
            # delete all instances but one, this will keep the db in check
            for i in range(len(au_instance) - 1):
                au_instance[i].delete()

        # Let other users in the room know that this user joined
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': {
                    'type': 'user_joined',
                    'content': str(user)
                }
            }
        )

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

        # Delete active user instance in db
        room = Room.objects.get(room_id=self.room_id)
        try:
            au_instance = ActiveUserPublic.objects.get(user=self.scope['user'], room=room)
            au_instance.delete()
        
        except ActiveUserPublic.DoesNotExist:
            pass


    # Receive message from WebSocket
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        
        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    # Receive data from room group
    def chat_message(self, event):
        message = event['message']

        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'message': message
        }))
