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

function generateCatDropdown() {
    //Get the game id
    var game_id = $('#gameSelect').val();

    if (game_id != 0) {
        $.ajax({
            url: `/getCats?id=${game_id}`
        }).done(function (data) {
            var categorys = data;

            var categoryDropdown = null;

            categorys.forEach(element => {
                if (categoryDropdown == null) {
                    categoryDropdown = `<option value=${element.category_id}>${element.category_title}</option>`;
                } else {
                    categoryDropdown += `<option value=${element.category_id}>${element.category_title}</option>`;
                }
            });

            $('#runCategory').html(categoryDropdown);
        });
    } else {
        $('#runCategory').html("<option value='-1'>-</option>");
    }
}

function insertRun() {
    var game_id = $('#gameSelect').val();
    var platform_id = $('#platform').val();
    var time = $('#time').val();
    var category_id = $('#runCategory').val();

    /* var params = {
        game_id: game_id,
        platform_id: platform_id,
        time: time,
        category_id: category_id
    }; */

    $.post("/insertRun", {
        game_id: game_id,
        platform_id: platform_id,
        time: time,
        category_id: category_id
    }).done(function () {
        window.location.href = "/user";
    });
}