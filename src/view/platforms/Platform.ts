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

    // console.log(this.width, this.height);

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

    const width = body.bounds.max.x - body.bounds.min.x;
    const height = body.bounds.max.y - body.bounds.min.y;
    console.log(width, height);
  }

  public setPosition(x: number, y: number): void {
    const body = this._body;

    this._physicEngine.setPosition(body, x, y);

    this.x = body.position.x;
    this.y = body.position.y;

    // console.log("SET!!!!!!!!", this.x, this.y);
  }

  public get sizePlt(): BigPlatformSizes {
    return this._sizePlt;
  }

  public get typePlt(): PlatformTypes {
    return this._typePlt;
  }

  public update(dt: number): void {
    super.update(dt);

    this.x = this._body.position.x;
    this.y = this._body.position.y;
  }
}
