import { BaseStep } from "./steps/BaseStep";

export abstract class BaseState extends BaseStep {
  public abstract start(...args: unknown[]): void;
}
