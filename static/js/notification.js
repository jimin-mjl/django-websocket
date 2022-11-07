const emitNotification = (text, name) => {
  console.log(`${name} just ${text}!`);

  const notificationBox = document.querySelector("#notificationBox");
  const notification = document.createElement("div");

  notification.setAttribute("class", "notification");
  notification.style.backgroundColor = "#39bbdb";
  notification.innerText = `${name} just ${text}!`;
  notificationBox.appendChild(notification);
};

const handleNotification = (status, name) => {
  const JOIN = "in";
  const JOINED = "joined";
  const LEFT = "left";

  if (status === JOIN) {
    emitNotification(JOINED, name);
  } else {
    emitNotification(LEFT, name);
  }
};

export default handleNotification;
