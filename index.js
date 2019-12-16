const express = require('express');
const path = require('path');
require('dotenv').config();

const table = require('./controllers/tableController');
const game = require('./controllers/gameContoller');
const category = require('./controllers/categoryController');
const user = require('./models/userModel');
const login = require('./controllers/loginController');
const run = require("./models/runsModel");
const PORT = process.env.PORT || 5000;

const {
    Pool
} = require("pg");
const connectionString = process.env.DATABASE_URL || "postgres://vxgyyvdfhqbcyu:812573ea7f869d6b1ae95d831285b305a583abd3a3d85bdea78a0d187b482d1a@ec2-174-129-255-69.compute-1.amazonaws.com:5432/d7spsmk4hhi5pk?ssl=true";
const pool = new Pool({
    connectionString: connectionString
});

var app = express();

var session = require('express-session');

app.use(session({
    secret: 'I_think_harry_potter_is_overrated',
    resave: false,
    saveUninitialized: true
}))

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

app.get('/', (req, res) => res.render('pages/home'));
app.get('/user', (req, res) => res.render('pages/user'));
app.get('/submission', (req, res) => res.render('pages/submission'));
app.get("/getRunTable", table.getRunTable);
app.get("/getUserTable", table.getUserTable);
app.get("/getGames", game.getGames);
app.get("/getCats", category.getCategorys);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.post("/addUser", user.addUser);
app.post("/insertRun", run.addRunToDB);
app.post("/login", login.handleLogin);
app.post("/logout", login.handleLogout);

app.listen(PORT, function () {
    console.log("Server listening on port " + PORT);
});