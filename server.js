const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;
const ACCEPTED = ["home", "library"];
const GAMES = ["tictactoe"];

app.set("views", path.join(__dirname, "/scripts"));
app.use(express.static(path.join(__dirname, '/scripts')));
app.use(express.static(path.join(__dirname, '/games')));

app.set("view engine", "ejs");
app.use(express.json());
app.get("/", async (req, res) => {
    res.render("ejs/home.ejs");
});

app.get("/:id", async (req, res) => {
    if (ACCEPTED.includes(req.params.id))
        res.render("ejs/"+req.params.id+".ejs");
    else
        res.render("ejs/notFound.ejs");
});

app.get("/download/:game", async (req, res) => {
    let filename = req.params.game.split(' ').join('').toLowerCase();
    if (GAMES.includes(filename)) {
        res.render("ejs/download.ejs", {
            title: req.params.game,
            file: filename+".dmg"
        });
    }
    else {
        res.redirect("/notFound");
    }
});

app.get("*", async (req, res) => {
    res.render("ejs/notFound.ejs");
});

app.listen(PORT || 3000, _ => console.log("Listening on port: " + PORT));