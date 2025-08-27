import { Texture } from "pixi.js";
import { AbstractStandardFactory } from "../libs/factories/AbstractStandardFactory";
import { StandardContainer } from "../libs/gameObjects/StandardContainer";
import { Furniture, FurnitureConfig } from "../view/platforms/Furniture";
import { FRONT_ELEMENTS } from "./FurnitureData";
import { BigPlatformSizes } from "../models/PlatformsModel";
import { StandardSpriteConfig } from "../libs/gameObjects/StandardSprite";

interface IBuildConfig {
  parent: StandardContainer;
}

const EXTRA_FURNITURE = 2;

export type IFurniture = Map<BigPlatformSizes, Furniture[]>;

export class FurnitureFrontFactory extends AbstractStandardFactory<IFurniture> {
  public buildUi({ parent }: IBuildConfig): IFurniture {
    const { platformStartSettings: platformSettings, sizePlatformTile } =
      this._models.platformsModel;

    const furniture: IFurniture = new Map();
    const wrapperY = -sizePlatformTile / 2 + 3;
    const spriteAnchor = { x: 0.5, y: 1 };
    const spriteScale = { x: 0.5, y: 0.5 };

    for (const pltSet of platformSettings) {
      if (
        pltSet.size !== BigPlatformSizes.ONE &&
        pltSet.size !== BigPlatformSizes.WIN
      ) {
        const maxWidth = sizePlatformTile * pltSet.size - sizePlatformTile;
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
            x: -1000,
            offsetX: sizePlatformTile,
          });
        }

        const sizeFurniture = [];
        for (const config of currentPlatformFurnitures) {
          const frn = new Furniture(config);
          frn.build();
          parent.addChild(frn);
          frn.visible = false;
          sizeFurniture.push(frn);
        }

        furniture.set(pltSet.size, sizeFurniture);
      }
    }

    // WIN FRN
    const spriteConfigs: StandardSpriteConfig[] = [];
    spriteConfigs.push({
      texture: this._assetsLoader.getTexture("frontEnv/sunflowers"),
      anchor: { x: 1, y: 1 },
      scale: spriteScale,
    });
    const furnitureConf = {
      wrapperConf: {
        y: wrapperY,
      },
      sprites: spriteConfigs,
      sizePlatformTile,
      offsetX: sizePlatformTile,
      size: BigPlatformSizes.WIN,
      x: -1000,
    };
    const frn = new Furniture(furnitureConf);
    frn.visible = false;
    frn.build();
    parent.addChild(frn);

    furniture.set(BigPlatformSizes.WIN, [frn]);

    return furniture;
  }

  private _getTextures(maxWidth: number, offset: number): Texture[] {
    const assetsLoader = this._assetsLoader;
    const textures = [];

    let width = offset;

    while (width < maxWidth) {
      const randomIndex = Math.floor(Math.random() * FRONT_ELEMENTS.length);
      const nextTexture = assetsLoader.getTexture(FRONT_ELEMENTS[randomIndex]);
      width += nextTexture.width + offset;

      textures.push(nextTexture);
    }

    return textures;
  }
}
