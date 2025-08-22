import { Texture } from "pixi.js";
import { AbstractStandardFactory } from "../libs/factories/AbstractStandardFactory";
import { BigPlatformSizes, PlatformTypes } from "../models/PlatformsModel";
import {
  IPlatforms,
  Platform,
  PlatformConfig,
} from "../view/platforms/Platform";
import { PhysicEngine } from "../libs/utils/PhysicEngine";

interface IBuildConfig {
  physicEngine: PhysicEngine;
}

export class PlatformsFactory extends AbstractStandardFactory<IPlatforms> {
  public buildUi({ physicEngine }: IBuildConfig): IPlatforms {
    const assetsLoader = this._assetsLoader;
    const platformSettings = this._models.platformsModel.platformSettings;

    const bigTile = assetsLoader.getTexture("tille_big");
    const tileSmall = assetsLoader.getTexture("tile");

    const bigTileConf = {
      w: bigTile.width,
      h: bigTile.width,
      texture: bigTile,
    };
    const smallTileConf = {
      w: tileSmall.width,
      h: tileSmall.height,
      texture: tileSmall,
    };

    // eslint-disable-next-line prettier/prettier
    const tilesParams: Record<PlatformTypes, { texture: Texture, w: number, h: number }> = {
      [PlatformTypes.big]: bigTileConf,
      [PlatformTypes.small]: smallTileConf,
    };

    const platforms: IPlatforms = new Map();
    // const typeMap: IPlatformsSizes = ;
    platforms.set(
      PlatformTypes.big,
      new Map([
        [BigPlatformSizes.ONE, []],
        [BigPlatformSizes.TWO, []],
        [BigPlatformSizes.FOUR, []],
        [BigPlatformSizes.SIX, []],
        [BigPlatformSizes.EIGHT, []],
        [BigPlatformSizes.TEN, []],
      ]),
    );
    platforms.set(
      PlatformTypes.small,
      new Map([
        [BigPlatformSizes.ONE, []],
        [BigPlatformSizes.TWO, []],
        [BigPlatformSizes.FOUR, []],
        [BigPlatformSizes.SIX, []],
        [BigPlatformSizes.EIGHT, []],
        [BigPlatformSizes.TEN, []],
      ]),
    );

    const randomX = -1000;
    const randomY = -500;
    for (let i = 0; i < platformSettings.length; i++) {
      const setting = platformSettings[i];

      for (let j = 0; j < setting.number; j++) {
        const tileSize = setting.size;
        const tileParam = tilesParams[setting.type];

        const conf: PlatformConfig = {
          tileConfig: {
            anchor: { x: 0.5, y: 0.5 },
            texture: tileParam.texture,
            width: tileParam.w * tileSize,
            height: tileParam.h,
          },
          sizeCnf: setting.size,
          typeCnf: setting.type,
          physicEngine,
          x: randomX,
          y: randomY,
        };

        const plt = new Platform(conf);
        plt.build();
        // parent.addChild(plt);

        platforms.get(setting.type)!.get(setting.size)!.push(plt);
      }
    }

    return platforms;
  }
}
