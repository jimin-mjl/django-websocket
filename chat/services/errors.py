class RoomDoesNotExistError(Exception):
    def __str__(self):
        return 'Room does not exist'


class DuplicatedRoomNameError(Exception):
    def __str__(self):
        return 'Duplicated Room Name'
        