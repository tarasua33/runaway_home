import { GAME_DIMENSIONS } from "../Game";
import { AbstractStandardFactory } from "../libs/factories/AbstractStandardFactory";
import { StandardContainer } from "../libs/gameObjects/StandardContainer";
import { StandardSprite } from "../libs/gameObjects/StandardSprite";

interface IBuildConfig {
  parent: StandardContainer;
}

export class BgSkyFactory extends AbstractStandardFactory<StandardSprite> {
  public buildUi({ parent }: IBuildConfig): StandardSprite {
    // const skyBg = new StandardSprite({
    //   texture: this._assetsLoader.getTexture("bg/star-space-tile"),
    //   anchor: { x: 0.5, y: 1 },
    //   x: GAME_DIMENSIONS.halfWidth,
    //   y: GAME_DIMENSIONS.height / 2,
    //   width: GAME_DIMENSIONS.width + GAME_DIMENSIONS.halfWidth,
    //   height: GAME_DIMENSIONS.width,
    // });
    const skyBg = new StandardSprite({
      texture: this._assetsLoader.getTexture("bg/bg_moon"),
      anchor: { x: 1, y: 0 },
      x: GAME_DIMENSIONS.width,
      y: -100,
      scale: { x: 2, y: 2 },
      // width: GAME_DIMENSIONS.width + GAME_DIMENSIONS.halfWidth,
      // height: GAME_DIMENSIONS.width,
    });
    skyBg.build();
    parent.addChild(skyBg);

    return skyBg;
  }
}
