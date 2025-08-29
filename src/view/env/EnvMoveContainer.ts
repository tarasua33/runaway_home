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
import { ITicker } from "../../libs/utils/ITicker";
import { Queue } from "../../libs/utils/Queue";

export interface EnvMoveContainerConfig extends StandardContainerConfig {
  childrenConf: StandardSpriteConfig[];
  xOffset: number;
  randomizeOffset: boolean;
  speed: number;
}

export class EnvMoveContainer extends StandardContainer<EnvMoveContainerConfig> {
  private _parts = new Queue<StandardSprite>();
  private _speed!: number;
  private _isPlay = false;

  public build(): void {
    const { childrenConf, xOffset, randomizeOffset, speed } = this._config;
    this._speed = speed;
    let currentX = -GAME_DIMENSIONS.halfWidth + 1;

    for (let i = 0; i < childrenConf.length; i++) {
      const conf = childrenConf[i];

      const part = new StandardSprite(conf);
      part.x = currentX;
      const offset = randomizeOffset
        ? xOffset * 0.25 * Math.random() + xOffset * 0.75
        : xOffset;
      currentX = currentX + part.width + offset;
      part.build();
      this.addChild(part);
    }
  }

  public setSpeed(speed: number): void {
    this._speed = speed;
  }

  public play(): void {
    this._isPlay = true;
  }

  public stop(): void {
    this._isPlay = false;
  }

  public update(ticker: ITicker): void {
    if (this._isPlay) {
      for (const part of this.children) {
        part.x -= this._speed;
      }

      if (
        this.children[0].x <
        -GAME_DIMENSIONS.halfWidth - this.children[0].width
      ) {
        const part = this.children[0] as StandardSprite;
        this.removeChild(part);
        this._parts.enqueue(part);
      }

      if (
        // eslint-disable-next-line prettier/prettier
        this.children[this.children.length - 1]!.x + this.children[this.children.length - 1]!.width <
        GAME_DIMENSIONS.width + GAME_DIMENSIONS.halfWidth
      ) {
        const { xOffset, randomizeOffset } = this._config;
        const offset = randomizeOffset
          ? (xOffset / 2) * Math.random() + xOffset / 2
          : xOffset;
        const part = this._parts.dequeue();
        part.x =
          this.children[this.children.length - 1]!.x +
          this.children[this.children.length - 1]!.width +
          offset;
        this.addChild(part);
      }
    }

    super.update(ticker);
  }
}
