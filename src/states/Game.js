import gameOptions from "../gameOptions"
import physicOptions from "../physicOptions"

import Background01 from "../backgrounds/Background01"

import LevelLoader from "../loaders/LevelLoader"

export default class extends Phaser.State
{
  create () {
    //map
    LevelLoader.loadlevel(this.game, this, "testMap");

    //framerate only on debug
    if(indexInfo.buildState == "Debug")
    {
      this.game.time.advancedTiming = true;
      this.txtFPS = this.add.bitmapText(15, 10,'gameFont', '0', 18);
      this.txtFPS.fixedToCamera = true;
      this.txtFPS.visible = true;
      this.txtFPS.anchor.set(0);
    }

  }

  update (){
    //framerate
    if(indexInfo.buildState == "Debug")
    {
		  this.txtFPS.text = gameOptions.main.version + " FPS: " + this.game.time.fps;
    }
  }

  render(){

    // this.player.fishGroup.forEachAlive(this.renderGroup, this);
    // this.collectibleGroup.forEachAlive(this.renderGroup, this);
    // this.ball.forEachAlive(this.renderGroup, this);
  }

  renderGroup(member){
    // this.Group.forEachAlive(this.renderGroup, this);
      this.game.debug.body(member);
  }

}
