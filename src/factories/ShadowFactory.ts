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

export class ShadowFactory extends AbstractStandardFactory<EnvMoveContainer> {
  public buildUi({ parent }: IBuildConfig): EnvMoveContainer {
    const assetsLoader = this._assetsLoader;

    const scaleY = 4;
    const scaleX = 4;
    const repeatAssets = 8;
    const shadowAssetsNames = [
      "bg/branch_5",
      "bg/branch_4",
      "bg/branch_3",
      "bg/branch_2",
      "bg/branch_1",
      "bg/branch_5",
      "bg/branch_6",
    ];

    const spritesConf = [];
    for (let i = 0; i < shadowAssetsNames.length * repeatAssets; i++) {
      const name = shadowAssetsNames[i % shadowAssetsNames.length];
      const spriteConfig = {
        texture: assetsLoader.getTexture(name),
        scale: {
          x:
            scaleX * i < (shadowAssetsNames.length * repeatAssets) / 2 ? 1 : -1,
          y: scaleY,
        },
        anchor: { x: 0, y: 1 },
        alpha: 0.45,
        rotation: -Math.PI / 18 + (Math.PI / 10) * Math.random(),
      };

      spritesConf.push(spriteConfig);
    }

    const config: EnvMoveContainerConfig = {
      childrenConf: spritesConf,
      xOffset: 50,
      randomizeOffset: true,
      speed: 1,
      y: GAME_DIMENSIONS.height + GAME_DIMENSIONS.height / 2,
    };

    const skyBg = new EnvMoveContainer(config);
    skyBg.build();
    parent.addChild(skyBg);

    return skyBg;
  }
}
