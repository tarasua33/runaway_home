import {
  BaseStep,
  BaseStepParams,
} from "../../libs/controllers/steps/BaseStep";
import { Character } from "../../view/character/Character";
import { EnvMoveContainer } from "../../view/env/EnvMoveContainer";
import { PlatformMoveContainer } from "../../view/platforms/PlatformMoveContainer";

export interface StopGameStepParams extends BaseStepParams {
  platformMoveContainer: PlatformMoveContainer;
  character: Character;
  isFail: boolean;
  mountains: EnvMoveContainer;
  shadows: EnvMoveContainer;
}

export class StopGameStep<
  T extends StopGameStepParams = StopGameStepParams,
> extends BaseStep<StopGameStepParams> {
  public start({
    platformMoveContainer,
    character,
    isFail,
    mountains,
    shadows,
  }: T): void {
    platformMoveContainer.stop();
    mountains.stop();
    shadows.stop();
    if (isFail) {
      character.switchStaticBody(true);
    }

    this._onComplete();
  }
}
