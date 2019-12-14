function generateUserTable() {
    $.get("/getUserTable", {
            username: "Cadfel"
        },
        function (data) {
            var userData = data;
            userTable = null;
            username = "Cadfel";

            console.log(`Getting the run information for ${username}`);

            userData.forEach(element => {
                if (userTable == null) {
                    userTable = `<tr><th colspan=6><h2>${username}'s Submissions</h2></th></tr>
                                <tr><th>Game</th><th>Time</th><th>Category</th><th>Platform</th><th>Validity</th></tr>`
                }

                userTable += `<tr><td>${element.title}</td><td>${element.time}</td><td>${element.category_title}</td><td>${element.name}</td>` + valitity(`${element.valid}`) + `</td><td><button class="cancelbtn">Remove</button></td></tr>';`;
            });

            $('#userTable').html(userTable);
        }
    )
}

function valitity(valid) {
    status = null;
    if (valid == 1) {
        status = '<td class="valid">Validated';
    } else {
        status = '<td class="invalid">Not Validated';
    }
    return status;
}