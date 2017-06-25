var GAME = GAME || {};

GAME.Preload = function() {};

GAME.Preload.prototype = {
    preload: function() {
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'gui:preloader');
        this.preloadBar.anchor.set(0.5);
        this.load.setPreloadSprite(this.preloadBar);

        this.load.spritesheet('tile:dungeon', 'images/tiles/dungeon.png', 24, 16);
        this.load.image('tile:blank', 'images/tiles/blank.png');
        this.load.image('tile:hover', 'images/tiles/hover.png');
        this.load.image('tile:ladder', 'images/tiles/ladder.png');
        this.load.image('tile:minimap', 'images/tiles/minimap.png');

        this.load.bitmapFont('font:guiOutline', 'fonts/guiOutline.png', 'fonts/guiOutline.xml');
        this.load.bitmapFont('font:gui', 'fonts/gui.png', 'fonts/gui.xml');

    },
    create: function() {
        this.state.start("Main");
    }
};
