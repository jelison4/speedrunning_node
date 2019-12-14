function loadGames() {
    var xhr = new XMLHttpRequest();

    console.log("Getting the games");

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var gameSelect = "<option value=0>Select a Game</option>";

            var games = JSON.parse(xhr.responseText);

            games.forEach(element => {
                gameSelect += `<option value=${element.game_id}>${element.title}</option>`;
            });
            console.log(gameSelect);

            document.getElementById('gameSelect').innerHTML = gameSelect;
            //$('#gameSelect').html(gameSelect);
        }
    }
    xhr.open("GET", "/getGames", true);
    xhr.send();
}