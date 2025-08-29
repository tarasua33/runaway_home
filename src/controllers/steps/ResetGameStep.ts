import { IFurniture } from "../../factories/FurnitureFactory";
import {
  BaseStep,
  BaseStepParams,
} from "../../libs/controllers/steps/BaseStep";
import { removeFurniture } from "../../libs/utils/GameHelper";
import {
  BigPlatformSizes,
  IPlatforms,
  PlatformTypes,
} from "../../models/PlatformsModel";
import { Character } from "../../view/character/Character";
import { Platform } from "../../view/platforms/Platform";
import { PlatformMoveContainer } from "../../view/platforms/PlatformMoveContainer";
import { TapHint } from "../../view/ui/TapHint";

export interface ResetGameStepParams extends BaseStepParams {
  platforms: IPlatforms;
  allPlatforms: IPlatforms;
  platformMoveContainer: PlatformMoveContainer;
  character: Character;
  furniture: IFurniture;
  furnitureFront: IFurniture;
  tapHint: TapHint;
}

export class ResetGameStep<
  T extends ResetGameStepParams = ResetGameStepParams,
> extends BaseStep<ResetGameStepParams> {
  public start(params: T): void {
    const {
      platformMoveContainer,
      character,
      tapHint,
      allPlatforms,
      furniture,
      furnitureFront,
    } = params;
    this._params = params;
    platformMoveContainer.removePlatformSignal.add(
      this._onPlatformRemoved,
      this,
    );
    platformMoveContainer.returnPlatforms();

    for (const size of allPlatforms.get(PlatformTypes.big)!.entries()) {
      const sizeArr = size[1];

      for (const plt of sizeArr) {
        removeFurniture(plt, furniture, false);
        removeFurniture(plt, furnitureFront, true);
      }
    }

    tapHint.visible = false;
    character.visible = false;
    character.reset();

    this._onComplete();
  }

  private _onPlatformRemoved(plt: Platform): void {
    const { platforms, furniture, furnitureFront } = this._params;

    removeFurniture(plt, furniture, false);
    removeFurniture(plt, furnitureFront, true);

    plt.setPosition(-2000, 0);
    if (plt.isWinPlatform) {
      platforms.get(plt.typePlt)!.get(BigPlatformSizes.WIN)!.push(plt);
    } else {
      platforms.get(plt.typePlt)!.get(plt.sizePlt)!.push(plt);
    }
  }

  protected _onComplete(): void {
    this._params.platformMoveContainer.removePlatformSignal.removeAll();

    super._onComplete();
  }
}
