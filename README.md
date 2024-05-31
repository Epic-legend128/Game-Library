# Game-Library
A website consisting of games to download.

## Table of Contents
1. [Games Included](#games-included)
   - [Snake](#snake)
   - [Minesweeper](#minesweeper)
   - [Tic-Tac-Toe](#tic-tac-toe)
   - [Flappy Bird](#flappy-bird)
   - [Chess](#chess)
   - [Platformer](#platformer)
   - [Adenture Game](#adventure-game)
2. [Tools Used](#tools-used)
   - [Website Development](#website-development)
   - [Game Development](#game-development)

## Games Included
The games which are included within this webpage are quite simple. They were all made with Unity and are 2d games.

### Snake
Regular snake game in which you have to move your character around the screen without hitting the walls or your body. The goal is to eat as many apples as possible because they provide you with 1 point each but also increase your body size making it harder and harder to remain in the game without hitting your own body.

### Minesweeper
This game is similar to the classic Minesweeper. So basically your goal is to open all of the boxes presented to you on the screen while avoiding clicking on any bombs. Every time you click on a box it will tell you the amount of mines around it. This game has a couple of different preset dimensions and amount of bombs to select from to play but you can also create your own custom game with a specific width, height and number of bombs.

### Tic-Tac-Toe
This is played just like the regular tic-tac-toe game in which you have to place 3 of your symbols consecutively either in a row, column or diagonal. The board size is always 3 by 3 and you are able to play against another player locally or against an AI.

### Flappy Bird
Flappy Bird is an interesting game in which you have to press the spacebar in order to make your character jump in the air while avoiding hitting any obstacles(pipes) coming your way. Every time you pass in between 2 pipes you get a point.

### Chess
Chess is a classical board game in which you have 8 pawns, 2 knights, 2 bishops, 2 rooks, 1 queen and 1 king. The board is 8X8 and it is played locally against a second person. The rules are way too many to list here so if you are interested in knowing all of the game's rules then visit the [FIDE rules of chess](https://www.fide.com/FIDE/handbook/LawsOfChess.pdf). In this version, however, there is no time control or 50-move rule.

### Platformer
This platformer game was created with a simple combat system in mind. Basically, you have a character which you can control with either the wasd or arrow keys and you have a melee and ranged attack to deal with enemies of different kinds. There is an in-game shop with in-game money which you can get by eliminating your opponents and the goal of the game is to win against a boss located under the first level of the map.

### Adventure Game
This adventure game involves you with a character going around a 2d flat map and completing tasks. There is also a simple melee combat system to defeat some undead enemies. Basically, your goal is to follow a series of instructions and explore the map. I may make this game bigger in the future and update it later on as for now it is not that big of a game as it only has a couple of main missions.

## Tools Used
I used a variety of different tools so as to complete this big project. Some of them helped me with the website development and others with the game development.

### Website Development
When it comes to the development of the website, I had to utilise the following things:
- Javascript
- CSS
- Node
    * ejs
    * body-parser
    * dotenv
    * cookie session
    * express
    * mongoose
<br>
The website includes a user system with a login, logout and user deletion system. Furthermore, it possesses a browsing and searching mechanism for locating a specific game of your choice. It is run on localhost and to make sure everything goes smoothly you need to have the following environment variables set up and saved in a .env file:

```
COOKIES_KEY=""
COOKIES_1=""
COOKIES_2=""
DB_LINK=""
```

The first 3 variables can be whatever you want. However, the last one is the url to connect to the Mongo database. If you have set up all of these correctly then the website should run on localhost on port 8080. To run it just type in the terminal `node server.js`.

### Game Development
When it comes to the creation of the games provided within the website, I utilised Unity. They were all pretty simple to make. I borrowed assets from free places on internet. Making chess was quite tedious in code as the required recursive approach was difficult to debug and with a single bug it could cause Unity to crash by entering an infinite loop. The Adventure Game and the Platformer used the greatest amount of Unity features, as I had to include animations, tiling, sounds and many more whereas most of the rest just needed some images and some sounds and they were done. For the opening of multiple tiles in Minesweeper, I used a breadth-first search algorithm, which is just a graph-exploring algorithm. For the AI in tic-tac-toe, I just used a simple minimax algorithm which calculated the whole game tree at each choice and chose the optimal move.

My favourite game in terms of code is Chess as it possesses the most complicated code and therefore was the most satisfying one to finish, however, in terms of the whole process of making the game, then the platformer one was definitely the best as I kept getting carried away while developing it. Also, Flappy Bird was pretty addictive in terms of the final product.
