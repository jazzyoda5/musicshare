from django.urls import path
from .views import (CreateRoomView, GetYourRooms, SaveThisRoom,
DeleteRoom, DeleteSavedRoom)


urlpatterns = [
    path('create/', CreateRoomView.as_view()),
    path('saveroom/', SaveThisRoom.as_view()),
    path('myhangs/', GetYourRooms.as_view()),
    path('deleteroom/', DeleteRoom.as_view()),
    path('deletesavedroom/', DeleteSavedRoom.as_view()),
]