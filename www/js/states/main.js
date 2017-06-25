var GAME = GAME || {};

GAME.Main = function() {
    this.facing = Direction.Up;
    this.player = {x:3, y:5};
};

Direction = {
    Up: 1,
    Right: 2,
    Bottom: 3,
    Left: 4
};


GAME.Main.prototype.create = function() {
    this.dungeonContainer = this.game.add.group();
    this.dungeon = new Dungeon(this.game);
    this.dungeonContainer.addChild(this.dungeon);

    this.minimapContainer = this.game.add.group();
    this.minimap = new Minimap(this.game);
    this.minimapContainer.y = 430;

    this.game.inputEnabled = true;
    this.game.input.onUp.add(this.changeDepth, this);
    this.draw(this.depth);

};

GAME.Main.prototype.draw = function() {
    this.dungeon.draw(this.player.x, this.player.y, this.facing);
    this.dungeonContainer.x = (this.game.width - this.dungeonContainer.width) / 2;
    this.dungeonContainer.y = this.dungeonContainer.x;

    this.minimap.y = this.dungeonContainer.y * 2 + this.dungeonContainer.height;
    this.minimap.draw(this.dungeon.map, this.player);
    this.minimap.x = (this.game.width - this.minimap.width)/2;
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
        let position = this.dungeon.canMoveTo(this.player.x, this.player.y, this.facing, (pointer.y > this.dungeonContainer.height/3*2 ? Direction.Bottom : Direction.Up));

        if (position != null) {
            this.player = position;
        }
    }
    console.log("To: " + this.player.x + "x" + this.player.y + " @ " + this.facing);
    this.draw();
};
