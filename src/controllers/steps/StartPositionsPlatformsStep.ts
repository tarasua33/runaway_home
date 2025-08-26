import { IFurniture } from "../../factories/FurnitureFactory";
import { GAME_DIMENSIONS } from "../../Game";
import {
  BaseStep,
  BaseStepParams,
} from "../../libs/controllers/steps/BaseStep";
import {
  addFurniture,
  getPlatformData,
  getPositionY,
  IPlatformData,
} from "../../libs/utils/GameHelper";
import { IPlatforms, PlatformTypes } from "../../models/PlatformsModel";
import { Platform } from "../../view/platforms/Platform";
import { PlatformMoveContainer } from "../../view/platforms/PlatformMoveContainer";

export interface SetStartPositionsPlatformsStepParams extends BaseStepParams {
  furniture: IFurniture;
  furnitureFront: IFurniture;
  platforms: IPlatforms;
  platformContainer: PlatformMoveContainer;
}

const MAX_SIDE_PLATFORMS = 10;

export class SetStartPositionsPlatformsStep<
  // eslint-disable-next-line prettier/prettier
  T extends SetStartPositionsPlatformsStepParams = SetStartPositionsPlatformsStepParams,
> extends BaseStep<SetStartPositionsPlatformsStepParams> {
  public start({
    platforms,
    platformContainer,
    furniture,
    furnitureFront,
  }: T): void {
    const { sizePlatformTile, platformStartX, platformStartY } =
      this._models.platformsModel;
    const platformsToAdd: Platform[] = [];

    let previousPlt;

    const platformBigData: IPlatformData[] = getPlatformData(
      platforms,
      PlatformTypes.big,
    );

    const startPlt = this._getBasePlatform(
      platforms,
      platformBigData,
      platformStartX,
      platformStartY,
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

    addFurniture(platformsToAdd, furniture, false);
    addFurniture(platformsToAdd, furnitureFront, true);
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
    platformBigData: IPlatformData[],
    platformStartX: number,
    platformStartY: number,
  ): Platform {
    const data = platformBigData[platformBigData.length - 1];
    const arr = platforms.get(PlatformTypes.big)!.get(data.size)!;
    const plt = arr.pop()!;

    data.number = arr.length;
    if (arr.length === 0) {
      const dataIdx = platformBigData.indexOf(data);
      platformBigData.splice(dataIdx, 1);
    }

    plt.setPosition(platformStartX, platformStartY);

    return plt;
  }
}
