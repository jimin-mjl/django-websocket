import { submitByPressEnter } from "./utils.js";
import handleNewRoom from "./newRoom.js";
import handleSearch from "./search.js";
import { getLobbySocket } from "./socket.js";
import { getMemberList } from "./members.js";
import { getLobbyMemberList } from "./members.js";
import { controlLobbySocket } from "./socketController.js";

const setSocketInfo = (socket) => {
  socket.username = localStorage.getItem("nickname") || "Anonymous";
  socket.userId = localStorage.getItem("userId");
};

const setUserId = (userId) => {
  const USER_ID = "userId";
  if (!localStorage.getItem(USER_ID)) {
    localStorage.setItem(USER_ID, userId);
  }
};

const init = () => {
  const userId = Math.random() * 10 ** 10;
  const searchInput = document.querySelector("#room-search-input");
  const searchBtn = document.querySelector("#room-search-btn");
  const roomNameInput = document.querySelector("#room-name-input");
  const roomNameSubmit = document.querySelector("#room-name-submit");
  const lobbySocket = getLobbySocket();

  setUserId(userId);
  setSocketInfo(lobbySocket);
  controlLobbySocket(lobbySocket);
  submitByPressEnter(roomNameInput, roomNameSubmit);
  handleNewRoom(roomNameInput, roomNameSubmit);
  handleSearch(searchInput, searchBtn);
  getMemberList();
  getLobbyMemberList();
};

init();
