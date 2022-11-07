import json
from channels.generic.websocket import AsyncWebsocketConsumer

from .events import Events
from .services.chat_service import Member, Chat

chat_service = Chat()


class LobbyConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

    async def disconnect(self, close_code):
        chat_service.exit_lobby(self.channel_name)

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        username = text_data_json.get('username')
        user_id = text_data_json.get('userId')
        user = chat_service.retrieve_member(user_id)
        if user:
            chat_service.discard_member(user_id)
        _user = Member(username, self.channel_name)
        chat_service.enter_lobby(_user)

        await self.send(text_data=json.dumps({
            'user_id': self.channel_name,
        }))


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # url에서 room name 가져오기 
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'chat_{self.room_name}'

        # room group에 참여시키기 
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        # room group에서 제외시키기 
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

        # 퇴장 시 알림 주기 
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'notify',
                'status': 'out',
                'username': self.username,
            }
        )
        chat_service.exit_member(self.room_name, self.user_id)

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        self.username = text_data_json.get('username')
        self.user_id = text_data_json.get('userId')

        if text_data_json.get('event') == Events.NEW_USER.value:
            user = chat_service.retrieve_member(self.user_id)
            user.change_name(self.username)
            chat_service.enter_member(self.room_name, user)
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'notify',
                    'status': 'in',
                    'username': self.username,
                }
            )
        else: # CHAT 이벤트 
            message = text_data_json.get('message')

            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'message': message,
                    'username': self.username,
                    'user_id': self.user_id,
                }
            )

    # 여기서부터는 실제로 클라이언트 소켓과 통신하는 코드 
    async def chat_message(self, event):
        message = event.get('message')
        username = event.get('username')
        user_id = event.get('user_id')

        await self.send(text_data=json.dumps({
            'event': Events.CHAT.value,
            'message': message,
            'username': username,
            'user_id': user_id,
        }))

    async def notify(self, event):
        await self.send(text_data=json.dumps({
            'event': Events.NOTIFICATION.value,
            'status': event.get('status'),
            'username': event.get('username', 'Someone'),
        }))
