import {
  BaseStep,
  BaseStepParams,
} from "../../libs/controllers/steps/BaseStep";
import { BigPlatformSizes, IPlatforms } from "../../models/PlatformsModel";
import { Character } from "../../view/character/Character";
import { Platform } from "../../view/platforms/Platform";
import { PlatformMoveContainer } from "../../view/platforms/PlatformMoveContainer";

export interface ResetGameStepParams extends BaseStepParams {
  platforms: IPlatforms;
  platformMoveContainer: PlatformMoveContainer;
  character: Character;
}

export class ResetGameStep<
  T extends ResetGameStepParams = ResetGameStepParams,
> extends BaseStep<ResetGameStepParams> {
  public start(params: T): void {
    const { platformMoveContainer, character } = params;
    this._params = params;
    platformMoveContainer.removePlatformSignal.add(
      this._onPlatformRemoved,
      this,
    );
    platformMoveContainer.returnPlatforms();

    character.visible = false;
    character.reset();

    this._onComplete();
  }

  private _onPlatformRemoved(plt: Platform): void {
    plt.setPosition(-2000, 0);
    if (plt.isWinPlatform) {
      this._params.platforms
        .get(plt.typePlt)!
        .get(BigPlatformSizes.WIN)!
        .push(plt);
    } else {
      this._params.platforms.get(plt.typePlt)!.get(plt.sizePlt)!.push(plt);
    }
  }

  protected _onComplete(): void {
    this._params.platformMoveContainer.removePlatformSignal.removeAll();

    super._onComplete();
  }
}
