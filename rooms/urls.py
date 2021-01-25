from django.urls import path
from .views import CreateRoomView


urlpatterns = [
    path('create/', CreateRoomView.as_view())
]