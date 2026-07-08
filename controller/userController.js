

const index = (req, res) => {
    connection.query("SELECT * FROM users", (err, results) => {
        if (err) {
            console.error("Error fetching users:", err);
            res.status(500).send("Error fetching users");
            return;
        }
        res.json(results);
    });
}

const show = (req, res) => {
    const userId = req.params.id;
    connection.query("SELECT * FROM users WHERE id = ?", [userId], (err, results) => {
        if (err) {
            console.error("Error fetching user:", err);
            res.status(500).send("Error fetching user");
            return;
        }
        if (results.length === 0) {
            res.status(404).send("User not found");
            return;
        }
        res.json(results[0]);
    });
}


module.exports = {
    index,
    show
};
