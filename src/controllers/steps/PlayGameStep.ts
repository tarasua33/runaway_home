import {
  BaseStep,
  BaseStepParams,
} from "../../libs/controllers/steps/BaseStep";
import { Character } from "../../view/character/Character";
import { PlatformMoveContainer } from "../../view/platforms/PlatformMoveContainer";

export interface PlayGameStepParams extends BaseStepParams {
  platformMoveContainer: PlatformMoveContainer;
  character: Character;
}

export class PlayGameStep<
  T extends PlayGameStepParams = PlayGameStepParams,
> extends BaseStep<PlayGameStepParams> {
  public start({ platformMoveContainer, character }: T): void {
    platformMoveContainer.play();
    character.start();

    this._onComplete();
  }
}
