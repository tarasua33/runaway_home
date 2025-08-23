import { BaseStep, BaseStepParams } from "./BaseStep";
import gsap from "gsap";

export interface AwaitTimeStepParams extends BaseStepParams {
  delay: number;
}

// eslint-disable-next-line prettier/prettier
export class AwaitTimeStep<T extends AwaitTimeStepParams = AwaitTimeStepParams> extends BaseStep<AwaitTimeStepParams> {
  public start({ delay }: T): void {
    gsap.delayedCall(delay, this._onComplete.bind(this));
  }
}
