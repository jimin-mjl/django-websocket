import { getCSRFToken, validateRoomName } from "./utils.js";

const errorCases = {
  NOINPUT: "no input",
  INVAID: "invalid",
  DUPLICATED: "duplicated",
  TOOLONG: "too long",
};

const createRoom = (url, options, roomUrl) => {
  fetch(url, options).then(function (response) {
    const status = response["status"];
    if (status === 201) {
      window.location.pathname = roomUrl;
    } else {
      emitErrorMsg(errorCases.DUPLICATED);
    }
  });
};

const emitErrorMsg = (status) => {
  if (status === errorCases.NOINPUT) {
    alert("Room name should be filled in.");
  } else if (status === errorCases.INVAID) {
    alert("Room name should not contain any special characters or spaces.");
  } else if (status === errorCases.DUPLICATED) {
    alert("Duplaicated room name. Please go for others.");
  } else if (status === errorCases.TOOLONG) {
    alert("Please make sure that your room name is under 20 characters.");
  }
};

const handleNewRoom = (input, submit) => {
  submit.addEventListener("click", (e) => {
    const roomName = input.value;
    const URL = "/new/";
    const ROOM_URL = "/room/" + roomName + "/";
    const OPTIONS = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCSRFToken(document.cookie),
      },
      body: JSON.stringify({
        name: roomName,
      }),
    };

    if (roomName === "") {
      emitErrorMsg(errorCases.NOINPUT);
    } else if (validateRoomName(roomName)) {
      emitErrorMsg(errorCases.INVAID);
    } else if (roomName.length > 20) {
      emitErrorMsg(errorCases.TOOLONG);
    } else {
      createRoom(URL, OPTIONS, ROOM_URL);
    }
  });
};

export default handleNewRoom;
