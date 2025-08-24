import {
  BaseStep,
  BaseStepParams,
} from "../../libs/controllers/steps/BaseStep";
import { IFadeOut } from "../../libs/utils/GameHelper";

export interface ScreenFadeOutStepParams extends BaseStepParams {
  screen: IFadeOut;
  skipAwait?: boolean;
}

export class ScreenFadeOutStep<
  T extends ScreenFadeOutStepParams = ScreenFadeOutStepParams,
> extends BaseStep<ScreenFadeOutStepParams> {
  public start({ screen, skipAwait }: T): void {
    if (!skipAwait) {
      screen.animationComplete.addOnce(this._onComplete, this);
    }

    screen.hide();

    if (skipAwait) {
      this._onComplete();
    }
  }
}
