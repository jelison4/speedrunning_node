const express = require('express');
const path = require('path');
require('dotenv').config();

const table = require('./controllers/tableController');
const game = require('./controllers/gameContoller');
const category = require('./controllers/categoryController');

const PORT = process.env.PORT || 5000;

const {Pool} = require("pg");
const connectionString = process.env.DATABASE_URL || "postgres://vxgyyvdfhqbcyu:812573ea7f869d6b1ae95d831285b305a583abd3a3d85bdea78a0d187b482d1a@ec2-174-129-255-69.compute-1.amazonaws.com:5432/d7spsmk4hhi5pk?ssl=true";
const pool = new Pool({connectionString: connectionString});

var app = express();

app.use(express.static(path.join(__dirname, "public")));

//app.get('/', 'home.html');
app.get("/generateRunTable", table.generateTable);
app.get("/getGames", game.getGames);
app.get("/getCats", category.getCategorys);

app.listen(PORT, function () {
    console.log("Server listening on port " + PORT);
});