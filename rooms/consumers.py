import json
from channels.generic.websocket import WebsocketConsumer
from .models import ActiveUserPublic, Room
from django.contrib.auth.models import User
from asgiref.sync import sync_to_async


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.room_id = self.scope['url_route']['kwargs']['room_id']
        self.room_group_name = 'chat_%s' % self.room_id

        # Join room group
        self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

        # Mark as active user in DB
        room = Room.objects.get(room_id=self.room_id)
        au_instance = ActiveUserPublic(user=self.scope['user'], room=room)
        au_instance.save()

        # Tell the group which user has joined
        self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': {
                    'type': 'user_joined',
                    'content': str(self.scope['user'])
                }
            }
        )


    def disconnect(self, close_code):
        # Leave room group
        self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

        # Delete active user instance in db
        room = Room.objects.get(room_id=self.room_id)
        au_instance = ActiveUserPublic.objects.get(user=self.scope['user'], room=room)
        au_instance.delete()


    # Receive message from WebSocket
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']


        # Send message to room group
        self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    # Receive data from room group
    def chat_message(self, event):
        message = event['message']
        print('[SOCKET] Message emitted. User: {}, Room ID: {}'.format(self.scope['user'],
                                                                       self.scope['url_route']['kwargs']['room_id']))

        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'message': message
        }))
