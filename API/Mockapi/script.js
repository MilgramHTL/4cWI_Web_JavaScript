document.getElementById("btnLoad").addEventListener("click", function () {
  loadData();
});

function loadData() {
  fetch("https://67b845fc699a8a7baef35fe5.mockapi.io/Games")
    .then((response) => response.json())
    .then((json) => {
      let html = [];

      json.forEach((Games) => {
        html.push(
          "<div><div>" +
            Games.creationDate +
            "</div><img width='50px' src='" +
            Games.trailerImage +
            "?id=" +
            Math.random() +
            " '/></div>"
        );
      });
      document.getElementById("content").innerHTML = html.join("");
    });
}