function generateCatDropdown() {
    //Set the game id
    var game_id = $('#gameSelect').val();

    $.get("/getCats", {id: game_id}, function (data) {
        var categorys = data;

        var categoryDropdown = "<option value=0>All</option>";

        categorys.forEach(element => {
            categoryDropdown +=
                `<option value=${element.category_id}>${element.category_title}</option>`;
        });

        document.getElementById('runCategory').innerHTML = categoryDropdown;
    });
}