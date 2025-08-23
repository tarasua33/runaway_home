import { BaseStep, BaseStepParams } from "../../libs/controllers/BaseStep";
import { Signal } from "../../libs/utils/Signal";
import { UserInteractionDispatcher } from "../../libs/utils/UserInteractionDispatcher";

export interface PlayerActionListeningStepParams extends BaseStepParams {
  userInteractionDispatcher: UserInteractionDispatcher;
}

export class PlayerActionListeningStep<
  T extends PlayerActionListeningStepParams = PlayerActionListeningStepParams,
> extends BaseStep<PlayerActionListeningStepParams> {
  public readonly pointerDownSignal = new Signal();

  public start(params: T): void {
    this._params = params;
    const { userInteractionDispatcher } = params;

    userInteractionDispatcher.pointerDownSignal.add(this._onPointerDown, this);
  }

  private _onPointerDown(): void {
    this.pointerDownSignal.dispatch();
  }

  protected _onComplete(): void {
    this._params.userInteractionDispatcher.pointerDownSignal.remove(
      this._onPointerDown,
    );
  }
}
