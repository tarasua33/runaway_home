import { IGameView } from "../factories/GameViewFactory";
import { Controller, IControllerParams } from "../libs/controllers/Controller";
import { AwaitTimeStep } from "../libs/controllers/steps/AwaitTimeStep";
import { Sequence } from "../libs/controllers/Sequence";
// import { Signal } from "../libs/utils/Signal";
import { UserInteractionDispatcher } from "../libs/utils/UserInteractionDispatcher";
import { CharacterAppearStep } from "./steps/CharacterAppearStep";
import { JumpStep } from "./steps/JumpStep";
import { ListeningCharacterStep } from "./steps/ListeningCharacterStep";
import { PlayerActionListeningStep } from "./steps/PlayerActionListeningStep";
import { PlayGameStep } from "./steps/PlayGameStep";
import {
  SetStartPositionsPlatformsStep,
  SetStartPositionsPlatformsStepParams,
} from "./steps/StartPositionsPlatformsStep";
import { StopGameStep } from "./steps/StopGameStep";
import {
  UpdatePlatformsStep,
  UpdatePlatformsStepParams,
} from "./steps/UpdatePlatformsStep";
import { ScreenFadeInStep } from "./steps/ScreenFadeInStep";
import { IFadeIn, IFadeOut } from "../libs/utils/GameHelper";
import {
  ScreenFadeOutStep,
  ScreenFadeOutStepParams,
} from "./steps/ScreenFadeOutStep";
import { SetLvlSettingsStep } from "./steps/SetLvlSettingsStep";

interface IControllerBaseParams extends IControllerParams {
  gameView: IGameView;
  userInteractionDispatcher: UserInteractionDispatcher;
  gameLoaded: boolean;
  title: string;
}

export class BaseGameController extends Controller<IControllerBaseParams> {
  // public readonly gameEndSignal = new Signal();
  private _updatePlatformsStep: UpdatePlatformsStep;
  private _playerActionListeningStep: PlayerActionListeningStep;
  private _characterAppearStep: CharacterAppearStep;
  private _playGameStep: PlayGameStep;
  private _listeningCharacterStep: ListeningCharacterStep;
  private _stopGameStep!: StopGameStep;
  private _screenFadeInStep: ScreenFadeInStep;
  private _screenFadeOutStep: ScreenFadeOutStep;
  private _setLvlSettingsStep!: SetLvlSettingsStep;

  private _gameView!: IGameView;

  constructor() {
    super();

    this._updatePlatformsStep = new UpdatePlatformsStep();
    this._playerActionListeningStep = new PlayerActionListeningStep();
    this._characterAppearStep = new CharacterAppearStep();
    this._playGameStep = new PlayGameStep();
    this._listeningCharacterStep = new ListeningCharacterStep();
    this._stopGameStep = new StopGameStep();
    this._screenFadeInStep = new ScreenFadeInStep();
    this._screenFadeOutStep = new ScreenFadeOutStep();
    this._setLvlSettingsStep = new SetLvlSettingsStep();

    this._mng.completeSteps.removeAll();
  }

  public start(params: IControllerBaseParams): void {
    const { gameView, userInteractionDispatcher, gameLoaded, title } =
      (this._params = params);
    this._gameView = gameView;
    const lvlPlatforms = this._models.platformsModel.getPlatforms();
    this._playerActionListeningStep.pointerDownSignal.add(this._onJump, this);

    const startSequence = new Sequence();
    // CONSEQUENCES
    // 0
    if (gameLoaded) {
      startSequence.addStepByStep(this._screenFadeInStep, {
        screen: gameView.transitionsScreen as IFadeIn,
        title,
      });
    }
    // 1
    startSequence.addStepByStep(this._setLvlSettingsStep, {
      platformMoveContainer: gameView.platformMoveContainer,
    });
    // 2
    startSequence.addStepByStep(new AwaitTimeStep(), {
      delay: 1.0,
    });
    // 3
    const SetStartPositionsStep = new SetStartPositionsPlatformsStep();
    const startStepParams: SetStartPositionsPlatformsStepParams = {
      platforms: lvlPlatforms,
      platformContainer: gameView.platformMoveContainer,
      furniture: gameView.furniture,
      furnitureFront: gameView.furnitureFront,
    };
    startSequence.addStepByStep(SetStartPositionsStep, startStepParams);
    // 4
    startSequence.addStepByStep(this._screenFadeOutStep, {
      screen: gameView.transitionsScreen as IFadeOut,
      skipAwait: false,
    } as ScreenFadeOutStepParams);
    // 5
    startSequence.addStepByStep(this._characterAppearStep, {
      character: gameView.character,
    });
    // 6
    startSequence.addStepByStep(new AwaitTimeStep(), {
      delay: 0.5,
    });
    // 7
    startSequence.addStepByStep(this._playGameStep, {
      platformMoveContainer: gameView.platformMoveContainer,
      character: gameView.character,
      mountains: gameView.mountains,
      shadows: gameView.shadows,
      frontTrees: gameView.frontTrees,
    });

    const playSequence = new Sequence();
    // PERMANENT
    // 1
    const updatePlatformsStep = this._updatePlatformsStep;
    updatePlatformsStep.winSignal.addOnce(this._onGameWin, this);
    playSequence.addPermanent(updatePlatformsStep, {
      platforms: lvlPlatforms,
      platformContainer: gameView.platformMoveContainer,
      furniture: gameView.furniture,
      furnitureFront: gameView.furnitureFront,
    } as UpdatePlatformsStepParams);
    // 2
    playSequence.addPermanent(this._playerActionListeningStep, {
      userInteractionDispatcher,
    });
    //3
    this._listeningCharacterStep.completeStepSignal.addOnce(
      this._onGameFail,
      this,
    );
    playSequence.addPermanent(this._listeningCharacterStep, {
      character: gameView.character,
    });

    // RUN
    this._mng.start([startSequence, playSequence]);
  }

  private _onJump(): void {
    this._mng.addDynamicStep(new JumpStep(), {
      character: this._gameView.character,
    });
  }

  protected _onComplete(): void {
    this._listeningCharacterStep.completeStepSignal.removeAll();
    this._playerActionListeningStep.pointerDownSignal.removeAll();

    const updatePlatformsStep = this._updatePlatformsStep;
    updatePlatformsStep.winSignal.removeAll();
    updatePlatformsStep.forceComplete();

    super._onComplete();
  }

  private _onStopGame(isFail: boolean): void {
    const gameView = this._gameView;
    this._mng.addDynamicStep(this._stopGameStep, {
      platformMoveContainer: gameView.platformMoveContainer,
      character: gameView.character,
      mountains: gameView.mountains,
      shadows: gameView.shadows,
      frontTrees: gameView.frontTrees,
      isFail,
    });

    this.forceComplete();
  }

  private _onGameFail(): void {
    this._onStopGame(true);

    this.completeStepSignal.dispatch(false);
  }

  private _onGameWin(): void {
    this._onStopGame(false);

    this.completeStepSignal.dispatch(true);
  }

  public forceComplete(): void {
    this._mng.forceComplete();
  }
}
