const connection = require("../database/connection");

const index = (req, res) => {

    const sql = "SELECT * FROM movies";

    connection.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching movies:", err);
            return res.status(500).json({ error: true, message: "Internal server error" });
            return;
        }
        res.json(results);
    });
}

const show = (req, res) => {
    const userId = req.params.id;
    connection.query("SELECT * FROM movies WHERE id = ?", [userId], (err, results) => {
        if (err) {
            console.error("Error fetching movie:", err);
            return res.status(500).json({ error: true, message: "Internal server error" });
            return;
        }
        if (results.length === 0) {
            return res.status(404).json({ error: true, message: "Movie not found" });

        }
        res.json(results[0]);
    });
}


module.exports = {
    index,
    show
};
