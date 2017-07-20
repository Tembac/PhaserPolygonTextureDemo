import gameOptions from "../gameOptions"

export default class extends Phaser.State
{
  preload ()
  {
		this.background = this.add.image( this.game.world.centerX , this.game.world.centerY, 'preloaderBarBack');
		this.background.anchor.set(0.5);
		this.preloadBar = this.add.sprite( this.game.world.centerX -220, this.game.world.centerY + 195.5, 'preloaderBar');
		this.preloadBar.anchor.set(0, 1);

		this.load.setPreloadSprite(this.preloadBar);

    //empieza la carga
    this.load.bitmapFont('gameFont', 'assets/font/Font.png', 'assets/font/Font.xml');

    this.load.atlasJSONHash("level", "assets/textures/level.png", "assets/textures/level.json");

    this.load.image('grassImg', 'assets/images/grass.jpg');

    this.load.tilemap('testMap', 'assets/levels/testLevel.json', null, Phaser.Tilemap.TILED_JSON);
  }

  create ()
  {
    this.state.start('Game');
  }
}
