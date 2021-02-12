from django.db import models
from rooms.models import Room
from django.contrib.auth.models import User


class SavedRoom(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)

