import {
  BaseStep,
  BaseStepParams,
} from "../../libs/controllers/steps/BaseStep";
import { Character } from "../../view/character/Character";

export interface ListeningCharacterStepParams extends BaseStepParams {
  character: Character;
}

export class ListeningCharacterStep<
  T extends ListeningCharacterStepParams = ListeningCharacterStepParams,
> extends BaseStep<ListeningCharacterStepParams> {
  private _character!: Character;
  public start({ character }: T): void {
    this._character = character;
    character.failSignal.add(this._onComplete, this);
  }

  protected _onComplete(): void {
    this._character.failSignal.removeAll();

    super._onComplete();
  }

  public forceComplete(): void {
    this._onComplete();
  }
}
