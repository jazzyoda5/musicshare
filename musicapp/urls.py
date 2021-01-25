from django.contrib import admin
from django.urls import path, include, re_path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')),
    path('api/rooms/', include('rooms.urls')),
    path('', include('frontend.urls'))
]
