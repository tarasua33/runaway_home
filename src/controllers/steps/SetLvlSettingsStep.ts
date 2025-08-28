import {
  BaseStep,
  BaseStepParams,
} from "../../libs/controllers/steps/BaseStep";
import { Character } from "../../view/character/Character";
import { EnvMoveContainer } from "../../view/env/EnvMoveContainer";
import { PlatformMoveContainer } from "../../view/platforms/PlatformMoveContainer";

export interface SetLvlSettingsStepParams extends BaseStepParams {
  platformMoveContainer: PlatformMoveContainer;
  mountains: EnvMoveContainer;
  shadows: EnvMoveContainer;
  frontTrees: EnvMoveContainer;
  character: Character;
}

export class SetLvlSettingsStep<
  T extends SetLvlSettingsStepParams = SetLvlSettingsStepParams,
> extends BaseStep<SetLvlSettingsStepParams> {
  public start(params: T): void {
    const { platformMoveContainer, mountains, shadows, frontTrees, character } =
      params;
    const lvlModels = this._models.levelModel;
    const set = lvlModels.getLvlMechanicSettings();

    platformMoveContainer.setSpeed(set.speed);
    mountains.setSpeed(set.mountSpeed);
    shadows.setSpeed(set.shadowSpeed);
    frontTrees.setSpeed(set.treesSpeed);
    character.setSpeed(set.characterAnimationSpeed);
    platformMoveContainer.setLvlFinalDistance(set.finalDistance);

    this._onComplete();
  }
}
