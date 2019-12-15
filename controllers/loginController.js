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
    var pass = req.body.password;

    //req.body.username == "Cadfel" && req.body.password == "password"

    if (req.body.username == "Cadfel" && req.body.password == "password") {

        req.session.user = req.body.username;
        result = {
            success: true
        };
    }

    res.json(result);
}

function getPasswordFromDB(username, callback) {
    
    /* var sql = `SELECT password FROM users WHERE username='${username}'`;

    pool.query(sql, function (err, res) {
        if (err) {
            console.log(err);
            callback(err, null);
        }

        var password = JSON.parse(res.rows);
        //list: res.rows

        console.log(password);
        //callback(null, res.rows);
    }); */

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