function generateCatDropdown() {
    //Get the game id
    var game_id = $('#gameSelect').val();

    if (game_id != 0) {
        $.get("/getCats", { id: game_id },
            function (data) {
                var categorys = data;

                var categoryDropdown = "<option value=0>All</option>";

                categorys.forEach(element => {
                    categoryDropdown += `<option value=${element.category_id}>${element.category_title}</option>`;
                });

                $('#runCategory').html(categoryDropdown);
            });
    } else {
        $('#runCategory').html("<option value=''>-</option>");
    }
}

function loadGames() {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var gameSelect = "<option value=0>Select a Game</option>";           
            
            var games = JSON.parse(xhr.responseText);

            games.forEach(element => {
                gameSelect += `<option value=${element.game_id}>${element.title}</option>`;
            });
            console.log(gameSelect);

            $('#gameSelect').html(gameSelect);
        }
    }
    xhr.open("GET", "/getGames", true);
    xhr.send();
}

function verifyLogin() {

}