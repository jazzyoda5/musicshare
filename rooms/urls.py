from django.urls import path
from .views import CreateRoomView, GetYourRooms


urlpatterns = [
    path('create/', CreateRoomView.as_view()),
    path('myhangs/', GetYourRooms.as_view()),
]