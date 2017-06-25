function Dungeon(game) {
    Phaser.Group.call(this, game);

    this.backgroundContainer = this.game.add.group();
    this.addChild(this.backgroundContainer);

    this.map = [
        [9, 9, 9, 9, 9, 9, 9],
        [9, 0, 0, 9, 0, 0, 9],
        [9, 0, 9, 9, 9, 0, 9],
        [9, 0, 9, 0, 9, 1, 9],
        [9, 0, 9, 0, 9, 0, 9],
        [9, 0, 0, 0, 0, 0, 9],
        [9, 9, 9, 9, 9, 9, 9]
    ];
};

Dungeon.prototype = Object.create(Phaser.Group.prototype);
Dungeon.prototype.constructor = Dungeon;

Dungeon.prototype.draw = function(x, y, facing) {
    this.backgroundContainer.removeAll(true);

    let scale = 12;
    let depth = 0;
    var position = {x:x, y:y};
    for (let i=0; i<3; i++) {
        position = this.canMoveTo(position.x, position.y, facing, Direction.Up);
        if (position == null) {
            break;
        }
        depth++;
    }

    /* Draw the background */
    let backgroundFrame = 0;
    switch (depth) {
        case 0:
            backgroundFrame = 2;
            break;
        case 1:
            backgroundFrame = 1;
            break;
        case 2:
            backgroundFrame = 0;
            break;
    }
    let image = this.backgroundContainer.create(0, 0, "tile:dungeon");
    image.frame = backgroundFrame;
    image.scale.setTo(scale, scale);

    // Find neighboor
    let neighboor = {
        left: this.canMoveTo(x, y, facing, Direction.Left),
        right: this.canMoveTo(x, y, facing, Direction.Right)
    };

    let positionFoward = this.canMoveTo(x, y, facing, Direction.Up);
    console.log(neighboor.left);

    if (neighboor.left == null) {
        if (depth == 0) {
            /* Left corner */
            image = this.backgroundContainer.create(0, 0, "tile:dungeon");
            image.frame = 3;
            image.scale.setTo(scale, scale);
        } else {
            image = this.backgroundContainer.create(0, 0, "tile:dungeon");
            image.frame = (this.canMoveTo(positionFoward.x, positionFoward.y, facing, Direction.Left) == null ? 5 : 3);
            image.scale.setTo(scale, scale);
        }
    } else {
        if (depth > 0) {
            image = this.backgroundContainer.create(0, 0, "tile:dungeon");
            image.frame = 7;
            image.scale.setTo(scale, scale);
        }
    }

    if (neighboor.right == null) {
        if (depth == 0) {
            /* Right corner */
            image = this.backgroundContainer.create(0, 0, "tile:dungeon");
            image.frame = 4;
            image.scale.setTo(scale, scale);
        } else {
            image = this.backgroundContainer.create(0, 0, "tile:dungeon");
            image.frame = (this.canMoveTo(positionFoward.x, positionFoward.y, facing, Direction.Right) == null ? 6 : 4);
            image.scale.setTo(scale, scale);
        }
    } else {
        if (depth > 0) {
            image = this.backgroundContainer.create(0, 0, "tile:dungeon");
            image.frame = 8;
            image.scale.setTo(scale, scale);
        }
    }


    if (this.map[y][x] == 1) {
        image = this.backgroundContainer.create(0, 0, "tile:ladder");
        image.scale.setTo(scale, scale);
        image.x = (this.backgroundContainer.width - image.width)/2;
        image.y = this.backgroundContainer.height - image.height - (scale);
    } else if (positionFoward != null && this.map[positionFoward.y][positionFoward.x] == 1) {
        image = this.backgroundContainer.create(0, 0, "tile:ladder");
        image.scale.setTo(scale/2, scale/2);
        image.x = (this.backgroundContainer.width - image.width)/2;
        image.y = this.backgroundContainer.height - image.height - (scale * 3) - (scale/2);
    }

};

Dungeon.prototype.canMoveTo = function(x, y, facing, direction) {
    let position = null;

    let modifier = {x:0, y:0};

    let newDirection = facing + (direction-1);
    if (newDirection > 4) {
        newDirection -= 4;
    }

    console.log(newDirection);
    switch (newDirection) {
        case Direction.Up:
            modifier.y = -1;
            break;
        case Direction.Right:
            modifier.x = 1;
            break;
        case Direction.Bottom:
            modifier.y = 1;
            break;
        case Direction.Left:
            modifier.x = -1;
            break;
    }

    let gridX = x + modifier.x;
    let gridY = y + modifier.y;

    if (gridX >= 0 && gridX < this.map[0].length && gridY >= 0 && gridY < this.map.length) {
        if (this.map[gridY][gridX] < 9) {
            position = {x:gridX, y:gridY};
        }
    }

    return position;
};
