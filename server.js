require("./models/db");
const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
require("dotenv").config();

const User = mongoose.model("User");

const app = express();
const PORT = 8080;
const ACCEPTED = ["home", "library", "signin", "signup", "signout", "delete"];
const GAMES = ["tictactoe", "snake", "minesweeper", "flappybird", "chess", "platformer", "adventuregame"];
const KEY = process.env.COOKIES_KEY;

app.use(cookieSession({
    name: 'session',
    keys: [process.env.COOKIES_1, process.env.COOKIES_2],
    maxAge: 24 * 60 * 60 * 1000
}));

app.set("views", path.join(__dirname, "/scripts"));
app.use(express.static(path.join(__dirname, '/scripts')));
app.use(express.static(path.join(__dirname, '/games')));

app.set("view engine", "ejs");
app.use(express.json());
app.get("/", async (req, res) => {
    res.redirect("/home");
});

app.get("/download/:game", async (req, res) => {
    let filename = req.params.game.split(' ').join('').toLowerCase();
    if (GAMES.includes(filename)) {
        res.render("ejs/download.ejs", {
            title: req.params.game,
            file: filename+".zip",
            isLoggedIn: loggedIn(req.session),
            isFav: includes(req.session, filename)
        });
    }
    else {
        res.redirect("/notFound");
    }
});

app.get("/delete", async (req, res) => {
    if (loggedIn(req.session)) {
        User.findByIdAndDelete(req.session[KEY]).then(_ => {
            req.session[KEY] = "";
            req.session.favourites = [];
            res.redirect("/home");
        });
    }
    else {
        res.redirect("/home");
    }
});

app.get("/signup", async (req, res) => {
    res.render("ejs/signup.ejs", {
        isPassSame: true,
        isUserTaken: false,
        isLoggedIn: loggedIn(req.session)
    });
});

app.get("/signin", async (req, res) => {
    res.render("ejs/signin.ejs", {
        error: false,
        isLoggedIn: loggedIn(req.session)
    });
});

app.get("/signout", async (req, res) => {
    if (loggedIn(req.session)) {
        req.session[KEY] = "";
        req.session.favourites = [];
    }
    res.redirect("/home");
});

app.get("/:id", async (req, res) => {
    if (ACCEPTED.includes(req.params.id)) {
        if (req.params.id == "library") {
            res.render("ejs/"+req.params.id+".ejs", {
                favourites: (req.session.favourites == null ? [] : req.session.favourites),
                isLoggedIn: loggedIn(req.session)
            });
        }
        else {
            res.render("ejs/"+req.params.id+".ejs", {
                isLoggedIn: loggedIn(req.session)
            });
        }
    }
    else {
        res.render("ejs/notFound.ejs", {
            isLoggedIn: loggedIn(req.session)
        });
    }
});

app.post("/signin", bodyparser.urlencoded(), async (req, res) => {
    getUserId(req.body).then(id => {
        if (id != null) {
            User.findById(id).then(fav => {
                req.session[KEY] = id;
                req.session.favourites = fav.favourites;
                res.redirect("/home");
            });
        }
        else {
            res.render("ejs/signin.ejs", {
                isLoggedIn: loggedIn(req.session),
                error: true
            });
        }
    });
});

app.post("/signup", bodyparser.urlencoded(), async (req, res) => {
    let user = new User();
    let found = false;
    User.find({}).then(users => {
        for (let i = 0; i<users.length; i++) {
            if (req.body.username == users[i].username) {
                found = true;
                break;
            }
        }
    }).then(_ => {
        if (found) {
            res.render("ejs/signup.ejs", {
                isLoggedIn: loggedIn(req.session),
                isPassSame: true,
                isUserTaken: true
            });
        }
        else if (req.body.password != req.body.confirm) {
            res.render("ejs/signup.ejs", {
                isLoggedIn: loggedIn(req.session),
                isPassSame: false,
                isUserTaken: false
            });
        }
        else {
            user.username = req.body.username;
            user.password = req.body.password;
            user.favourites = [];
            user.save().then(_ => {
                getUserId({username: user.username, password: user.password}).then(id => {
                    req.session[KEY] = id;
                    req.session.favourites = [];
                    res.redirect("/home");
                });
            });
        }
    });
});

app.post("/addFav", bodyparser.urlencoded(), async (req, res) => {
    req.session.favourites.push(req.body.fav);
    User.findByIdAndUpdate(req.session[KEY], {favourites: req.session.favourites}).then(_ => {
        res.redirect(req.get('referer'));
    });
});

app.post("/delFav", bodyparser.urlencoded(), async (req, res) => {
    req.session.favourites.splice(req.session.favourites.indexOf(req.body.fav), 1);
    User.findByIdAndUpdate(req.session[KEY], {favourites: req.session.favourites}).then(_ => {
        res.redirect(req.get('referer'));
    });
});

app.get("*", async (req, res) => {
    res.render("ejs/notFound.ejs");
});

app.listen(PORT, _ => console.log("Listening on port: " + PORT));

function getUserId(user) {
    return new Promise((resolve, reject) => {
        User.find({}).then(users => {
            for (let i = 0; i<users.length; i++) {
                if (users[i].username == user.username && users[i].password == user.password) {
                    resolve(users[i].id)
                }
            }
            resolve(null);
        });
    });
}

function loggedIn(session) {
    return (session.hasOwnProperty(KEY) && session[KEY] != "");
}

function includes(session, file) {
    if (!session.hasOwnProperty("favourites")) return false;
    for (let i = 0; i<session.favourites.length; i++) {
        if (session.favourites[i] == file) return true;
    }
    return false;
}