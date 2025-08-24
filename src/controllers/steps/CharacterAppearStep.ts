import {
  BaseStep,
  BaseStepParams,
} from "../../libs/controllers/steps/BaseStep";
import { Character } from "../../view/character/Character";

export interface CharacterAppearStepParams extends BaseStepParams {
  character: Character;
}

export class CharacterAppearStep<
  T extends CharacterAppearStepParams = CharacterAppearStepParams,
> extends BaseStep<CharacterAppearStepParams> {
  public start({ character }: T): void {
    const pos = this._models.characterModel.startPosition;
    character.visible = true;
    character.setPosition(pos.x, pos.y);
    character.animationComplete.addOnce(this._onComplete, this);
    character.switchStaticBody(false);
  }
}
