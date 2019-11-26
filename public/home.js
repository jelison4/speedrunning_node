function generateCatDropdown() {
    //Get the game id
    var game_id = $('#gameSelect').val();

    if (game_id != 0) {
        $.get("/getCats", {
            id: game_id
        }, function (data) {
            var categorys = data;

            var categoryDropdown = "<option value=0>All</option>";

            categorys.forEach(element => {
                categoryDropdown += `<option value=${element.category_id}>${element.category_title}</option>`;
            });

            $('#runCategory').html(categoryDropdown);
        });
    }else{
        $('#runCategory').html("<option value=''>-</option>");
    }
}