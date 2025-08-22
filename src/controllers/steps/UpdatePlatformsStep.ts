import { BaseStep, BaseStepParams } from "../../libs/controllers/BaseStep";
import { PlatformTypes } from "../../models/PlatformsModel";
import { IPlatforms, Platform } from "../../view/platforms/Platform";
import { PlatformMoveContainer } from "../../view/platforms/PlatformMoveContainer";

export interface UpdatePlatformsStepParams extends BaseStepParams {
  platforms: IPlatforms;
  platformContainer: PlatformMoveContainer;
}

interface IPlatformData {
  size: number;
  number: number;
}

export class UpdatePlatformsStep<
  T extends UpdatePlatformsStepParams = UpdatePlatformsStepParams,
> extends BaseStep<UpdatePlatformsStepParams> {
  public start(params: T): void {
    const { platformContainer } = params;
    this._params = params;
    platformContainer.removePlatformSignal.add(this._onPlatformRemoved, this);
    platformContainer.getNewPlatformSignal.add(this._getNewPlatform, this);
  }

  private _onPlatformRemoved(plt: Platform): void {
    this._params.platforms.get(plt.typePlt)!.get(plt.sizePlt)!.push(plt);
  }

  private _getNewPlatform(): void {
    const { platformContainer, platforms } = this._params;

    const platformBigData: IPlatformData[] = this._getPlatformData(
      platforms,
      PlatformTypes.big,
    );

    console.log(platformBigData);

    const data =
      platformBigData[Math.floor(Math.random() * platformBigData.length)];

    const arr = platforms.get(PlatformTypes.big)!.get(data.size)!;
    const newPlt = arr.pop()!;

    platformContainer.addPlatform(
      newPlt,
      this._models.platformsModel.sizePlatformTile,
    );
  }

  private _getPlatformData(
    platforms: IPlatforms,
    type: PlatformTypes,
  ): IPlatformData[] {
    const data = [];
    for (const [key, value] of platforms.get(type)!.entries()) {
      if (value.length > 0) {
        data.push({
          size: key,
          number: value.length,
        });
      }
    }

    return data;
  }
}
