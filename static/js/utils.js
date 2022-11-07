export const submitByPressEnter = (input, submit) => {
  input.focus();
  input.onkeyup = function (e) {
    if (e.keyCode === 13) {
      submit.click();
    }
  };
};

export const validateRoomName = (name) => {
  const specialChar = /[!?@#$%^&*():;+-=~{}<>\_\[\]\|\\\"\'\,\.\/\`\₩]/g;
  const space = /\s/;

  return specialChar.test(name) || space.test(name);
};

export const getCSRFToken = (aCookie) => {
  const getCookie = (name) => {
    let cookieValue = null;
    if (aCookie && aCookie !== "") {
      const cookies = aCookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  return getCookie("csrftoken");
};
