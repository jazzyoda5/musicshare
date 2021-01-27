from django.urls import path
from .views import CreateRoomView, GetRoomDataView


urlpatterns = [
    path('create/', CreateRoomView.as_view()),
    path('get_data/', GetRoomDataView.as_view()),
]