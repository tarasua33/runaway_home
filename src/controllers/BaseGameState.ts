import { GameViewFactory, IGameView } from "../factories/GameViewFactory";
import { BaseState } from "../libs/controllers/BaseState";
import { StandardContainer } from "../libs/gameObjects/StandardContainer";
import { PhysicEngine } from "../libs/physic/PhysicEngine";
import { BaseGameController } from "./BaseGameController";
import { UserInteractionDispatcher } from "../libs/utils/UserInteractionDispatcher";
import { TransitionController } from "./TransitionController";

interface ISTateParams {
  userInteractionDispatcher: UserInteractionDispatcher;
  mainScene: StandardContainer;
  physicEngine: PhysicEngine;
}

const PHRASES = {
  WELCOME: "Let's get started!",
  REPLAY: "Try again",
  NEXT_LVL: "You win!\nGet ready for level",
};

export class BaseGameState extends BaseState {
  private _baseGameController!: BaseGameController;
  private _transitionController!: TransitionController;

  private _gameView!: IGameView;
  private _userInteractionDispatcher!: UserInteractionDispatcher;
  private _success: boolean = false;

  public start({
    userInteractionDispatcher,
    mainScene,
    physicEngine,
  }: ISTateParams): void {
    this._userInteractionDispatcher = userInteractionDispatcher;

    this._transitionController = new TransitionController();
    const gameView = (this._gameView = this._buildGameObjects(
      mainScene,
      physicEngine,
    ));

    const OVERWRITE_LVL = 1;
    this._models.platformsModel.setUpLvl(OVERWRITE_LVL, gameView.platforms);

    // // START BASE GAME CONTROLLERS
    const baseGameController = (this._baseGameController =
      new BaseGameController());
    baseGameController.completeStepSignal.addOnce(
      this._showTransitionScreen,
      this,
    );
    baseGameController.start({
      gameView,
      userInteractionDispatcher,
      gameLoaded: true,
      title: PHRASES.WELCOME,
    });
  }

  private _showTransitionScreen(success: boolean): void {
    this._success = success;

    const transitionController = this._transitionController;
    transitionController.completeStepSignal.addOnce(this._restartGame, this);

    const pltModel = this._models.platformsModel;
    transitionController.start({
      gameView: this._gameView,
      title: this._success
        ? PHRASES.NEXT_LVL + ` ${pltModel.lvl + 1}`
        : PHRASES.REPLAY,
    });
  }

  private _restartGame(): void {
    const baseGameController = this._baseGameController;

    const pltModel = this._models.platformsModel;
    pltModel.setUpLvl(
      this._success ? pltModel.lvl + 1 : pltModel.lvl,
      this._gameView.platforms,
    );

    baseGameController.completeStepSignal.addOnce(
      this._showTransitionScreen,
      this,
    );
    baseGameController.start({
      gameView: this._gameView,
      userInteractionDispatcher: this._userInteractionDispatcher,
      gameLoaded: false,
      title: this._success
        ? PHRASES.NEXT_LVL + ` ${pltModel.lvl}`
        : PHRASES.REPLAY,
    });
  }

  private _buildGameObjects(
    mainScene: StandardContainer,
    physicEngine: PhysicEngine,
  ): IGameView {
    const uiFactory = new GameViewFactory();
    const gameUI = uiFactory.buildUi({
      mainScene,
      physicEngine,
    });

    return gameUI;
  }
}
