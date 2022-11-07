const setNickname = (name) => {
  const NICKNAME = "nickname";
  localStorage.setItem(NICKNAME, name);
};

const handleNickname = () => {
  const nicknameForm = document.querySelector("#username-form");

  nicknameForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const nickname = e.target.nickname.value;
    if (nickname.length > 20) {
      alert("Please make sure that your nickname is under 20 characters.");
    } else {
      setNickname(nickname);
      e.target.submit();
    }
  });
};

const init = () => {
  handleNickname();
};

init();
