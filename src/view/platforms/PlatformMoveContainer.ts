import { StandardContainer } from "../../libs/gameObjects/StandardContainer";
import { Platform } from "./Platform";

export class PlatformMoveContainer extends StandardContainer {
  private _platforms!: Platform[];
  private _speed = 1;
  private _isPlay = false;

  public setSpeed(speed: number): void {
    this._speed = speed;
  }

  public setPlatforms(platforms: Platform[]): void {
    this._platforms = platforms;
  }

  public play(): void {
    this._isPlay = true;
  }

  public stop(): void {
    this._isPlay = true;
  }

  public update(dt: number): void {
    if (this._isPlay) {
      for (const plt of this._platforms) {
        plt.x += this._speed;
      }
    }

    super.update(dt);
  }
}
