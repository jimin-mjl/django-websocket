import { drawMessage } from "./chat.js";
import handleNotification from "./notification.js";
import { updateMemberList } from "./members.js";

export const controlLobbySocket = (socket) => {
  socket.onopen = (e) => {
    socket.send(
      JSON.stringify({
        userId: socket.userId,
        username: socket.username,
      })
    );
  };

  socket.onmessage = (e) => {
    const data = JSON.parse(e.data);
    const userId = data.user_id;
    // userId 업데이트
    socket.userId = userId;
    localStorage.setItem("userId", userId);
  };

  socket.onclose = (e) => {
    console.error("Lobby socket closed unexpectedly");
  };
};

export const controlChatSocket = (socket, events) => {
  socket.onclose = (e) => {
    console.error("Chat socket closed unexpectedly");
  };

  socket.onopen = (e) => {
    socket.send(
      JSON.stringify({
        event: events.NEW_USER,
        userId: socket.userId,
        username: socket.username,
      })
    );
  };

  socket.onmessage = (e) => {
    const data = JSON.parse(e.data);

    if (data.event === events.CHAT) {
      drawMessage(data, socket.userId);
      console.log(data.userId, socket.userId);
    } else {
      // event == notification
      handleNotification(data.status, data.username);
      updateMemberList(socket.roomName);
    }
  };
};
