from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import ugettext_lazy as _
import random


def create_room_id():
    lib = '1234567890QWERTYUIOPASDFGHJKLZXCVBNM'

    while True:
        room_id = ''

        for i in range(8):
            rand_index = random.randint(0, len(lib) - 1)
            room_id += lib[rand_index]
        
        # Check if room with this index already exists
        get_room = Room.objects.filter(room_id=room_id)

        if len(get_room) < 1:
            return room_id


class Room(models.Model):
    room_id = models.CharField(_("Room ID"), max_length=8, default=create_room_id)
    access_choices = [('Public', 'Public'), ('Private', 'Private')]
    access = models.CharField(_("Access"), max_length=7, choices=access_choices)
    name = models.CharField(_("Room Name"), max_length=60, blank=True)
    date_created = models.DateTimeField(auto_now_add=True)
    creator = models.ForeignKey(User, verbose_name=_("Creator"), on_delete=models.CASCADE, default=None)

    def __str__(self):
        return str(self.creator.username) + ' - ' + str(self.room_id)


class ActiveUserPublic(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.user)



        

