function generateTable(req, res) {
    console.log("Getting Table Information.");

    var id = req.query.id;
    console.log("Retriving run data for game:", id);

    var result={id: id, title: 'It worked?'};

    res.json(result);
}

module.exports = {
    generateTable: generateTable
};