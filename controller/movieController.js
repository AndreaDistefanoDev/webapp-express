const connection = require("../database/connection");

const index = (req, res) => {

    const sql = "SELECT * FROM movies";

    connection.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching movies:", err);
            return res.status(500).json({ error: true, message: "Internal server error" });

        }
        res.json(results);
    });
}

const show = (req, res) => {
    const Id = parseInt(req.params.id);
    const sql = "SELECT * FROM movies WHERE id = ?";
    const reviwsSql = "SELECT id, name, text, vote FROM reviews  WHERE movie_id = ?";
    connection.query(sql, [Id], (err, results) => {
        if (err) {
            console.error("Error fetching movie:", err);
            return res.status(500).json({ error: true, message: "Internal server error" });
            return;
        }
        if (results.length === 0) {
            return res.status(404).json({ error: true, message: "Movie not found" });

        }
        const movie = results[0];


        connection.query(reviwsSql, [Id], (err, reviewsResults) => {
            if (err) {
                console.error("Error fetching reviews:", err);
                return res.status(500).json({ error: true, message: "Internal server error" });
            }

            movie.reviews = reviewsResults;
            res.json(movie);
        });
    });
}





module.exports = {
    index,
    show
};
