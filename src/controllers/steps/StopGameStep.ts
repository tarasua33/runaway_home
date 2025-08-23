import {
  BaseStep,
  BaseStepParams,
} from "../../libs/controllers/steps/BaseStep";
import { PlatformMoveContainer } from "../../view/platforms/PlatformMoveContainer";

export interface StopGameStepParams extends BaseStepParams {
  platformMoveContainer: PlatformMoveContainer;
}

export class StopGameStep<
  T extends StopGameStepParams = StopGameStepParams,
> extends BaseStep<StopGameStepParams> {
  public start({ platformMoveContainer }: T): void {
    platformMoveContainer.stop();

    this._onComplete();
  }
}
