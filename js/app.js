const player = new Player();
const heartsListCurrent = document.getElementById('hearts-list-current');
const heartsListFinal = document.getElementById('hearts-list-final');
const button = document.getElementById('replay-button');
const restart = document.getElementById('restart-icon');
const gameResult = document.getElementById('game-result');
const modal = document.getElementById('modal');

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


    // create array of enemies with (x,y) coordinates for starting position
    function buildEnemies() {
        allEnemies = [...Array(4)].map((_,i) => new Enemy(Math.floor(Math.random() * -5),i+1));
        const Enemy1 = new Enemy();
        const Enemy2 = new Enemy();
        const Enemy3 = new Enemy();
        randomStart(Enemy1);
        randomStart(Enemy2);
        randomStart(Enemy3);
        allEnemies.push(Enemy1, Enemy2, Enemy3);
    }

    function randomStart(enemy) {
        enemy.x = getRandomInt(-10, -6);
        enemy.y = getRandomInt(1, 5);
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}


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
            gameEnds();
            break;
    }
}

function updateModal() {
    if (player.win) {
        gameResult.innerHTML = "You win!";
      }
    else {
        gameResult.innerHTML = "Sorry, you ran out of hearts!";
    }
    modal.classList.toggle('hide');
}

function gameEnds() {
    updateModal();
    player.reset();
}

function replay() {
    player.reset();
    updateHearts(player.hearts);
    allEnemies = [];
    buildEnemies();
}

// this listens for click on the replay button
button.addEventListener('click', function() {
    document.getElementById('modal').classList.toggle('hide');
    replay();
});

// this listens for click on the restart icon
restart.addEventListener('click', replay);
