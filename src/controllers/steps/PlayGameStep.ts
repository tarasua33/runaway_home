import {
  BaseStep,
  BaseStepParams,
} from "../../libs/controllers/steps/BaseStep";
import { Character } from "../../view/character/Character";
import { EnvMoveContainer } from "../../view/env/EnvMoveContainer";
import { PlatformMoveContainer } from "../../view/platforms/PlatformMoveContainer";

export interface PlayGameStepParams extends BaseStepParams {
  platformMoveContainer: PlatformMoveContainer;
  character: Character;
  mountains: EnvMoveContainer;
  shadows: EnvMoveContainer;
}

export class PlayGameStep<
  T extends PlayGameStepParams = PlayGameStepParams,
> extends BaseStep<PlayGameStepParams> {
  public start({
    platformMoveContainer,
    character,
    mountains,
    shadows,
  }: T): void {
    platformMoveContainer.play();
    mountains.play();
    shadows.play();
    character.start();

    this._onComplete();
  }
}
