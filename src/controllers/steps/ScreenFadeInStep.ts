import {
  BaseStep,
  BaseStepParams,
} from "../../libs/controllers/steps/BaseStep";
import { IFadeIn } from "../../libs/utils/GameHelper";

export interface ScreenFadeInStepParams extends BaseStepParams {
  screen: IFadeIn;
  skipAwait?: boolean;
  title: string;
}

export class ScreenFadeInStep<
  T extends ScreenFadeInStepParams = ScreenFadeInStepParams,
> extends BaseStep<ScreenFadeInStepParams> {
  public start({ screen, skipAwait, title }: T): void {
    if (!skipAwait) {
      screen.animationComplete.addOnce(this._onComplete, this);
    }

    screen.setText(title);
    screen.show();

    if (skipAwait) {
      this._onComplete();
    }
  }
}
