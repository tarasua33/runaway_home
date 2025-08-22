import { GAME_DIMENSIONS } from "../../Game";
import { StandardContainer } from "../../libs/gameObjects/StandardContainer";
import { getPositionY } from "../../libs/utils/GameHelper";
import { Signal } from "../../libs/utils/Signal";
import { Platform } from "./Platform";

export class PlatformMoveContainer extends StandardContainer {
  public readonly removePlatformSignal = new Signal();
  public readonly getNewPlatformSignal = new Signal();

  private _platforms!: Platform[];
  private _speed = 2;
  private _isPlay = false;

  public setSpeed(speed: number): void {
    this._speed = speed;
  }

  public setPlatforms(platforms: Platform[]): void {
    for (const plt of platforms) {
      this.addChild(plt);
    }

    this._platforms = platforms;
  }

  public addPlatform(newPlt: Platform, offset: number): void {
    const platforms = this._platforms;
    const previousPlt = platforms[platforms.length - 1];
    newPlt.x = previousPlt.x + previousPlt.width + offset;

    newPlt.y = getPositionY(previousPlt, offset, newPlt.height);

    platforms.push(newPlt);
    this.addChild(newPlt);
  }

  public play(): void {
    this._isPlay = true;
  }

  public stop(): void {
    this._isPlay = true;
  }

  public update(dt: number): void {
    super.update(dt);

    if (this._isPlay) {
      for (const plt of this._platforms) {
        plt.x -= this._speed;
      }
    }

    if (
      this._platforms[0].x <
      -(GAME_DIMENSIONS.halfWidth + this._platforms[0].width)
    ) {
      const plt = this._platforms.shift()!;

      this.removeChild(plt);
      this.removePlatformSignal.dispatch(plt);
    }

    // eslint-disable-next-line prettier/prettier
    if ((this._platforms[this._platforms.length - 1].x + this._platforms[this._platforms.length - 1].width) < (GAME_DIMENSIONS.width + GAME_DIMENSIONS.halfWidth)) {
      this.getNewPlatformSignal.dispatch();
    }
  }
}
