import { CharacterModel } from "../../../models/CharacterModel";
import { IModels } from "../../../models/IModels";
import { PlatformsModel } from "../../../models/PlatformsModel";
import { Signal } from "../../utils/Signal";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BaseStepParams {
  // pass
}

export abstract class BaseStep<T extends BaseStepParams = BaseStepParams> {
  public completeStepSignal = new Signal();

  protected _params!: T;
  protected _models: IModels;

  constructor() {
    this._models = {
      platformsModel: PlatformsModel.getModel(),
      characterModel: CharacterModel.getModel(),
    };
  }

  public abstract start(params: T): void;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected _onComplete(...args: any[]): void {
    this.completeStepSignal.dispatch(...args);
    console.log("complete", this);
  }

  public forceComplete(): void {
    // pass
  }
}
