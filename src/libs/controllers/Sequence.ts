import { BaseStep, BaseStepParams } from "./BaseStep";

export interface IStepAndParams {
  step: BaseStep;
  params: BaseStepParams;
}

export interface ISequence {
  permanents: IStepAndParams[];
  stepByStep: IStepAndParams[];
}

export class Sequence {
  public permanents: IStepAndParams[] = [];
  public stepByStep: IStepAndParams[] = [];

  public addPermanent<S extends BaseStep<P>, P extends BaseStepParams>(
    step: S,
    params: P,
  ): void {
    this.permanents.push({ step, params });
  }

  public addStepByStep<S extends BaseStep<P>, P extends BaseStepParams>(
    step: S,
    params: P,
  ): void {
    this.stepByStep.push({ step, params });
  }
}
