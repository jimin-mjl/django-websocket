import { submitByPressEnter } from "./utils.js";

const handleSearchSubmit = (keyword) => {
  const URL = "/search?keyword=";

  fetch(URL + keyword)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      const rooms = response["rooms"];
      const list = document.querySelector("#room-search-result-list");

      list.innerHTML = "";
      for (let i = 0; i < rooms.length; i++) {
        const name = rooms[i];
        const li = document.createElement("li");

        li.innerHTML = `
                <a href="/room/${name}/" class="custom-anchor">
                    <i class="fa fa-rocket"></i>
                    ${name}
                </a>
            `;
        list.appendChild(li);
      }
    });
};

const handleSearch = (input, submit) => {
  submitByPressEnter(input, submit);
  submit.addEventListener("click", function (e) {
    handleSearchSubmit(input.value);
  });
};

export default handleSearch;
