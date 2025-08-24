import {
  BaseStep,
  BaseStepParams,
} from "../../libs/controllers/steps/BaseStep";
import { PlatformMoveContainer } from "../../view/platforms/PlatformMoveContainer";

export interface SetLvlSettingsStepParams extends BaseStepParams {
  // platforms: IPlatforms;
  platformMoveContainer: PlatformMoveContainer;
  // character: Character;
}

export class SetLvlSettingsStep<
  T extends SetLvlSettingsStepParams = SetLvlSettingsStepParams,
> extends BaseStep<SetLvlSettingsStepParams> {
  public start(params: T): void {
    const { platformMoveContainer } = params;
    // this._params = params;
    const set = this._models.platformsModel.getLvlMechanicSettings();
    platformMoveContainer.setSpeed(set.speed);

    this._onComplete();
  }
}
