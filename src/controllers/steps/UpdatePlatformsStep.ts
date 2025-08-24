import {
  BaseStep,
  BaseStepParams,
} from "../../libs/controllers/steps/BaseStep";
import { getPlatformData, IPlatformData } from "../../libs/utils/GameHelper";
import { IPlatforms, PlatformTypes } from "../../models/PlatformsModel";
import { Platform } from "../../view/platforms/Platform";
import { PlatformMoveContainer } from "../../view/platforms/PlatformMoveContainer";

export interface UpdatePlatformsStepParams extends BaseStepParams {
  platforms: IPlatforms;
  platformContainer: PlatformMoveContainer;
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
    plt.setPosition(-2000, 0);
    this._params.platforms.get(plt.typePlt)!.get(plt.sizePlt)!.push(plt);
  }

  private _getNewPlatform(): void {
    const { platformContainer, platforms } = this._params;

    const platformBigData: IPlatformData[] = getPlatformData(
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

  protected _onComplete(): void {
    const platformContainer = this._params.platformContainer;
    platformContainer.removePlatformSignal.removeAll();
    platformContainer.getNewPlatformSignal.removeAll();

    super._onComplete();
  }

  public forceComplete(): void {
    this._onComplete();
  }
}
