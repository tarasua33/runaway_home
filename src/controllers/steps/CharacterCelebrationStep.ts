import {
  BaseStep,
  BaseStepParams,
} from "../../libs/controllers/steps/BaseStep";
import { Character } from "../../view/character/Character";

export interface CharacterCelebrationStepParams extends BaseStepParams {
  character: Character;
}

export class CharacterCelebrationStep<
  T extends CharacterCelebrationStepParams = CharacterCelebrationStepParams,
> extends BaseStep<CharacterCelebrationStepParams> {
  public start({ character }: T): void {
    character.celebration();

    this._onComplete();
  }
}
