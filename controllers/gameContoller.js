const {
    Pool
} = require("pg");
const connectionString = process.env.DATABASE_URL || "postgres://vxgyyvdfhqbcyu:812573ea7f869d6b1ae95d831285b305a583abd3a3d85bdea78a0d187b482d1a@ec2-174-129-255-69.compute-1.amazonaws.com:5432/d7spsmk4hhi5pk?ssl=true";
const pool = new Pool({
    connectionString: connectionString
});

function getGames(req, res) {
    var sql = "SELECT DISTINCT run.game_id, game.title FROM run, game WHERE run.game_id = game.id ORDER BY game.title;";

    pool.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            callback(err, null);
        }

        res.json(result.rows);
    });
}

module.exports = {
    getGames: getGames
};