function generateCatDropdown() {
    //Get the game id
    var game_id = $('#gameSelect').val();

    if (game_id != 0) {
        $.ajax({
            url: `/getCats?id=${game_id}`
        }).done(function (data) {
            var categorys = data;

            var categoryDropdown = "<option value='-1'>-</option><option value=0>All</option>";

            categorys.forEach(element => {
                categoryDropdown += `<option value=${element.category_id}>${element.category_title}</option>`;
            });

            $('#runCategory').html(categoryDropdown);
        });
    } else {
        $('#runCategory').html("<option value='-1'>-</option>");
    }
}

function loadGames() {
    $.ajax({
        url: "/getGames"
    }).done(function (result) {
        var gameSelect = "<option value=0>Select a Game</option>";

        result.forEach(element => {
            gameSelect += `<option value=${element.game_id}>${element.title}</option>`;
        });

        $('#gameSelect').html(gameSelect);
    });
}

function generateTable(req, res) {
    var game_id = $('#gameSelect').val();
    var category_id = $('#runCategory').val();

    $.ajax({
        url: `/getRunTable?game_id=${game_id}&category_id=${category_id}`
    }).done(
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

function login() {
    var username = $("#uname").val();
    var password = $("#password").val();

    var params = {
        username: username,
        password: password
    };

    $.post("/login", params, function (result) {
        if (result && result.success) {
            $("#status").text("Successfully logged in.");
            document.forms['loginForm'].submit();;
        } else {
            $("#status").text("Error logging in.");
            alert('Login failed.  Please double check your username and password.');
        }
    });
}

function logout() {
    $.post("/logout", function (result) {
        if (result && result.success) {
            $("#status").text("Successfully logged out.");
        } else {
            $("#status").text("Error logging out.");
        }
    });
}

function addUser() {
    var newUsername = $('#newName').val();
    var newPassword = $('#newPass').val();

    $.post("/addUser", {
        userName: newUsername,
        password: newPassword
    });
}