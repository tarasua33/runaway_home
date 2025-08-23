import { IGameView } from "../factories/GameViewFactory";
import { Controller, IControllerParams } from "../libs/controllers/Controller";
import { Sequence } from "../libs/controllers/Sequence";
import { UserInteractionDispatcher } from "../libs/utils/UserInteractionDispatcher";
import { JumpStep } from "./steps/JumpStep";
import { PlayerActionListeningStep } from "./steps/PlayerActionListeningStep";

import {
  SetStartPositionsPlatformsStep,
  SetStartPositionsPlatformsStepParams,
} from "./steps/StartPositionsPlatformsStep";
import { UpdatePlatformsStep } from "./steps/UpdatePlatformsStep";

interface IControllerBaseParams extends IControllerParams {
  gameView: IGameView;
  userInteractionDispatcher: UserInteractionDispatcher;
}

export class BaseGameController extends Controller<IControllerBaseParams> {
  _updatePlatformsStep: UpdatePlatformsStep;
  _playerActionListeningStep: PlayerActionListeningStep;
  // private _platforms!: IPlatforms;
  private _gameView!: IGameView;

  constructor() {
    super();

    this._updatePlatformsStep = new UpdatePlatformsStep();
    this._playerActionListeningStep = new PlayerActionListeningStep();
  }

  public start(params: IControllerBaseParams): void {
    const { gameView, userInteractionDispatcher } = (this._params = params);
    this._gameView = gameView;

    this._playerActionListeningStep.pointerDownSignal.add(this._onJump, this);

    const startSequence = new Sequence();
    // CONSEQUENCES
    const startStep = new SetStartPositionsPlatformsStep();
    const startStepParams: SetStartPositionsPlatformsStepParams = {
      platforms: gameView.platforms,
      platformContainer: gameView.platformMoveContainer,
    };

    startSequence.addStepByStep(startStep, startStepParams);

    // PERMANENT
    startSequence.addPermanent(this._updatePlatformsStep, {
      platforms: gameView.platforms,
      platformContainer: gameView.platformMoveContainer,
      character: gameView.character,
    });

    startSequence.addPermanent(this._playerActionListeningStep, {
      userInteractionDispatcher,
    });

    this._mng.start([startSequence]);
  }

  private _onJump(): void {
    this._mng.addDynamicStep(new JumpStep(), {
      character: this._gameView.character,
    });
  }

  protected _onComplete(): void {
    this._playerActionListeningStep.pointerDownSignal.removeAll();
  }
}
