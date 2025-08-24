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

export class BaseGameState extends BaseState {
  private _baseGameController!: BaseGameController;
  private _transitionController!: TransitionController;

  private _gameView!: IGameView;
  private _userInteractionDispatcher!: UserInteractionDispatcher;
  // private _winLvl = false;

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

    // this._models.houseModel.reset();
    // this._models.boltsModel.reset();

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
    });
  }

  private _showTransitionScreen(success: boolean): void {
    // this._winLvl = success;
    console.log("GAME - //// - ", success);
    const transitionController = this._transitionController;
    transitionController.completeStepSignal.addOnce(this._restartGame, this);

    transitionController.start({
      gameView: this._gameView,
      success,
    });
  }

  private _restartGame(): void {
    const baseGameController = this._baseGameController;

    baseGameController.completeStepSignal.addOnce(
      this._showTransitionScreen,
      this,
    );
    baseGameController.start({
      gameView: this._gameView,
      userInteractionDispatcher: this._userInteractionDispatcher,
      gameLoaded: false,
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

  // private _restartLvl(): void {
  //   const baseGameController = this._baseGameController;
  //   // const userInterfaceController = this._userInterfaceController;

  //   baseGameController.completeStepSignal.removeAll();
  // }

  // private _onGameSuccess(): void {

  // }
}
