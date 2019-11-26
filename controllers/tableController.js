function generateTable(req, res) {
    console.log("Getting Table Information.");

    var game_id = req.query.game_id;
    var cat_id=req.query.cat_id;
    console.log("Retriving run data for game:" + game_id);
    console.log("With Category: " + cat_id);

    var result={id: game_id, title: 'It worked?'};

    res.json(result);
}

function generateUserTable(req, res) {

}

module.exports = {
    generateTable: generateTable,
    generateUserTable: generateUserTable
};