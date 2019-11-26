const express = require('express');
const path = require('path');

const table = require('./controllers/tableController');
const game = require('./controllers/gameContoller');
const category = require('./controllers/categoryController');

const PORT = process.env.PORT || 5000;

var app = express();

app.use(express.static(path.join(__dirname, "public")));

//app.get('/', 'home.html');
app.get("/getRun", table.generateTable);
app.get("/getGames", game.getGames);
app.get("/getCats", category.getCategorys);

app.listen(PORT, function () {
    console.log("Server listening on port " + PORT);
});