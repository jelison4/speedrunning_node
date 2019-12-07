const {
    Pool
} = require("pg");
const connectionString = process.env.DATABASE_URL || "postgres://vxgyyvdfhqbcyu:812573ea7f869d6b1ae95d831285b305a583abd3a3d85bdea78a0d187b482d1a@ec2-174-129-255-69.compute-1.amazonaws.com:5432/d7spsmk4hhi5pk?ssl=true";
const pool = new Pool({
    connectionString: connectionString
});

function addUser(req, res) {
    var newUsername = req.body.userName;
    var newUserPassword = req.body.password;

    var sql = `INSERT INTO users (username, password, admin) VALUES ('${newUsername}', '${newUserPassword}', FALSE);`;

    console.log(`creating a new user with the name ${newUsername} and the password ${newUserPassword}`);

    console.log(sql);

    pool.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
}

module.exports = {
    addUser: addUser
};