/* {
    name: "",
    desc: "",
    tags: []
} */

const games = [{
    name: "Tic Tac Toe",
    desc: "Tic Tac Toe is a very popular game which is why I chose to make it. I first made it so that you can play against somebody from the same computer but that proved far too simple. Therefore I decided to complicate it a bit more by adding an AI to play against. It works by utilising an algorithm called minimax to play the best move in each case. Minimax works by recursively solving the game and choosing the quickest path to victory.",
    tags: ["small", "AI", "2 player"]
}, {
    name: "Flappy Bird",
    desc: "Flappy Bird is another classical and iconic game known all around the world so I decided to recreate it using Unity Engine. Flappy bird is played by guiding a flying bird through a forward moving map while avoiding any obstacles that may appear in the form of pipes. It may appear as an easy to play game but trust me, it takes hours just to get past score 30.",
    tags: ["small", "single player"]
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
}
];

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