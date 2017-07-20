import physicOptions from "../physicOptions"
import gameOptions from "../gameOptions"

export default class extends Phaser.Group
{
  constructor (game)
  {
    super(game);

    this.backgroundLyr01 = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, "level", "cielo01");
    this.backgroundLyr01.postUpdate = function(){
      //fixed to camera
      this.x = (this.game.camera.view.x + this.cameraOffset.x) / this.game.camera.scale.x;
      this.y = (this.game.camera.view.y + this.cameraOffset.y) / this.game.camera.scale.y;
      //camera scroll
      this.tilePosition.set(-this.game.camera.view.x * .6, -this.game.camera.view.y * .6);
    };
  }

  update()
  {
    if(gameOptions.main.gamePaused)
    {
      return;
    }

    // this.backgroundLyr01.tilePosition.x += physicOptions.scene.scrollX * .75;
  }
}
