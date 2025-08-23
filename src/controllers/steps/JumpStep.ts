import { BaseStep, BaseStepParams } from "../../libs/controllers/BaseStep";
import { Character } from "../../view/character/Character";

export interface JumpStepParams extends BaseStepParams {
  character: Character;
}

export class JumpStep<
  T extends JumpStepParams = JumpStepParams,
> extends BaseStep<JumpStepParams> {
  public start({ character }: T): void {
    character.jump();
  }
}
