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


// store movie
const store = (req, res) => {

    const uploadFile = req.file;
    if (uploadFile) {
        console.log("File uploaded successfully");
    } else {
        console.log("No file uploaded");
    }

    const { title, director, release_year, genre, abstract } = req.body;
    const image = uploadFile ? `http://${process.env.API_SERVER_HOST}:${process.env.API_SERVER_PORT}/${uploadFile.filename}` : null;

    const parsedYear = parseInt(release_year, 10);

    if (isNaN(parsedYear)) {
        return res.status(400).json({ error: true, message: "Invalid release year" });
    }
    console.log("Request body: ", req.body);

    const sql = "INSERT INTO movies (title, director, release_year, image, genre, abstract ) VALUES (?, ?, ? , ?, ?, ?)";
    connection.query(sql, [title, director, release_year, image, genre, abstract], (err, results) => {
        if (err) {
            console.error("Error adding movie:", err);
            return res.status(500).json({ error: true, message: "Internal server error" });
        }
        res.status(201).json({ error: false, message: "Movie added successfully", movieId: results.insertId });
    });
};

// store review
const storeReview = (req, res) => {
    const movieId = parseInt(req.params.id);
    const { name, text, vote } = req.body;
    const sql = "INSERT INTO reviews (movie_id, name, text, vote) VALUES (?, ?, ?, ?)";
    connection.query(sql, [movieId, name, text, vote], (err, results) => {
        if (err) {
            console.error("Error adding review:", err);
            return res.status(500).json({ error: true, message: "Internal server error" });
        }
        res.status(201).json({ message: "Review added successfully", reviewId: results.insertId });
    });
};

module.exports = {
    index,
    show,
    store,
    storeReview
};





