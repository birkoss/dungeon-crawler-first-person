var GAME = GAME || {};

GAME.Preload = function() {};

GAME.Preload.prototype = {
    preload: function() {
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'gui:preloader');
        this.preloadBar.anchor.set(0.5);
        this.load.setPreloadSprite(this.preloadBar);

        this.load.spritesheet('tile:floor', 'images/tiles/dungeon_floor.png', 160, 120);
        this.load.spritesheet('tile:ceiling', 'images/tiles/dungeon_ceiling.png', 160, 120);
        this.load.spritesheet('tile:wall', 'images/tiles/dungeon_wall.png', 160, 120);
        this.load.image('tile:blank', 'images/tiles/blank.png');
        this.load.image('tile:player', 'images/tiles/player.png');


        this.load.bitmapFont('font:guiOutline', 'fonts/guiOutline.png', 'fonts/guiOutline.xml');
        this.load.bitmapFont('font:gui', 'fonts/gui.png', 'fonts/gui.xml');

    },
    create: function() {
        this.state.start("Main");
    }
};
