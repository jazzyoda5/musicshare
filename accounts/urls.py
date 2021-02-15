from django.urls import path
from .views import (CreateUserView, GetCSRFToken,
LoginView,
LogoutView,
CheckAuthenticated,
LoadUserView,
FindUser,
InviteToRoom,
AcceptInviteToRoom,
DeclineInviteToRoom)

urlpatterns = [
    path('create/', CreateUserView.as_view()),
    path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('authenticate/', CheckAuthenticated.as_view()),
    path('load_user/', LoadUserView.as_view()),
    path('csrf_cookie/', GetCSRFToken.as_view()),
    path('finduser/', FindUser.as_view()),
    path('invite/', InviteToRoom.as_view()),
    path('acceptinvite/', AcceptInviteToRoom.as_view()),
    path('declineinvite/', DeclineInviteToRoom.as_view()),
]