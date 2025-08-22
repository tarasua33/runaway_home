import { Graphics } from "pixi.js";
import {
  StandardContainer,
  StandardContainerConfig,
} from "../../libs/gameObjects/StandardContainer";
import {
  StandardTilingSprite,
  StandardTilingSpriteConfig,
} from "../../libs/gameObjects/StandardTillingSprite";
import { BigPlatformSizes, PlatformTypes } from "../../models/PlatformsModel";

export interface PlatformConfig extends StandardContainerConfig {
  tileConfig: StandardTilingSpriteConfig;
  typeCnf: PlatformTypes;
  sizeCnf: BigPlatformSizes;
}

export type IPlatformsSizes = Map<BigPlatformSizes, Platform[]>;

export type IPlatforms = Map<PlatformTypes, IPlatformsSizes>;

const OFFSET = 10;

export class Platform extends StandardContainer<PlatformConfig> {
  private _typePlt!: PlatformTypes;
  private _sizePlt!: BigPlatformSizes;

  public build(): void {
    const { tileConfig, typeCnf, sizeCnf } = this._config;
    this._typePlt = typeCnf;
    this._sizePlt = sizeCnf;

    const tile = new StandardTilingSprite(tileConfig);
    tile.build();

    const bg = new Graphics()
      .rect(OFFSET, OFFSET, tile.width - OFFSET * 2, tile.height - OFFSET * 2)
      .fill("#3A240F");
    this.addChild(bg);

    this.addChild(tile);

    this.cacheAsTexture(true);

    console.log(this.width, this.height);
  }

  public get sizePlt(): BigPlatformSizes {
    return this._sizePlt;
  }

  public get typePlt(): PlatformTypes {
    return this._typePlt;
  }
}
