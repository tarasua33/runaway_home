// import { IModels } from "../../models/Models";
import { BaseStep, BaseStepParams } from "./steps/BaseStep";
import { StepsManager } from "./StepsManager";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IControllerParams extends BaseStepParams {
  // pass
}

export abstract class Controller<
  T extends IControllerParams = IControllerParams,
> extends BaseStep<T> {
  protected _mng = new StepsManager();

  constructor() {
    super();

    this._mng.completeSteps.add(this._onComplete, this);
  }
}
