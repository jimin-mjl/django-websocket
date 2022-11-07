import json
from django.shortcuts import render
from django.http import HttpResponse
from django.http.response import JsonResponse
from django.views.decorators.http import require_GET, require_POST

from .events import Events
from .utils import nickname_required
from .services.chat_service import Room, Chat
from .services.errors import DuplicatedRoomNameError, RoomDoesNotExistError

chat_service = Chat()


def lobby(request):
    room_list = chat_service.list_rooms()
    return render(request, 'chat/lobby.html', {
        'room_list': room_list,
    })


@nickname_required
def room(request, room_name):
    return render(request, 'chat/room.html', {
        'room_name': room_name,
        'events': {
            'CHAT': Events.CHAT.value,
            'NEW_USER': Events.NEW_USER.value,
            'NOTIFICATION': Events.NOTIFICATION.value,
        },
    })


def entrance(request):
    next = request.GET['next']
    return render(request, 'chat/entrance.html', {
        'next': next,
    })


@require_POST
def create_room(request):
    room_name = json.loads(request.body.decode('utf-8'))['name']
    try:
        room = Room(room_name)
        chat_service.create_room(room)
    except DuplicatedRoomNameError:
        return HttpResponse(status=400)
    return HttpResponse(status=201)


@require_GET
def search_room(request):
    keyword = request.GET['keyword']
    rooms = chat_service.list_rooms_by_keyword(keyword)
    response = {
        'rooms': rooms
    }
    return JsonResponse(response, status=200)


@require_GET
def list_members(request, room_name=None):
    try:
        if room_name:
            member_list = chat_service.list_members_in_room(room_name)
        else:
            member_list = chat_service.map_rooms_with_member_names()
        response = {
            'members': member_list
        }
        return JsonResponse(response, status=200)
    except RoomDoesNotExistError:
        return HttpResponse(status=400)
