export abstract class BaseState {
  // protected _states = new Map<string, BaseState>;
  // protected _dispatchers: IDispatchers;

  // constructor() { }

  public abstract start(...args: unknown[]): void;

  // public addState(key: string, state: BaseState): void {
  //   this._states.set(key, state);
  // }

  // public abstract changeState(key: string): void
}
