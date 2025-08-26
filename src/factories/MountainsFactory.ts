import { GAME_DIMENSIONS } from "../Game";
import { AbstractStandardFactory } from "../libs/factories/AbstractStandardFactory";
import { StandardContainer } from "../libs/gameObjects/StandardContainer";
import {
  EnvMoveContainer,
  EnvMoveContainerConfig,
} from "../view/env/EnvMoveContainer";

interface IBuildConfig {
  parent: StandardContainer;
}

export class MountainsFactory extends AbstractStandardFactory<EnvMoveContainer> {
  public buildUi({ parent }: IBuildConfig): EnvMoveContainer {
    const assetsLoader = this._assetsLoader;

    const spriteConfig = {
      texture: assetsLoader.getTexture("bg/moutains"),
      scale: { x: 3, y: 3 },
      anchor: { x: 0, y: 1 },
    };

    const config: EnvMoveContainerConfig = {
      childrenConf: [
        spriteConfig,
        spriteConfig,
        spriteConfig,
        spriteConfig,
        spriteConfig,
        spriteConfig,
      ],
      xOffset: -20,
      randomizeOffset: false,
      speed: 0.35,
      y: GAME_DIMENSIONS.height + GAME_DIMENSIONS.height / 2,
    };

    const skyBg = new EnvMoveContainer(config);
    skyBg.build();
    parent.addChild(skyBg);

    return skyBg;
  }
}
