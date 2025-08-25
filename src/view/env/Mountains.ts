// import { GAME_DIMENSIONS } from "../../Game";
import { GAME_DIMENSIONS } from "../../Game";
import {
  StandardContainer,
  StandardContainerConfig,
} from "../../libs/gameObjects/StandardContainer";
import {
  StandardSprite,
  StandardSpriteConfig,
} from "../../libs/gameObjects/StandardSprite";

export interface MountainsConfig extends StandardContainerConfig {
  mountConf: StandardSpriteConfig;
}

const OFFSET_X = 20;

export class Mountains extends StandardContainer<MountainsConfig> {
  public build(): void {
    const { mountConf } = this._config;

    let position = -GAME_DIMENSIONS.width - 2;

    while (position < GAME_DIMENSIONS.width + GAME_DIMENSIONS.halfWidth) {
      const mount = new StandardSprite(mountConf);
      mount.x = position;
      position = position + mount.width - OFFSET_X;
      mount.build();
      this.addChild(mount);
    }
  }
}
