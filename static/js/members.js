const URL = "/members/";

export const updateMemberList = (roomName) => {
  const memberList = document.querySelector("#memberList");

  memberList.innerHTML = "";
  fetch(URL + roomName)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      for (let i = 0; i < response.members.length; i++) {
        const li = document.createElement("li");
        li.setAttribute("class", "badge badge-info member-badge");
        li.innerHTML = response.members[i];
        memberList.appendChild(li);
      }
    });
};

export const getMemberList = () => {
  fetch(URL)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      for (const [room, memberList] of Object.entries(response.members)) {
        const container = document.querySelector(`#${room}-members-container`);
        container.innerHTML = "";
        for (let i = 0; i < memberList.length; i++) {
          const span = document.createElement("span");
          span.innerHTML = memberList[i];
          container.appendChild(span);
        }
      }
    });
};

export const getLobbyMemberList = () => {
  fetch(URL + "lobby")
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      const list = document.querySelector("#lobbyMember-list");
      list.innerHTML = "";
      for (let i = 0; i < response.members.length; i++) {
        const li = document.createElement("li");
        li.innerHTML = `
          <a href="#">
            <i class="fa fa-user"></i>
            <span>${response.members[i]}</span>
            <i class="fa fa-envelope pull-right"></i>
          </a>
        `;
        list.appendChild(li);
      }
    });
};
