const player = new Player();
const heartsListCurrent = document.getElementById('hearts-list-current');
const heartsListFinal = document.getElementById('hearts-list-final');
const pointsCurrent = document.getElementById('points-current');
const pointsFinal = document.getElementById('points-final');
var allGems = [];
const play = document.getElementById('play-button');
const restart = document.getElementById('restart-icon');
const gameResult = document.getElementById('game-result');
const modal = document.getElementById('modal');
const button = document.getElementById('replay-button');
const sideBar = document.getElementById('sidebar');
const help = document.getElementById('help-icon');
const closeHelp = document.getElementById('close-icon');

// This listens for key presses and sends the keys to the
// Player.handleInput() method. Accepts both arrow keys and WASD for lefties.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        65: 'left', // a
        38: 'up',
        87: 'up', // w
        39: 'right',
        68: 'right', // d
        40: 'down',
        83: 'down' // s
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

/* Build all the enemies using an array and then set the speed for each.
 */
function buildEnemies() {
    // create array of enemies with (x,y) coordinates for starting position
    allEnemies = [...Array(3)].map((_,i) => new Enemy(Math.floor(Math.random() * -5),i+1));
    // add additional enemies that will overlap y coordinates
    const Enemy1 = new Enemy();
    const Enemy2 = new Enemy();
    randomStart(Enemy1);
    randomStart(Enemy2);
    allEnemies.push(Enemy1, Enemy2);
    // set the speed for each enemy
    allEnemies.forEach(function(enemy) {
        enemy.setSpeed();
        });
}

/* Set starting position for each enemy in x,y coordinates.
 */
function randomStart(enemy) {
    enemy.x = getRandomInt(-8, 2);
    enemy.y = getRandomInt(1, 5);
}

/* Set starting position for each gem in x,y coordinates.
 */
function randomStartGem(gem) {
    gem.x = getRandomInt(-8, -1);
    gem.y = getRandomInt(2, 5);
}

/* This is a general random function with interval parameters
 * Borrowed from MDN webdocs https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    //The maximum is exclusive and the minimum is inclusive
    return Math.floor(Math.random() * (max - min)) + min;
}


/* Build all the gems on the board, set their start position, and add to an array.
 * Input parameter is the number of gems you want.
 */
function buildGems(num) {
    let i = 0;
    while (i < num) {
      const Gem1 = new Gem();
      randomStartGem(Gem1);
      allGems.push(Gem1);
      i++;
    }
}

/* Build the html for hearts status.
 */
function updateHearts(hearts) {
    switch(hearts) {
        case 3:
            heartsListCurrent.innerHTML = '<i class="fa fa-heart"></i> <i class="fa fa-heart"></i> <i class="fa fa-heart"></i>';
            heartsListFinal.innerHTML = '<i class="fa fa-heart"></i> <i class="fa fa-heart"></i> <i class="fa fa-heart"></i>';
            break;
        case 2:
            heartsListCurrent.innerHTML = '<i class="fa fa-heart"></i> <i class="fa fa-heart"></i> <i class="fa fa-minus"></i>';
            heartsListFinal.innerHTML = '<i class="fa fa-heart"></i> <i class="fa fa-heart"></i> <i class="fa fa-minus"></i>';
            break;
        case 1:
            heartsListCurrent.innerHTML = '<i class="fa fa-heart"></i> <i class="fa fa-minus"></i> <i class="fa fa-minus"></i>';
            heartsListFinal.innerHTML = '<i class="fa fa-heart"></i> <i class="fa fa-minus"></i> <i class="fa fa-minus"></i>';
            break;
        case 0:
            heartsListCurrent.innerHTML = '<i class="fa fa-minus"></i> <i class="fa fa-minus"></i> <i class="fa fa-minus"></i>';
            heartsListFinal.innerHTML = '<i class="fa fa-minus"></i> <i class="fa fa-minus"></i> <i class="fa fa-minus"></i>';
            gameEnds();
            break;
    }
}

/* Update the points shown based on number of points logged
 */
function updatePoints(points) {
    pointsCurrent.innerHTML = '<p>' + points + '</p>';
    pointsFinal.innerHTML = '<p>' + points + '</p>';
}

/* Change the modal text based on win or lose condition
 */
function updateModal() {
    if (player.win) {
        gameResult.innerHTML = "You win!";
      }
    else {
        gameResult.innerHTML = "Sorry, you ran out of hearts!";
    }
    modal.classList.toggle('hide');
}

/* Functions that run when the game ends (either win or lose)
 */
function gameEnds() {
    updateModal();
    player.reset();
}

/* Replay and restart button both point to this function. Resets all game
 * elements, empties the arrays, and rebuilds the enemies and gems.
 */
function replay() {
    player.reset();
    updateHearts(player.hearts);
    updatePoints(0);
    allEnemies = [];
    allGems = [];
    buildEnemies();
    buildGems(3);
}

/* Opens the sidebar (when the ? icon is clicked)
 */
function openNav() {
    sideBar.style.width = "100%";
}

/* Closes the sidebar (when the X icon is clicked)
 */
function closeNav() {
    sideBar.style.width = "0";
}

// this listens for click on the replay button
button.addEventListener('click', function() {
    modal.classList.toggle('hide');
    replay();
});

// this listens for click on the play button
play.addEventListener('click', function() {
    closeNav();
    replay();
});

// this listens for click on the restart icon
restart.addEventListener('click', replay);

// this listens for click on the help ? icon
help.addEventListener('click', openNav);

// this listens for click on the X icon
closeHelp.addEventListener('click', closeNav);
