import { GameViewFactory, IGameView } from "../factories/GameViewFactory";
import { BaseState } from "../libs/controllers/BaseState";
import { StandardContainer } from "../libs/gameObjects/StandardContainer";
import { PhysicEngine } from "../libs/physic/PhysicEngine";
import { BaseGameController } from "./BaseGameController";
import { UserInteractionDispatcher } from "../libs/utils/UserInteractionDispatcher";

interface ISTateParams {
  userInteractionDispatcher: UserInteractionDispatcher;
  mainScene: StandardContainer;
  physicEngine: PhysicEngine;
}

export class BaseGameState extends BaseState {
  // private _baseGameController!: BaseGameController;
  // private _gameUI!: IGameView;
  // private _winLvl = false;

  public start({
    userInteractionDispatcher,
    mainScene,
    physicEngine,
  }: ISTateParams): void {
    // CREATE VIEW ELEMENTS
    const gameView = this._buildGameObjects(mainScene, physicEngine);

    // this._models.houseModel.reset();
    // this._models.boltsModel.reset();

    // // START BASE GAME CONTROLLERS
    const baseGameController = new BaseGameController();
    baseGameController.completeStepSignal.addOnce(
      this._showTransitionScreen,
      this,
    );
    baseGameController.start({
      gameView,
      userInteractionDispatcher,
    });
  }

  private _showTransitionScreen(success: boolean): void {
    // this._winLvl = success;
    console.log("GAME - //// - ", success);
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
