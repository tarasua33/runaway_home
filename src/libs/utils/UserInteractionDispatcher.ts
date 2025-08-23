import { Signal } from "./Signal";

export class UserInteractionDispatcher {
  public readonly pointerDownSignal = new Signal();

  constructor(view: HTMLCanvasElement) {
    view.addEventListener("pointerdown", this._onPointerDown.bind(this));
  }

  private _onPointerDown(): void {
    this.pointerDownSignal.dispatch();
  }
}
