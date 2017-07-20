import gameOptions from "../gameOptions"

import Background01 from "../backgrounds/Background01"

export default
{
  loadlevel (game, state, level) {

    //map
    var map = game.add.tilemap(level);

    game.world.resize(map.width*gameOptions.level.tileSize, map.height*gameOptions.level.tileSize);

    //background so it looks nicer
    var backgrounds = new Background01(game);

    //if the stage layer exists on the tiled map.
    if(map.objects.stage)
    {
      //graphics that will be used for texture mask
      var textureMask = game.add.graphics();
      //texture that will be masked. It covers all the game world.
      var tileTexture = game.add.tileSprite(0,0, game.world.width, game.world.height, "grassImg");

      //graphics that will be used to draw different borders
      var drawingBorder = game.add.graphics();

      //cycles the objects on scene
      const objects = map.objects.stage;
      objects.forEach(object => {

        //only for polylines now.
        if(object.polyline)
        {
          //adds the position of the object to the polygon points.
          var path = object.polyline;
          var points = [];
          for(var i=0; i<path.length; i++)
          {
            points.push(new Phaser.Point(object.x + path[i][0], object.y+ path[i][1]));
          }

          //draws a polygon mask
          textureMask.beginFill(0x00ff00);
          textureMask.drawPolygon(points);
          textureMask.endFill();

          //border lines
          var lineColor = 0xffffff;
          var lineWidth = 5;
          var lineAlpha = 1;
          //angle between points
          var pointAngle = 0;
          //minimum angle to know if the line is a floor or wall.
          var minAngleFloor = 60;
          drawingBorder.moveTo(points[0].x, points[0].y);
          var prevPoint = points[0];
          for(var j = 1; j < points.length; j++)
          {
            //gets the angle between points to know if it is floor or wall.
            pointAngle = Phaser.Math.radToDeg(prevPoint.angle(points[j]));
            //floor
            if(Math.abs(pointAngle) < minAngleFloor)
            {
              lineColor = 0xe4ea4a;
            }
            //ceiling / right wall
            else if(pointAngle < 0)
            {
              lineColor = 0x000000;
            }
            //ceiling / left wall
            else
            {
              lineColor = 0x0000ff;
            }

            drawingBorder.moveTo(points[j-1].x, points[j-1].y);
            drawingBorder.lineStyle(lineWidth, lineColor, lineAlpha);
            drawingBorder.lineTo(points[j].x, points[j].y);

            drawingBorder.moveTo(points[j].x, points[j].y);
            prevPoint = points[j];
          }

          //polylines are not closed from tiled so it draws an extra line to close it
          pointAngle = Phaser.Math.radToDeg(prevPoint.angle(points[0]));
          if(Math.abs(pointAngle) < minAngleFloor)
          {
            lineColor = 0xe4ea4a;
          }
          else
          {
            lineColor = 0x000000;
          }

          drawingBorder.moveTo(points[points.length-1].x, points[points.length-1].y);
          drawingBorder.lineStyle(lineWidth, lineColor, lineAlpha);
          drawingBorder.lineTo(points[0].x, points[0].y);

        }
      });

      //aplies the mask to the tiled texture.
      tileTexture.mask = textureMask;
    }
  },
}
