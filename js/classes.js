// classes code designed with help from Rodrick Bloomfield via this webinar: https://zoom.us/recording/play/aulotDlzKFegQFIJTaTzKgWvNkVsYtlwO454vL1UPE1Cm6lOUBQCtfVurPOIAGAS


class Entity {
    constructor() {
        this.sprite = 'images/';
        this.x = 2;
        this.y = 5;
    }

    update(dt) {
        this.isOutOfBoundsX = this.x > 5;
        this.isOutOfBoundsY = this.y < 1;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
    }

    checkCollisions(playerOrEnemy) {
        if (this.y === playerOrEnemy.y) {
            if (this.x >= playerOrEnemy.x - 0.5 && this.x <= playerOrEnemy.x + 0.5) {
                return true;
            }
        }
        else {
            return false;
        }
    }
}


class Player extends Entity {
    constructor() {
        super();
        this.sprite += 'char-boy.png';
        this.moving = false;
        this.win = false;
    }

    update(dt) {
        super.update();
        // check win condition
        if (this.isOutOfBoundsY && !this.moving && !this.win) {
            // show popup modal
            document.getElementById('modal').classList.toggle('hide');
            this.win = true;
        }
    }

    render() {
      super.render();
      this.moving = false;
    }

    handleInput(input) {
        switch(input) {
            case 'left':
                this.x = this.x > 0 ? this.x - 1 : this.x;
                break;
            case 'up':
                this.y = this.y > 0 ? this.y - 1 : this.y;
                break;
            case 'right':
                this.x = this.x > 4 ? this.x + 1 : this.x;
                break;
            case 'down':
                this.y = this.y > 5 ? this.y + 1 : this.y;
                break;
        }
        this.moving = true;
    }

    reset() {
        this.moving = false;
        this.win = false;
        this.x = 2;
        this.y = 5;
    }
}


class Enemy extends Entity {
    constructor(x, y) {
        super();
        this.sprite += 'enemy-bug.png';
        this.x = x;
        this.y = y;
    }

    update(dt) {
        // set speed for enemy
        let speed = Math.floor(Math.random() * 5);
        super.update();
        // if the enemy goes off screen, loop them around to the other side
        if(this.isOutOfBoundsX) {
            this.x = -1;
        } else {
            // otherwise, increment their position according to their speed
            this.x += speed * dt;
        }
    }
}
