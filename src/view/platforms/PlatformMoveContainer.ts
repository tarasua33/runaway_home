import { GAME_DIMENSIONS } from "../../Game";
import {
  StandardContainer,
  StandardContainerConfig,
} from "../../libs/gameObjects/StandardContainer";
import { getPositionY } from "../../libs/utils/GameHelper";
import { Signal } from "../../libs/utils/Signal";
import { Platform } from "./Platform";

interface PlatformMoveContainerConfig extends StandardContainerConfig {
  characterX: number;
}

export class PlatformMoveContainer extends StandardContainer<PlatformMoveContainerConfig> {
  public readonly winSignal = new Signal();
  public readonly awaitFinalSignal = new Signal();
  public readonly removePlatformSignal = new Signal();
  public readonly getNewPlatformSignal = new Signal();

  private _platforms: Platform[] = [];
  private _speed = 3;
  private _finalDistance = 0;
  private _distance = 0;
  private _isPlay = false;

  public setSpeed(speed: number): void {
    this._speed = speed;
  }

  public setLvlFinalDistance(distance: number): void {
    this._distance = 0;
    this._finalDistance = distance;
  }

  public setPlatforms(platforms: Platform[]): void {
    for (const plt of platforms) {
      plt.visible = true;
      this.addChild(plt);
    }

    this._platforms = platforms;
  }

  public addPlatform(newPlt: Platform, offset: number): void {
    const platforms = this._platforms;
    const previousPlt = platforms[platforms.length - 1];

    const x = previousPlt.x + previousPlt.width / 2 + newPlt.width / 2 + offset;
    const y = getPositionY(previousPlt, offset, newPlt.height);

    newPlt.visible = true;
    newPlt.setPosition(x, y);

    platforms.push(newPlt);
    this.addChild(newPlt);
  }

  public play(): void {
    this._isPlay = true;
  }

  public stop(): void {
    this._isPlay = false;
  }

  public returnPlatforms(): void {
    const platforms = this._platforms;
    while (platforms.length > 0) {
      const plt = this._platforms.shift()!;
      plt.visible = false;
      this.removeChild(plt);
      this.removePlatformSignal.dispatch(plt);
    }
  }

  public update(dt: number): void {
    let isWIn = false;
    if (this._isPlay) {
      for (const plt of this._platforms) {
        plt.setPosition(plt.x - this._speed, plt.y);

        if (plt.isWinPlatform && plt.x <= this._config.characterX) {
          isWIn = true;
        }
      }
    }

    super.update(dt);

    if (this._platforms.length === 0) {
      return;
    }

    if (
      this._platforms[0].x <
      -(GAME_DIMENSIONS.halfWidth + this._platforms[0].width)
    ) {
      const plt = this._platforms.shift()!;
      plt.visible = false;
      this.removeChild(plt);
      this.removePlatformSignal.dispatch(plt);
    }

    // eslint-disable-next-line prettier/prettier
    if ((this._platforms[this._platforms.length - 1].x + this._platforms[this._platforms.length - 1].width / 2) <
      // eslint-disable-next-line prettier/prettier
      (GAME_DIMENSIONS.width + GAME_DIMENSIONS.halfWidth)) {
      this.getNewPlatformSignal.dispatch();
    }

    this._distance += this._speed;
    if (this._distance > this._finalDistance) {
      // to fix the problem of unsubscribing the signal in the same frame
      this._distance = -GAME_DIMENSIONS.width * 10;

      this.awaitFinalSignal.dispatch();
    }

    if (isWIn) {
      this.winSignal.dispatch();
    }
  }
}
