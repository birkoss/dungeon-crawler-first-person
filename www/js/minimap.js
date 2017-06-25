function Minimap(game) {
    Phaser.Group.call(this, game);

    this.backgroundContainer = this.game.add.group();
    this.addChild(this.backgroundContainer);
    this.backgroundContainer.create(0, 0, "tile:minimap");

    this.mapContainer = this.game.add.group();
    this.addChild(this.mapContainer);
};

Minimap.prototype = Object.create(Phaser.Group.prototype);
Minimap.prototype.constructor = Minimap;

Minimap.prototype.draw = function(map, player) {
    this.mapContainer.removeAll(true);

    let size = 6;
    for (let y=0; y<map.length; y++) {
        for (let x=0; x<map[y].length; x++) {
            if (map[y][x] < 9) {
                let block = this.mapContainer.create(x * size, y * size, "tile:blank");
                block.width = size;
                block.height = size;
                block.tint = 0x000000;
            }
        }
    }

    let position = this.mapContainer.create(player.x*size, player.y*size, "tile:blank");
    position.tint = 0x00ff00;
    position.width = position.height = size;

    console.log(this.backgroundContainer.width);
    console.log(this.mapContainer.width);
    this.mapContainer.x = (this.backgroundContainer.width - this.mapContainer.width) / 2;
    this.mapContainer.y = (this.backgroundContainer.height - this.mapContainer.height) / 2;

    this.mapContainer.x -= size;
    this.mapContainer.y -= size;
};
