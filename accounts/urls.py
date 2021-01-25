from django.urls import path
from .views import CreateUserView, GetCSRFToken

urlpatterns = [
    path('create/', CreateUserView.as_view()),
    path('csrf_cookie/', GetCSRFToken.as_view())
]