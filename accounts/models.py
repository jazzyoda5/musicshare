from django.db import models
from rooms.models import Room
from django.contrib.auth.models import User


class SavedRoom(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)

class Invitation(models.Model):
    sender = models.ForeignKey(User, related_name='sender', on_delete=models.CASCADE)
    reciever = models.ForeignKey(User, related_name='reciever', on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)

