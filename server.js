const express = require("express");
const app = express();
const PORT = process.env.API_SERVER_PORT;
const connection = require("./database/connection");
app.use(express.static("public"));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
app.get("/", (req, res) => {
    res.send("Hello, World!");
});
