const {
    Pool
} = require("pg");
const connectionString = process.env.DATABASE_URL || "postgres://vxgyyvdfhqbcyu:812573ea7f869d6b1ae95d831285b305a583abd3a3d85bdea78a0d187b482d1a@ec2-174-129-255-69.compute-1.amazonaws.com:5432/d7spsmk4hhi5pk?ssl=true";
const pool = new Pool({
    connectionString: connectionString
});

function handleLogin(req, res) {
    var result = {
        success: false
    };

    var username = req.body.username;

    getPasswordFromDB(username, function (error, result) {

        if (req.body.password == result[0].password) {

            req.session.user = req.body.username;
            req.session.user_id = result[0].id;
        }
    });

    result = {
        success: true
    };

    res.json(result);
}

function getPasswordFromDB(username, callback) {

    var sql = `SELECT password, id FROM users WHERE username='${username}';`;

    pool.query(sql, function (err, res) {
        if (err) {
            console.log(err);
            callback(err, null);
        }

        callback(null, res.rows);
    });

}

function handleLogout(req, res) {
    var result = {
        success: false
    };

    if (req.session.user) {
        req.session.destroy();
        result = {
            success: true
        };
    }

    res.json(result);
}

module.exports = {
    handleLogin: handleLogin,
    handleLogout: handleLogout
}