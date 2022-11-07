import { submitByPressEnter } from "./utils.js";

const sendMessage = (message, socket, event) => {
  socket.send(
    JSON.stringify({
      event: event,
      message: message,
      username: socket.username,
      userId: socket.userId,
    })
  );
};

export const drawMessage = (data, userId) => {
  const ME = data.user_id === userId;
  const messageBox = document.querySelector("#messageBox");
  const msg = document.createElement("div");
  const className = ME
    ? "media media-chat media-chat-reverse"
    : "media media-chat";
  const author = ME ? "" : `${data.username}:`;

  msg.innerHTML = `
        <div class="media-body">
            <p class="chat-speaker">${author}</p><p>${data.message}</p>
        </div>
    `;
  msg.setAttribute("class", className);
  messageBox.appendChild(msg);
};

export const handleChat = (socket, inputDom, SubmitDom, event) => {
  submitByPressEnter(inputDom, SubmitDom);
  SubmitDom.addEventListener("click", (e) => {
    const message = inputDom.value;
    sendMessage(message, socket, event);
    inputDom.value = "";
  });
};
