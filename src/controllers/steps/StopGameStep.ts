import {
  BaseStep,
  BaseStepParams,
} from "../../libs/controllers/steps/BaseStep";
import { Character } from "../../view/character/Character";
import { PlatformMoveContainer } from "../../view/platforms/PlatformMoveContainer";

export interface StopGameStepParams extends BaseStepParams {
  platformMoveContainer: PlatformMoveContainer;
  character: Character;
}

export class StopGameStep<
  T extends StopGameStepParams = StopGameStepParams,
> extends BaseStep<StopGameStepParams> {
  public start({ platformMoveContainer, character }: T): void {
    platformMoveContainer.stop();
    character.switchStaticBody(true);

    this._onComplete();
  }
}
