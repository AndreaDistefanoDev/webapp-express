const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.API_SERVER_PORT;
const moviesRouter = require("./routes/movies");
const notFound = require("./middlewares/notFound");
const serverError = require("./middlewares/serverError");


app.use(cors({
    origin: process.env.FRONTEND_SERVER_PORT
}));
app.use(express.static("public"));
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Hello, World!");
});

// movies router
app.use("/movies", moviesRouter);

// handle server errors
app.use(notFound);

// catch-all route for 404 errors
app.use(serverError);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
