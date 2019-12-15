const {
    Pool
} = require("pg");
const connectionString = process.env.DATABASE_URL || "postgres://vxgyyvdfhqbcyu:812573ea7f869d6b1ae95d831285b305a583abd3a3d85bdea78a0d187b482d1a@ec2-174-129-255-69.compute-1.amazonaws.com:5432/d7spsmk4hhi5pk?ssl=true";
const pool = new Pool({
    connectionString: connectionString
});

function addRunToDB(req, res){
    var user_id = 2;
    var game_id = req.query.game_id;
    var platform_id = req.query.plat_id;
    var time = req.query.time;
    var valid = false;
    var category_id=req.query.cat_id;

    sql=`INSERT INTO run (user_id, game_id, platform_id, time, valid, category_id) VALUES (${user_id}, ${game_id}, ${platform_id}, ${time}, ${valid}, ${category_id});`;
    pool.query(sql, function(err, result){
        if (err) throw err;
        console.log("New run added");
    });
}

module.exports={
    addRunToDB: addRunToDB
};