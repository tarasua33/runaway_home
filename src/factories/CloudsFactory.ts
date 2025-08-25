import { GAME_DIMENSIONS } from "../Game";
import { AbstractStandardFactory } from "../libs/factories/AbstractStandardFactory";
import { StandardContainer } from "../libs/gameObjects/StandardContainer";
import { CloudsContainer, CloudsContainerConfig } from "../view/env/Clouds";

interface IBuildConfig {
  parent: StandardContainer;
}

export class CloudsFactory extends AbstractStandardFactory<CloudsContainer> {
  public buildUi({ parent }: IBuildConfig): CloudsContainer {
    const assetsLoader = this._assetsLoader;
    const config: CloudsContainerConfig = {
      topCloudConf: {
        texture: assetsLoader.getTexture("bg/bottom_cloud"),
        anchor: { x: 0.5, y: 1 },
        x: GAME_DIMENSIONS.width / 2,
        y: -GAME_DIMENSIONS.height / 2,
        scale: { x: 1, y: -1 },
        width: GAME_DIMENSIONS.width + GAME_DIMENSIONS.halfWidth,
        // height: GAME_DIMENSIONS.width,
      },
      topTileConf: {
        texture: assetsLoader.getTexture("bg/bottom_cloud_tile"),
        anchor: { x: 0.5, y: 1 },
        x: GAME_DIMENSIONS.width / 2,
        y: -GAME_DIMENSIONS.height / 2,
        // scale: { x: 2, y: 2 },
        width: GAME_DIMENSIONS.width + GAME_DIMENSIONS.halfWidth,
        height: GAME_DIMENSIONS.height * 0.75,
      },
      bottomCloudConf: {
        texture: assetsLoader.getTexture("bg/bottom_cloud"),
        anchor: { x: 0.5, y: 1 },
        x: GAME_DIMENSIONS.width / 2,
        y: GAME_DIMENSIONS.height + GAME_DIMENSIONS.height / 2,
        // scale: { x: 2, y: 2 },
        width: GAME_DIMENSIONS.width + GAME_DIMENSIONS.halfWidth,
        // height: GAME_DIMENSIONS.width,
      },
      bottomTileConf: {
        texture: assetsLoader.getTexture("bg/bottom_cloud_tile"),
        anchor: { x: 0.5, y: 0 },
        x: GAME_DIMENSIONS.width / 2,
        y: GAME_DIMENSIONS.height + GAME_DIMENSIONS.height / 2,
        // scale: { x: 2, y: 2 },
        width: GAME_DIMENSIONS.width + GAME_DIMENSIONS.halfWidth,
        height: GAME_DIMENSIONS.height * 0.75,
      },
    };

    const skyBg = new CloudsContainer(config);
    skyBg.build();
    parent.addChild(skyBg);

    return skyBg;
  }
}
