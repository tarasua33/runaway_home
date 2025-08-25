import {
  StandardContainer,
  StandardContainerConfig,
} from "../../libs/gameObjects/StandardContainer";
import {
  StandardSprite,
  StandardSpriteConfig,
} from "../../libs/gameObjects/StandardSprite";
import { BigPlatformSizes } from "../../models/PlatformsModel";

export interface FurnitureConfig extends StandardContainerConfig {
  sizePlatformTile: number;
  size: BigPlatformSizes;
  sprites: StandardSpriteConfig[];
  wrapperConf: StandardContainerConfig;
}

export class Furniture extends StandardContainer<FurnitureConfig> {
  public size!: BigPlatformSizes;
  public build(): void {
    const { sizePlatformTile, size, sprites, wrapperConf } = this._config;

    const wrapper = new StandardContainer(wrapperConf);
    wrapper.build();
    this.addChild(wrapper);

    this.size = size;
    let prevWidth = 0;
    for (let i = 0; i < sprites.length; i++) {
      const conf = sprites[i];
      const sprite = new StandardSprite(conf);

      if (prevWidth === 0) {
        sprite.x = sizePlatformTile / 2;
      } else {
        const offset =
          Math.round(sizePlatformTile * 0.3 * Math.random()) +
          sizePlatformTile * 0.1;
        sprite.x = prevWidth + offset + sprite.width / 2;
      }

      prevWidth = sprite.x + sprite.width / 2;
      sprite.scale.x = sprite.scale.x * Math.random() > 0.5 ? -1 : 1;
      wrapper.addChild(sprite);
    }

    wrapper.x = -prevWidth / 2;

    this.cacheAsTexture(true);
  }
}
