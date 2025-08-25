import { GAME_DIMENSIONS } from "../Game";
import { AbstractStandardFactory } from "../libs/factories/AbstractStandardFactory";
import { StandardContainer } from "../libs/gameObjects/StandardContainer";
import { Mountains, MountainsConfig } from "../view/env/Mountains";

interface IBuildConfig {
  parent: StandardContainer;
}

export class MountainsFactory extends AbstractStandardFactory<Mountains> {
  public buildUi({ parent }: IBuildConfig): Mountains {
    const assetsLoader = this._assetsLoader;
    const config: MountainsConfig = {
      y: GAME_DIMENSIONS.height + GAME_DIMENSIONS.height / 2,
      mountConf: {
        texture: assetsLoader.getTexture("bg/moutains"),
        scale: { x: 3, y: 3 },
        anchor: { x: 0, y: 1 },
      },
    };

    const skyBg = new Mountains(config);
    skyBg.build();
    parent.addChild(skyBg);

    return skyBg;
  }
}
