if (typeof isLoggedIn == undefined) var isLoggedIn = false;
const GAMES = [{
    name: "Tic Tac Toe",
    desc: "Tic Tac Toe is a very popular game which is why I chose to make it. I first made it so that you can play against somebody from the same computer but that proved far too simple. Therefore I decided to complicate it a bit more by adding an AI to play against. It works by utilising an algorithm called minimax to play the best move in each case. Minimax works by recursively solving the game and choosing the quickest path to victory.",
    tags: ["small", "AI", "2 player"]
}, {
    name: "Flappy Bird",
    desc: "Flappy Bird is another classical and iconic game known all around the world so I decided to recreate it using Unity Engine. Flappy bird is played by guiding a flying bird through a forward moving map while avoiding any obstacles that may appear in the form of pipes. It may appear as an easy to play game but trust me, it takes hours just to get past score 30.",
    tags: ["small", "singleplayer"]
}, {
    name: "Chess",
    desc: "Everybody is familiar with the classical board game known as chess. But did you know that the sheer amount of rules it has can make it pretty difficult to actually code? Yes, especially implementing checks, checkmates and stalemates as well as disabling illegal moves. All those can be pretty time consuming to code and debug.",
    tags: ["small", "2 player"]
}, {
    name: "Minesweeper",
    desc: "Minesweeper, a much loved game from my childhood. It was pretty interesting to code. There are a bunch of different modes depending on the dimensions and number of mines that you want to play with. To open up all of the boxes which contain no number or mine I used an algorithm called Breadth-First Search(BFS). It is an algorithm commonly used in graphs and it fit perfectly in this case.",
    tags: ["small", "singleplayer"]
}, {
    name: "Snake",
    desc: "Another iconic game brought to life in this website, Snake. This game was definitely one of the easiest to code yet also one of the most interesting ones. It was one of the first games which I developed for this website. Nothing too complicated about it but definitely addictive to play. I spent more time playing it rather than coding it.",
    tags: ["small", "singleplayer"]
}, {
    name: "Platformer",
    desc: "This game involves you controlling a character called fire spirit and going through a dungeon defeaing monsters while upgrading your skills. To beat the game you need to get strong enough to beat the final boss. This game was my favourite when making as I had the chance to experiment with a lot of different methods to deal with all the mechanics which the game required such as small power ups for the character, different kinds of enemies, a balanced fighting experience, small parkouring places, nice animations and many more.",
    tags: ["big", "singleplayer", "combat"]
}, {
    name: "Adventure Game",
    desc: "In this game you control a character on a 2D flat map where you get to explore the limited world that has been built for you to enjoy. There are a couple of missions you need to complete in order to complete the game. You'll go searching for items, navigating through mazes and fighting enemies. A lot of animation was used in this game as well as the use of tilemaps which were interesting concepts to explore.",
    tags: ["big", "singleplayer", "combat"]
 }
];

function populate(...g) {
    if (g.length == 0) {
        document.getElementById("game-info").innerHTML = "<h2>No results<span style='color: black;'>________________</span></h2>";
        return;
    }
    g.forEach(x => {
        let tags = "";
        x.tags.forEach(y => {
            tags += "<span class='game-tag'>"+y+"</span>";
        });
        document.getElementById("game-info").innerHTML += "<div onClick='download(\""+x.name+"\")' class='game-block'><h3>"+x.name+"</h3><span class='all-tags'>"+tags+"</span><p>"+x.desc+"</p></div>";
    });
}

function search() {
    let str = document.getElementById("browse-input").value;
    let url = location.href;
    if (!location.href.includes("?")) url += "?";
    if (url.includes("search")) {
        url = url.replace(/search=.*(&|$)/, "search="+str+"&");
    }
    else {
        url += "search="+str+"&";
    }
    return url;
}

function putFilterFields(games) {
    let s = new Set();
    games.forEach(x => {
        x.tags.forEach(y => {
            s.add(y);
        });
    });
    if (isLoggedIn != null && isLoggedIn) s.add("favourite");
    
    let add = "";
    s.forEach(x => {
        let y = x.toLowerCase().replaceAll(/ /g, '-');
        add += "<input name='tag-"+y+"' class='tags-filtering' id='tag-"+y+"' type='checkbox'> <label for='tag-"+y+"'>"+x+"</label><br>";
    });
    document.getElementById("search-tags").innerHTML = add;
}

function submitSearch() {
    let url = search();
    let inputs = document.getElementsByClassName("tags-filtering");
    for (let i = 0; i<inputs.length; i++) {
        let x = inputs[i];
        let str = x.id.substring(4).toLowerCase().replaceAll(/ /g, '-');
        if (x.checked) {
            if (new RegExp(`${str}=.*(&|$)`).test(str)) {
                url = url.replace(new RegExp(`${str}=.*(&|$)`), str+"=true&");
            }
            else {
                url += str+"=true&";
            }
        }
        else {
            if (new RegExp(`${str}=.*(&|$)`).test(str)) {
                url = url.replace(new RegExp(`${str}=.*(&|$)`), "");
            }
        }
    };

    location.href = url;
}

function download(game) {
    changeScreen("download/"+game);
}

function init() {
    let games = GAMES;
    let favs = document.getElementsByClassName("favourites");
    for (let j = 0; j<favs.length; j++) {
        let x = favs[j].innerHTML;
        for (let i = 0; i<GAMES.length; i++) {
            if (GAMES[i].name.replaceAll(/ /g, '').toLowerCase() == x) {
                games[i].tags.push('favourite');
                break;
            }
        }
    }

    putFilterFields(games);
    let index = location.href.lastIndexOf("?");
    if (index == -1) {
        populate(...games);
    }
    else {
        let p = location.href.substring(index+1).split("&");
        let params = {};
        for (let i = 0; i<p.length; i++) {
            p[i] = [p[i].match(/.*=/), decodeURI(p[i].substring(p[i].lastIndexOf("=")+1))];
            if (p[i][0] == null || p[i][1].length == 0) {
                continue;
            }
            params[p[i][0][0].slice(0, -1)] = p[i][1];
        }
        let keys = Object.keys(params);
        let g = [];
        if (keys.length > 0) {
            if (keys.includes("search")) {
                let str = params["search"];
                document.getElementById("browse-input").value = str;
                games.forEach(x => {
                    if (x.name.toLowerCase().includes(str.toLowerCase()) || x.desc.toLowerCase().includes(str.toLowerCase()) || x.tags.includes(str.toLowerCase())) {
                        g.push(x);
                    }
                });
            }
            keys.forEach(x => {
                if (x != "search") {
                    if (g.length == 0 && !keys.includes("search")) g = games;
                    let tag = document.getElementById("tag-"+x);
                    tag.checked = true;
                    if (tag != null) {
                        for (let i = 0; i<g.length; i++) {
                            if (g[i] == undefined) break;
                            let y = g[i];
                            if (!(y.tags.includes(x.toLowerCase().replaceAll(/-/g, ' ')) || y.tags.includes(x.toUpperCase().replaceAll(/-/g, ' ')))) {
                                g.splice(i, 1);
                                i--;
                            }
                        };
                    }
                }
            });
            populate(...g);
        }
        else {
            populate(...games);
        }
    }
}

init();