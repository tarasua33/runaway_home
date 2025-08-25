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
    const wrapperY = -sizePlatformTile / 2;
    const spriteAnchor = { x: 0.5, y: 1 };
    const spriteScale = { x: 1.2, y: 1.2 };

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
              anchor: spriteAnchor,
              scale: spriteScale,
            });
          }

          currentPlatformFurnitures.push({
            wrapperConf: {
              y: wrapperY,
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

    // WIN FRN
    const spriteConfigs: StandardSpriteConfig[] = [];
    spriteConfigs.push({
      texture: this._assetsLoader.getTexture("finish"),
      anchor: spriteAnchor,
      scale: spriteScale,
    });
    const furnitureConf = {
      wrapperConf: {
        y: wrapperY,
      },
      sprites: spriteConfigs,
      sizePlatformTile,
      size: BigPlatformSizes.WIN,
    };
    const frt = new Furniture(furnitureConf);
    frt.build();
    parent.addChild(frt);

    furniture.set(BigPlatformSizes.WIN, [frt]);

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
