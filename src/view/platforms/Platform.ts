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
import { PhysicEngine } from "../../libs/physic/PhysicEngine";
import { IPhysicBody } from "../../libs/physic/IPhysicBody";
import { ITicker } from "../../libs/utils/ITicker";
import { Furniture } from "./Furniture";
// import { Body } from "matter-js";

export interface PlatformConfig extends StandardContainerConfig {
  tileConfig: StandardTilingSpriteConfig;
  typeCnf: PlatformTypes;
  sizeCnf: BigPlatformSizes;
  physicEngine: PhysicEngine;
  platformID: string;
}

const OFFSET = 10;

export class Platform extends StandardContainer<PlatformConfig> {
  public platformID!: string;
  private _typePlt!: PlatformTypes;
  private _sizePlt!: BigPlatformSizes;
  private _body!: IPhysicBody;
  private _physicEngine!: PhysicEngine;
  private _isWinPlatform = false;
  private _furniture: Furniture | undefined;
  private _frontFr: Furniture | undefined;

  public build(): void {
    const { tileConfig, typeCnf, sizeCnf, physicEngine, platformID } =
      this._config;
    this.platformID = platformID;
    this._typePlt = typeCnf;
    this._sizePlt = sizeCnf;
    this._physicEngine = physicEngine;

    const tile = new StandardTilingSprite(tileConfig);
    tile.build();

    const bgW = tile.width - OFFSET * 2;
    const bgH = tile.height - OFFSET * 2;
    const bg = new Graphics().rect(OFFSET, OFFSET, bgW, bgH).fill("#3A240F");
    bg.pivot.x = bgW / 2;
    bg.pivot.y = bgH / 2;
    this.addChild(bg);

    this.addChild(tile);

    this.cacheAsTexture(true);

    this._applyPhysic(physicEngine);
  }

  private _applyPhysic(physicEngine: PhysicEngine): void {
    const body = (this._body = physicEngine.createRectangleBody({
      x: this.x,
      y: this.y,
      w: this.width,
      h: this.height,
    }));
    body.isStatic = true;
    physicEngine.addBody(body);
    // const width = body.bounds.max.x - body.bounds.min.x;
    // const height = body.bounds.max.y - body.bounds.min.y;
  }

  public setFrontFurniture(fr: Furniture): void {
    this._frontFr = fr;
    fr.alpha = 1;
    fr.visible = true;
  }

  public getFrontFurniture(): Furniture | undefined {
    const fr = this._frontFr;

    if (fr) {
      fr.alpha = 0;
      fr.visible = false;
      fr.position = { x: -1000, y: 0 };
    }
    this._frontFr = undefined;

    return fr;
  }

  public setFurniture(fr: Furniture): void {
    this._furniture = fr;
    fr.alpha = 1;
    fr.visible = true;
    // fr.position = this.position;
  }

  public getFurniture(): Furniture | undefined {
    const fr = this._furniture;

    if (fr) {
      fr.alpha = 0;
      fr.visible = false;
      fr.position = { x: -1000, y: 0 };
    }
    this._furniture = undefined;

    return fr;
  }

  public setPosition(x: number, y: number): void {
    const body = this._body;

    this._physicEngine.setPosition(body, x, y);

    this.x = body.position.x;
    this.y = body.position.y;
  }

  public get isWinPlatform(): boolean {
    return this._isWinPlatform;
  }

  public set isWinPlatform(val: boolean) {
    this._isWinPlatform = val;
  }

  public get sizePlt(): BigPlatformSizes {
    return this._sizePlt;
  }

  public get typePlt(): PlatformTypes {
    return this._typePlt;
  }

  public update(ticker: ITicker): void {
    super.update(ticker);

    this.x = this._body.position.x;
    this.y = this._body.position.y;

    if (this._furniture) {
      this._furniture.x = this.x;
      this._furniture.y = this.y;
    }

    if (this._frontFr) {
      this._frontFr.x = this.x;
      this._frontFr.y = this.y;
    }
  }
}
