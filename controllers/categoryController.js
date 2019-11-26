const {Pool} = require("pg");
const connectionString = process.env.DATABASE_URL || "postgres://vxgyyvdfhqbcyu:812573ea7f869d6b1ae95d831285b305a583abd3a3d85bdea78a0d187b482d1a@ec2-174-129-255-69.compute-1.amazonaws.com:5432/d7spsmk4hhi5pk?ssl=true";
const pool = new Pool({connectionString: connectionString});

function getCategorys(req, res) {
    var id = req.query.id;

    if (id != 0) {
        getcategoryFromDB(id, function (error, result) {
            console.log("back from database with result", result);
            res.json(result);
        });
    }
}

function getcategoryFromDB(id, callback) {
    console.log("accessing DB for categoys for game", id);

    var sql = `SELECT DISTINCT run.category_id, category.category_title FROM run, category WHERE run.category_id = category.id AND run.game_id=${id};`;

    pool.query(sql, function (err, res) {
        if (err) {
            console.log(err);
            callback(err, null);
        }
        callback(null, res.rows);
    });
}

module.exports = {
    getCategorys: getCategorys
};