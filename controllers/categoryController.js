function getCategorys(req, res) {
    var id = req.query.id;

  if (id != 0) {
    getcategoryFromDB(id, function (error, result) {
      console.log("back from database with result", result);
      res.json(result)
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