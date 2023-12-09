/* {
    name: "",
    desc: "",
    tags: []
} */

const games = [{
    name: "Tic Tac Toe",
    desc: "Tic Tac Toe is a very popular game which is why I chose to make it. I first made it so that you can play against somebody from the same computer but that proved far too simple. Therefore I decided to complicate it a bit more by adding an AI to play against. It works by utilising an algorithm called minimax to play the best move in each case. Minimax works by recursively solving the game and choosing the quickest path to victory.",
    tags: ["small", "AI", "2 player"]
}];

function populate() {
    games.forEach(x => {
        let tags = "";
        x.tags.forEach(y => {
            tags += "<span class='game-tag'>"+y+"</span>";
        });
        document.getElementById("game-info").innerHTML += "<h3>"+x.name+"</h3><span class='all-tags'>"+tags+"</span><p>"+x.desc+"</p>";
    });
}

populate();