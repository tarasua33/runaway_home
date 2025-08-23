import {
  BaseStep,
  BaseStepParams,
} from "../../libs/controllers/steps/BaseStep";
import { PlatformMoveContainer } from "../../view/platforms/PlatformMoveContainer";

export interface PlayGameStepParams extends BaseStepParams {
  platformMoveContainer: PlatformMoveContainer;
}

export class PlayGameStep<
  T extends PlayGameStepParams = PlayGameStepParams,
> extends BaseStep<PlayGameStepParams> {
  public start({ platformMoveContainer }: T): void {
    platformMoveContainer.play();

    this._onComplete();
  }
}
