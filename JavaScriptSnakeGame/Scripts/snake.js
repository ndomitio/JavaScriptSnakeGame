//settings
var snakeX = 2;
var snakeY = 2;
var height = 30;
var width = 30;
var interval = 100;
var increment = 1;

//game variables
var tailX = [snakeX];
var tailY = [snakeY];
var fX;
var fY;
var running = false;
var gameOver = false;
var direction = -1; //up = 0, down = -1 left =1, right = 2;
var int;

/** entry point of the game 
 */

function run() {
    init();
    int = setInterval(gameLoop, interval);
}

function init() {
    createMap();
    createSnake();
    createFruit();
}

/**
 generate the map for the snake
 */

function createMap() {
    document.write("<table>");
    for (var y = 0; y < height; y++) {
        document.write("<tr>")
        for (var x = 0; x < width; x++) {
            if (x == 0 || x == width - 1 || y == 0 || y == height - 1) {
                document.write("<td class='wall' id='" + x + "-" + y + "'></td>");
                //    document.getElementById("")
            }
            else {
                document.write("<td class='blank' id='" + x + "-" + y + "'></td>");
            }
        }
        document.write("</tr>");
    }

    document.write("</table>");

}

function createSnake() {
    set(snakeX, snakeY, "snake");

}
function get(x, y) {
    return document.getElementById(x + "-" + y);
}
function set(x, y, value) {
    get(x, y).setAttribute("class", value);
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getType(x, y) {
    return get(x, y).getAttribute("class");
}
function createFruit() {
    var found = false;
    while (!found && (length < (width - 2) * (height - 2) + 1)) {
        var fruitX = rand(1, width - 1);
        var fruitY = rand(1, height - 1);
        if (getType(fruitX, fruitY) == "blank")
            found = true;
    }
    set(fruitX, fruitY, "fruit");
    fX = fruitX;
    fY = fruitY;
}

window.addEventListener("keypress", function key() {
    //if key is W set direction up
    var key = event.keyCode;
    if (direction != -1 && (key == 199 || key == 87))
        direction = 0;
    //if key is S set direction down;
    else if (direction != 0 && (key == 115 || key == 83))
        direction = -1;
    //if key is A set direction left;
    else if (direction != 2 && (key == 97 || key == 65))
        direction = 1;
    //if key is D set direction right;
    else if (direction != 1 && (key == 100 || key == 68))
        direction = 2;
    if (!running)
        running == true;
    else if (key == 32)
        running = false;
});

function gameLoop() {
    if (running && !gameOver) {
        update();
    } else if (gameOver) {
        clearInterval(int);
    }
}
function update() {
    setBlock(fx, fy, "fruit");
    set(tailX[length], tailY[length], "blank");
    if (direction == 0)
        snakeY--;
    else if (direction == -1)
        snakeY++;
    else if (direction == 1)
        snakeX--;
    else if (direction == 2)
        snakeX--;
}


run();