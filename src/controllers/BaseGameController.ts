import { IGameView } from "../factories/GameViewFactory";
import { Controller, IControllerParams } from "../libs/controllers/Controller";
import { Sequence } from "../libs/controllers/Sequence";
// import { IPlatforms } from "../view/platforms/Platform";
import {
  SetStartPositionsPlatformsStep,
  SetStartPositionsPlatformsStepParams,
} from "./steps/StartPositionsPlatformsStep";
import { UpdatePlatformsStep } from "./steps/UpdatePlatformsStep";

interface IControllerBaseParams extends IControllerParams {
  gameView: IGameView;
}

export class BaseGameController extends Controller<IControllerBaseParams> {
  _updatePlatformsStep: UpdatePlatformsStep;
  // private _platforms!: IPlatforms;
  // private _gameView!: IGameView;

  constructor() {
    super();

    this._updatePlatformsStep = new UpdatePlatformsStep();
  }

  public start(params: IControllerBaseParams): void {
    // const models = this._models;
    const { gameView } = (this._params = params);
    // this._gameView = gameView;
    // this._platforms = gameView.platforms;

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
      characterContainer: gameView.characterContainer,
    });

    this._mng.start([startSequence]);
  }
}
