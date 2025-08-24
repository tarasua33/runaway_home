import { IGameView } from "../factories/GameViewFactory";
import { Controller, IControllerParams } from "../libs/controllers/Controller";
import { Sequence } from "../libs/controllers/Sequence";
import { AwaitTimeStep } from "../libs/controllers/steps/AwaitTimeStep";
import { IFadeIn } from "../libs/utils/GameHelper";
import { ResetGameStep } from "./steps/ResetGameStep";
import { ScreenFadeInStep } from "./steps/ScreenFadeInStep";

interface IControllerBaseParams extends IControllerParams {
  gameView: IGameView;
  title: string;
}

export class TransitionController extends Controller<IControllerBaseParams> {
  private _screenFadeInStep: ScreenFadeInStep;
  private _resetGameStep: ResetGameStep;

  constructor() {
    super();

    this._screenFadeInStep = new ScreenFadeInStep();
    this._resetGameStep = new ResetGameStep();
  }

  public start(params: IControllerBaseParams): void {
    const { gameView, title } = (this._params = params);

    const baseSequence = new Sequence();
    // 1
    baseSequence.addStepByStep(this._screenFadeInStep, {
      screen: gameView.transitionsScreen as IFadeIn,
      title: title,
    });
    // 2
    baseSequence.addStepByStep(this._resetGameStep, {
      platforms: this._models.platformsModel.getPlatforms(),
      platformMoveContainer: gameView.platformMoveContainer,
      character: gameView.character,
    });
    // 3
    baseSequence.addStepByStep(new AwaitTimeStep(), {
      delay: 2.0,
    });

    this._mng.start([baseSequence]);
  }

  protected _onComplete(): void {
    this.completeStepSignal.dispatch();
  }
}
