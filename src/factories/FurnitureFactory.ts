import { Texture } from "pixi.js";
import { AbstractStandardFactory } from "../libs/factories/AbstractStandardFactory";
import { StandardContainer } from "../libs/gameObjects/StandardContainer";
import { Furniture, FurnitureConfig } from "../view/platforms/Furniture";
import { ALL_TEXTURES } from "./FurnitureData";
import { BigPlatformSizes } from "../models/PlatformsModel";
import { StandardSpriteConfig } from "../libs/gameObjects/StandardSprite";

interface IBuildConfig {
  parent: StandardContainer;
}

const EXTRA_FURNITURE = 2;

export type IFurniture = Map<BigPlatformSizes, Furniture[]>;

export class FurnitureFactory extends AbstractStandardFactory<IFurniture> {
  public buildUi({ parent }: IBuildConfig): IFurniture {
    const { platformStartSettings: platformSettings, sizePlatformTile } =
      this._models.platformsModel;

    const furniture: IFurniture = new Map();

    for (const pltSet of platformSettings) {
      if (
        pltSet.size !== BigPlatformSizes.ONE &&
        pltSet.size !== BigPlatformSizes.WIN
      ) {
        const maxWidth = sizePlatformTile * pltSet.size;

        const currentPlatformFurnitures: FurnitureConfig[] = [];

        for (let index = 0; index < pltSet.number + EXTRA_FURNITURE; index++) {
          const textures = this._getTextures(maxWidth, sizePlatformTile);
          const spriteConfigs: StandardSpriteConfig[] = [];
          for (const texture of textures) {
            spriteConfigs.push({
              texture,
              anchor: { x: 0.5, y: 1 },
            });
          }

          currentPlatformFurnitures.push({
            wrapperConf: {
              y: -sizePlatformTile / 2,
            },
            sprites: spriteConfigs,
            sizePlatformTile,
            size: pltSet.size,
          });
        }

        const sizeFurniture = [];
        for (const config of currentPlatformFurnitures) {
          const furniture = new Furniture(config);
          furniture.build();
          parent.addChild(furniture);

          sizeFurniture.push(furniture);
        }

        furniture.set(pltSet.size, sizeFurniture);
      }
    }

    return furniture;
  }

  private _getTextures(maxWidth: number, sizePlatformTile: number): Texture[] {
    const assetsLoader = this._assetsLoader;
    const textures = [];

    let width = sizePlatformTile / 2;

    while (width < maxWidth) {
      const randomIndex = Math.floor(Math.random() * ALL_TEXTURES.length);
      console.warn("Name- ", ALL_TEXTURES[randomIndex]);
      const nextTexture = assetsLoader.getTexture(ALL_TEXTURES[randomIndex]);
      width += nextTexture.width + sizePlatformTile / 2;

      textures.push(nextTexture);
    }

    return textures;
  }
}
