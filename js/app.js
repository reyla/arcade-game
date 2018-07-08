const player = new Player();
// create array of enemies with X set off-grid up to -5,
// and y set to incrementing rows
const allEnemies = [...Array(3)].map((_,i) => new Enemy(Math.floor(Math.random() * -5),i+1));
const heartsListCurrent = document.getElementById('hearts-list-current');
const heartsListFinal = document.getElementById('hearts-list-final');
const button = document.getElementById('replay-button');
const restart = document.getElementById('restart-icon');

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
    }
}


function replay() {
    player.reset();
}

// this listens for click on the replay button
button.addEventListener('click', function() {
    document.getElementById('modal').classList.toggle('hide');
    replay();
});

// this listens for click on the restart icon
restart.addEventListener('click', replay);
