import { getChatSocket } from "./socket.js";
import { handleChat } from "./chat.js";
import { controlChatSocket } from "./socketController.js";

const setSocketInfo = (socket, roomName) => {
  socket.username = localStorage.getItem("nickname");
  socket.userId = localStorage.getItem("userId");
  socket.roomName = roomName;
};

const init = () => {
  const roomName = JSON.parse(document.getElementById("room-name").textContent);
  const events = JSON.parse(document.getElementById("events").textContent);
  const messageInput = document.querySelector("#chat-message-input");
  const messageSubmit = document.querySelector("#chat-message-submit");
  const chatSocket = getChatSocket(roomName);

  setSocketInfo(chatSocket, roomName);
  controlChatSocket(chatSocket, events);
  handleChat(chatSocket, messageInput, messageSubmit, events.CHAT);
};

init();
