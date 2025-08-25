import { IFurniture } from "../../factories/FurnitureFactory";
import {
  BaseStep,
  BaseStepParams,
} from "../../libs/controllers/steps/BaseStep";
import {
  addFurniture,
  getPlatformData,
  IPlatformData,
  removeFurniture,
} from "../../libs/utils/GameHelper";
import { Signal } from "../../libs/utils/Signal";
import {
  BigPlatformSizes,
  IPlatforms,
  PlatformTypes,
} from "../../models/PlatformsModel";
import { Platform } from "../../view/platforms/Platform";
import { PlatformMoveContainer } from "../../view/platforms/PlatformMoveContainer";

export interface UpdatePlatformsStepParams extends BaseStepParams {
  platforms: IPlatforms;
  platformContainer: PlatformMoveContainer;
  furniture: IFurniture;
}

export class UpdatePlatformsStep<
  T extends UpdatePlatformsStepParams = UpdatePlatformsStepParams,
> extends BaseStep<UpdatePlatformsStepParams> {
  public readonly winSignal = new Signal();

  private _nextAddWinPlatform = false;

  public start(params: T): void {
    const { platformContainer } = params;
    this._params = params;
    this._nextAddWinPlatform = false;

    platformContainer.awaitFinalSignal.addOnce(this._addNextWinPlatform, this);
    platformContainer.removePlatformSignal.add(this._onPlatformRemoved, this);
    platformContainer.getNewPlatformSignal.add(this._getNewPlatform, this);
  }

  private _addNextWinPlatform(): void {
    const platformContainer = this._params.platformContainer;
    platformContainer.awaitFinalSignal.removeAll();
    platformContainer.winSignal.addOnce(this._onWin, this);
    this._nextAddWinPlatform = true;
  }

  private _onWin(): void {
    this.winSignal.dispatch();
  }

  private _onPlatformRemoved(plt: Platform): void {
    const { platforms, furniture } = this._params;

    removeFurniture(plt, furniture);
    plt.setPosition(-2000, 0);
    if (plt.isWinPlatform) {
      platforms.get(plt.typePlt)!.get(BigPlatformSizes.WIN)!.push(plt);
    } else {
      platforms.get(plt.typePlt)!.get(plt.sizePlt)!.push(plt);
    }
  }

  private _getNewPlatform(): void {
    const { platformContainer, platforms, furniture } = this._params;
    let newPlt;
    if (this._nextAddWinPlatform) {
      const arr = platforms.get(PlatformTypes.big)!.get(BigPlatformSizes.WIN)!;
      newPlt = arr.pop()!;
      newPlt.isWinPlatform = true;

      this._nextAddWinPlatform = false;
      addFurniture([newPlt], furniture, true);
    } else {
      const platformBigData: IPlatformData[] = getPlatformData(
        platforms,
        PlatformTypes.big,
      );

      const data =
        platformBigData[Math.floor(Math.random() * platformBigData.length)];

      const arr = platforms.get(PlatformTypes.big)!.get(data.size)!;
      newPlt = arr.pop()!;
      addFurniture([newPlt], furniture);
    }

    platformContainer.addPlatform(
      newPlt,
      this._models.platformsModel.sizePlatformTile,
    );
  }

  protected _onComplete(): void {
    const platformContainer = this._params.platformContainer;
    platformContainer.awaitFinalSignal.removeAll();
    platformContainer.winSignal.removeAll();
    platformContainer.removePlatformSignal.removeAll();
    platformContainer.getNewPlatformSignal.removeAll();

    super._onComplete();
  }

  public forceComplete(): void {
    this._onComplete();
  }
}
