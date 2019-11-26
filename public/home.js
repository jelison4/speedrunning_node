function generateCatDropdown() {
    var xhr = new XMLHttpRequest();

    var query = "/getCats?id=" + document.getElementById('gameSelect').value;
    console.log(query);

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var categorys = JSON.parse(xhr.responseText);

            var categoryDropdown = "<option value=0>All</option>";

            categorys.forEach(element => {
                categoryDropdown +=
                    `<option value=${element.category_id}>${element.category_title}</option>`;
            });
            document.getElementById('runCategory').innerHTML = categoryDropdown;
        }
    }
    xhr.open("GET", query, true);
    xhr.send();
}