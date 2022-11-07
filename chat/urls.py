from django.urls import path, re_path

from . import views


app_name = 'chat'

urlpatterns = [
    path('', views.lobby, name='lobby'),
    path('entrance', views.entrance, name='entrance'),
    path('room/<str:room_name>/', views.room, name='room'),
    path('new/', views.create_room, name='new_room'),
    path('search', views.search_room, name='search_room'),
    re_path(r'^members/(?:(?P<room_name>\w+)/)?$', views.list_members, name='members'),
]
