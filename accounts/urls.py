from django.urls import path
from .views import (CreateUserView, GetCSRFToken,
LoginView,
LogoutView,
CheckAuthenticated)

urlpatterns = [
    path('create/', CreateUserView.as_view()),
    path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('authenticate/', CheckAuthenticated.as_view()),
    path('csrf_cookie/', GetCSRFToken.as_view())
]