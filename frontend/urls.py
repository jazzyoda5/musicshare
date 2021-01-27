from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('login/', index),
    path('signup/', index),
    path('createroom/', index),
    path('publicroom/<str:room_id>/', index),
    path('feed/', index)
]