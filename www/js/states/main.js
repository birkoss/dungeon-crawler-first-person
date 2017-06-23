var GAME = GAME || {};

GAME.Main = function() {
    this.depth = 1;

    this.map = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 1, 0, 0, 1],
        [1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1]
    ];

    this.facing = Direction.Left;
    this.player = {x:3, y:5};
    this.player = {x:1, y:3};
};

Direction = {
    Up: 1,
    Right: 2,
    Bottom: 3,
    Left: 4
};


GAME.Main.prototype.create = function() {
    this.dungeonContainer = this.game.add.group();
    this.minimapContainer = this.game.add.group();
    this.minimapContainer.y = 320;

    this.game.inputEnabled = true;
    this.game.input.onUp.add(this.changeDepth, this);
    this.draw(this.depth);

};

GAME.Main.prototype.canMoveTo = function(x, y, facing, direction) {
    let position = null;

    let modifier = {x:0, y:0};

    let newDirection = facing + (direction-1);
    if (newDirection > 4) {
        newDirection -= 4;
    }

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
        if (this.map[gridY][gridX] == 0) {
            position = {x:gridX, y:gridY};
        }
    }

    return position;
};

GAME.Main.prototype.draw = function() {
    // Find depth
    let depth = 0;
    var position = {x:this.player.x, y:this.player.y};
    for (let i=0; i<3; i++) {
        position = this.canMoveTo(position.x, position.y, this.facing, Direction.Up);
        if (position == null) {
            break;
        }
        depth++;
    }

    // Find neighboor
    let neighboor = {
        left: this.canMoveTo(this.player.x, this.player.y, this.facing, Direction.Left),
        right: this.canMoveTo(this.player.x, this.player.y, this.facing, Direction.Right)
    };

    this.dungeonContainer.removeAll(true);

    let image;

    /* Wall (1 depth +) */
    if (depth > 0) {
        let position = this.canMoveTo(this.player.x, this.player.y, this.facing, Direction.Up);
        
        if (this.canMoveTo(position.x, position.y, this.facing, Direction.Left) == null) {
            image = this.dungeonContainer.create(0, 0, "tile:wall");
            image.scale.setTo(2, 2);
            image.frame = 2;
        } else {
            /* Hole Up and Left */
            image = this.dungeonContainer.create(0, 0, "tile:wall");
            image.scale.setTo(2, 2);
            image.frame = 8;

            image = this.dungeonContainer.create(0, 0, "tile:ceiling");
            image.scale.setTo(2, 2);
            image.frame = 2;
        }

        if (this.canMoveTo(position.x, position.y, this.facing, Direction.Right) == null) {
            image = this.dungeonContainer.create(0, 0, "tile:wall");
            image.scale.setTo(2, 2);
            image.frame = 3;
        } else {
            /* Hole Up and Right */
            image = this.dungeonContainer.create(0, 0, "tile:wall");
            image.scale.setTo(2, 2);
            image.frame = 9;

            image = this.dungeonContainer.create(0, 0, "tile:ceiling");
            image.scale.setTo(2, 2);
            image.frame = 3;
        }
    }
    /* Background (1 depth) */
    if (depth == 1) {
        image = this.dungeonContainer.create(0, 0, "tile:wall");
        image.scale.setTo(2, 2);
        image.frame = 5;
    }
    

    if (depth > 0) {
        image = this.dungeonContainer.create(0, 0, "tile:ceiling");
        image.scale.setTo(2, 2);
        image.frame = 5;
    }

    if (neighboor.left == null) {
        image = this.dungeonContainer.create(0, 0, "tile:wall");
        image.scale.setTo(2, 2);
        image.frame = 0;
    } else {
        if (depth == 0) {
            image = this.dungeonContainer.create(0, 0, "tile:wall");
            image.scale.setTo(2, 2);
            image.frame = 2;
        }

        image = this.dungeonContainer.create(0, 0, "tile:ceiling");
        image.scale.setTo(2, 2);
        image.frame = 0;
    }

    if (neighboor.right == null) {
        image = this.dungeonContainer.create(0, 0, "tile:wall");
        image.scale.setTo(2, 2);
        image.frame = 1;
    } else {
        if (depth == 0) {
            image = this.dungeonContainer.create(0, 0, "tile:wall");
            image.scale.setTo(2, 2);
            image.frame = 3;
        }

        image = this.dungeonContainer.create(0, 0, "tile:ceiling");
        image.scale.setTo(2, 2);
        image.frame = 1;
    }

    /* Background (No Depth) */
    if (depth == 0) {
        image = this.dungeonContainer.create(0, 0, "tile:wall");
        image.scale.setTo(2, 2);
        image.frame = 4;
    }

    image = this.dungeonContainer.create(0, 0, "tile:ceiling");
    image.scale.setTo(2, 2);
    image.frame = 4;

    /* Minimap */
    this.minimapContainer.removeAll(true);

    let size = 16;
    for (let y=0; y<this.map.length; y++) {
        for (let x=0; x<this.map[y].length; x++) {
            let block = this.minimapContainer.create(x * size, y * size, "tile:blank");
            block.width = size;
            block.height = size;
            block.tint = (this.map[y][x] == 0 ? 0xffffff : 0x333333);
        }
    }

    let player = this.minimapContainer.create(this.player.x*size, this.player.y*size, "tile:player");
    player.tint = 0xff0000;
    player.width = player.height = size;
    player.x += player.width/2;
    player.y += player.height/2;
    player.anchor.setTo(0.5, 0.5);

    if (this.facing == Direction.Right) {
        player.angle = 90;
    } else if (this.facing == Direction.Bottom) {
        player.angle = 180;
    } else if (this.facing == Direction.Left) {
        player.angle = 270;
    }
};

GAME.Main.prototype.changeDepth = function(item, pointer) {
    console.error("Moving Player");
    console.log("From: " + this.player.x + "x" + this.player.y + " @ " + this.facing);

    console.log("Pointer: " + pointer.x + "x" + pointer.y + " VS " + (this.game.width/3) + " or " + (this.game.width/3*2));
    if (pointer.x > this.game.width/3*2) {
        this.facing += 1;
        if (this.facing > 4) {
            this.facing = 1;
        }
    } else if (pointer.x < this.game.width/3) {
        this.facing -= 1;
        if (this.facing < 1) {
            this.facing = 4;
        }
    } else {
        let position = this.canMoveTo(this.player.x, this.player.y, this.facing, (pointer.y > this.dungeonContainer.height/3*2 ? Direction.Bottom : Direction.Up));

        if (position != null) {
            this.player = position;
        }
    }
    console.log("To: " + this.player.x + "x" + this.player.y + " @ " + this.facing);
    this.draw();
};
