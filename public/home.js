function generateCatDropdown() {
    //Get the game id
    var game_id = $('#gameSelect').val();

    if (game_id != 0) {
        $.get("/getCats", {
                id: game_id
            },
            function (data) {
                var categorys = data;

                var categoryDropdown = "<option value=-1>-</option><option value=0>All</option>";

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

function generateTable(req, res) {
    var game_id = $('#gameSelect').val();
    var category_id = $('#runCategory').val();


    $.get("/getRunTable", {
            game_id: game_id,
            category_id: category_id
        },
        function (data) {
            var runData = data;
            var runTable = null;

            if (category_id > 0) {
                runData.forEach(element => {
                    if (runTable == null) {
                        runTable = `<tr><th colspan=5><h2>${element.title} - ${element.category_title}</h2></th></tr><tr><th>User</th><th>Time</th><th>Platform</th><th>Validity</th></tr>`;
                    }

                    runTable += `<tr><td>${element.username}</td><td>${element.time}</td><td>${element.name}</td>` + valitity(`${element.valid}`) + `</td></tr>`;
                });
            } else if (category_id == 0) {
                runData.forEach(element => {
                    if (runTable == null) {
                        runTable = `<tr><th colspan=5><h2>${element.title}</h2></th></tr>
                                    <tr><th>User</th><th>Time</th><th>Run Category</th><th>Platform</th><th>Validity</th></tr>`;
                    }

                    runTable += `<tr><td>${element.username}</td><td>${element.time}</td><td>${element.category_title}</td><td>${element.name}</td>` + valitity(`${element.valid}`) + `</td></tr>`;
                });
            } else {
                runTable = "";
            }

            console.log(runTable);

            $('#runTable').html(runTable);
        });
}

// Trims the leading 0's and :'s
function formatTime(time) {
    var fTime = ltrim(time, "0");
    fTime = ltrim(fTime, ":");
    fTime = ltrim(fTime, "0");

    return fTime;
}

// changes the bool value for valid into text and 
function valitity(valid) {
    status = null;
    if (valid == 1) {
        status = '<td class="valid">Validated';
    } else {
        status = '<td class="invalid">Not Validated';
    }
    return status;
}

function verifyLogin() {

}

function addUser() {

    var newUsername = $('#newName').val();
    var newPassword = $('#newPass').val();

    $.post("/addUser", {
        userName: newUsername,
        password: newPassword
    });
}