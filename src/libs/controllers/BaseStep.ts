// import { IModels } from "../../models/Models";
// import { Signal } from "../utils/Signal";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BaseStepParams {
  // pass
}

export abstract class BaseStep<T extends BaseStepParams = BaseStepParams> {
  // public completeStepSignal = new Signal();

  protected _params!: T;
  // protected _models: IModels

  // constructor(models: IModels) {
  //   // this._models = models;
  // }

  public abstract start(params: T): void;

  // protected _onComplete(...args: any[]): void {
  //   this.completeStepSignal.dispatch(...args);
  //   console.log("complete", this)
  // }

  public forceComplete(): void {
    // pass
  }
}
