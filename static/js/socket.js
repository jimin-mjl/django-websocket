export const getLobbySocket = () => {
  const lobbySocket = new WebSocket("ws://" + window.location.host + "/ws/");
  return lobbySocket;
};

export const getChatSocket = (name) => {
  const chatSocket = new WebSocket(
    "ws://" + window.location.host + "/ws/room/" + name + "/"
  );
  return chatSocket;
};
