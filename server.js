const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;
const accepted = ["home", "library"];

app.set("views", path.join(__dirname, "/scripts"));
app.use(express.static(path.join(__dirname, '/scripts')));

app.set("view engine", "ejs");
app.use(express.json());
app.get("/", async (req, res) => {
    res.render("ejs/home.ejs");
});

app.get("/:id", async (req, res) => {
    if (accepted.includes(req.params.id))
        res.render("ejs/"+req.params.id+".ejs");
    else
        res.send("Error 404, not found");
});

app.listen(PORT || 3000, _ => console.log("Listening on port: " + PORT));