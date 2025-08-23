import { GAME_DIMENSIONS } from "../../Game";
import {
  BaseStep,
  BaseStepParams,
} from "../../libs/controllers/steps/BaseStep";
import { getPositionY, IPlatformData } from "../../libs/utils/GameHelper";
import { BigPlatformSizes, PlatformTypes } from "../../models/PlatformsModel";
import { IPlatforms, Platform } from "../../view/platforms/Platform";
import { PlatformMoveContainer } from "../../view/platforms/PlatformMoveContainer";

export interface SetStartPositionsPlatformsStepParams extends BaseStepParams {
  platforms: IPlatforms;
  platformContainer: PlatformMoveContainer;
}

const MAX_SIDE_PLATFORMS = 10;

export class SetStartPositionsPlatformsStep<
  // eslint-disable-next-line prettier/prettier
  T extends SetStartPositionsPlatformsStepParams = SetStartPositionsPlatformsStepParams,
> extends BaseStep<SetStartPositionsPlatformsStepParams> {
  public start({ platforms, platformContainer }: T): void {
    const { sizePlatformTile } = this._models.platformsModel;
    const platformsToAdd: Platform[] = [];

    let previousPlt;

    const startPlt = this._getBasePlatform(platforms, sizePlatformTile);
    // platformsToAdd.push(startPlt);

    const platformBigData: IPlatformData[] = this._getPlatformData(
      platforms,
      PlatformTypes.big,
    );

    previousPlt = startPlt;

    this._createLeftPlatforms(
      platforms,
      previousPlt,
      platformsToAdd,
      platformBigData,
      sizePlatformTile,
    );

    platformsToAdd.push(startPlt);
    previousPlt = startPlt;

    this._createRightPlatforms(
      platforms,
      previousPlt,
      platformsToAdd,
      platformBigData,
      sizePlatformTile,
    );

    platformContainer.setPlatforms(platformsToAdd);

    this._onComplete();
  }

  private _createRightPlatforms(
    platforms: IPlatforms,
    previousPlt: Platform,
    platformsToAdd: Platform[],
    platformBigData: IPlatformData[],
    sizeBetween: number,
  ): void {
    for (let i = 0; i < MAX_SIDE_PLATFORMS; i++) {
      const data =
        platformBigData[Math.floor(Math.random() * platformBigData.length)];

      const arr = platforms.get(PlatformTypes.big)!.get(data.size)!;
      const newPlt = arr.pop()!;
      data.number = arr.length;

      if (arr.length === 0) {
        const dataIdx = platformBigData.indexOf(data);
        platformBigData.splice(dataIdx, 1);
      }

      const x =
        previousPlt.x + newPlt.width / 2 + previousPlt.width / 2 + sizeBetween;
      const y = getPositionY(previousPlt, sizeBetween, newPlt.height);
      newPlt.setPosition(x, y);

      platformsToAdd.push(newPlt);
      previousPlt = newPlt;

      // eslint-disable-next-line prettier/prettier
      if (newPlt.x + (newPlt.width / 2) > GAME_DIMENSIONS.width + GAME_DIMENSIONS.width / 2) {
        break;
      }
    }
  }

  private _createLeftPlatforms(
    platforms: IPlatforms,
    previousPlt: Platform,
    platformsToAdd: Platform[],
    platformBigData: IPlatformData[],
    sizeBetween: number,
  ): void {
    const leftPlatforms = [];

    for (let i = 0; i < MAX_SIDE_PLATFORMS; i++) {
      const data =
        platformBigData[Math.floor(Math.random() * platformBigData.length)];

      const arr = platforms.get(PlatformTypes.big)!.get(data.size)!;
      const newPlt = arr.pop()!;
      data.number = arr.length;

      if (arr.length === 0) {
        const dataIdx = platformBigData.indexOf(data);
        platformBigData.splice(dataIdx, 1);
      }

      const x =
        previousPlt.x - previousPlt.width / 2 - newPlt.width / 2 - sizeBetween;
      const y = getPositionY(previousPlt, sizeBetween, newPlt.height);
      newPlt.setPosition(x, y);

      leftPlatforms.push(newPlt);
      previousPlt = newPlt;

      // eslint-disable-next-line prettier/prettier
      if (newPlt.x < - GAME_DIMENSIONS.width / 2) {
        break;
      }
    }

    const reversed = leftPlatforms.reverse();
    for (const plt of reversed) {
      platformsToAdd.push(plt);
    }
  }

  private _getBasePlatform(
    platforms: IPlatforms,
    sizePlatformTile: number,
  ): Platform {
    const plt = platforms
      .get(PlatformTypes.big)!
      .get(BigPlatformSizes.TEN)!
      .pop()!;

    plt.setPosition(
      100,
      Math.round(GAME_DIMENSIONS.height * (3 / 4) + sizePlatformTile / 2),
    );

    return plt;
  }

  private _getPlatformData(
    platforms: IPlatforms,
    type: PlatformTypes,
  ): IPlatformData[] {
    const data = [];
    for (const [key, value] of platforms.get(type)!.entries()) {
      data.push({
        size: key,
        number: value.length,
      });
    }

    return data;
  }
}
