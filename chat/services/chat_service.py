from .bases import Base, Singleton
from .errors import RoomDoesNotExistError, DuplicatedRoomNameError


class Room(Base):
    def __init__(self, name):
        super().__init__(name)
        self.members = dict()

    def enter(self, member):
        self.members[member.id] = member

    def exit(self, member_id):
        self.members.pop(member_id, None)

    def list_member_names(self):
        members = self.members.values()
        return list(map(lambda x: x.name, members))


class Member(Base):
    def __init__(self, name, id):
        super().__init__(name)
        self.id = id
        chat = Chat()
        chat.member_list[self.id] = self

    def change_name(self, name):
        self.name = name


class Chat(metaclass=Singleton):
    name = 'chat'
    rooms = dict(lobby=Room('lobby'), Lounge=Room('Lounge'))
    lobby = rooms.get('lobby')
    member_list = dict()

    def create_room(self, room):
        if room.name in self.rooms:
            raise DuplicatedRoomNameError
        self.rooms[room.name] = room 

    def destroy_room(self, room_name):
        room = self.get_room(room_name)
        self.rooms.pop(room_name, None)
        del room

    def get_room(self, room_name):
        room = self.rooms.get(room_name)
        if not room:
            raise RoomDoesNotExistError
        return room

    def list_rooms(self):
        rooms = list(self.rooms.keys())
        rooms.remove('lobby')
        return rooms

    def enter_lobby(self, member):
        self.lobby.enter(member)

    def exit_lobby(self, member_id):
        self.lobby.exit(member_id)

    def enter_member(self, room_name, member):
        self.get_room(room_name).enter(member)
        self.exit_lobby(member.id)

    def exit_member(self, room_name, member_id):
        self.get_room(room_name).exit(member_id)
        self.destroy_room_if_no_member(room_name)

    def list_members_in_room(self, room_name):
        return self.get_room(room_name).list_member_names()

    def map_rooms_with_member_names(self):
        result = dict()
        for name, obj in self.rooms.items():
            if name != 'lobby':
                result[name] = obj.list_member_names()
        return result

    def destroy_room_if_no_member(self, room_name):
        # 라운지는 디폴트로 남겨놓기
        if room_name == 'Lounge':
            return False
        room = self.rooms.get(room_name)
        if not room or not room.members:
            self.destroy_room(room_name)

    def list_rooms_by_keyword(self, keyword):
        rooms = list(self.rooms.keys())
        rooms.remove('lobby')
        return [room for room in rooms if keyword in room]

    def retrieve_member(self, id):
        return self.member_list.get(id)

    def discard_member(self, member_id):
        member = self.member_list.get(member_id)
        self.member_list.pop(member_id, None)
        del member
