const {
    Pool
} = require("pg");
const connectionString = process.env.DATABASE_URL || "postgres://vxgyyvdfhqbcyu:812573ea7f869d6b1ae95d831285b305a583abd3a3d85bdea78a0d187b482d1a@ec2-174-129-255-69.compute-1.amazonaws.com:5432/d7spsmk4hhi5pk?ssl=true";
const pool = new Pool({
    connectionString: connectionString
});

function getRunTable(req, res) {
    var game_id = req.query.game_id;
    var category_id = req.query.category_id;

    if (category_id != 0) {
        getRunTableDataFromDB(game_id, category_id, function (error, result) {
            res.json(result);
        });
    } else {
        getAllRunTableFromDB(game_id, function (error, result) {
            res.json(result);
        });
    }
}

function getRunTableDataFromDB(game_id, category_id, callback) {
    var sql = `SELECT DISTINCT users.username, run.time, platform.name, run.valid, game.title, category.category_title FROM users, run, platform, category, game WHERE run.user_id = users.id AND platform_id = platform.id AND run.game_id = ${game_id} AND run.category_id = ${category_id} AND category.id = ${category_id} AND game.id=${game_id} ORDER BY run.time;`;

    pool.query(sql, function (err, res) {
        if (err) {
            console.log(err);
            callback(err, null);
        }
        callback(null, res.rows);
    });
}

function getAllRunTableFromDB(game_id, callback) {
    var sql = `SELECT DISTINCT users.username, run.time, category.category_title, platform.name, run.valid, game.title FROM users, run, platform, category, game WHERE run.user_id = users.id AND platform_id = platform.id AND run.game_id = ${game_id} AND run.category_id = category.id AND game.id=${game_id} ORDER BY run.time;`;

    pool.query(sql, function (err, res) {
        if (err) {
            console.log(err);
            callback(err, null);
        }
        callback(null, res.rows);
    });
}

function getUserTable(req, res) {
    var username = req.session.user;

    getUserData(username, function (error, result) {
        res.json(result);
    });
}

function getUserData(username, callback) {
    var sql = `SELECT DISTINCT run.id, game.title, run.time, category.category_title, platform.name, run.valid FROM users, run, platform, category, game WHERE run.user_id = users.id AND users.username='${username}' AND platform_id = platform.id AND run.game_id = game.id AND run.category_id = category.id ORDER BY run.time;`;

    pool.query(sql, function (err, res) {
        if (err) {
            console.log(err);
            callback(err, null);
        }
        callback(null, res.rows);
    });
}

module.exports = {
    getRunTable: getRunTable,
    getUserTable: getUserTable
};