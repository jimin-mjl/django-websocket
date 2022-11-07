from django.urls import re_path, path

from .consumers import ChatConsumer, LobbyConsumer

websocket_urlpatterns = [
    path('ws/', LobbyConsumer.as_asgi()),
    re_path(r'ws/room/(?P<room_name>\w+)/$', ChatConsumer.as_asgi()),
]
