import { Sprite, SpriteOptions } from "pixi.js";
import { IGameObject } from "./IGameObject";
import { ITicker } from "../utils/ITicker";

export interface StandardSpriteConfig extends SpriteOptions {
  x?: number;
  y?: number;
  visible?: boolean;
}

// eslint-disable-next-line prettier/prettier
export class StandardSprite<T extends StandardSpriteConfig = StandardSpriteConfig,>
  extends Sprite
  // eslint-disable-next-line prettier/prettier
  implements IGameObject {
  protected _config: T;

  constructor(config: T) {
    super(config);

    this._config = config;
  }

  public build(): void {
    // this._setBaseConfig(this);
  }

  public reset(): void {
    // this._setBaseConfig(this);

    for (const child of this.children as IGameObject[]) {
      if (child.reset) child.reset();
    }
  }

  public resize(): void {
    for (const child of this.children as IGameObject[]) {
      if (child.resize) child.resize();
    }
  }

  // /* eslint-disable */
  // private _setBaseConfig(ctx: any): void {
  //
  // }
  // /* eslint-enable */

  public update(ticker: ITicker): void {
    for (const child of this.children as IGameObject[]) {
      if (child.update) child.update(ticker);
    }
  }
}
